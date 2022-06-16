<template>
  <AppSubHeaderV2>
    <template v-slot:title>
      <MapIcon class="w-7 h-7 text-primary" aria-hidden="true" />
      <h2 class="text-lg my-auto leading-6 font-semibold text-white">
        Device Mapping
      </h2></template
    >
    <template v-slot:action>
      <div class="flex space-x-2">
        <el-button
          type="primary"
          @click="setDevice.mutateSide(true)"
          size="small"
          >Add Device</el-button
        >
        <div v-if="changesDetected.length > 0 || changesDetectedHub.length > 0">
          <el-button
            circle
            type="success"
            size="small"
            @click="planner.saveWorkPoint"
            icon="el-icon-check"
          ></el-button>
          <el-button
            circle
            type="default"
            icon="el-icon-close"
            size="small"
            @click="planner.fetchWorkPoints()"
          ></el-button>
        </div>
      </div>
    </template>
  </AppSubHeaderV2>
  <main class="overflow-y-auto h-full">
    <div class="max-w-8xl mx-auto py-6 sm:px-6 lg:px-8">
      <VisualPlanner
        :changes="changesDetected"
        :hubChanges="changesDetectedHub"
        :area="details"
        :image="image"
        :coordinates="coordinates"
        @pushChanges="pushChanges"
        @pushChangesHub="pushChangesHub"
        @emptyChanges="changesDetected = []"
        @emptyHubChanges="changesDetectedHub = []"
        @merge="mergeDevice.mutateSide($event, true)"
        ref="planner"
      />
    </div>
  </main>

  <SetDevice ref="setDevice" @reload="planner.fetchWorkPoints()" />
  <MergeDevice ref="mergeDevice" @reload="planner.fetchWorkPoints()" />
</template>
<script lang="ts">
import { Neighborhood, Telemetry } from "@/api/app.service";
import {
  NeighborhoodResponse,
  TelemetryResponse,
  WorkPointResponse,
} from "@/api/response.types";
import { computed, defineComponent, onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { ArrowSmDownIcon, ArrowSmUpIcon } from "@heroicons/vue/solid";
import { MapIcon } from "@heroicons/vue/outline";

import { dateRange } from "@/common/date.filter";
import { TelemetryPayload } from "@/api/payload.type";
import VueDragResize from "vue-drag-resize";
import VisualPlanner from "@/components/floorplan/VisualPlanner.vue";
import SetDevice from "@/components/floorplan/SetDevice.vue";
import MergeDevice from "@/components/floorplan/MergeDevice.vue";
import { VForm } from "@/store/modules/types/types";
import { store } from "@/store";
import { AuthMutationTypes } from "@/store/modules/types/mutation-types";
import AppSubHeaderV2 from "@/components/layout/AppSubHeaderV2.vue";
import { CropImageResponse } from "@/common/types";
export default defineComponent({
  components: {
    ArrowSmDownIcon,
    ArrowSmUpIcon,
    VueDragResize,
    VisualPlanner,
    SetDevice,
    AppSubHeaderV2,
    MapIcon,
    MergeDevice,
  },
  setup() {
    const route = useRoute();
    const changesDetected = ref([] as number[]);
    const changesDetectedHub = ref([] as number[]);
    const loading = ref(false);
    const Id = computed(() => route.params.id as string);
    const planner = ref(null as null | VForm);
    const setDevice = ref(null as null | VForm);
    const mergeDevice = ref(null as null | VForm);
    const coordinates = ref({
      height: 0,
      left: 0,
      top: 0,
      width: 0,
    } as CropImageResponse["coordinates"]);
    const image = ref({
      height: 0,
      width: 0,
      src: "",
      transforms: {
        rotate: 0,
        scaleX: 0,
        scaleY: 0,
        translateX: 0,
        translateY: 0,
      },
    } as CropImageResponse["image"]);
    const details = ref({
      id: 0,
      name: "",
      floorId: 0,
      floorName: "",
      floorPlanImage: "",
      siteImage: "",
    } as NeighborhoodResponse);
    async function getDetails() {
      await Neighborhood.show(Id.value).then((res) => {
        details.value = res;
        store.commit(AuthMutationTypes.SET_SUBNAME, {
          image: res.siteImage,
          subject: res.name,
          subname: `${res.floorName} ${res.buildingName}`,
        });
        coordinates.value.height = res.floorplanCoordinates.coordinatesHeight;
        coordinates.value.width = res.floorplanCoordinates.coordinatesWidth;
        coordinates.value.left = res.floorplanCoordinates.coordinatesLeft;
        coordinates.value.top = res.floorplanCoordinates.coordinatesTop;
        image.value.height = res.floorplanCoordinates.transformHeight;
        image.value.width = res.floorplanCoordinates.transformWidth;
        image.value.src = res.floorPlanImage;
        image.value.transforms.rotate =
          res.floorplanCoordinates.transformRotate;
        image.value.transforms.scaleX =
          res.floorplanCoordinates.transformScaleX;
        image.value.transforms.scaleY =
          res.floorplanCoordinates.transformScaleY;
        image.value.transforms.translateX =
          res.floorplanCoordinates.transformTranslateX;
        image.value.transforms.translateY =
          res.floorplanCoordinates.transformTranslateY;
      });
    }
    const workPoints = ref([] as WorkPointResponse[]);
    const telemetryLogs = ref([] as TelemetryResponse[]);
    const telemetryPayload = reactive({
      DateStart: dateRange(10)[0],
      DateEnd: dateRange(10)[1],
      AreadId: Id.value,
    } as TelemetryPayload);

    async function fetchLogs() {
      telemetryPayload.DateStart = dateRange(10)[0];
      telemetryPayload.DateEnd = dateRange(10)[1];
      await Telemetry.get(telemetryPayload).then((res) => {
        telemetryLogs.value = res;
      });
    }
    function checkIfActive(workpointID: number) {
      const check = telemetryLogs.value.find(
        (log) => log.workPointId == workpointID
      );
      if (check) return true;
      return false;
    }
    function checkBattery(workpointID: number) {
      const check = telemetryLogs.value.find(
        (log) => log.workPointId == workpointID && log.battery == true
      );
      if (check) {
        return true;
      }
      return false;
    }
    onMounted(async () => {
      await getDetails();

      await fetchLogs();
      setInterval(async function() {
        telemetryPayload.DateStart = dateRange(10)[0];
        telemetryPayload.DateEnd = dateRange(10)[1];
        await fetchLogs();
      }, 60000);
    });
    const activeUsers = computed(() => {
      const macs = [] as Array<string>;
      if (telemetryLogs.value) {
        telemetryLogs.value.filter((f) => {
          if (!macs.includes(f.mac)) macs.push(f.mac);
        });
        return macs.length;
      }
      return 0;
    });
    const activeDevices = computed(() => {
      const macs = [] as Array<string>;
      if (workPoints.value) {
        workPoints.value.filter((f) => {
          if (!macs.includes(f.mac)) macs.push(f.mac);
        });
        return macs.length;
      }
      return 0;
    });
    function pushChanges(index: number) {
      if (!changesDetected.value.includes(index)) {
        changesDetected.value.push(index);
      }
    }
    function pushChangesHub(index: number) {
      if (!changesDetectedHub.value.includes(index)) {
        changesDetectedHub.value.push(index);
      }
    }
    return {
      pushChanges,
      activeUsers,
      activeDevices,
      details,
      changesDetected,
      loading,
      workPoints,
      telemetryLogs,
      checkIfActive,
      checkBattery,
      planner,
      setDevice,
      pushChangesHub,
      changesDetectedHub,
      coordinates,
      image,
      mergeDevice,
    };
  },
});
</script>
