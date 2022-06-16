<template>
  <div class=" bg-white rounded shadow m-3 h-full">
    <div
      class="px-6 flex justify-between py-4 border-b border-gray-200  rounded-t text-gray-700 font-bold bg-subWall"
    >
      <h3>Floors</h3>

      <el-button type="primary" size="mini" @click="addFloorDialog = true"
        >Add Floor</el-button
      >
    </div>

    <div class="flex justify-end pt-3">
      <div class="flex px-3">
        <el-input
          @input="search"
          v-model="params.name"
          size="small"
          placeholder="Search floor name"
          prefix-icon="el-icon-search"
        ></el-input>
        <el-pagination
          @current-change="changePage"
          background
          layout="prev, next"
          :page-size="9"
          :total="totalRecord"
        >
        </el-pagination>
      </div>
    </div>
    <div class="overflow-hidden w-full">
      <el-row
        class="px-5 pt-5"
        v-if="floorData.length > 0"
        :gutter="20"
        v-loading="loading"
        element-loading-text="Loading..."
        element-loading-spinner="el-icon-loading"
      >
        <el-col
          :sm="24"
          :md="12"
          :lg="8"
          class="mb-5"
          v-for="(floor, index) in floorData"
          :key="index"
        >
          <SiteFloorDetailsCard
            :floor="floor"
            @edit="
              editData = $event;
              editFloorDialog = true;
            "
          />
        </el-col>
      </el-row>
    </div>
    <el-empty
      class="mt-10"
      description="Empty floor"
      v-if="floorData.length == 0"
    ></el-empty>
  </div>
  <el-dialog title="Add Floor" v-model="addFloorDialog" width="500px">
    <SiteDetailsAddFloor
      v-if="addFloorDialog"
      :siteData="siteData"
      @reload="
        fetchFloor();
        addFloorDialog = false;
      "
    />
  </el-dialog>
  <el-dialog title="Edit Floor" v-model="editFloorDialog" width="500px">
    <SiteDetailsAddFloor
      v-if="editFloorDialog"
      :siteData="siteData"
      :editData="editData"
      @reload="
        fetchFloor();
        editFloorDialog = false;
      "
    />
  </el-dialog>
</template>
<script lang="ts">
import { Floor } from "@/api/app.service";
import { FloorResponse } from "@/api/response.types";
import { useRoute } from "vue-router";
import { computed, defineComponent, onMounted, reactive, ref } from "vue";
import SiteFloorDetailsCard from "@/components/sites/SiteFloorDetailsCard.vue";
import SiteDetailsAddFloor from "@/components/sites/SiteDetailsAddFloor.vue";
import { debounce } from "ts-debounce";
export default defineComponent({
  props: {
    siteData: {
      type: Object,
      required: true,
    },
  },
  components: {
    SiteFloorDetailsCard,
    SiteDetailsAddFloor,
  },
  setup() {
    const loading = ref(false);
    const editData = ref({} as FloorResponse);
    const addFloorDialog = ref(false);
    const editFloorDialog = ref(false);
    const searchFloor = ref("");
    const route = useRoute();
    const totalRecord = ref(0);

    const id = computed(() => route.params.id as string);
    const params = reactive({
      officeID: id.value,
      name: null,
      page: "1",
      limit: "9",
    });

    const floorData = ref([] as Array<FloorResponse>);
    async function fetchFloor() {
      loading.value = true;
      await Floor.get(params).then((res) => {
        totalRecord.value = res.totalRecords;
        floorData.value = res.data;
      });
      loading.value = false;
    }
    const search = debounce(async () => {
      fetchFloor();
    }, 700);
    function changePage(page: number) {
      params.page = page.toString();
      fetchFloor();
    }

    onMounted(() => {
      fetchFloor();
    });
    return {
      floorData,
      totalRecord,
      changePage,
      searchFloor,
      params,
      search,
      addFloorDialog,
      fetchFloor,
      editFloorDialog,
      editData,
    };
  },
});
</script>
