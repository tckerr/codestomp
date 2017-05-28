// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
   production: false,
   localStorageNamespace: 'codestomp',
   gameSettings: {
      defaults: {
         companyName: "T-Corp",
         startingFunds: 0,
         codePerClick: 50,
         manualTestsPerClick: 50,
         deployThreshold: 500,
         deployChunk: 10,
         bugsPercentage: .05,
         customersToDeployedCodeGrowthRate: .0001,
         wordOfMouthGrowthRate: .0001,
         customersToProfitGrowthRate: .001,
      },
      unlockThresholds: {
         deploymentsWhenTotalCodeGte: 700,
         manualTestingWhenTotalCodeGte: 300
      },
      ticker: {
         defaultIntervalMs: 200,
         intervalIncrementDelta: 100,
         minimumInterval: 100,
         timeUnit: "hours"
      },
      askBeforeClear: false,
      startTime: "2050-01-01 00:00"
   }
};
