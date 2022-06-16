<template>
  <div class="flex flex-row flex-shrink-0 p-3 bg-white rounded shadow m-3">
    <div class="overflow-hidden w-full">
      <div class="flex flex-col w-full h-full -mr-4">
        <div class=" p-4 tracking-wide border-b">
          <div id="header" class="flex items-center">
            <img alt="avatar" class="w-16" src="@/assets/img/building.png" />
            <div id="header-text" class="leading-5 ml-6 sm">
              <h4 id="name" class="text-xl font-semibold">
                {{ siteData.name }}
              </h4>
              <h5 id="job" class="font-semibold text-gray-600">
                {{ siteData.line1 }}
              </h5>
            </div>
          </div>
        </div>
        <div class="flex w-full py-4">
          <ul class="flex flex-col w-full">
            <li class="my-px">
              <a
                @click="changeRoute('floors')"
                class="flex flex-row items-center h-12 px-4 rounded-lg  hover:bg-primary hover:text-white"
                :class="{
                  'bg-primary text-white': view == 'floors',
                  'text-gray-500': view !== 'floors',
                }"
              >
                <svg
                  class="w-6 h-6 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="#000000"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path
                    d="M19 19h2v2h-2v-2zm0-2h2v-2h-2v2zM3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm0-4h2V3H3v2zm4 0h2V3H7v2zm8 16h2v-2h-2v2zm-4 0h2v-2h-2v2zm4 0h2v-2h-2v2zm-8 0h2v-2H7v2zm-4 0h2v-2H3v2zM21 8c0-2.76-2.24-5-5-5h-5v2h5c1.65 0 3 1.35 3 3v5h2V8z"
                  />
                </svg>

                <span class="ml-3">Floors</span>
                <span
                  class="flex items-center justify-center text-sm text-white font-semibold bg-primary h-6 px-2 rounded-full ml-auto"
                  >{{ siteData.floorCount }}</span
                >
              </a>
            </li>
            <li class="my-px">
              <a
                @click="changeRoute('devices')"
                class="flex flex-row items-center h-12 px-4 rounded-lg  hover:bg-primary hover:text-white"
                :class="{
                  'bg-primary text-white': view == 'devices',
                  'text-gray-500': view !== 'devices',
                }"
              >
                <svg
                  class="w-6 h-6 fill-current"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M13 7H7v6h6V7z"></path>
                  <path
                    fill-rule="evenodd"
                    d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class="ml-3">Devices</span>
                <span
                  class="flex items-center justify-center text-sm text-white font-semibold bg-primary h-6 px-2 rounded-full ml-auto"
                  >{{ siteData.hubCount + siteData.workPointCount }}</span
                >
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { useRoute } from "vue-router";
import { computed, defineComponent } from "vue";
import router from "@/router";
export default defineComponent({
  props: {
    siteData: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const route = useRoute();
    function changeRoute(route: string) {
      router.replace({ query: { view: route } });
    }
    const view = computed(() => route.query.view as string);

    return { view, changeRoute };
  },
});
</script>
