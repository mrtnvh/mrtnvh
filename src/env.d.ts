/// <reference path="../.astro/types.d.ts" />
// custom.d.ts
declare module '*.csv' {
  const data: any;
  export default data;
}
