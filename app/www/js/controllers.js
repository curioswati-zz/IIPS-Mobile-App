angular.module('iips-app.controllers', ['iips-app.services'])

.controller('AppCtrl', function($scope, $rootScope, $state, $http,
                                Course, Semester, Batch) {

    $rootScope.imageShown = false;

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

    $rootScope.urlForImage = function(imageName) {
        if (!$rootScope.imageShown){
            $scope.imageShown = true;

            if(imageName == 'avatar.jpeg') {
                return "img/"+imageName;
            }
            else {
                var trueOrigin = cordova.file.dataDirectory + imageName;
                // trueOrigin = trueOrigin.split('//')[1];
    
                return trueOrigin;
            }
        }
    }
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
                    password: md5($scope.loginData.password)
                })
                .success(function (data) {
                    console.log(data);
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
                Auth.checkMailExist($scope.loginData.email)
                .then(function(resp) {
                    if(resp.count == 0) {
                        $scope.form.email.$setValidity("correctEmail", false);
                    }
                    else {
                        Auth.sendMail({ email: $scope.loginData.email })
                        .then(function(respPasscode) {
                            $scope.currentUser = resp[0].id;
                            $localstorage.set('OTP', respPasscode.data.passcode);
                            $scope.getOTP = true;
                            console.log($scope.form.email);
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
    $rootScope.uploadedPic = "avatar.jpeg";
    $rootScope.imageShown = false;

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

    $scope.uploadPic = function() {
        $scope.hideSheet = $ionicActionSheet.show({
            buttons: [
            { text: 'Take photo' },
            { text: 'Photo from library' }
            ],
            titleText: 'Add images',
            cancelText: 'Cancel',

            buttonClicked: function(index) {
                $scope.addImage(index);
            }
        });
    }

    $scope.addImage = function(type) {
        $scope.hideSheet();
        ImageService.saveMedia(type).then(function() {
            var images              = FileService.getImages();
            $rootScope.uploadedPic = images[0];

            setTimeout(function() {
                $scope.$apply();
            },100);
        },
        function(err) {
            console.log("error: ",typeof(err));
        });
    }
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
                        $rootScope.studentData.syllabusUrl = resp.syllabusUrl;
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

.controller('DashCtrl', function($rootScope, $scope, $state, $sce,
                                    $localstorage, Auth, Subject,
                                    Slot, TimeInterval, Faculty, Quote) {

    //------------------------------- some globals used in the controller---------------------------
    $scope.data        = {};
    $scope.showCurrent = true;
    $scope.showQuote   = true;
    $scope.session     = 'July-Dec 2015';
    $scope.Days        = ['Monday', 'Tuesday', 'Wednesday',
                         'Thursday', 'Friday', 'Saturday'];
    $scope.Day         = $scope.Days[0];
    var slot = 0;

    //--------------------------------- get quote from api------------------------------------------
    quoteId = Math.floor(Math.random() * 5);

    setTimeout(function() {
        Quote.getQuote(quoteId)
        .then(function(resp) {
            $scope.quote = resp;
            console.log($scope.quote);
        })
    }, 200);

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

    setTimeout(function() {
        $scope.syllabus = {
            // url: $sce.trustAsResourceUrl($rootScope.studentData.syllabusUrl)
            url: $sce.trustAsResourceUrl(base_url + '/web/viewer.html?file=' + 'MCA_II.pdf')
        };
        console.log("syllabus url: ",$scope.studentData.syllabusUrl);
    }, 200);
})

.controller('ProCtrl', function($scope, $rootScope, $state,
                                $localstorage, $ionicPlatform, FileService,
                                API, Auth) {

    //------------------------------ some globals for use in controller-----------------------------
    $scope.user   = [];
    $scope.others = ['About', 'Feedback', 'Contact Support', 'Open Source License'];
    $scope.sessionRefreshRequired = false;
    $scope.courseChanged = false;
    $rootScope.imageShown = false;

    $rootScope.uploadedPic = "avatar.jpeg";

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
        updateUser = {'email': $rootScope.userData.email};

        //--- if password was not changed, we need to send the current password with the request----
        if(typeof($scope.form.password.$viewValue) !== 'undefined') {
            updateUser.password = md5($scope.form.password.$viewValue);
        }
        else {
            updateUser.password = $rootScope.userData.password;
        }

        if($scope.courseChanged) {
            $scope.form.sem.$setValidity("semChanged", false);
        }

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
