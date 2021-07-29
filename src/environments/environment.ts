// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api/',
  facebookAppId: '782456515797813',//mine facebook
  facebookAppSecret: 'f2732a5457b2f669be8519d34266b318',
  googleClientId: '1054771871420-idtlk02ss5vr4cpfoi4saa8t18esvn8f.apps.googleusercontent.com',//from other
  app: {
    name: 'CRM',
  },

  company: {
    legalName: 'CRM Limited',
  },
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
