<template>
  <div class="flex justify-end w-full pt-3">
    <el-pagination
      background
      @current-change="handlePageChange"
      :currentPage="logs.pageIndex"
      :page-size="parameter.pageSize"
      layout=" prev, next"
      :total="logs.totalCount"
    >
    </el-pagination>
  </div>
  <ul role="list" class="divide-y divide-gray-200 h-full">
    <li v-for="(log, index) in logs.items" :key="index">
      <a href="#" class="block hover:bg-gray-50">
        <div class="px-4 py-4 sm:px-6">
          <div class="flex items-center justify-between">
            <p class="text-sm font-medium text-gray-800 truncate">
              {{ format(new Date(log.dateCreated), "MMM dd, yyyy hh:mm a") }}
            </p>
            <div class="ml-2 flex-shrink-0 flex">
              <div class="sm:flex">
                <p class="flex items-center text-sm text-gray-500">
                  <svg
                    v-if="log.battery == false"
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 0 24 24"
                    width="24px"
                    class="flex-shrink-0 mr-1.5 h-5 w-5 text-green-300  fill-current"
                  >
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path
                      d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"
                    />
                  </svg>
                  <svg
                    v-if="log.battery == true"
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 0 24 24"
                    width="24px"
                    class="flex-shrink-0 mr-1.5 h-5 w-5 text-yellow-300  fill-current"
                  >
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path
                      d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"
                    />
                  </svg>
                  <span
                    v-if="log.battery == false"
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize bg-green-100 text-green-800"
                    >Normal</span
                  >
                  <span
                    v-if="log.battery == true"
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize bg-yellow-100 text-yellow-800"
                    >Low Power</span
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
      </a>
    </li>
  </ul>
</template>
<script lang="ts">
import { Telemetry } from "@/api/app.service";
import { ERPPaginationResponse, TelemetryResponse } from "@/api/response.types";
import format from "date-fns/esm/format";
import { defineComponent, onMounted, PropType, reactive, ref } from "vue";
export default defineComponent({
  props: {
    id: {
      type: Number as PropType<number>,
      required: true,
    },
  },
  setup(props) {
    const parameter = reactive({
      pageNumber: 1,
      pageSize: 20,
    });

    const logs = ref({
      items: [],
      pageIndex: 0,
      totalPages: 0,
      totalCount: 0,
      hasPreviousPage: false,
      hasNextPage: false,
    } as ERPPaginationResponse<TelemetryResponse>);

    async function fetchLogs() {
      await Telemetry.getLogsByWorkpoint(parameter, props.id).then((res) => {
        logs.value = res;
      });
    }
    function handlePageChange(page: number) {
      parameter.pageNumber = page;
      fetchLogs();
    }
    onMounted(() => {
      fetchLogs();
    });
    return { logs, format, parameter, handlePageChange };
  },
});
</script>
