<template>
  <div class="flex items-center space-x-3">
    <img
      src="https://cdn.kmc.solutions/project-statics/kmc-epic-os-logo.png"
      width="180"
    />
    <button
      @click="$emit('update:isSidebarOpen', !isSidebarOpen)"
      class="p-2 rounded-md focus:outline-none focus:ring sm:hidden"
    >
      <svg
        class="w-4 h-4 text-gray-600"
        :class="{
          'transform transition-transform -rotate-180': isSidebarOpen,
        }"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 5l7 7-7 7M5 5l7 7-7 7"
        />
      </svg>
    </button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    isSidebarOpen: {
      type: Boolean,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>
