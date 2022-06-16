<template>
  <div class="flex justify-end">
    <el-pagination
      @current-change="changePage"
      background
      layout="prev, next"
      :page-size="6"
      :total="totalRecord"
    >
    </el-pagination>
  </div>
  <div
    class="p-3"
    v-loading="loading"
    element-loading-text="Loading..."
    element-loading-spinner="el-icon-loading"
  >
    <el-row :gutter="20">
      <el-col
        :span="8"
        class="my-2"
        v-for="(data, index) in workPoints.data"
        :key="index"
      >
        <WorkPointsTableCard :data="data" @click="addWorkpoint(data)" />
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { WorkPoints } from "@/api/app.service";
import {
  MutationResponse,
  PaginationResponse,
  WorkPointResponse,
} from "@/api/response.types";
import { useRoute } from "vue-router";
import { computed, defineComponent, onMounted, reactive, ref } from "vue";
import WorkPointsTableCard from "@/components/floorplan/WorkPointsTableCard.vue";
import { ElNotification } from "element-plus";
export default defineComponent({
  components: {
    WorkPointsTableCard,
  },
  setup() {
    const loading = ref(false);
    const totalRecord = ref(1);
    const route = useRoute();
    const floor = computed(() => route.params.floorid as string);
    const params = reactive({
      floorID: floor.value,
      isActive: "false",
      page: "1",
      limit: "6",
    });

    const workPoints = ref({} as PaginationResponse<WorkPointResponse>);
    async function fetchWorkPoints() {
      loading.value = true;
      await WorkPoints.get(params).then((res) => {
        workPoints.value = res;
        totalRecord.value = res.totalRecords;
      });
      loading.value = false;
    }
    function changePage(page: number) {
      params.page = page.toString();
      fetchWorkPoints();
    }
    async function addWorkpoint(data: WorkPointResponse) {
      loading.value = true;
      data.isActive = true;
      const payload = {
        coordinateX: data.coordinateX,
        coordinateY: data.coordinateY,
        coordinateZ: data.coordinateZ,
        rotation: data.rotation,
        officeID: data.officeID,
        floorID: data.floorID,
        hubID: data.hubID,
        name: data.name,
        mac: data.mac,
        locationType: data.locationType,
        iPaddress: data.iPaddress,
        isActive: data.isActive,
        isDeleted: data.isDeleted,
      } as WorkPointResponse;
      await WorkPoints.put(payload, data.id).then((res) => {
        ElNotification({
          message: (res as MutationResponse).message,
          type: "success",
        });
        fetchWorkPoints();
      });
      loading.value = false;
    }
    onMounted(() => {
      fetchWorkPoints();
    });
    return {
      fetchWorkPoints,
      workPoints,
      changePage,
      addWorkpoint,
      loading,
      WorkPointsTableCard,
      totalRecord,
    };
  },
});
</script>
