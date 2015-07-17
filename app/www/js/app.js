// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova'])

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
     // navigator.splashscreen.hide()
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

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
          templateUrl: "templates/tab-profile.html"        }
      }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');

});