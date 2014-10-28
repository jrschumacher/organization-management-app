module.exports = function(Organization) {

  var lookupGeo = require('function-rate-limit')(5, 1000, function() {
    var geoService = Organization.app.dataSources.geo;
    geoService.geocode.apply(geoService, arguments);
  });

  Organization.beforeSave = function(next, org) {
    if (org.geo) return next();
    // geo code the address
    lookupGeo(org.street1, org.street2, org.city, org.state,
      org.postalCode, org.country,
      function(err, result) {
        console.log(result);
        if (result && result[0]) {
          org.geo = result[0].lng + ',' + result[0].lat;
          next();
        } else {
          next(new Error('could not find location'));
        }
      });
  };

};
