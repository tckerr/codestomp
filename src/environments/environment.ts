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
      ticker: {
         defaultIntervalMs: tickIntervalMs,
         speedDelta: .001,
         ticksPerHour: ticksPerHour,
         tickToMsMap: msPerTick,
         msInAnHour: perHour,
         speedMultiplier: speedMultiplier,
         intervalIncrementDelta: 50,
         minimumInterval: 20 // this is a performance consideration, since we have at least 2ms overhead
      }
   }
};
// TODO: the ability to choose what area of business to unlock
console.log(environment);
