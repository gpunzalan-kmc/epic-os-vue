<template>
  <div class="overflow-scroll">
    <div
      class="relative mt-5 ml-5 bg-white shadow-md"
      :style="
        `background-image: url('${url}');  background-size: 100% 100%;   background-repeat: no-repeat;width:1280px; height:720px`
      "
      v-loading="loading"
      element-loading-text="Loading..."
      element-loading-spinner="el-icon-loading"
    >
      <!-- {{ workPoints.data }} -->

      <VueDragResize
        v-for="(workpoint, index) in workPoints.data"
        :key="index"
        :w="35"
        :h="35"
        :x="workpoint.coordinateX"
        :y="workpoint.coordinateY"
        :isResizable="false"
        :isDraggable="false"
        :parentLimitation="true"
      >
        <div
          class="flex justify-center"
          :style="`transform: rotate(${workpoint.rotation}deg);`"
        >
          <img
            v-if="checkBattery(workpoint.id)"
            src="@/assets/img/sensor-danger.png"
            alt=""
            width="30"
            height="30"
          />
          <img
            v-else-if="checkIfActive(workpoint.id)"
            src="@/assets/img/sensor-active.png"
            alt=""
            width="30"
            height="30"
          />

          <img
            v-else
            src="@/assets/img/sensor.png"
            alt=""
            width="30"
            height="30"
          />
        </div>
      </VueDragResize>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  PropType,
  reactive,
  ref,
} from "vue";
import VueDragResize from "vue-drag-resize";
import { useRoute } from "vue-router";
import {
  FloorResponse,
  PaginationResponse,
  TelemetryResponse,
  WorkPointResponse,
} from "@/api/response.types";
import { Telemetry, WorkPoints } from "@/api/app.service";
import { FILEPATH } from "@/common/config";
import { TelemetryPayload } from "@/api/payload.type";
import { dateRange } from "@/common/date.filter";
export default defineComponent({
  props: {
    floor: {
      type: Object as PropType<FloorResponse>,
      required: true,
    },
  },
  components: {
    VueDragResize,
  },
  setup(props) {
    const route = useRoute();
    const loading = ref(false);
    const floor = computed(() => route.params.floorid as string);
    const params = reactive({
      floorID: floor.value,
      isActive: "true",
      page: "1",
      limit: "10000",
    });
    const url = `${FILEPATH}/${props.floor.filename}`;
    const workPoints = ref({} as PaginationResponse<WorkPointResponse>);

    const telemetryLogs = ref([] as Array<TelemetryResponse>);
    const telemetryPayload = reactive({
      DateStart: dateRange(10)[0],
      DateEnd: dateRange(10)[1],
      OfficeID: props.floor.officeID,
      FloorID: props.floor.id,
    } as TelemetryPayload);
    async function fetchWorkPoints() {
      loading.value = true;
      await WorkPoints.get(params).then((res) => {
        workPoints.value = res;
      });
      loading.value = false;
    }
    function fetchLogs() {
      Telemetry.get(telemetryPayload).then((res) => {
        telemetryLogs.value = res;
      });
    }

    function checkIfActive(workpointID: number) {
      const check = telemetryLogs.value.find(
        (log) => log.workpointID == workpointID
      );
      if (check) return true;
      return false;
    }
    function checkBattery(workpointID: number) {
      const check = telemetryLogs.value.find(
        (log) => log.workpointID == workpointID && log.battery == true
      );
      if (check) {
        return true;
      }
      return false;
    }
    // async function saveWorkPoint(data: WorkPointResponse) {
    //   await WorkPoints.put(data, data.id);
    // }
    onMounted(() => {
      fetchWorkPoints();
      fetchLogs();
    });
    return {
      loading,
      workPoints,
      telemetryLogs,
      fetchWorkPoints,
      url,
      checkIfActive,
      checkBattery,
      dateRange,
    };
  },

  // methods: {
  //   addWorkPoint(data: WorkPoint) {
  //     console.log(data);
  //     this.workpoints.push(data);
  //   },
  //   saveWorkPoint: debounce(async function(this: any, index: number) {
  //     console.log(this.workpoints[index]);
  //   }, 700),
  //   // resize(newRect: NewDragResize) {
  //   //   console.log(newRect);
  //   //   this.width = newRect.width;
  //   //   this.height = newRect.height;
  //   //   this.top = newRect.top;
  //   //   this.left = newRect.left;
  //   // },
  // },
});
</script>
