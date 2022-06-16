<template>
  <div class="flex w-64 p-4 bg-default border-r">
    <ul class="flex flex-col w-full">
      <li class="my-px">
        <span class="flex font-medium text-sm text-gray-400 px-4 my-4 uppercase"
          >Management</span
        >
      </li>
      <AppSidebarItem title="Sites" name="Sites">
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          ></path>
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          ></path></svg
      ></AppSidebarItem>

      <!-- <AppSidebarItem title="Devices" name="Devices">
        <svg
          class="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M13 7H7v6h6V7z"></path>
          <path
            fill-rule="evenodd"
            d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z"
            clip-rule="evenodd"
          ></path></svg
      ></AppSidebarItem> -->
      <AppSidebarItem title="Users" name="Users">
        <svg
          class="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"
          ></path></svg
      ></AppSidebarItem>
      <li class="my-px">
        <a
          @click.prevent="logOut"
          :class="{
            'bg-primary text-white': isActive,
            'text-gray-300': !isActive,
          }"
          class="flex flex-row items-center h-12 px-4 rounded-lg  hover:bg-gray-700"
        >
          <span class="flex items-center justify-center text-lg ">
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              ></path>
            </svg>
          </span>
          <span class="ml-3 cursor-pointer">Log Out</span>
        </a>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import AppSidebarItem from "@/components/layout/AppSidebarItem.vue";
import { store } from "@/store";
import { AuthMutationTypes } from "@/store/modules/types/mutation-types";
export default defineComponent({
  components: {
    AppSidebarItem,
  },
  setup() {
    function logOut() {
      store.commit(AuthMutationTypes.PURGE_AUTH);
    }
    return { logOut };
  },
});
</script>
