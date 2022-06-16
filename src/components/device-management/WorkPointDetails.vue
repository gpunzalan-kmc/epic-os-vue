<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <el-drawer
    :title="workpoint.name"
    v-model="open"
    direction="rtl"
    :size="width"
    placeholder="background: #ffff"
  >
    <div class="h-full flex flex-col bg-white shadow-xl ">
      <nav class="border-b flex space-x-8 px-2" aria-label="Tabs">
        <a
          v-for="tab in tabs"
          :key="tab.name"
          @click="activeName = tab.name"
          :class="[
            activeName == tab.name
              ? 'border-yellow-500 text-primary'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
            'group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm',
          ]"
          :aria-current="activeName == tab.name ? 'page' : undefined"
        >
          <component
            :is="tab.icon"
            :class="[
              activeName == tab.name
                ? 'text-yellow-500'
                : 'text-gray-400 group-hover:text-gray-500',
              '-ml-0.5 mr-2 h-5 w-5',
            ]"
            aria-hidden="true"
          />
          <span>{{ tab.name }}</span>
        </a>
      </nav>
      <div class="relative flex-1">
        <div class="absolute inset-0 ">
          <div
            class="h-full border-gray-200 overflow-y-scroll"
            aria-hidden="true"
          >
            <template v-if="activeName == 'Details'">
              <div
                class=" border-2 border-dashed border-gray-200 "
                aria-hidden="true"
                v-if="workpoint.isActive"
              >
                <div class="overflow-auto  bg-white pt-0">
                  <CropPreview
                    v-if="open"
                    :image="image"
                    :coordinates="coordinates"
                    :width="426"
                    :height="320"
                  >
                    <VueDragResize
                      :w="35"
                      :h="35"
                      :x="coordinateX"
                      :y="coordinateY"
                      :isResizable="false"
                      :isDraggable="false"
                      :parentLimitation="true"
                    >
                      <div
                        class="mx-auto flex items-center justify-center h-6 w-6 rounded-full bg-yellow-100"
                      >
                        <LocationMarkerIcon
                          class="h-5 w-5 text-primary"
                          aria-hidden="true"
                        />
                      </div> </VueDragResize
                  ></CropPreview>
                </div>
              </div>
              <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
                <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">
                      Workpoint Name
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      {{ workpoint.name }}
                    </dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">
                      MAC Address
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      {{ workpoint.mac }}
                    </dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">
                      Hub
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      {{ workpoint.hub.name }}
                    </dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">
                      Building
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      {{ workpoint.area.buildingName }}
                    </dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">
                      Floor
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      {{ workpoint.area.floorName }}
                    </dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">
                      Area
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      {{ workpoint.area.name }}
                    </dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">
                      Deployed
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      <span
                        v-if="workpoint.isActive"
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize bg-green-100 text-green-800"
                        >Yes</span
                      >
                      <span
                        v-else
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize bg-green-100 text-green-800"
                        >No</span
                      >
                    </dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">
                      Space Type
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      {{ workpoint.spaceTypeValue }}
                    </dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">
                      Last Activitiy
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      {{
                        format(
                          new Date(workpoint.lastActivity),
                          "MMM dd, yyyy hh:mm a"
                        )
                      }}
                    </dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">
                      Created Time
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      {{
                        format(
                          new Date(workpoint.createdTime),
                          "MMM dd, yyyy hh:mm a"
                        )
                      }}
                    </dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">
                      Device Model
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      {{ workpoint.modelValue }}
                    </dd>
                  </div>
                </dl>
              </div>
            </template>
            <template v-if="activeName == 'Logs'">
              <WorkPointLogs :id="workpoint.id" />
            </template>
          </div>
        </div>
      </div>
    </div>
  </el-drawer>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, PropType, ref } from "vue";
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { XIcon } from "@heroicons/vue/outline";
import { LocationMarkerIcon } from "@heroicons/vue/solid";
import { WorkPointResponse } from "@/api/response.types";
import VueDragResize from "vue-drag-resize";
import WorkPointLogs from "@/components/device-management/WorkPointLogs.vue";
import format from "date-fns/esm/format";
import { CropImageResponse } from "@/common/types";
import CropPreview from "@/components/floorplan/CropPreview.vue";
import { ClipboardListIcon, ViewListIcon } from "@heroicons/vue/solid";

export default defineComponent({
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    XIcon,
    VueDragResize,
    LocationMarkerIcon,
    WorkPointLogs,
    CropPreview,
  },
  props: {
    workpoint: {
      type: Object as PropType<WorkPointResponse>,
      required: true,
    },
    image: {
      type: Object as PropType<CropImageResponse["image"]>,
      required: true,
    },
    coordinates: {
      type: Object as PropType<CropImageResponse["image"]>,
      required: true,
    },
  },
  setup(props) {
    const activeName = ref("Details");
    const open = ref(false);
    function mutateOpen(event: boolean) {
      open.value = event;
    }
    const coordinateX = computed(() => {
      let coordinate = props.workpoint.coordinateX / 3 - 14;
      if (props.workpoint.width > 0 && props.workpoint.height > 0) {
        coordinate = coordinate + props.workpoint.width / 3 / 2 - 5;
      }
      return coordinate;
    });
    const tabs = ref([
      { name: "Details", href: "#", icon: ViewListIcon, current: true },
      { name: "Logs", href: "#", icon: ClipboardListIcon, current: false },
    ]);
    const coordinateY = computed(() => {
      let coordinate = props.workpoint.coordinateY / 3 - 14;
      if (props.workpoint.width > 0 && props.workpoint.height > 0) {
        coordinate = coordinate + props.workpoint.height / 3 / 2 - 5;
      }
      return coordinate;
    });
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
      mutateOpen,
      coordinateX,
      coordinateY,
      format,
      activeName,
      width,
      tabs,
    };
  },
});
</script>
