const { defineConfig } = require("cypress");

const cucumber = require('cypress-cucumber-preprocessor').default

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://the-internet.herokuapp.com',

    env: {
      user_id: 'admin',
      pwd: 'admin1'
    },

  //"env": {"cypress_xhr": false,
  //        "suppressLogs": true}
  
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('file:preprocessor', cucumber())
    },
    specPattern: "cypress/e2e/*.feature",
  },
});
