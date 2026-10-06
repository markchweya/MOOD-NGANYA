/**
 * Lets tools without Vue support (ESLint's type checker) see `.vue` imports as
 * components. vue-tsc ignores this and reads the real component types.
 */
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent;
  export default component;
}
