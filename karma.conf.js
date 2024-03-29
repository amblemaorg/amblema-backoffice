// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

const process = require('process');
//process.env.CHROME_BIN = require('puppeteer').executablePath();


module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "@angular-devkit/build-angular"],
    files: [
      "./node_modules/jquery/dist/jquery.min.js",
      "./node_modules/bootstrap/dist/js/bootstrap.min.js",
    ],
    plugins: [
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
      require("karma-jasmine-html-reporter"),
      require("karma-coverage-istanbul-reporter"),
      require("@angular-devkit/build-angular/plugins/karma"),
      require("karma-spec-reporter"),
    ],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },
    mime: {
      "text/x-typescript": ["ts", "tsx"],
    },
    coverageIstanbulReporter: {
      dir: require("path").join(__dirname, "./coverage/Amblema-BackOffice"),
      reports: ["html", "lcovonly", "text-summary"],
      fixWebpackSourcePaths: true,
    },
    //reporters: ["kjhtml", "spec"],
    reporters: ["spec"],
    
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ["ChromeHeadless"],
    customLaunchers: {
      ChromeHeadless: {
        base: "Chrome",
        flags: [
          "--headless",
          "--disable-gpu",
          "--no-sandbox",
          "--remote-debugging-port=9222",
        ],
      },
    },
    singleRun: false,
    restartOnFileChange: true,
  });
};
