/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module '*.svg' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent;
  export default component;
}
declare module 'vue-drag-resize';
declare module "@headlessui/vue";
declare module "@heroicons/vue";
declare module "@heroicons/vue/solid";
declare module "@heroicons/vue/outline";
declare module "heatmap.js";
declare module "d3";