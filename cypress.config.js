import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "",
  screenshotsFolder: "assets/screenshots",
  videosFolder: "assets/videos",
  chromeWebSecurity: false,
  viewportWidth: 1360,
  viewportHeight: 768,
  defaultCommandTimeout: 30000,
  videoCompression: false,
  numTestsKeptInMemory: 15,
  videoUploadOnPasses: false,
  experimentalMemoryManagement: true,

  retries: {
    runMode: 3,
  },

  e2e: {
    baseUrl: "http://localhost:8080/admin",
    slowTestThreshold: 30000,
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.ts",
    viewportHeight: 1000,
    viewportWidth: 1280,
    experimentalStudio: true,
    experimentalSkipDomainInjection:['*']
  },
});
