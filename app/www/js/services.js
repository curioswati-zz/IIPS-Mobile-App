angular.module('iips-app.services', [])

.factory('API', function($rootScope, $http, $ionicLoading, $window) {
	var base = "http://localhost:8080";

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
        		return $http.post(base+'/api/Users', userForm);
        	},
            studentSignup: function(studentForm) {
                return $http.post(base+'/api/Students', studentForm);
            }

        }
	return $resource('http://localhost:8080/api/Users');
});