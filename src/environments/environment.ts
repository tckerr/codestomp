// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

// convenience (ms)
export const perSecond = 1000;
export const perMinute = perSecond * 60;
export const perHour = perMinute * 60;
export const perDay = perHour * 24;
export const perYear = perDay * 365;
export const perMonth = perYear / 12;

// this is the fundamental time constant
// which essentially controls game tick > date speed
let speedMultiplier = 1/perSecond;

// "frame rate" of the game
let tickIntervalMs = 20;

let msPerTick = perHour * speedMultiplier * tickIntervalMs;
let ticksPerHour = perHour / msPerTick;

export const environment = {
   production: false,
   gameSettings: {
      showWelcomeModal: false,
      talentHiringCosts: {
         intern: 1,
         associate: 1,
         junior: 2,
         senior: 3,
      },
      businessUnits: {
         development: {
            staff: {
               special: {
                  devopsEngineer: 'Automates deployments on a regular schedule',
                  developmentIntern: 'Fixes bugs... basically for free',
               },
               baseSalaryPerMs: {
                  developmentIntern: 10000 / perYear,
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
                  developmentIntern: 1 / perHour,
                  associateDeveloper: 15 / perHour,
                  juniorDeveloper: 45 / perHour,
                  seniorDeveloper: 90 / perHour,
                  associateQaAnalyst: 0,
                  juniorQaAnalyst: 0,
                  seniorQaAnalyst: 0,
                  qaAutomationEngineer: 0,
                  devopsEngineer: 0
               },
               testingPerMs: {
                  developmentIntern: 0,
                  associateDeveloper: 0,
                  juniorDeveloper: 0,
                  seniorDeveloper: 0,
                  associateQaAnalyst: 10 / perHour,
                  juniorQaAnalyst: 25 / perHour,
                  seniorQaAnalyst: 45 / perHour,
                  qaAutomationEngineer: 70 / perHour,
                  devopsEngineer: 0
               },
               bugFixesPerMs: {
                  developmentIntern: 3 / perHour,
                  associateDeveloper: 0,
                  juniorDeveloper: 0,
                  seniorDeveloper: 0,
                  associateQaAnalyst: 0,
                  juniorQaAnalyst: 0,
                  seniorQaAnalyst: 0,
                  qaAutomationEngineer: 0,
                  devopsEngineer: 0
               }
            }
         }
      },
      defaults: {
         companyName: 'T-Corp',
         startingFunds: 0,
         codePerClick: 500, // balanced for ~3
         manualTestsPerClick: 500,
         deployThreshold: 200,
         bugsPercentage: .05,
         testsFailurePercentage: .15,
         quitChanceOnLackOfPayment: .6 / perHour,

         // devops growth rates
         deployChunkRate: 67 / perHour,
         deployAmountPerMs: 30 / perHour,

         // job markets
         talentGenerationPerMs: 3 / perDay,
         talentGenerationCap: 50, // TODO: make a growth

         // customer growth in ms
         customersToDeployedCodeGrowthRate: .005 / perHour,
         customersCapAsPercentOfCode: .5,
         customersToDeployedCodeGrowthShare: .8,
         wordOfMouthGrowthRate: .000005 / perHour,
         wordOfMouthGrowthShare: .2,

         customersToProfitGrowthRate: 15 / perMonth,
      },
      ticker: {
         defaultIntervalMs: tickIntervalMs,
         speedDelta: .001,
         ticksPerHour: ticksPerHour,
         tickToMsMap: msPerTick,
         msInAnHour: perHour,
         speedMultiplier: speedMultiplier,
         intervalIncrementDelta: 50,
         minimumInterval: 20 // this is a performance consideration, since we have at least 2ms overhead
      },
      askBeforeClear: false,
      startTime: '2050-01-01 00:00'
   }
};
// TODO: the ability to choose what area of business to unlock
console.log(environment);
