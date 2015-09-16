angular.module('iips-app.controllers', ['iips-app.services'])

.controller('LoginCtrl', function($scope, $rootScope, $state, Auth, User, Student, $localstorage) {
    $scope.loginData = {};

    $scope.login = function(form) {
        $scope.form = form;
        $scope.form.password.$setValidity("correctPassword", true);
        $scope.usernameError = form.username.$error.required;
        $scope.passwordError = form.password.$error.required;

        if(form.$valid) {
            $rootScope.show('Signing in...');
            Auth.login({
                username: $scope.loginData.username,
                password: $scope.loginData.password
            })
            .success(function(data) {
                Auth.saveToken(data.token);
                $rootScope.hide();

                if($scope.form.$valid) {
                    if ($scope.loginData.username == 'admin' && $scope.loginData.password == 'idiot')
                    {
                        $state.go('admin')
                    }
                    else {
                        $state.go('tab');                        
                    }
                }
            })
            .error(function(error) {
                $rootScope.hide();
                setTimeout(function() {
                    $scope.form.password.$setValidity("correctPassword", false);                
                }, 1000);
                $rootScope.notify(error.message);
            })
        }
    };
    $scope.register = function(data) {
      $state.go('register');
    };
    $scope.forgot = function() {
        alert("How could you forget your password");
    };
})

.controller('RegisterCtrl', function($rootScope, $scope, $state, $cordovaCamera, API, Auth, Course) {

    $scope.registerData = { "ImageURI" :  "Select Image" };

    $scope.semesters = ['I', 'II', 'III',
                        'IV', 'V', 'VI', 'VII',
                        'VIII', 'IX', 'X',
                        'XI', 'XII'];

    $scope.uploadPic = function() {
        console.log("uploading");
        var options = {
            destinationType : Camera.DestinationType.FILE_URI,
            sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
            allowEdit : false,
            encodingType: Camera.EncodingType.JPEG,
            popoverOptions: CameraPopoverOptions,
        };

        $cordovaCamera.getPicture(options).then(function(imageData) {
            onImageSuccess(imageData);
            function onImageSuccess(fileURI) {
                createFileEntry(fileURI);
            }

            function createFileEntry(fileURI) {
                window.resolveLocalFileSystemURL(fileURI, copyFile, fail);
            }

            function copyFile(fileEntry) {
                var name    = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/') + 1);
                var newName = makeid() + name;
                window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(fileSystem2) {
                    fileEntry.copyTo(
                        fileSystem2,
                        newName,
                        onCopySuccess,
                        fail
                    );
                },fail);
            }

            function fail(error) {
                console.log("fail: " + error.code);
            }

            function makeid() {
                var text = "";
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                for (var i=0; i < 5; i++) {
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                }
                return text;
            }
        },
        function(err) {
            console.log(err);
        });
    }

    $scope.urlForImage = function(imageName) {
      var name = imageName.substr(imageName.lastIndexOf('/') + 1);
      var trueOrigin = cordova.file.dataDirectory + name;
      return trueOrigin;
    }

    $scope.register = function(form) {

        $scope.form = form;
        $scope.nameError     = form.fullname.$invalid;
        $scope.courseError   = form.course.$invalid;
        $scope.semError      = form.sem.$invalid;
        $scope.rollError     = form.roll.$invalid;
        $scope.emailError    = form.email.$invalid;
        $scope.usernameError = form.username.$invalid;
        $scope.passwordError = form.password.$invalid;
        $scope.verifyError   = form.verify.$invalid;

        if (form.$valid) {
            $rootScope.show('Please wait.. Registering');
            API.userSignup({
                username: $scope.registerData.username,
                password: $scope.registerData.password,
                verify:   $scope.registerData.verify,
                email:    $scope.registerData.email
            });
            API.studentSignup({
                fullname: $scope.registerData.fullname,
                course:   $scope.registerData.course,
                sem:      $scope.registerData.sem,
                rollno:   $scope.registerData.rollno
            })
            .success(function (data) {
                $rootScope.hide();
                if($scope.form.$valid) {
                    $state.go('login');
                }
            })
            .error(function (error) {
                $rootScope.hide();
                if(error.error && error.error.code == 11000)
                {
                    $rootScope.notify("A user with this username already exists");
                }
                else
                {
                    $rootScope.notify("Oops something went wrong, Please try again!");
                }
                
            });
        }
    };
    $scope.backToLogin = function() {
        $state.go('login');
    };
})

.controller('TabCtrl', function($scope, $rootScope, $state, $localstorage, Auth, User, Student, Batch, Course, Faculty) {

    /*
     Fetch the user details from localstorage.
     If user details don't exist in the storage then fetch from database.
     Set the details in rootScope to be used by other controllers.
     */
    $scope.currentUser = $localstorage.get('username');

    if($scope.currentUser == 'admin') {
        $rootScope.role = 'admin';
    }
    else {
        $rootScope.role = 'user';
    }

    if (typeof($scope.currentUser) != 'undefined') {
        var userData = $localstorage.getObj('userData');

        if( Object.keys(userData).length == 0 ) {
            User.getUser($scope.currentUser)
            .then(function(resp) {

                $rootScope.userData = resp;
                $localstorage.setObj('userData', resp);
                var sid = resp.StudentId;

                Student.getStudent(sid)
                .then(function(resp) {
                    $rootScope.studentData = resp;
                    $localstorage.setObj('studentData', resp);
                })
            })
        }

        else {
            $rootScope.userData = $localstorage.getObj('userData');
            $rootScope.studentData = $localstorage.getObj('studentData');
        }
    }

    $scope.showClassDetails = false;

    $scope.showInfo = function() {
        if ($scope.showClassDetails === true) {
            $scope.showClassDetails = false;
        }
        else {
            $scope.showClassDetails = true;
        }
    };

    $scope.logout = function() {
        logout = Auth.logout();
        $localstorage.clean();
        if(logout == true) {
            $state.go('login', {reload: true});
        }
    };

    setTimeout(function() {
        var bid = $rootScope.studentData.BatchId;
        $scope.classDetails = [{name: 'Room No.'}, {name: 'Dep. Incharge'},
                                {name: 'Prog Incharge'}, {name: 'Coordinator'}];

        $scope.batch = $localstorage.getObj('Batch');

        if(Object.keys($scope.batch).length == 0) {
            $scope.batch = {};

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
        }
        else {
            $scope.classDetails[0].valZero = $scope.batch.roomNo;
            $scope.classDetails[3].valZero = $scope.batch.batchMentor;
            $scope.classDetails[3].valOne  = $scope.batch.contact;
        }

        var cName = $rootScope.studentData.course;

        $scope.course = $localstorage.getObj('Course');

        if (Object.keys($scope.course).length == 0) {
            $scope.course = {};
            Course.getCourseByQuery('courseName',cName)
            .then(function(resp) {
                var queryPI = 'PI-'+cName
                $scope.course.name = cName;
                var dept = resp[0].dept;

                Faculty.getFacultyByQuery('role',queryPI)
                .then(function(resp) {
                    $scope.classDetails[2].valZero = resp[0].facultyName;
                    $scope.course.piName = resp[0].facultyName;
                    $scope.classDetails[2].valOne = resp[0].contact;
                    $scope.course.piContact = resp[0].contact;
                })

                var queryInc = 'Inc-'+dept;
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
            })            
        }
        else {
            $scope.classDetails[2].valZero = $scope.course.piName;
            $scope.classDetails[2].valOne = $scope.course.piContact;
            $scope.classDetails[1].valZero = $scope.course.incName;
            $scope.classDetails[1].valOne = $scope.course.incContact;
        }

    }, 1000);
})

.controller('DashCtrl', function($rootScope, $scope, $state, $localstorage, $ionicUser, $ionicPush, Auth, Subject, Slot, TimeInterval, Faculty) {

    $scope.data = {};

    $scope.$on('$ionicView.enter', function(event) {

        $scope.showQuote = true;
        $scope.session='July-Dec 2015';
        $scope.Days=['Monday', 'Tuesday', 'Wednesday',
                     'Thursday', 'Friday', 'Saturday'];
        $scope.Day = $scope.Days[0];
        $scope.sections = [];

        setTimeout(function(){
            $scope.slots = $localstorage.getObj('Slot'+$scope.Day);

            if(Object.keys($scope.slots).length == 0) {
                var bid = $rootScope.studentData.BatchId;
                Slot.getSlot(bid, $scope.Day)
                .then(function(resp) {
                    $scope.slots = resp;
                    $localstorage.setObj('Slot'+$scope.Day, resp);
                    callEmAll($scope.slots.length);
                })                
            }
            else {
                slot = 0;
                callEmAll($scope.slots.length);
            }
        }, 300);

        var slot = 0;

        $scope.next = function(day) {
            $scope.sections=[];
            var index = $scope.Days.indexOf(day);
            if (index == 5)
                index = -1;
            index = index + 1;
            $scope.Day = $scope.Days[index];

            setTimeout(function(){
                $scope.slots = $localstorage.getObj('Slot'+$scope.Day);

                if(Object.keys($scope.slots).length == 0) {
                    var bid = $rootScope.studentData.BatchId;

                    Slot.getSlot(bid, $scope.Day)
                    .then(function(resp) {
                        $scope.slots = resp;
                        $localstorage.setObj('Slot'+$scope.Day, resp);
                        slot = 0;
                        callEmAll($scope.slots.length);
                    })
                }
                else {
                    slot = 0;
                    callEmAll($scope.slots.length);
                }
            }, 300);
        }
        $scope.previous = function(day) {
            $scope.sections=[];
            var index = $scope.Days.indexOf(day);
            if (index == 0) {
                index = 6;
            }
            index = index - 1;
            $scope.Day = $scope.Days[index];

            setTimeout(function(){
                $scope.slots = $localstorage.getObj('Slot'+$scope.Day);

                if(Object.keys($scope.slots).length == 0) {
                    var bid = $rootScope.studentData.BatchId;

                    Slot.getSlot(bid, $scope.Day)
                    .then(function(resp) {
                        $scope.slots = resp;
                        $localstorage.setObj('Slot'+$scope.Day, resp);
                        slot = 0;
                        callEmAll($scope.slots.length);
                    })
                }
                else {
                    slot = 0;
                    callEmAll($scope.slots.length);
                }
            }, 300);
        }

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

    $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
        alert("Successfully registered token " + data.token);
        console.log('Ionic Push: Got token ', data.token, data.platform);
        $scope.token = data.token;
    });

    $scope.identifyUser = function() {
        console.log('Ionic User: Identifying with Ionic User service');

        var user = $ionicUser.get();
        if(!user.user_id) {
          // Set your user_id here, or generate a random one.
          user.user_id = $ionicUser.generateGUID();
        };

        // Add some metadata to your user object.
        angular.extend(user, {
          name: 'Ionitron',
          bio: 'I come from planet Ion'
        });

        // Identify your user with the Ionic User Service
        $ionicUser.identify(user).then(function(){
          $scope.identified = true;
          alert('Identified user ' + user.name + '\n ID ' + user.user_id);
        });
    };

    $scope.pushRegister = function() {
        console.log('Ionic Push: Registering user');

        // Register with the Ionic Push service.  All parameters are optional.
        $ionicPush.register({
          canShowAlert: true, //Can pushes show an alert on your screen?
          canSetBadge: true, //Can pushes update app icon badges?
          canPlaySound: true, //Can notifications play a sound?
          canRunActionsOnWake: true, //Can run actions outside the app,
          onNotification: function(notification) {
            // Handle new push notifications here
            // console.log(notification);
            return true;
          }
        });
    };

})

.controller('ProCtrl', function($scope, $rootScope, $localstorage, $state, API) {

    setTimeout(function() {
        if ($rootScope.role == 'user') {
            $scope.show_edit = true;
        }
        else if($rootScope.role == 'admin') {
            $scope.show_edit = false;
        }
    }, 1000);

    $scope.user = [];

    setTimeout(function() {
        for (key in $rootScope.studentData) {
            if (key !== 'id' && key !== 'BatchId') {
                var studentItem = {};
                studentItem['name'] = key;
                studentItem['value'] = $rootScope.studentData[key];
                $scope.user.push(studentItem);
            }
        }

        var userItem = {};
        userItem['name'] = 'username';
        userItem['value'] = $rootScope.userData['username'];
        $scope.user.push(userItem);

        userItem = {};
        userItem.name = 'email';
        userItem.value = $rootScope.userData['email'];
        $scope.user.push(userItem);

    }, 1000);

    $scope.editProfile = function() {
        $state.go('tab.edit-profile');            
    };

    $scope.goBack = function() {
        if($rootScope.role == 'admin')
            $state.go('admin.profile');
        else if($rootScope.role == 'user')
            $state.go('tab.profile');            
    }

    $scope.saveChanges = function(form) {

        $scope.form = form;

        if (form.$valid) {
            $rootScope.show('Please wait.. Saving');
            $scope.currentUser = $localstorage.get('username');
            API.userUpdate($scope.currentUser, {
                username: $rootScope.userData.username,
                password: $rootScope.userData.password,
                verify:   $rootScope.userData.verify,
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
                        password: $rootScope.userData.password,
                        verify: $rootScope.userData.verify,
                        email: $rootScope.userData.email                        
                    }
                    $rootScope.userData = userdata;

                    $localstorage.setObj('studentData', data.data);
                    $rootScope.studentData = data.data;

                    console.log($rootScope.role);

                    if($rootScope.role == 'admin')
                        $state.go('admin.profile');
                    else if($rootScope.role == 'user')
                        $state.go('tab.profile');            
                    }
            })
            .error(function (error) {
                console.log("error while updating");
                $rootScope.hide();                
            });
        }
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