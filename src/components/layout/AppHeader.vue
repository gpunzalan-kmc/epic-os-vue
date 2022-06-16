<template>
  <header class="flex-shrink-0 border-b">
    <div class="flex items-center justify-between p-2">
      <slot></slot>

      <div class="relative flex items-center space-x-3">
        <button
          @click="isSearchBoxOpen = true"
          class="p-2 bg-gray-100 rounded-full md:hidden focus:outline-none focus:ring hover:bg-gray-200"
        >
          <svg
            class="w-6 h-6 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
        <el-popover placement="bottom" :width="400" trigger="click">
          <template #reference>
            <div class="relative" x-data="{ isOpen: false }">
              <!-- red dot -->
              <div
                class="absolute right-0 p-1 bg-red-400 rounded-full animate-ping"
              ></div>
              <div
                class="absolute right-0 p-1 bg-red-400 border rounded-full"
              ></div>
              <button
                @click="isOpen = !isOpen"
                class="p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring"
              >
                <svg
                  class="w-6 h-6 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>
            </div>
          </template>
          <div
            class=" grid gap-6 bg-white sm:gap-4 sm:p-4"
            style="max-height:350px; overflow:auto"
          >
            <LogReport :logData="logData" />
          </div>
          <p class="text-center pt-3">
            <el-link
              v-if="!disableViewMore"
              @click.prevent="viewMore"
              class="text-center"
              >View More...</el-link
            >
          </p>
        </el-popover>
      </div>
    </div>
  </header>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from "vue";
import LogReport from "@/components/logs/LogReport.vue";
import { LogResponse } from "@/api/response.types";
import { Telemetry } from "@/api/app.service";
export default defineComponent({
  components: {
    LogReport,
  },
  props: {
    isSidebarOpen: {
      type: Boolean,
      required: true,
    },
  },
  setup() {
    const params = reactive({
      page: "1",
      limit: "5",
    });
    const total = ref(0);
    function handleScroll() {
      alert("test");
    }
    const logData = ref([] as Array<LogResponse>);
    async function fetchLogs() {
      await Telemetry.getLogs(params).then((res) => {
        total.value = res.totalRecords;
        res.data.forEach((data) => {
          logData.value.push(data);
        });
      });
    }
    const disableViewMore = computed(() => {
      if (total.value == logData.value.length) return true;
      return false;
    });
    function viewMore() {
      const newPage = +params.page + 1;
      params.page = newPage.toString();
      fetchLogs();
    }
    onMounted(() => {
      fetchLogs();
    });
    return { logData, handleScroll, viewMore, disableViewMore };
  },
});
</script>
