const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // The rails test server needs to run on port 3333 for Cypress to use it.
    // The rails test server can be started with an npm script:
    //
    //     npm run cypress:rails
    //
    baseUrl: 'http://localhost:3333',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
