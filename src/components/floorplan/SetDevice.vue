<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <TransitionRoot as="template" :show="open">
    <Dialog
      as="div"
      class="fixed inset-0 overflow-hidden"
      @close="open = false"
    >
      <div class="absolute inset-0 overflow-hidden">
        <DialogOverlay class="absolute inset-0" />

        <div class="fixed inset-y-0 right-0 pl-10 max-w-full flex">
          <TransitionChild
            as="template"
            enter="transform transition ease-in-out duration-500 sm:duration-700"
            enter-from="translate-x-full"
            enter-to="translate-x-0"
            leave="transform transition ease-in-out duration-500 sm:duration-700"
            leave-from="translate-x-0"
            leave-to="translate-x-full"
          >
            <div class="w-screen max-w-md">
              <div
                class="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll"
              >
                <div class="px-4 sm:px-6">
                  <div class="flex items-start justify-between">
                    <DialogTitle class="text-lg font-medium text-gray-900">
                      Add Device
                    </DialogTitle>
                    <div class="ml-3 h-7 flex items-center">
                      <button
                        type="button"
                        class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        @click="open = false"
                      >
                        <span class="sr-only">Close panel</span>
                        <XIcon class="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
                <div class="mt-6 relative flex-1 px-4 sm:px-6">
                  <!-- Replace with your content -->
                  <div class="absolute inset-0 px-4 sm:px-6">
                    <div
                      class="h-full  space-y-5 flex flex-col"
                      aria-hidden="true"
                    >
                      <div class="flex flex-col min-w-0 flex-1 overflow-hidden">
                        <div class="flex-1 relative z-0 flex overflow-hidden">
                          <aside
                            class="hidden xl:order-first xl:flex xl:flex-col flex-shrink-0 w-96 "
                          >
                            <div class="pb-2 flex space-x-5 justify-between">
                              <p
                                class="mt-1 text-sm font-semibold text-gray-600 my-auto"
                              >
                                Workpoints
                              </p>
                              <el-input
                                style="width:210px"
                                v-model="workpointSearch"
                                size="small"
                                placeholder="Search"
                              ></el-input>
                            </div>
                            <!-- Directory list -->
                            <nav
                              class="flex-1 min-h-0 overflow-y-auto border rounded-md"
                              aria-label="Directory"
                            >
                              <div
                                class="relative"
                                v-if="workPoints.length > 0"
                              >
                                <ul
                                  role="list"
                                  class="relative z-0 divide-y divide-gray-200 "
                                >
                                  <li
                                    v-for="position in workPoints.filter((w) =>
                                      w.name
                                        .toLowerCase()
                                        .includes(workpointSearch.toLowerCase())
                                    )"
                                    :key="position.id"
                                  >
                                    <a href="#" class="block hover:bg-gray-50">
                                      <div class="px-4 py-4 sm:px-6">
                                        <div
                                          class="flex items-center justify-between"
                                        >
                                          <p
                                            class="text-sm font-medium text-primary truncate"
                                          >
                                            {{ position.name }}
                                          </p>
                                          <div class="ml-2 flex-shrink-0 flex">
                                            <el-button
                                              @click.prevent="
                                                addWorkpoint(position)
                                              "
                                              size="small"
                                              type="primary"
                                              >Add</el-button
                                            >
                                          </div>
                                        </div>
                                        <div
                                          class="mt-2 sm:flex sm:justify-between"
                                        >
                                          <div class="sm:flex">
                                            <p
                                              class="flex items-center text-sm text-gray-500"
                                            >
                                              {{ position.modelValue }} -
                                              {{ position.mac }}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </a>
                                  </li>
                                </ul>
                              </div>
                              <div
                                class="text-center  h-full flex  rounded-md"
                                v-else
                              >
                                <div class="my-auto w-full">
                                  <svg
                                    class="mx-auto h-12 w-12 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                  >
                                    <path
                                      vector-effect="non-scaling-stroke"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                                    />
                                  </svg>
                                  <h3
                                    class="mt-2 text-sm font-medium text-gray-900"
                                  >
                                    No inactive devices
                                  </h3>
                                  <p class="mt-1 text-sm text-gray-500">
                                    Get started by creating a new device.
                                  </p>
                                </div>
                              </div>
                            </nav>
                          </aside>
                        </div>
                      </div>
                      <div class="flex flex-col min-w-0 flex-1 overflow-hidden">
                        <div class="flex-1 relative z-0 flex overflow-hidden">
                          <aside
                            class="hidden xl:order-first xl:flex xl:flex-col flex-shrink-0 w-96 "
                          >
                            <div class="pb-2 flex space-x-2 justify-between">
                              <p
                                class="mt-1 text-sm font-semibold text-gray-600 my-auto"
                              >
                                Hubs
                              </p>
                              <el-input
                                v-model="hubSearch"
                                style="width:210px"
                                size="small"
                                placeholder="Search"
                              ></el-input>
                            </div>
                            <!-- Directory list -->
                            <nav
                              class="flex-1 min-h-0 overflow-y-auto border rounded-md"
                              aria-label="Directory"
                            >
                              <div class="relative" v-if="hubs.length > 0">
                                <ul
                                  role="list"
                                  class="relative z-0 divide-y divide-gray-200 "
                                >
                                  <li
                                    v-for="position in hubs.filter((w) =>
                                      w.name
                                        .toLowerCase()
                                        .includes(hubSearch.toLowerCase())
                                    )"
                                    :key="position.id"
                                  >
                                    <a href="#" class="block hover:bg-gray-50">
                                      <div class="px-4 py-4 sm:px-6">
                                        <div
                                          class="flex items-center justify-between"
                                        >
                                          <p
                                            class="text-sm font-medium text-primary truncate"
                                          >
                                            {{ position.name }}
                                          </p>
                                          <div class="ml-2 flex-shrink-0 flex">
                                            <el-button
                                              @click.prevent="addHub(position)"
                                              size="small"
                                              type="primary"
                                              >Add</el-button
                                            >
                                          </div>
                                        </div>
                                        <div
                                          class="mt-2 sm:flex sm:justify-between"
                                        >
                                          <div class="sm:flex">
                                            <p
                                              class="flex items-center text-sm text-gray-500"
                                            >
                                              {{ position.mac }}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </a>
                                  </li>
                                </ul>
                              </div>
                              <div
                                class="text-center  h-full flex  rounded-md"
                                v-else
                              >
                                <div class="my-auto w-full">
                                  <svg
                                    class="mx-auto h-12 w-12 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                  >
                                    <path
                                      vector-effect="non-scaling-stroke"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                                    />
                                  </svg>
                                  <h3
                                    class="mt-2 text-sm font-medium text-gray-900"
                                  >
                                    No inactive devices
                                  </h3>
                                  <p class="mt-1 text-sm text-gray-500">
                                    Get started by creating a new device.
                                  </p>
                                </div>
                              </div>
                            </nav>
                          </aside>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- /End replace -->
                </div>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { XIcon } from "@heroicons/vue/outline";
import {
  CalendarIcon,
  LocationMarkerIcon,
  UsersIcon,
} from "@heroicons/vue/solid";
import { HubResponse, WorkPointResponse } from "@/api/response.types";
import { useRoute } from "vue-router";
import {
  CreateWorkPointPayload,
  DevicePayload,
  WorkPointPayload,
} from "@/api/payload.type";
import { Hubs, WorkPoints } from "@/api/app.service";
import { ElNotification } from "element-plus";
import { HubParameters } from "@/api/query.types";

const positions = [
  {
    id: 1,
    title: "Back End Developer",
    type: "Full-time",
    location: "Remote",
    department: "Engineering",
    closeDate: "2020-01-07",
    closeDateFull: "January 7, 2020",
  },
  {
    id: 2,
    title: "Front End Developer",
    type: "Full-time",
    location: "Remote",
    department: "Engineering",
    closeDate: "2020-01-07",
    closeDateFull: "January 7, 2020",
  },
  {
    id: 3,
    title: "User Interface Designer",
    type: "Full-time",
    location: "Remote",
    department: "Design",
    closeDate: "2020-01-14",
    closeDateFull: "January 14, 2020",
  },
];
export default defineComponent({
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    XIcon,
    CalendarIcon,
    LocationMarkerIcon,
    UsersIcon,
  },
  setup(_, context) {
    const open = ref(false);
    const workPoints = ref([] as WorkPointResponse[]);
    const hubs = ref([] as HubResponse[]);
    const route = useRoute();
    const workpointSearch = ref("");
    const hubSearch = ref("");
    const Id = computed(() => route.params.id as string);
    const deviceParams = reactive({
      isActive: false,
      areaId: Id.value,
    } as WorkPointPayload);

    const hubParams = reactive({
      isActive: false,
      areaId: Id.value,
    } as HubParameters);

    async function fetchWorkPoints() {
      await WorkPoints.get(deviceParams).then((res) => {
        workPoints.value = res;
      });
    }

    async function fetchHubs() {
      await Hubs.get(hubParams).then((res) => {
        hubs.value = res;
      });
    }

    function mutateSide(event: boolean) {
      open.value = event;
    }
    watch(
      () => [open.value],
      () => {
        if (open.value == true) {
          fetchWorkPoints();
          fetchHubs();
        }
      }
    );
    async function addWorkpoint(data: WorkPointResponse) {
      await WorkPoints.deploy(data.id).then(() => {
        ElNotification({
          message: "Device has been set",
          type: "success",
        });
        open.value = false;
        context.emit("reload");
      });
    }
    async function addHub(data: HubResponse) {
      const payload = {
        id: data.id,
        name: data.name,
        deviceModel: data.deviceModel,
        mac: data.mac,
        ipAddress: data.ipAddress,
        floorId: data.floorId,
        areaId: data.areaId,
        movementFrequency: data.hubConfiguration.movementFrequency,
        tempHumidityFrequency: data.hubConfiguration.tempHumidityFrequency,
        hubScanFrequency: data.hubConfiguration.hubScanFrequency,
        hubResetAttempts: data.hubConfiguration.hubResetAttempts,
        hubFailureLimitFailures: data.hubConfiguration.hubFailureLimitFailures,
        hubWorkPointListUpdate: data.hubConfiguration.hubWorkPointListUpdate,
        configResetFrequency: data.hubConfiguration.configResetFrequency,
        refreshInterval: data.hubConfiguration.refreshInterval,
        isActive: true,
      } as DevicePayload;

      await Hubs.put(payload, data.id).then(() => {
        ElNotification({
          message: "Device has been set",
          type: "success",
        });
        open.value = false;
        context.emit("reload");
      });
    }
    const width = ref("500px");
    function handleResize() {
      const h = window.innerWidth;
      if (h < 500) {
        width.value = "100%";
      }
    }
    onMounted(() => {
      window.addEventListener("resize", handleResize);
      const h = window.innerWidth;
      if (h < 500) {
        width.value = "100%";
      }
    });
    return {
      open,
      mutateSide,
      positions,
      workPoints,
      fetchWorkPoints,
      addWorkpoint,
      hubs,
      addHub,
      width,
      workpointSearch,
      hubSearch,
    };
  },
});
</script>
