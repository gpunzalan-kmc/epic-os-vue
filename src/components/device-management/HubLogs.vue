<template>
  <el-drawer
    :title="hub.name"
    v-model="open"
    direction="rtl"
    :size="width"
    placeholder="background: #ffff"
  >
    <div class="h-full flex flex-col bg-white shadow-xl ">
      <div class="flex justify-between px-5">
        <p class="my-auto text-gray-600">Logs</p>
        <el-pagination
          background
          layout="prev, next"
          :total="hubLogs.totalCount"
          :page-size="20"
          @current-change="changePage"
        >
        </el-pagination>
      </div>

      <div class="relative flex-1">
        <div class="absolute inset-0 ">
          <div
            class="h-full border-gray-200 overflow-y-scroll"
            aria-hidden="true"
          >
            <ul role="list" class="divide-y divide-gray-200">
              <li v-for="(log, index) in hubLogs.items" :key="index">
                <a href="#" class="block hover:bg-gray-50">
                  <div class="px-4 py-4 sm:px-6">
                    <div class="flex items-center justify-between">
                      <p class="text-sm font-medium text-gray-800 truncate">
                        {{
                          format(
                            new Date(log.dateCreated),
                            "MMM dd, yyyy hh:mm a"
                          )
                        }}
                      </p>
                    </div>
                    <div class="mt-2 sm:flex sm:justify-between">
                      <div class="flex">
                        <ExclamationCircleIcon
                          class="flex-shrink-0 mr-1.5 h-5 w-5 text-red-400"
                          aria-hidden="true"
                        />
                        <p
                          class=" items-center text-sm text-gray-500 break-all"
                        >
                          {{ log.message }}
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </el-drawer>
</template>
<script lang="ts">
import { Hubs } from "@/api/app.service";
import { HubLogParameters } from "@/api/query.types";
import {
  ERPPaginationResponse,
  HubLogResponse,
  HubResponse,
} from "@/api/response.types";
import format from "date-fns/esm/format";
import {
  defineComponent,
  onMounted,
  PropType,
  reactive,
  ref,
  watch,
} from "vue";
import { ExclamationCircleIcon } from "@heroicons/vue/solid";
export default defineComponent({
  components: {
    ExclamationCircleIcon,
  },
  props: {
    hub: {
      type: Object as PropType<HubResponse>,
      required: true,
    },
  },
  setup(props) {
    const open = ref(false);
    function mutateOpen(event: boolean) {
      open.value = event;
    }
    const width = ref("500px");
    function handleResize() {
      const h = window.innerWidth;
      if (h < 500) {
        width.value = "100%";
      }
    }
    const hubLogParameters = reactive({
      dateStart: null,
      dateEnd: null,
      hubId: 0,
      pageNumber: 1,
      pageSize: 20,
      sortBy: "DateCreated",
      isAscending: false,
    } as HubLogParameters);

    const hubLogs = ref({
      items: [],
      pageIndex: 0,
      totalPages: 0,
      totalCount: 0,
      hasPreviousPage: false,
      hasNextPage: false,
    } as ERPPaginationResponse<HubLogResponse>);

    async function fetchHubLogs() {
      hubLogParameters.hubId = props.hub.id;

      await Hubs.getLog(hubLogParameters).then((res) => {
        hubLogs.value = res;
      });
    }
    watch(
      () => props.hub.id,
      () => {
        fetchHubLogs();
      }
    );
    onMounted(() => {
      window.addEventListener("resize", handleResize);
      const h = window.innerWidth;
      if (h < 500) {
        width.value = "100%";
      }
    });
    function changePage(page: number) {
      hubLogParameters.pageNumber = page;
      fetchHubLogs();
    }
    return {
      open,
      mutateOpen,
      width,
      hubLogs,
      format,
      changePage,
    };
  },
});
</script>
