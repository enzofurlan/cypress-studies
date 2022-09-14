const { defineConfig } = require('cypress');

module.exports = defineConfig({
    e2e: {
        baseUrl: 'http://localhost:3000/',
        video: false,
        videoUploadOnPasses: false,
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },
});
