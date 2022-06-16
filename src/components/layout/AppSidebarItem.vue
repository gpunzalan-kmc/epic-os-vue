<template>
  <li class="my-px">
    <a
      @click.prevent="goTo"
      :class="{ 'bg-primary text-white': isActive, 'text-gray-300': !isActive }"
      class="flex flex-row items-center h-12 px-4 rounded-lg  hover:bg-gray-700"
    >
      <span class="flex items-center justify-center text-lg ">
        <slot></slot>
      </span>
      <span class="ml-3 cursor-pointer">{{ title }}</span>
    </a>
  </li>
</template>

<script lang="ts">
import { useRoute } from "vue-router";
import { computed, defineComponent } from "vue";
import router from "@/router";
export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const route = useRoute();
    const isActive = computed(() => route.meta.appSideBar == props.name);
    function goTo() {
      router.push({ name: props.name });
    }
    return { route, goTo, isActive };
  },
});
</script>
