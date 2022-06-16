<template>
  <div class="overflow-auto border bg-white p-5 pt-0 ">
    <div style="position:relative;width:100%;">
      <CropPreview
        :image="image"
        :coordinates="coordinates"
        :width="1280"
        :height="960"
        v-loading="loading"
        element-loading-text="Loading..."
        element-loading-spinner="el-icon-loading"
      >
      </CropPreview>
      <FabricCanvass
        ref="fabric"
        :workPoints="workPoints"
        @onDragging="fabricOnDrag"
        @onDelete="removeFabricWorkpoint"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { CropImageResponse, NewDragResize } from "@/common/types";
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
  HubResponse,
  NeighborhoodResponse,
  WorkPointResponse,
} from "@/api/response.types";
import { Hubs, WorkPoints } from "@/api/app.service";
import { ElMessageBox, ElNotification } from "element-plus";

import {
  BulkLocationUpdate,
  HubBulkLocationUpdate,
  WorkPointPayload,
} from "@/api/payload.type";
import ApiService from "@/common/api.service";
import { HubParameters } from "@/api/query.types";
import CropPreview from "@/components/floorplan/CropPreview.vue";
import FabricCanvass from "@/components/floorplan/FabricCanvas.vue";
import { VForm } from "@/store/modules/types/types";
export default defineComponent({
  props: {
    image: {
      type: Object as PropType<CropImageResponse["image"]>,
      required: true,
    },
    coordinates: {
      type: Object as PropType<CropImageResponse["image"]>,
      required: true,
    },
    area: {
      type: Object as PropType<NeighborhoodResponse>,
      required: true,
    },
    changes: {
      type: Array as PropType<number[]>,
      required: true,
    },
    hubChanges: {
      type: Array as PropType<number[]>,
      required: true,
    },
  },
  components: {
    VueDragResize,
    CropPreview,
    FabricCanvass,
  },
  setup(props, context) {
    const can = ref(null);
    const points = [
      {
        x: 3,
        y: 4,
      },
      {
        x: 16,
        y: 3,
      },
      {
        x: 30,
        y: 5,
      },
      {
        x: 25,
        y: 55,
      },
      {
        x: 19,
        y: 44,
      },
      {
        x: 15,
        y: 30,
      },
      {
        x: 15,
        y: 55,
      },
      {
        x: 9,
        y: 55,
      },
      {
        x: 6,
        y: 53,
      },
      {
        x: -2,
        y: 55,
      },
      {
        x: -4,
        y: 40,
      },
      {
        x: 0,
        y: 20,
      },
    ];
    const active = ref(0);
    const fabric = ref(null as null | VForm);
    const route = useRoute();
    const loading = ref(false);
    const Id = computed(() => route.params.id as string);
    const mount = ref(true);
    const deviceParams = reactive({
      areaId: Id.value,
    } as WorkPointPayload);
    const hubParams = reactive({
      areaId: Id.value,
      isActive: true,
    } as HubParameters);
    const url = computed(() => props.area.floorPlanImage as string);
    const workPoints = ref([] as WorkPointResponse[]);
    const hubs = ref([] as HubResponse[]);

    const currentIndex = computed(() => {
      let index = 0;
      const find = workPoints.value.find(
        (workpoint) => workpoint.id == active.value
      );
      if (find) index = workPoints.value.indexOf(find);
      return index;
    });
    async function fetchWorkPoints() {
      mount.value = false;
      loading.value = true;
      ApiService.resetApiUrl();
      await WorkPoints.get(deviceParams).then((res) => {
        workPoints.value = res;

        setTimeout(() => {
          context.emit("emptyChanges");
        }, 300);
        mount.value = true;
      });
      fabric.value?.mountWorkpoint();
      loading.value = false;
    }
    async function fetchHubs() {
      mount.value = false;
      loading.value = true;
      ApiService.resetApiUrl();
      await Hubs.get(hubParams).then((res) => {
        hubs.value = res;

        setTimeout(() => {
          context.emit("emptyChanges");
        }, 300);
        mount.value = true;
      });
      loading.value = false;
    }
    function onActivate(index: number) {
      active.value = index;
    }
    function onDeactivate() {
      active.value = 0;
    }

    async function saveWorkPoint() {
      const locationPayload = { data: [] as BulkLocationUpdate[] };
      const locationHubPayload = { data: [] as HubBulkLocationUpdate[] };
      if (props.changes.length > 0) {
        loading.value = true;
        for (const index of props.changes) {
          locationPayload.data.push({
            id: workPoints.value[index].id,
            coordinateX: workPoints.value[index].coordinateX,
            coordinateY: workPoints.value[index].coordinateY,
            coordinateZ: workPoints.value[index].coordinateZ,
            width: workPoints.value[index].width,
            height: workPoints.value[index].height,
            rotation: workPoints.value[index].rotation,
            isActive: workPoints.value[index].isActive,
            points: workPoints.value[index].coordinatePoints,
            scaleX: workPoints.value[index].scaleX,
            scaleY: workPoints.value[index].scaleY,
          });
        }

        await WorkPoints.put(locationPayload).then(() => {
          ElNotification({
            title: "Success",
            message: "Floorplan updated",
            type: "success",
          });
          context.emit("emptyChanges");
          loading.value = false;
        });
      }
      if (props.hubChanges.length > 0) {
        loading.value = true;
        for (const index of props.hubChanges) {
          locationHubPayload.data.push({
            id: hubs.value[index].id,
            coordinateX: hubs.value[index].coordinateX,
            coordinateY: hubs.value[index].coordinateY,
            coordinateZ: hubs.value[index].coordinateZ,
            isActive: hubs.value[index].isActive,
          });
        }
        await Hubs.putBulk(locationHubPayload).then(() => {
          ElNotification({
            title: "Success",
            message: "Floorplan updated",
            type: "success",
          });
          context.emit("emptyHubChanges");
          loading.value = false;
        });
      }
    }

    function removeFabricWorkpoint(event: {
      id: number;
      top: number;
      left: number;
      angle: number;
      points: Array<{ x: number; y: number }>;
    }) {
      const findWorkpoint = workPoints.value.find(
        (workPoint) => workPoint.id == event.id
      );
      if (findWorkpoint) {
        const index = workPoints.value.indexOf(findWorkpoint);
        workPoints.value[index].coordinateX = 0;
        workPoints.value[index].coordinateY = 0;
        workPoints.value[index].coordinateZ = 0;
        workPoints.value[index].isActive = false;
        context.emit("pushChanges", index);
      }
    }

    function removeWorkpoint(index: number) {
      ElMessageBox.confirm(
        "This will delete the workpoint. Continue?",
        "Delete Workpoint",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      ).then(async () => {
        workPoints.value[index].coordinateX = 0;
        workPoints.value[index].coordinateY = 0;
        workPoints.value[index].coordinateZ = 0;
        workPoints.value[index].isActive = false;
        context.emit("pushChanges", index);
      });
    }

    function fabricOnDrag(event: {
      id: number;
      top: number;
      left: number;
      angle: number;
      points: Array<{ x: number; y: number }>;
      scaleX: number;
      scaleY: number;
    }) {
      console.log("fabricondrag", event);
      const findWorkpoint = workPoints.value.find(
        (workPoint) => workPoint.id == event.id
      );
      if (findWorkpoint) {
        const index = workPoints.value.indexOf(findWorkpoint);
        context.emit("pushChanges", index);
        workPoints.value[index].coordinateY = Math.round(event.top);
        workPoints.value[index].coordinateX = Math.round(event.left);
        workPoints.value[index].rotation = event.angle;
        workPoints.value[index].coordinatePoints = event.points;
        workPoints.value[index].scaleY = event.scaleY;
        workPoints.value[index].scaleX = event.scaleX;
      }
    }

    function onDragging(index: number, newRect: NewDragResize) {
      context.emit("pushChanges", index);
      // if (!changesDetected.value.includes(index)) {
      //   changesDetected.value.push(index);
      // }
      workPoints.value[index].coordinateY = newRect.top;
      workPoints.value[index].coordinateX = newRect.left;
      // saveWorkPoint(workPoints.value.data[index]);
    }
    function onHubDragging(index: number, newRect: NewDragResize) {
      context.emit("pushChangesHub", index);
      // if (!changesDetected.value.includes(index)) {
      //   changesDetected.value.push(index);
      // }
      hubs.value[index].coordinateY = newRect.top;
      hubs.value[index].coordinateX = newRect.left;
      // saveWorkPoint(workPoints.value.data[index]);
    }
    function onResize(index: number, newRect: NewDragResize) {
      context.emit("pushChanges", index);

      // if (!changesDetected.value.includes(index)) {
      //   changesDetected.value.push(index);
      // }
      workPoints.value[index].width = newRect.width;
      workPoints.value[index].height = newRect.height;
    }
    onMounted(() => {
      fetchWorkPoints();
      fetchHubs();
    });
    async function removeMergeWorkpoint(id: number) {
      ElMessageBox.confirm(
        "This will unmerged the workpoint. Continue?",
        "Unmerge workpoint",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      ).then(async () => {
        await WorkPoints.deleteMergeWorkpoint(id).then(() => {
          fetchWorkPoints();
        });
      });
    }
    return {
      onResize,
      loading,
      workPoints,
      active,
      currentIndex,
      removeWorkpoint,
      onDragging,
      onActivate,
      onDeactivate,
      saveWorkPoint,
      fetchWorkPoints,
      url,
      mount,
      hubs,
      onHubDragging,
      removeMergeWorkpoint,
      can,
      points,
      fabricOnDrag,
      removeFabricWorkpoint,
      fabric,
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
