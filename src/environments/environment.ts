// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
   production: false,
   localStorageNamespace: 'codestomp',
   gameSettings: {
      defaults: {
         companyName: "T-Corp"
      },
      ticker: {
         intervalMs: 1000,
         timeUnit: "hour"
      },
      startTime: "2050-01-01 00:00"
   }
};
