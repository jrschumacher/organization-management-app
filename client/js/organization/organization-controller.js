/**
 * Created by ryan on 10/16/14.
 */

'use strict';

angular
  .module('app')
  .controller('OrganizationCtrl', [
    '$scope', '$state', '$modal', '$popover', 'Organization',
    function($scope, $state, $modal, $popover, Organization) {

      $scope.OrgTypes = [
        { 'tag': 'healthcare', 'name': 'healthcare' },
        { 'tag': 'public_health', 'name': 'public health' },
        { 'tag': 'social_service', 'name': 'social service' },
        { 'tag': 'educational', 'name': 'educational' },
        { 'tag': 'religious', 'name': 'religious' },
        { 'tag': 'other', 'name': 'other', 'detail': true}
      ];

      $scope.OrgServices = [
        { 'tag': 'primary_care', 'name': 'primary care' },
        { 'tag': 'medical_speciality', 'name': 'medical speciality services' },
        { 'tag': 'surgery', 'name': 'surgery' },
        { 'tag': 'medication_access', 'name': 'medication access' },
        { 'tag': 'counseling_mental', 'name': 'counseling and/or mental health' },
        { 'tag': 'addiction_recovery', 'name': 'addiction recovery' },
        { 'tag': 'spiritual_care', 'name': 'spiritual care' },
        { 'tag': 'complementary_alternative', 'name': 'complementary or alternaive medicine or healing', 'detail': true },
        { 'tag': 'health_promotion', 'name': 'health promotion' },
        { 'tag': 'infectious_disease', 'name': 'infectious disease control' },
        { 'tag': 'violence_prevention', 'name': 'violence prevention' },
        { 'tag': 'domestic_violence', 'name': 'domestic violence survivor services' },
        { 'tag': 'sexual_reproductive', 'name': 'sexual and reproductive health' },
        { 'tag': 'insurance_coverage', 'name': 'insurance_coverage' },
        { 'tag': 'health_disparities', 'name': 'health disparities' },
        { 'tag': 'healthcare_administration', 'name': 'healthcare administration' },
        { 'tag': 'healthcare_policy', 'name': 'healthcare policy' },
        { 'tag': 'healthcare_pro_edu', 'name': 'healthcare professional education' },
        { 'tag': 'medical_interpretation', 'name': 'medical interpretation' },
        { 'tag': 'refugee_immigrant', 'name': 'refugee immigrant health' },
        { 'tag': 'cultural_competence', 'name': 'cultural competence training' },
        { 'tag': 'other', 'name': 'other', 'detail': true}
      ];

      $scope.organizations = [];
      function getOrganizations() {
        Organization
          .find()
          .$promise
          .then(function(results) {
              $scope.organizations = results;
          });
      }
      getOrganizations();

      $scope.addOrganization = function() {
        var scope = $scope.$new();

        scope.services = [];
        angular.copy($scope.OrgServices, scope.services);

        scope.modalStates = [
          'name',
          'address',
          'contact',
          'survey',
          'partners'
        ];
        scope.modalState = 0;
        scope.nextState = function() {
          scope.modalState++;
        };
        scope.prevState = function() {
          scope.modalState--;
        };

        scope.organization = {};

        scope.organization.partners = [
          {},
          {},
          {},
          {},
          {},
          {}
        ];

        scope.organization.services = [];

        var modal = $modal({
          template: 'js/organization/templates/add-organization-modal.html',
          scope: scope
        });

        scope.save = function() {

          angular.forEach(scope.services, function(service) {
            if(service.selected) scope.organization.services.push(service.tag);
          });

          Organization
            .create(scope.organization)
            .$promise
            .then(function(organization) {
              getOrganizations();
              modal.hide();
            });

        };
      };

      $scope.removeOrganization = function(item) {
        Organization
          .deleteById(item)
          .$promise
          .then(function() {
              getOrganizations();
          });
      };
    }
  ])

  .controller('OrganizationViewCtrl', [
    '$scope', '$state', '$stateParams', 'Organization',
    function($scope, $state, $stateParams, Organization) {
      angular.extend($scope, {
        center: {
          lat: 42.36,
          lng: -71.06,
          zoom: 14
        },
        markers: {},
        layers: {
          baselayers: {
            googleRoadmap: {
              name: 'Google Streets',
              layerType: 'ROADMAP',
              type: 'google'
            }
          }
        },
        controls: {
        }
      });
          console.log($scope.center);

      Organization
        .findById({id: $stateParams.id})
        .$promise
        .then(function(result) {
          $scope.organization = result;

          $scope.center.lat = result.geo.lat;
          $scope.center.lng = result.geo.lng;

          $scope.markers[result.id] = {
            lat: result.geo.lat,
            lng: result.geo.lng,
            message: result.name,
            icon: {
               type: 'makiMarker',
              icon: 'hospital',
              color: '#f00',
              size: 's'
            }
          };
        });
    }
  ])


;
