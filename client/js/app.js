'use strict';

angular
  .module('app', [
    'ngAnimate', 'ngSanitize',
    'lbServices',
    'ui.router',
    'mgcrea.ngStrap',
    'leaflet-directive'
  ])

  .config(function($modalProvider) {
    angular.extend($modalProvider.defaults, {
      html: true
    });
  })

  .config([
    '$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('organization', {
          abstract: true,
          url: '/organization',
          template: '<ui-view/>'
        })
        .state('organization.list', {
            url: '/list',
            templateUrl: 'js/organization/templates/organization.html',
            controller: 'OrganizationCtrl'
        })
        .state('organization.add', {
            url: '/add',
            templateUrl: 'js/organization/templates/add-organization.html',
            controller: 'OrganizationAddCtrl'
        })
        .state('organization.view', {
            url: '/:id',
            templateUrl: 'js/organization/templates/view-organization.html',
            controller: 'OrganizationViewCtrl'
        })


        .state('map', {
            url: '/map',
            templateUrl: 'js/map/templates/map.html',
            controller: 'MapCtrl'
        })


      ;
      $urlRouterProvider.otherwise('/organization/list');
    }
  ])

;
