// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

// convenience (ms)
export const ms = 1;
export const second = ms * 1000;
export const minute = second * 60;
export const hour = minute * 60;
export const day = hour * 24;
export const year = day * 365;
export const month = year / 12;

export const environment = {
   production: false
};
// TODO: the ability to choose what area of business to unlock
console.log(environment);
