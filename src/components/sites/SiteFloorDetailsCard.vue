<template>
  <div
    class="w-full bg-white  p-2 rounded-md tracking-wide border hover:shadow-md"
  >
    <div id="header" class="flex items-center mb-4 pt-2">
      <div id="header-text" class="leading-5 ml-2 sm w-64">
        <h4
          id="name"
          class="text-xl font-semibold truncate cursor-pointer flex flex-row space-x-2"
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
          <span
            class="pl-1"
            @click="router.push({ path: `/monitoring/${floor.id}` })"
            >{{ floor.name }}</span
          >
        </h4>
      </div>
    </div>
    <div class="bg-subWall p-2">
      <table class="text-sm class ">
        <tbody>
          <tr>
            <td class="px-2 py-1 text-gray-500 font-semibold">
              <svg
                class="w-5 h-5"
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
            </td>
            <td class="px-2 font-bold">
              {{ floor.hubCount + floor.workpointCount }} Devices
            </td>
          </tr>
          <tr>
            <td class="px-2 py-1 text-gray-500 font-semibold">
              <svg
                class="w-5 h-5"
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
                ></path>
              </svg>
            </td>
            <td class="px-2">
              <p
                v-if="floor.filename"
                class="truncate w-64 font-bold cursor-pointer text-primary"
                @click="goToDeviceMapping(floor.id)"
              >
                Device Mapping
              </p>
              <p
                v-else
                class="truncate w-64 font-bold cursor-pointer text-primary"
              >
                No Floor plan
              </p>
            </td>
          </tr>
          <tr>
            <td class="px-2 py-1 text-gray-500 font-semibold">
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                ></path>
              </svg>
            </td>
            <td class="px-2">
              <p
                class="truncate w-64 font-bold cursor-pointer text-primary"
                @click="$emit('edit', floor)"
              >
                Edit
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script lang="ts">
import router from "@/router";
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    floor: {
      type: Object,
      required: true,
    },
  },
  setup() {
    function goToDeviceMapping(id: number) {
      router.push({ path: "/device-mapping/" + id });
    }
    return { goToDeviceMapping, router };
  },
});
</script>
