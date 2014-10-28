var mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost/survey-mgmt';

module.exports = {
  mongodb: {
    defaultForType: "mongodb",
    connector: "loopback-connector-mongodb",
    url: mongoUri
  }
};
