// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  api: 'https://amblema.org/api/', // <--- QA
  // api: 'http://localhost:10506/',
  // api: 'http://186.88.121.11:10505/',
  // -- Web page Amblema --
  web: 'https://amblema.org/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
