const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://dptinfo.iutmetz.univ-lorraine.fr/applis/stages/portail.php',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
