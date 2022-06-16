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
          <span class="pl-1">{{ hub.name }}</span>
        </h4>
      </div>
    </div>
    <div class="bg-subWall p-2">
      <table class="text-sm class ">
        <tbody>
          <tr>
            <td class="px-2 py-1 text-gray-500 font-semibold">
              <svg
                class="w-5 h-5 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#000000"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path
                  d="M12 2l-5.5 9h11L12 2zm0 3.84L13.93 9h-3.87L12 5.84zM17.5 13c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 7c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM3 21.5h8v-8H3v8zm2-6h4v4H5v-4z"
                />
              </svg>
            </td>
            <td class="px-2">
              <p class="truncate w-64 font-bold cursor-pointer text-primary">
                Hub
              </p>
            </td>
          </tr>
          <tr>
            <td class="px-2 py-1 text-gray-500 font-semibold">
              <svg
                class="w-5 h-5 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#000000"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-.61.08-1.21.21-1.78L8.99 15v1c0 1.1.9 2 2 2v1.93C7.06 19.43 4 16.07 4 12zm13.89 5.4c-.26-.81-1-1.4-1.9-1.4h-1v-3c0-.55-.45-1-1-1h-6v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41C17.92 5.77 20 8.65 20 12c0 2.08-.81 3.98-2.11 5.4z"
                />
              </svg>
            </td>
            <td class="px-2">
              <p class="truncate w-64 font-bold cursor-pointer">
                {{ hub.iPaddress }}
              </p>
            </td>
          </tr>
          <tr>
            <td class="px-2 py-1 text-gray-500 font-semibold">
              <svg
                class="w-5 h-5 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#000000"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path
                  d="M19 15v4H5v-4h14m1-2H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1zM7 18.5c-.82 0-1.5-.67-1.5-1.5s.68-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM19 5v4H5V5h14m1-2H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1zM7 8.5c-.82 0-1.5-.67-1.5-1.5S6.18 5.5 7 5.5s1.5.68 1.5 1.5S7.83 8.5 7 8.5z"
                />
              </svg>
            </td>
            <td class="px-2">
              <p class="truncate w-64 font-bold cursor-pointer">
                {{ hub.mac }}
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
                @click="$emit('edit', hub)"
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
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    hub: {
      type: Object,
      required: true,
    },
  },
});
</script>
