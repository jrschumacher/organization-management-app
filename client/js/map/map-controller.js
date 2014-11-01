/**
 *
 */

'use strict';

angular
  .module('app')
  .controller('MapCtrl', [
    '$scope', '$state', 'leafletData', 'Organization',
    function($scope, $state, leafletData, Organization) {

      var drawnItems = new L.FeatureGroup();
      var options = { edit: { featureGroup: drawnItems } };
      var drawControl = new L.Control.Draw(options);

      angular.extend($scope, {
        center: {
          lat: 42.36,
          lng: -71.06,
          zoom: 10
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
          custom: [drawControl]
        }
      });

      leafletData.getMap().then(function(map) {
        map.addLayer(drawnItems);

        map.on('draw:created', function (e) {
          var layer = e.layer;
          drawnItems.addLayer(layer);
          console.log(JSON.stringify(layer.toGeoJSON()));
        });
      });

      Organization
          .find()
          .$promise
          .then(function(results) {
              $scope.organizations = results;

              angular.forEach(results, function(org, i) {

                if(org.geo && org.geo.lat && org.geo.lng) {
                  $scope.markers['m' + i] = {
                    lat: org.geo.lat,
                    lng: org.geo.lng,
                    title: org.name,
                    message: '<div class="clearfix">' +
                        '<a class="pull-right" href="#/organization/' + org.id + '">view</a>' +
                        '<strong>' + org.name + '</strong>' +
                        '<br> ' + org.street1 +
                        (org.street2 ? '<br> ' + org.street2 : '') +
                        '<br> ' + org.city +
                        ', ' + org.state +
                        ' ' + org.postalCode +
                      '</div>',
                    popup: {
                      closeButton: false
                    },
                    icon: {
                       type: 'makiMarker',
                      icon: 'hospital',
                      color: '#f00',
                      size: 's'
                    }
                  };
                }
              });
          });
    }
  ])

;
