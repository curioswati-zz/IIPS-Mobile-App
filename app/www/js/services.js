// var api_base  = "http://ec2-54-254-218-67.ap-southeast-1.compute.amazonaws.com/api";
// var auth_base = "http://ec2-54-254-218-67.ap-southeast-1.compute.amazonaws.com/auth";

var api_base  = "http://localhost:8080/api";
var auth_base = "http://localhost:8080/auth";

// var api_base  = "http://10.0.2.2:8080/api";
// var auth_base = "http://10.0.2.2:8080/auth";

angular.module('iips-app.services', [])

.factory('$localstorage', function($window, $ionicHistory) {
    return {
        show: function() {
            return $window.localStorage;
        },
        set: function(key, value) {
            $window.localStorage[key] = value;
        },
        get: function(key, defaultValue) {
            if (key in $window.localStorage && $window.localStorage[key] !== "undefined") {
                return $window.localStorage[key];                
            }
            else {
                return '';
            }
        },
        setObj: function(key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        },
        getObj: function(key) {
            if (key in $window.localStorage && $window.localStorage[key] !== "undefined") {
                return JSON.parse($window.localStorage[key]);                
            }
            else {
                return JSON.parse('{}');
            }
        },
        clean: function() {
            $window.localStorage.clear();
            $ionicHistory.clearCache();
        }
    }
})
.factory('FileService', function($localstorage) {
    var images = [];
    var IMAGE_STORAGE_KEY = 'images';

    return {
        getImages: function() {
            var img = $localstorage.get(IMAGE_STORAGE_KEY);

            if(img) {
                images = JSON.parse(img);
            }
            else {
                images = [];
            }
            return images;
        },
        storeImage: function(img) {
            images.push(img);
            $localstorage.set(IMAGE_STORAGE_KEY, JSON.stringify(images));
        }
    }
})
.factory('ImageService', function($cordovaCamera, FileService, $q, $cordovaFile) {
    imgService = {}

    //--------------------------- create a random id for image -------------------------------------
    imgService.makeid = function() {
        var text = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 5; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };

    //---------------------------- select options for image upload----------------------------------
    imgService.optionsForType = function(type) {
        var source;
        switch (type) {
            case 0:
                source = Camera.PictureSourceType.CAMERA;
                break;
            case 1:
                source = Camera.PictureSourceType.PHOTOLIBRARY;
                break;
        }
        return {
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: source,
            allowEdit: false,
            encodingType: Camera.EncodingType.JPEG,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        }
    };

    //----------------- select image from gallery or camera and save to app directory---------------
    imgService.saveMedia = function(type) {
        return $q(function(resolve, reject) {
            var options = imgService.optionsForType(type);

            // get the picture
            $cordovaCamera.getPicture(options)
            .then(function(imageUrl) {

                // if android:
                    // import from the gallery on Android could be a security constraint,
                    // $cordovaCamera does not return the real local URI.

                    console.log(imageUrl);

                if(ionic.Platform.isAndroid() && type === 1){

                    // So need to get the native url using FilePath plugin.
                    window.FilePath.resolveNativePath(imageUrl, function(nativeUrl){

                        var name = nativeUrl.substr(nativeUrl.lastIndexOf('/') + 1);

                        var namePath = nativeUrl.substr(0, nativeUrl.lastIndexOf('/') + 1);
                        namePath = "file://"+namePath;

                        var newName = imgService.makeid() + name;

                        $cordovaFile.copyFile(namePath, name, cordova.file.dataDirectory, newName)
                        .then(function(info) {
                            FileService.storeImage(newName);
                            resolve();
                        },
                        function(e) {
                            reject();
                        });
                    },
                    function(err) {
                        console.log(err);
                    });
                }
            });
        })
    }
    return imgService;
})
.factory('API', function($rootScope, $http, $ionicLoading, $window, $resource) {
    $rootScope.show = function (text) {
            $rootScope.loading = $ionicLoading.show({
                content: text ? text : 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
        };
        $rootScope.hide = function () {
            $ionicLoading.hide();
        };
        $rootScope.notify =function(text){
            $rootScope.show(text);
            $window.setTimeout(function () {
              $rootScope.hide();
            }, 1999);
        };
        $rootScope.setToken = function (token) {
            return $window.localStorage.token = token;
        };
        return {
            userSignup: function(userForm) {
                return $http.post(api_base+'/Users', userForm);
            },
            studentSignup: function(studentForm) {
                return $http.post(api_base+'/Students', studentForm)
                .then(function(resp) {
                    return resp.data.data;
                });
            },
            userUpdate: function(user_id, userForm) {
                return $http.put(api_base+'/Users/'+user_id, userForm);
            },
            studentUpdate: function(s_id, studentForm) {
                return $http.put(api_base+'/Students/'+s_id, studentForm);
            },
            submitData: function(model, form) {
                return $http.post(api_base+'/'+model, form);
            },
            checkUniqueRoll: function(property, value) {
                return $http.get(api_base+"/Students?"+property+"="+escape(value))
                .then(function(resp) {
                    if (resp.data.count > 0) {
                        return false
                    }
                    else {
                        return true;                        
                    }
                });
            },
            checkUniqueEmail: function(property, value) {
                return $http.get(api_base+"/Users?"+property+"="+escape(value))
                .then(function(resp) {
                    if (resp.data.count > 0) {
                        return false
                    }
                    else {
                        return true;                        
                    }
                });
            }
        }
})
.factory('Auth', function($rootScope, $http, $ionicLoading, $ionicHistory, $window) {
    var auth = {};

    auth.saveToken = function (token){
      $window.localStorage['auth-token'] = token;
    };

    auth.getToken = function (){
      return $window.localStorage['auth-token'];
    }

    auth.isLoggedIn = function(){
      var token = auth.getToken();

      if(token){
        var payload = JSON.parse($window.atob(token.split('.')[1]));

        $window.localStorage['email'] = payload.email;
        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };

    auth.currentUser = function(){
      if(auth.isLoggedIn()){
        var token = auth.getToken();
        var payload = JSON.parse($window.atob(token.split('.')[1]));

        return payload.email;
      }
    };
    auth.login = function(loginForm) {
        return $http.post(auth_base+'/login', loginForm);
    };

    auth.logout = function(){
        console.log("loginout");
        $window.localStorage.clear();
        $ionicHistory.clearCache();
        return true;
    };

    auth.recover = function(email) {
        return $http.get(api_base+'/Users?email='+email)
                .then(function(resp) {
                    return resp.data.data;
                });
    }

    $rootScope.show = function (text) {
            $rootScope.loading = $ionicLoading.show({
                content: text ? text : 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
        };
    $rootScope.hide = function () {
        $ionicLoading.hide();
    };
    $rootScope.notify =function(text){
        $rootScope.show(text);
        $window.setTimeout(function () {
          $rootScope.hide();
        }, 1999);
    };

    return auth;

})

.factory('Course', function($http) {
    return {
        getCourse: function(id) {
            return $http.get(api_base+'/Courses/'+id)
            .then(function(resp) {
                return resp.data.data;
            });                
        },
        getCourseByQuery: function(query, queryVal) {
            return $http.get(api_base+'/Courses?'+query+'='+queryVal)
            .then(function(resp) {
                return resp.data.data;
            });
        },
        getCourses: function() {
            return $http.get(api_base+'/Courses')
            .then(function(resp) {
                return resp.data.data;
            });
        }
    }
})

.factory('User', function($http) {
    return {
        getUser: function(email) {
            return $http.get(api_base+'/Users?email='+email)
            .then(function(resp) {
                return resp.data.data[0];
            });
        }
    }
})

.factory('Student', function($http) {
    return {
        getStudent: function(id) {
            return $http.get(api_base+'/Students/'+id)
            .then(function(resp) {
                return resp.data.data;
            });
        }
    }
})

.factory('Semester', function($http) {
    return {
        getSemester: function(sid) {
            return $http.get(api_base+"/Semesters/"+sid)
            .then(function(resp) {
                return resp.data.data;
            })
        },
        getSemesters: function(cid) {
            return $http.get(api_base+"/Semesters?CourseId="+cid)
            .then(function(resp) {
                return resp.data.data;
            })
        }
    }
})

.factory('Batch', function($http) {
    return {
        getBatch: function(id) {
            return $http.get(api_base+'/Batches/'+id)
            .then(function(resp) {
                return resp.data.data;
            });
        },
        getBatches: function() {
            return $http.get(api_base+'/Batches')
            .then(function(resp) {
                return resp.data.data;
            });
        }
    }
})

.factory('Slot', function($http, $q) {
    return {
        getSlot: function(id, day) {
            return $http.get(api_base+'/Slots?SemesterId='+id+'&&Day='+day+'&&sort=TimeIntervalId')
            .then(function(resp) {
                return resp.data.data;
            });
        }
    }
})

.factory('TimeInterval', function($http) {

    return {
        getInterval: function(id) {
            return $http.get(api_base+'/TimeIntervals/'+id)
            .then(function(resp) {
                return resp.data.data;
            });
        }
    }
})

.factory('Subject', function($http) {
    return {
        getSubject: function(id) {
            return $http.get(api_base+'/Subjects/'+id)
            .then(function(resp) {
                return resp.data.data;
            });
        }
    }
})

.factory('Faculty', function($http) {
    return {
        getFaculty: function(id) {
            return $http.get(api_base+'/Faculties/'+id)
            .then(function(resp) {
                return resp.data.data;
            });                
        },
        getFacultyByQuery: function(query, queryVal) {
            return $http.get(api_base+'/Faculties?'+query+'='+queryVal)
            .then(function(resp) {
                return resp.data.data;
            });
        }
    }
})
