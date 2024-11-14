const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "rqpjyu",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl:'https://advantageonlineshopping.com/'
  },
  viewportWidth: 1366,
  viewportHeight: 768
});
