<template>
  <div style="position:relative;width:100%;">
    <CropPreview
      :image="image"
      :coordinates="coordinates"
      :width="1280"
      :height="960"
    >
    </CropPreview>
    <FabricCanvasMonitoring
      ref="fabric"
      v-if="workPoints.length > 0"
      :workPoints="workPoints"
      :telemetryLogs="telemetryLogs"
      @onDragging="fabricOnDrag"
      @onDelete="removeFabricWorkpoint"
      @onSelect="viewWorkpointDetail"
    />
  </div>

  <WorkPointDetails
    ref="workpointDetails"
    :workpoint="selectedWorkpoint"
    :image="image"
    :coordinates="coordinates"
  />
</template>
<script lang="ts">
import { defineComponent, onMounted, PropType, ref } from "vue";
import { isAccessAllowed } from "@/common/access.security";
import WorkPointDetails from "@/components/device-management/WorkPointDetails.vue";
import FabricCanvasMonitoring from "@/components/floorplan/FabricCanvasMonitoring.vue";
import VueDragResize from "vue-drag-resize";
import {
  HubResponse,
  NeighborhoodResponse,
  TelemetryResponse,
  WorkPointByIdResponse,
  WorkPointResponse,
} from "@/api/response.types";
import { date } from "@/common/date.filter";
import { getNumberOfDays } from "@/common/date.filter";
import router from "@/router";
import { VForm } from "@/store/modules/types/types";
import CropPreview from "@/components/floorplan/CropPreview.vue";
import { CropImageResponse } from "@/common/types";
import { WorkPoints } from "@/api/app.service";
export default defineComponent({
  props: {
    showPreview: {
      type: Boolean,
    },
    details: {
      type: Object as PropType<NeighborhoodResponse>,
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
    workPoints: {
      type: Object as PropType<WorkPointResponse[]>,
      required: true,
    },
    hubs: {
      type: Object as PropType<HubResponse[]>,
      required: true,
    },
    telemetryLogs: {
      type: Object as PropType<TelemetryResponse[]>,
      required: true,
    },
    mode: {
      type: Number,
      required: true,
    },
  },
  components: {
    VueDragResize,
    WorkPointDetails,
    CropPreview,
    FabricCanvasMonitoring,
  },
  setup(props, { emit }) {
    const timeRange = ref([] as Array<Date>);
    const fabric = ref(null as null | VForm);
    function checkIfActive(workpointID: number) {
      const checkWorkpoint = props.workPoints.find(
        (work) => work.id == workpointID
      );
      if (checkWorkpoint && checkWorkpoint.mergedWorkpoints.length > 0) {
        checkWorkpoint.mergedWorkpoints.map((w) => {
          const check = props.telemetryLogs.find(
            (log) => log.workPointId == w.id
          );
          if (check) return true;
        });
      }

      const check = props.telemetryLogs.find(
        (log) => log.workPointId == workpointID
      );
      if (check) return true;
      return false;
    }
    const workpointDetails = ref(null as null | VForm);
    const selectedWorkpoint = ref({} as WorkPointByIdResponse);
    function checkBattery(workpointID: number) {
      const check = props.telemetryLogs.find(
        (log) => log.workPointId == workpointID && log.battery == true
      );
      if (check) {
        return true;
      }
      return false;
    }
    function changeTime(event: Array<Date>) {
      emit("changeTime", event);
    }
    function goToHub(id: number) {
      router.push({ name: "Device Management", query: { id: id } });
    }
    async function viewWorkpointDetail(workPointId: number) {
      await WorkPoints.show(workPointId).then((res) => {
        workpointDetails.value?.mutateOpen(true);
        selectedWorkpoint.value = res;
      });
    }

    function mountWorkpoint() {
      fabric.value?.mountWorkpoint();
    }

    return {
      workpointDetails,
      goToHub,
      changeTime,
      isAccessAllowed,
      checkIfActive,
      checkBattery,
      date,
      timeRange,
      getNumberOfDays,
      selectedWorkpoint,
      viewWorkpointDetail,
      fabric,
      mountWorkpoint,
    };
  },
});
</script>
