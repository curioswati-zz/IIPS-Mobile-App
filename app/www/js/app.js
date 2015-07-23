// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter',
                ['ionic', 
                'ngCordova',
                'ionic.service.core',
                'ionic.service.push',
                'starter.controllers',
                'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    // $cordovaSplashscreen.hide();
     // navigator.splashscreen.hide()
  });
})

.config(['$ionicAppProvider', function($ionicAppProvider) {
  // Identify app
  $ionicAppProvider.identify({
    // The App ID (from apps.ionic.io) for the server
    app_id: '6c5cd62e',
    // The public API key all services will use for this app
    api_key: '8549532d70a7b6a46e6419ac821a152b725324a4c891d230',
    // Set the app to use development pushes
    dev_push: true
  });
}])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('main', {
      url: '/',
      controller: 'AppCtrl'
    })

    .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
    })

    .state('register', {
        url: "/register",
        templateUrl: "templates/register.html",
        controller: 'RegisterCtrl'
    })

    .state('quote', {
      url: "/quote",
      templateUrl: "templates/quote.html",
      controller: 'QuoteCtrl'
    })

    .state('tab', {
      url: "/tab",
      templateUrl: "templates/tabs.html",
      controller: 'TabCtrl'
    })

    .state('tab.dash', {
      url: "/dash",
      views: {
        'tab-dash': {
          templateUrl: "templates/tab-dash.html",
          controller: 'DashCtrl'
        }
      }
    })

    .state('tab.syllabus', {
      url: "/syllabus",
      views: {
        'tab-dash': {
          templateUrl: "templates/syllabus.html",
          controller: 'DashCtrl'          
        }
      }
    })

    .state('tab.schedule', {
      url: "/schedule",
      views: {
        'tab-dash': {
          templateUrl: "templates/schedule.html",
          controller: 'DashCtrl'
        }
      }
    })

    .state('tab.profile', {
      url: "/profile",
      views: {
        'tab-profile': {
          templateUrl: "templates/tab-profile.html",
          controller: 'ProCtrl'
        }
      }
    })

    .state('tab.edit-profile', {
      url: "/edit-profile",
      views: {
        'tab-profile': {
          templateUrl: "templates/edit-profile.html",
          controller: 'ProCtrl'
        }
      }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');

});