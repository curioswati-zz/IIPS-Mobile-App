var api_base  = "http://localhost:8080/api"; //"http://10.0.2.2:8080/api";
var auth_base = "http://localhost:8080/auth";//"http://10.0.2.2:8080/auth";

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
                return ' ';
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
        }
        return {
            userSignup: function(userForm) {
                return $http.post(api_base+'/Users', userForm);
            },
            studentSignup: function(studentForm) {
                return $http.post(api_base+'/Students', studentForm);
            },
            userUpdate: function(user_id, userForm) {
                return $http.put(api_base+'/Users/'+user_id, userForm);
            },
            studentUpdate: function(s_id, studentForm) {
                return $http.put(api_base+'/Students/'+s_id, studentForm);
            },
            submitData: function(model, form) {
                return $http.post(api_base+'/'+model, form);
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

        $window.localStorage['username'] = payload.username;
        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };

    auth.currentUser = function(){
      if(auth.isLoggedIn()){
        var token = auth.getToken();
        var payload = JSON.parse($window.atob(token.split('.')[1]));

        return payload.username;
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
        getUser: function(username) {
            return $http.get(api_base+'/Users?username='+username)
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

.factory('Batch', function($http) {
    return {
        getBatch: function(id) {
            return $http.get(api_base+'/Batches/'+id)
            .then(function(resp) {
                return resp.data.data;
            });
        }
    }
})

.factory('Slot', function($http, $q) {
    return {
        getSlot: function(id, day) {
            return $http.get(api_base+'/Slots?BatchId='+id+'&&Day='+day+'&&sort=TimeIntervalId')
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

.factory('Subjects', function() {

    var subjects = [{
        id: 708,
        name: 'Bio. info.',
        time: '10:00 AM'
    }, {
        id: 701,
        name: 'Comp. arch.',
        time: '11:00 AM'        
    }, {
        id: 703,
        name: 'Disc. str.',
        time: '12:00 AM'
    }];

    return {
        all: function() {
            return subjects;
        }
    };
})

.factory('ClassDetails', function() {

    var classDetails = [{
        name: 'Room No.',
        value: '201'
    }, {
        name: 'Department',
        value: 'Technical'
    }, {
        name: 'HOD',
        value: 'Unknown'
    }, {
        name: 'Program Incharge',
        value: 'Kirti Mathur'
    }, {
        name: 'Batch Mentor',
        value: 'Rajesh Verma'
    }];

    return {
        all: function() {
            return classDetails;
        }
    };
})
// .factory('User', function() {

//     var user = [{
//         name: 'Course',
//         value: 'M.Tech'
//     }, {
//         name: 'Sem',
//         value: 'VII'
//     }, {
//         name: 'Email',
//         value: 'jaiswalswati94@gmail.com'
//     }];

//     return {
//         all: function() {
//             return user;
//         }
//     };
// });