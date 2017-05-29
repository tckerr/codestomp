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
export const perHour = msInAnHour;
export const perMinute = perHour / 60;
export const perDay = perHour * 24;
export const perYear = perDay * 365;
export const perMonth = perYear / 12;

export const environment = {
   production: false,
   gameSettings: {
      talentHiringCosts:{
         associate: 1,
         junior: 2,
         senior: 3,
      },
      businessUnits: {
         development: {
            staff: {
               special: {
                  devopsEngineer: "Automates deployments on a regular schedule"
               },
               baseSalaryPerMs: {
                  associateDeveloper: 50000 / perYear,
                  juniorDeveloper: 85000 / perYear,
                  seniorDeveloper: 125000 / perYear,
                  associateQaAnalyst: 40000 / perYear,
                  juniorQaAnalyst: 55000 / perYear,
                  seniorQaAnalyst: 70000 / perYear,
                  qaAutomationEngineer: 100000 / perYear,
                  devopsEngineer: 100000 / perYear,
               },
               codePerMs: {
                  associateDeveloper: 15 / perHour,
                  juniorDeveloper: 45 / perHour,
                  seniorDeveloper: 90 / perHour,
                  associateQaAnalyst: 0,
                  juniorQaAnalyst: 0,
                  seniorQaAnalyst: 0,
                  qaAutomationEngineer: 0,
                  devopsEngineer: 3/perHour
               },
               testingPerMs: {
                  associateDeveloper: 0,
                  juniorDeveloper: 0,
                  seniorDeveloper: 0,
                  associateQaAnalyst: 10 / perHour,
                  juniorQaAnalyst: 25 / perHour,
                  seniorQaAnalyst: 45 / perHour,
                  qaAutomationEngineer: 70 / perHour,
                  devopsEngineer: 0
               }
            }
         }
      },
      defaults: {
         companyName: 'T-Corp',
         startingFunds: 0,
         codePerClick: 100,
         manualTestsPerClick: 100,
         deployThreshold: 60,
         bugsPercentage: .05,
         quitChanceOnLackOfPayment: .6 / perHour,

         // devops growth rates
         deployChunkRate: 67 / perHour,
         deployAmountPerMs: 30 / perHour,

         // job markets
         talentGenerationPerMs: 3 / perDay,
         talentGenerationCap: 50, // TODO: make a growth

         // customer growth in ms
         customersToDeployedCodeGrowthRate: .001 / perHour,
         customersCapAsPercentOfCode: .5,
         customersToDeployedCodeGrowthShare: .8,
         wordOfMouthGrowthRate: .000005 / perHour,
         wordOfMouthGrowthShare: .2,

         customersToProfitGrowthRate: 15 / perMonth,
      },
      unlockThresholds: {
         deploymentsWhenTestedCodeGte: 20,
         manualTestingWhenTotalCodeGte: 20,
         unlockDevHiringWhenFundsGte: 20
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
      startTime: '2050-01-01 00:00'
   }
};

console.log(environment)
