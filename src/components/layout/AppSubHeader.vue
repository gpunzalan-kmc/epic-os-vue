<template>
  <header class="bg-gray-800">
    <div
      class=" flex flex-col md:flex-row space-y-2 md:space-y-0 justify-between py-4 px-4 sm:px-6 lg:px-8 border-gray-700 border-t"
    >
      <div class="flex space-x-2">
        <slot name="icon"></slot>
      </div>
      <slot name="button"></slot>
    </div>
  </header>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    return {};
  },
});
</script>
