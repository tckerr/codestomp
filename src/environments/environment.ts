// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

// this is the fundamental time constant
// which essentially controls game tick > date speed
let speedMultiplier = .001;
// "frame rate" of the game
let tickInterval = 20;//*50;

//
let msInAMinute = 60000;
let msInAnHour = msInAMinute * 60;
let msPerTick = msInAnHour * speedMultiplier * tickInterval;
let ticksPerHour = msInAnHour / msPerTick;

// convenience
let perHour = msInAnHour;
let perDay = perHour * 24;
let perYear = perDay * 365;
let perMonth = perYear / 12;

export const environment = {
   production: false,
   gameSettings: {
      defaults: {
         companyName: "T-Corp",
         startingFunds: 0,
         codePerClick: 100,
         manualTestsPerClick: 100,
         deployThreshold: 60,
         bugsPercentage: .05,

         // devops growth rates
         deployChunkRate: 50/perHour,

         // customer growth in ms
         customersToDeployedCodeGrowthRate: .001/perHour,
         customersCapAsPercentOfCode: .5,
         customersToDeployedCodeGrowthShare: .8,
         wordOfMouthGrowthRate: .000005/perHour,
         wordOfMouthGrowthShare: .2,

         customersToProfitGrowthRate: 5/perMonth,
      },
      unlockThresholds: {
         deploymentsWhenTestedCodeGte: 20,
         manualTestingWhenTotalCodeGte: 20
      },
      ticker: {
         defaultIntervalMs: tickInterval,
         speedDelta: .001,
         ticksPerHour: ticksPerHour,
         tickToMsMap: msPerTick,
         msInAnHour: msInAnHour,
         speedMultiplier: speedMultiplier,
         intervalIncrementDelta: 50,
         minimumInterval: 50 // this is a performance consideration, since we have at least 2ms overhead
      },
      askBeforeClear: false,
      startTime: "2050-01-01 00:00"
   }
};

console.log(environment)
