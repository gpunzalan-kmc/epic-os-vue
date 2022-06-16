<template>
  <div
    class="flex mt-3 ml-5"
    v-loading="loading"
    element-loading-text="Loading..."
    element-loading-spinner="el-icon-loading"
  >
    <el-button
      type="primary"
      icon="el-icon-plus"
      size="small"
      @click="addWorkPoint = true"
      >Map Workpoint</el-button
    >
    <el-button
      type="success"
      v-if="changesDetected.length > 0"
      icon="el-icon-check"
      size="small"
      @click="planner.saveWorkPoint"
      >Apply</el-button
    >
    <el-button
      type="default"
      v-if="changesDetected.length > 0"
      size="small"
      @click="
        planner.fetchWorkPoints();
        changesDetected = [];
      "
      >Cancel</el-button
    >
  </div>

  <VisualPlanner
    :changes="changesDetected"
    @pushChanges="pushChanges"
    @emptyChanges="changesDetected = []"
    ref="planner"
    :floor="floorData"
    v-if="!loading"
  />
  <el-dialog
    title="Workpoints"
    v-model="addWorkPoint"
    width="700px"
    :before-close="handleClose"
  >
    <WorkPointsTable v-if="addWorkPoint" />
  </el-dialog>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from "vue";
import VisualPlanner from "@/components/floorplan/VisualPlanner.vue";
import WorkPointsTable from "@/components/floorplan/WorkPointsTable.vue";
import { VForm } from "@/store/modules/types/types";
import { Floor } from "@/api/app.service";
import { useRoute } from "vue-router";
import { FloorResponse } from "@/api/response.types";
export default defineComponent({
  components: {
    VisualPlanner,
    WorkPointsTable,
  },
  setup() {
    const changesDetected = ref([] as number[]);
    const loading = ref(false);
    const planner = ref(null as null | VForm);
    const addWorkPoint = ref(false);
    const floorData = ref({} as FloorResponse);
    function handleClose() {
      planner.value?.fetchWorkPoints();
      addWorkPoint.value = false;
    }

    const route = useRoute();
    const floor = computed(() => route.params.floorid as string);
    const params = reactive({
      id: floor.value,
    });
    async function fetchFloor() {
      loading.value = true;
      await Floor.get(params).then((res) => {
        if (res.data.length > 0) floorData.value = res.data[0];
      });
      loading.value = false;
    }
    function pushChanges(index: number) {
      if (!changesDetected.value.includes(index)) {
        changesDetected.value.push(index);
      }
    }
    onMounted(() => {
      fetchFloor();
    });
    return {
      pushChanges,
      changesDetected,
      addWorkPoint,
      handleClose,
      planner,
      fetchFloor,
      floorData,
      loading,
    };
  },
});
</script>
