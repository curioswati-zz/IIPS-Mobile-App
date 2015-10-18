angular.module('iips-app.controllers', ['iips-app.services'])

.controller('AppCtrl', function($scope, $rootScope, $state, $http,
                                Course, Semester, Batch) {

    Course.getCourses()
    .then(function(resp) {
        $rootScope.courses = resp;
    });

    Batch.getBatches()
    .then(function(resp) {
        $rootScope.batches = resp;
    });

    $rootScope.getSemester = function(course) {
        console.log("selected:",course.$viewValue);
        cid = course.$viewValue;

        Semester.getSemesters(cid)
        .then(function(resp) {
            console.log(resp);
            $rootScope.semesters = resp;
        });
    };

    $rootScope.clearFormError = function() {
        $rootScope.formError = false;
    };

})

.controller('LoginCtrl', function($scope, $rootScope, $state, Auth, API, $localstorage) {
    $scope.loginData = {};

    $scope.$on('$ionicView.enter', function(event) {
        $scope.forgotPass = false;
        $rootScope.formError = false;
    })

    $scope.login = function(form) {
        $scope.form = form;
        $scope.form.password.$setValidity("correctPassword", true);

        if(form.$valid) {
            $rootScope.show('Signing in...');
            Auth.login({
                username: $scope.loginData.email,
                password: md5($scope.loginData.password)
            })
            .success(function(data) {
                Auth.saveToken(data.token);
                $rootScope.hide();

                if($scope.form.$valid) {

                    if ($scope.loginData.email == 'admin@iips.edu.in' && $scope.loginData.password == 'idiot')
                    {
                        $state.go('admin')
                        $scope.form.$setPristine();
                    }
                    else {
                        $state.go('tab');                        
                        $scope.form.$setPristine();
                    }
                 }
            })
            .error(function(error) {
                $rootScope.hide();
                setTimeout(function() {
                    $scope.form.password.$setValidity("correctPassword", false);
                }, 100);
            })
        }
        else {
            $rootScope.formError = true;
        }
    };

    $scope.recover = function(form) {
        $scope.form = form;

        if ($scope.recoverPass == true) {

            if(form.$valid) {
                $rootScope.show('Updating...');

                API.userUpdate($scope.currentUser, {
                    password: md5($scope.loginData.password),
                    verify: md5($scope.loginData.verify)
                })
                .success(function (data) {
                    $localstorage.clean();
                    $rootScope.hide();

                    $scope.forgotPass = false;
                    $scope.form.password.$setViewValue('');
                    $scope.form.verify.$setViewValue('');
                })
                .error(function (error) {
                    $rootScope.hide();                
                });
            }
            else {
                $rootScope.formError = true;
                loginData = {};
            }
        }
        if($scope.getOTP == false) {
            $scope.form.email.$setValidity("correctEmail", true);

            if(form.$valid) {
                Auth.recover($scope.loginData.email)
                .then(function(resp) {
                    if(resp.count == 0) {
                        $scope.form.email.$setValidity("correctEmail", false);
                    } else {
                        $http.post(auth_base + '/forgot_password', { email: $scope.loginData.email }).then(function(respPasscode) { 
                            $scope.currentUser = resp[0].id;
                            $localstorage.set('OTP', respPasscode.data.passcode);
                            $scope.getOTP = true;
                            $scope.form.email.$setViewValue('');
                        });
                    }
                },
                function(err) {
                    console.log(err);
                })
            }
            else {
                $rootScope.formError = true;
            }
        }
        else if ($scope.getOTP == true && $scope.recoverPass == false) {

            if($localstorage.get('OTP') == $scope.loginData.OTP) {
                $scope.form.OTP.$setValidity("correctOTP", true);
                $scope.recoverPass = true;
                $scope.form.OTP.$setViewValue('');
            }
            else {
                if (!$scope.OTPError)
                    $scope.form.OTP.$setValidity("correctOTP", false);
            }
        }
    };

    $scope.backToLogin = function() {
        $scope.forgotPass = false;
    }

    $scope.register = function(data) {
        $state.go('register');
    };

    $scope.forgot = function() {
        $scope.forgotPass = true;
        $scope.getOTP = false;
        $scope.recoverPass = false;
    };
})

.controller('RegisterCtrl', function($rootScope, $scope, $state, $ionicActionSheet,
                                    ImageService, FileService,
                                    API, Auth) {

    $scope.registerData = { "ImageURI" :  "Select Image" };
    // $scope.registerData.pic = "img/avatar.png";

    //---------------------- set the form to be clean at the time of state enter--------------------
    $scope.$on('$ionicView.enter', function(event) {
        $rootScope.formError = false;
    })

    //--------------------------------------Register the user---------------------------------------
    $scope.register = function(form) {
        $scope.form = form;

        //------------------------------- check if form is valid------------------------------------
        if (form.$valid) {

            // Need to get the batch text to append with roll no
            for(batch in $rootScope.batches) {
                if ($rootScope.batches[batch].id == $scope.form.batch.$viewValue) {
                    $scope.batch = $rootScope.batches[batch].batchName;
                }
            }

            //---------------------------------- submitting the form--------------------------------
            $rootScope.show('Please wait.. Registering');

            API.studentSignup({
                fullname:   $scope.registerData.fullname,
                CourseId:   $scope.registerData.course,
                SemesterId: $scope.registerData.sem,
                BatchId:    $scope.registerData.batch,
                rollno:     $scope.batch + "-" + $scope.registerData.rollno
            })
            .then(function(resp) {
                setTimeout(function() {
                    API.userSignup({
                        password:  md5($scope.registerData.password),
                        email:     $scope.registerData.email,
                        StudentId: resp.id
                    })
                    .then(function (resp) {
                        $rootScope.hide();
                        $scope.form.$setPristine();

                        if($scope.form.$valid) {
                            $state.go('login');
                        }
                    },
                    function(err) {
                        $rootScope.hide();
                        console.log(err);
                        $rootScope.notify(err);
                    });                    
                }, 100);
            },
            function(err) {
                $rootScope.hide();
                console.log(err);
                $rootScope.notify(err);
            });
            //--------------------------------------------------------------------------------------
        }
        else {
            $rootScope.formError = true;
        }
    //----------------------------------------------------------------------------------------------
    };

    $scope.backToLogin = function() {
        $state.go('login');
    };

    //------------------------- Select profile picture and show after upload------------------------

    // $scope.urlForImage = function(imageName) {
    //     var trueOrigin = cordova.file.dataDirectory + imageName;
    //     // trueOrigin = trueOrigin.split('//')[1];
    //     return trueOrigin;
    // }

    // $scope.uploadPic = function() {
    //     $scope.hideSheet = $ionicActionSheet.show({
    //         buttons: [
    //         { text: 'Take photo' },
    //         { text: 'Photo from library' }
    //         ],
    //         titleText: 'Add images',
    //         cancelText: 'Cancel',

    //         buttonClicked: function(index) {
    //             $scope.addImage(index);
    //         }
    //     });
    // }

    // $scope.addImage = function(type) {
    //     $scope.hideSheet();
    //     ImageService.saveMedia(type).then(function() {
    //         var images              = FileService.getImages();
    //         $scope.registerData.pic = images[0];

    //         // var imageLocation = $scope.urlForImage($scope.registerPic);
    //         // $scope.registerData.pic = imageLocation;

    //         setTimeout(function() {
    //             $scope.$apply();
    //         },1000);
    //     },
    //     function(err) {
    //         console.log(err);
    //     });
    // }
})

.controller('TabCtrl', function($scope, $rootScope, $state,
                                $localstorage,
                                Auth, User, Student, Batch,
                                Semester, Course, Faculty) {

    /*
     Fetch the user details from localstorage.
     If user details don't exist in the storage then fetch from database.
     Set the details in rootScope to be used by other controllers.
     */

    //------------------------- some globals used in the controller---------------------------------
    $scope.showClassDetails = false;
    $scope.classDetails = [{name: 'Room No.'}, {name: 'Dep. Incharge'},
                            {name: 'Prog Incharge'}, {name: 'Coordinator'}];

    //------------------------------Collect data from localstorage----------------------------------
    $scope.currentUser = $localstorage.get('email');
    $scope.batch       = $localstorage.getObj('Batch');
    $scope.course      = $localstorage.getObj('Course');

    //----------------------------------------------------------------------------------------------

    if($scope.currentUser == 'admin@iips.edu.in') {
        $rootScope.role = 'admin';
    }
    else {
        $rootScope.role = 'user';
    }

    //---------------------function for toggling the display of class info card---------------------
    $scope.showInfo = function() {
        if ($scope.showClassDetails === true) {
            $scope.showClassDetails = false;
        }
        else {
            $scope.showClassDetails = true;
        }
    };

    //----------------Getting the details; If the details not in localstorage-----------------------
    if (typeof($scope.currentUser) != 'undefined') {
        var userData = $localstorage.getObj('userData');

        if( Object.keys(userData).length == 0 ) {

            User.getUser($scope.currentUser)
            .then(function(resp) {

                $rootScope.userData = resp;
                $localstorage.setObj('userData', resp);

                Student.getStudent(resp.StudentId)
                .then(function(resp) {

                    $rootScope.studentData = resp;

                    Course.getCourse(resp.CourseId)
                    .then(function(resp) {
                        $rootScope.studentData.course = resp.courseName;
                    })

                    Semester.getSemester(resp.SemesterId)
                    .then(function(resp) {
                        $rootScope.studentData.sem = resp.semNo;
                        $localstorage.setObj('studentData', $rootScope.studentData);
                    })
                })
            })
        }

        // else show from local storage
        else {
            $rootScope.userData = $localstorage.getObj('userData');
            $rootScope.studentData = $localstorage.getObj('studentData');
        }
    }

    //------------------------------ Logout cleans the localstorage---------------------------------
    $rootScope.logout = function() {
        logout = Auth.logout();
        $localstorage.clean();
        if(logout == true) {
            $state.go('login', {reload: true});
        }
    };

    //--------------------------- Get batch details to show in class info card----------------------
    if(Object.keys($scope.batch).length == 0) {
        $scope.batch = {};

        setTimeout(function() {
            var bid = $rootScope.studentData.BatchId;

            Batch.getBatch(bid)
            .then(function(resp) {
                $scope.classDetails[0].valZero = resp.roomNo;
                $scope.batch.roomNo = resp.roomNo;

                var fid = resp.FacultyId;

                Faculty.getFaculty(fid)
                .then(function(resp) {
                    $scope.classDetails[3].valZero = resp.facultyName;                    
                    $scope.batch.batchMentor = resp.facultyName;

                    $scope.classDetails[3].valOne = resp.contact;
                    $scope.batch.contact = resp.contact;

                    $localstorage.setObj('Batch', $scope.batch);
                })
            });
        }, 300);
    }
    // else fetch from localstorage
    else {
        $scope.classDetails[0].valZero = $scope.batch.roomNo;
        $scope.classDetails[3].valZero = $scope.batch.batchMentor;
        $scope.classDetails[3].valOne  = $scope.batch.contact;
    }

    //--------------------------- Get course details to show in class info card----------------------
    if (Object.keys($scope.course).length == 0) {
        $scope.course = {};

        setTimeout(function() {
            $scope.course.name = $rootScope.studentData.course;
            var queryPI = 'PI-'+$rootScope.studentData.course

            Faculty.getFacultyByQuery('role',queryPI)
            .then(function(resp) {
                $scope.classDetails[2].valZero = resp[0].facultyName;
                $scope.course.piName = resp[0].facultyName;
                $scope.classDetails[2].valOne = resp[0].contact;
                $scope.course.piContact = resp[0].contact;
            })

            if($scope.course.name.slice(0,2) == 'MT' || $scope.course.name.slice(0,2) == 'MC') {
                var queryInc = 'Inc-Tech';
            }
            else {
                var queryInc = 'Inc-Mgmt';
            }
            
            Faculty.getFacultyByQuery('role',queryInc)
            .then(function(resp) {

                if (resp.length>0) {
                    $scope.classDetails[1].valZero = resp[0].facultyName;
                    $scope.course.incName = resp[0].facultyName;
                    $scope.classDetails[1].valOne = resp[0].contact;                        
                    $scope.course.incContact = resp[0].contact;                        
                }
                else {
                    $scope.classDetails[1].valZero = "Unknown";                        
                    $scope.course.incName = "Unknown";                        
                }
                $localstorage.setObj('Course', $scope.course);
            })
        }, 300);
    }
    // else show from localstorage
    else {
        $scope.classDetails[2].valZero = $scope.course.piName;
        $scope.classDetails[2].valOne = $scope.course.piContact;
        $scope.classDetails[1].valZero = $scope.course.incName;
        $scope.classDetails[1].valOne = $scope.course.incContact;
    }
    //----------------------------------------------------------------------------------------------
})

.controller('DashCtrl', function($rootScope, $scope, $state,
                                    $localstorage, $ionicUser, $ionicPush,
                                    Auth, Subject, Slot, TimeInterval, Faculty) {

    //------------------------------- some globals used in the controller---------------------------
    $scope.data        = {};
    $scope.showCurrent = true;
    $scope.showQuote   = true;
    $scope.session     = 'July-Dec 2015';
    $scope.Days        = ['Monday', 'Tuesday', 'Wednesday',
                         'Thursday', 'Friday', 'Saturday'];
    $scope.Day         = $scope.Days[0];
    var slot = 0;

    //------------------------------- from the username form user email-----------------------------
    setTimeout(function() {
        $scope.currentUser = $rootScope.userData.email.split('@')[0];
    }, 100);

    //----------------------------- start fetching data on state enter------------------------------
    $scope.$on('$ionicView.enter', function(event) {

        //------------------------------ show slot for selected day---------------------------------
        $scope.showSlot = function(day) {
            slot = 0;
            $scope.sections = [];
            $scope.slots = $localstorage.getObj('Slot'+$scope.Day);

            //---------------------------- if not found in localstorage-----------------------------
            if(Object.keys($scope.slots).length == 0) {
                setTimeout(function() {
                    var sid = $rootScope.studentData.SemesterId;
                    console.log($scope.Day);

                    Slot.getSlot(sid, day)
                    .then(function(resp) {
                        $scope.slots = resp;
                        $localstorage.setObj('Slot'+$scope.Day, resp);
                        callEmAll($scope.slots.length);
                    })                
                }, 100);
            }
            //------------------------------ else from the localstorage-----------------------------
            else {
                slot = 0;
                callEmAll($scope.slots.length);
            }
        }

        //---------------------------- ensure that the above function called only once--------------
        if($scope.showCurrent) {
            $scope.showCurrent = false;
            $scope.showSlot($scope.Day);
        }

        //--------------------------------- when the right chevron clicked--------------------------
        $scope.next = function(day) {
            var index = $scope.Days.indexOf(day);
            if (index == 5)
                index = -1;
            index = index + 1;
            $scope.Day = $scope.Days[index];
            $scope.showSlot($scope.Day);
        }

        //--------------------------------- when the left chevron clicked--------------------------
        $scope.previous = function(day) {
            var index = $scope.Days.indexOf(day);
            if (index == 0) {
                index = 6;
            }
            index = index - 1;
            $scope.Day = $scope.Days[index];
            $scope.showSlot($scope.Day);
        }

        /*--------------------- function to iterate over the array of slots,------------------------
                           as the for loop does not work quite good with promises.
        */
        function callEmAll(noOfCalls)
        {
            if (noOfCalls > 0)
            {
                $scope.section = {}

                var tid = $scope.slots[slot].TimeIntervalId;
                TimeInterval.getInterval(tid)
                .then(function(resp) {
                    $scope.section.begin = resp.beginTime.slice(11,13);
                    $scope.section.end = resp.endTime.slice(11,13);
                })

                var sid = $scope.slots[slot].SubjectId;
                Subject.getSubject(sid)
                .then(function(resp) {
                    $scope.section.subID = resp.subjectID;
                    $scope.section.subCode = resp.subjectCode;
                    var fid = resp.FacultyId;

                    Faculty.getFaculty(fid)
                    .then(function(resp) {
                        $scope.section.faculty = resp.facultyName;
                        $scope.sections.push($scope.section);

                        // $localstorage.setObj('Slot'+$scope.Day, $scope.sections);
                        callEmAll(noOfCalls-1);
                    })
                })
            }
            slot += 1;
        }
        $scope.openSyllabus = function() {
            $state.go('tab.syllabus');
        };

        $scope.openSchedule = function() {
            $state.go('tab.schedule');
        };

        $scope.goBack = function() {
            $state.go('tab.dash');
        };
    });

//-------------------------------- To implement push service for ionic.io---------------------------

    // $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
    //     alert("Successfully registered token " + data.token);
    //     console.log('Ionic Push: Got token ', data.token, data.platform);
    //     $scope.token = data.token;
    // });

    // $scope.identifyUser = function() {
    //     console.log('Ionic User: Identifying with Ionic User service');

    //     var user = $ionicUser.get();
    //     if(!user.user_id) {
    //       // Set your user_id here, or generate a random one.
    //       user.user_id = $ionicUser.generateGUID();
    //     };

    //     // Add some metadata to your user object.
    //     angular.extend(user, {
    //       name: 'Ionitron',
    //       bio: 'I come from planet Ion'
    //     });

    //     // Identify your user with the Ionic User Service
    //     $ionicUser.identify(user).then(function(){
    //       $scope.identified = true;
    //       alert('Identified user ' + user.name + '\n ID ' + user.user_id);
    //     });
    // };

    // $scope.pushRegister = function() {
    //     console.log('Ionic Push: Registering user');

    //     // Register with the Ionic Push service.  All parameters are optional.
    //     $ionicPush.register({
    //       canShowAlert: true, //Can pushes show an alert on your screen?
    //       canSetBadge: true, //Can pushes update app icon badges?
    //       canPlaySound: true, //Can notifications play a sound?
    //       canRunActionsOnWake: true, //Can run actions outside the app,
    //       onNotification: function(notification) {
    //         // Handle new push notifications here
    //         // console.log(notification);
    //         return true;
    //       }
    //     });
    // };
//--------------------------------------------------------------------------------------------------
})

.controller('ProCtrl', function($scope, $rootScope, $state,
                                $localstorage, $ionicPlatform, FileService,
                                API, Auth) {

    //------------------------------ some globals for use in controller-----------------------------
    $scope.user   = [];
    $scope.others = ['About', 'Feedback', 'Contact Support', 'Open Source License'];
    $scope.sessionRefreshRequired = false;
    $scope.courseChanged = false;

    //--------------------------check whether user is admin or general user-------------------------
    if ($rootScope.role == 'user') {
        $scope.show_edit = true;
    }
    else if($rootScope.role == 'admin') {
        $scope.show_edit = false;
    }

    //--------------------------------prepare data for template-------------------------------------

    // profile pic
    // $ionicPlatform.ready(function() {
    //     var images    = FileService.getImages();
    //     $scope.proPic = images[0];
    //     if($scope.proPic) {
    //         $scope.$apply();            
    //     }
        // else {
        //     $scope.proPic = 
        // }
      // });

    // $scope.urlForImage = function(imageName) {
    //     console.log("hello");
    //     var trueOrigin = cordova.file.dataDirectory + imageName;
    //     return trueOrigin;
    // }

    // $scope.imageUrl = $scope.urlForImage($scope.proPic);

    setTimeout(function() {
        $rootScope.studentData.rollno = $rootScope.studentData.rollno.toUpperCase();
        for (key in $rootScope.studentData) {
            if (key == 'course' || key == 'sem') {
                var studentItem = {};
                studentItem['name'] = key;
                studentItem['value'] = $rootScope.studentData[key];
                $scope.user.push(studentItem);
            }
        }
    }, 100);
    userItem = {};
    userItem.name = 'email';

    setTimeout(function() {
        userItem.value = $rootScope.userData['email'];        
    }, 100);

    $scope.user.push(userItem);

    //---------------------------------edit profile-------------------------------------------------
    $scope.editProfile = function() {
        $state.go('tab.edit-profile');
    };

    $scope.goBack = function() {
        if($rootScope.role == 'admin')
            $state.go('admin.profile');
        else if($rootScope.role == 'user')
            $state.go('tab.profile');            
    }

    //-------------------- refresh is required if course or semester was updated--------------------
    $scope.refreshRequired = function(elem) {
        if(elem.$name == 'course') {
            $scope.courseChanged = true;
        }
        if(elem.$name == 'sem') {
            elem.$setValidity("semChanged", true);
            $scope.courseChanged = false;
        }
        $scope.sessionRefreshRequired = true;
    }

    //---------------------------------------- save profile changes---------------------------------
    $scope.saveChanges = function(form) {

        $scope.form = form;

        if (form.$valid) {
            $rootScope.show('Please wait.. Saving');
            $scope.currentUser = $rootScope.userData.id;
            API.userUpdate($scope.currentUser, {
                password: md5($rootScope.userData.password),
                verify:   md5($rootScope.userData.verify),
                email:    $rootScope.userData.email
            });
            API.studentUpdate($rootScope.userData.StudentId, {
                fullname: $rootScope.studentData.fullname,
                course:   $rootScope.studentData.course,
                sem:      $rootScope.studentData.sem,
                rollno:   $rootScope.studentData.rollno
            })
            .success(function (data) {
                $localstorage.clean();
                $rootScope.hide();
                if($scope.form.$valid) {
                    userdata = {
                        username: $rootScope.userData.username,
                        password: md5($rootScope.userData.password),
                        verify: $rootScope.userData.verify,
                        email: $rootScope.userData.email                        
                    }
                }
            });
        }
        // else {
        //     $scope.form.sem.$setValidity("semChanged", true);
        // }

        //------------------------------------- check if form is valid------------------------------
        setTimeout(function() {
            if (form.$valid) {
                $rootScope.show('Please wait.. Saving');

                $scope.currentUser = $rootScope.userData.id;

                //---------------------------------- submit form----------------------------------------
                API.userUpdate($scope.currentUser, updateUser);
                API.studentUpdate($rootScope.userData.StudentId, {
                    fullname:   $rootScope.studentData.fullname,
                    CourseId:   $rootScope.studentData.CourseId,
                    SemesterId: $rootScope.studentData.SemesterId,
                })
                .success(function (data) {
                    $rootScope.hide();

                    if($scope.sessionRefreshRequired) {
                        alert("Session refresh required! Please login back.")
                        $rootScope.notify("Session refresh required! Please login back.")
                        $rootScope.logout();
                    }

                    else if($scope.form.$valid) {
                        //-------------------- update all the scope user information--------------------

                        $localstorage.setObj('studentData', data.data);

                        course = $rootScope.studentData.course;
                        sem = $rootScope.studentData.sem;

                        $rootScope.studentData = data.data;                
                        $rootScope.studentData.course = course;
                        $rootScope.studentData.sem = sem;
                    }

                    //------------------------ go back to appropriate profile view----------------------
                    if($rootScope.role == 'admin') {
                        $state.go('admin.profile');
                    }
                    else if($rootScope.role == 'user') {
                        $state.go('tab.profile');
                    }
                    //----------------------------------------------------------------------------------
                })
                .error(function (error) {
                    console.log("error while updating");
                    $rootScope.hide();                
                });
                //--------------------------------------------------------------------------------------
            }
            //------------------------------------------------------------------------------------------          
        }, 100);
    }
})

.controller('AdminDashCtrl', function($scope, $rootScope, $state) {
    $scope.openFaculty = function() {
        $state.go('admin.faculty');
    };    

    $scope.openSlot = function() {
        $state.go('admin.slot');
    };    

    $scope.openSubject = function() {
        $state.go('admin.subject');
    };    

    $scope.openInterval = function() {
        $state.go('admin.interval');
    };
})

.controller('DataFormCtrl', function($scope, $rootScope, $state, API) {

    $scope.data = {};

    $scope.submit = function(form, model) {
        $scope.form = form;

        if(form.$valid) {
            $rootScope.show('Submitting...');
            submitForm = {}

            if(model == 'Faculties') {
                submitForm['facultyID']   = $scope.data.FacultyId;
                submitForm['facultyName'] = $scope.data.FacultyName;
                submitForm['designation'] = $scope.data.designation;
                submitForm['qualification'] = $scope.data.qualification;
                submitForm['role'] = $scope.data.role;
                submitForm['contact'] = $scope.data.contact;
            }

            else if(model == 'TimeIntervals') {
                submitForm['beginTime'] = $scope.data.begin;
                submitForm['endTime']   = $scope.data.endTime;
            }

            else if(model == 'Slots') {
                submitForm['Day']            = $scope.data.day;
                submitForm['BatchId']        = $scope.data.BatchId;
                submitForm['TimeIntervalId'] = $scope.data.TimeIntervalId;
                submitForm['SubjectId']      = $scope.data.SubjectId;
            }

            else if(model == 'Subjects') {
                submitForm['subjectID'] = $scope.data.subjectID;
                submitForm['subjectCode'] = $scope.data.subjectCode;
                submitForm['subjectName'] = $scope.data.subjectName;
                submitForm['FacultyId'] = $scope.data.FacultyId;
            }

            API.submitData(model, submitForm)
            .success(function(data) {
                $rootScope.hide();
                if($scope.form.$valid) {
                    $scope.data = {};
                }
            })
            .error(function(error) {
                $rootScope.hide();
                $rootScope.notify("Oops something went wrong, Please try again!");
            })
        }
    };

    $scope.goBack = function() {
        console.log("back")
        $state.go('admin.dash');
    };

});
