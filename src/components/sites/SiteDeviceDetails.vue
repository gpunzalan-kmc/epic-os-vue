<template>
  <div class=" bg-white rounded shadow m-3 h-full">
    <div
      class="px-6 flex justify-between py-4 border-b border-gray-200  rounded-t text-gray-700 font-bold bg-subWall"
    >
      <h3>Devices</h3>

      <el-button type="primary" size="mini" @click="addDeviceDialog = true"
        >Add Device</el-button
      >
    </div>
    <div class="flex justify-between pt-3">
      <el-select
        @change="fetchDevice"
        v-model="category"
        size="small"
        class="px-5"
        ><el-option label="Workpoints" value="workpoints"></el-option
        ><el-option label="Hubs" value="hubs"></el-option
      ></el-select>
      <div class="flex px-3">
        <el-input
          @input="search"
          v-model="params.name"
          size="small"
          placeholder="Search device name"
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
        v-if="workPointData.length > 0 && category == 'workpoints'"
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
          v-for="(workpoint, index) in workPointData"
          :key="index"
        >
          <SiteDeviceDetailsCardWorkPoint
            :workpoint="workpoint"
            @edit="
              editData = $event;
              editDeviceDialog = true;
            "
          />
        </el-col>
      </el-row>
      <el-row
        class="px-5 pt-5"
        v-if="hubData.length > 0 && category == 'hubs'"
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
          v-for="(hub, index) in hubData"
          :key="index"
        >
          <SiteDeviceDetailsCardHub
            :hub="hub"
            @edit="
              editData = $event;
              editDeviceDialog = true;
            "
          />
        </el-col>
      </el-row>
      <el-empty
        class="mt-10"
        description="Empty workpoint"
        v-if="workPointData.length == 0 && category == 'workpoints'"
      ></el-empty>
      <el-empty
        class="mt-10"
        description="Empty hub"
        v-if="hubData.length == 0 && category == 'hubs'"
      ></el-empty>
    </div>
  </div>
  <el-dialog title="Add Device" v-model="addDeviceDialog" width="500px">
    <SiteDetailsAddDevice
      :siteData="siteData"
      v-if="addDeviceDialog"
      @reload="
        fetchDevice();
        addDeviceDialog = false;
      "
    />
  </el-dialog>
  <el-dialog title="Edit Device" v-model="editDeviceDialog" width="500px">
    <SiteDetailsAddDevice
      :propCategory="category"
      :siteData="siteData"
      :editData="editData"
      v-if="editDeviceDialog"
      @reload="
        fetchDevice();
        editDeviceDialog = false;
      "
    />
  </el-dialog>
</template>
<script lang="ts">
import { Hubs, WorkPoints } from "@/api/app.service";
import { useRoute } from "vue-router";
import { computed, defineComponent, onMounted, reactive, ref } from "vue";
import {
  DeviceResponse,
  HubResponse,
  WorkPointResponse,
} from "@/api/response.types";
import SiteDeviceDetailsCardWorkPoint from "@/components/sites/SiteDeviceDetailsCardWorkPoint.vue";
import SiteDeviceDetailsCardHub from "@/components/sites/SiteDeviceDetailsCardHub.vue";
import SiteDetailsAddDevice from "@/components/sites/SiteDetailsAddDevice.vue";
import { debounce } from "ts-debounce";
// import SiteDeviceDetailsCardHub from "@/components/sites/SiteDeviceDetailsCardHub.vue";
export default defineComponent({
  props: {
    siteData: {
      type: Object,
      required: true,
    },
  },
  components: {
    SiteDeviceDetailsCardWorkPoint,
    SiteDeviceDetailsCardHub,
    SiteDetailsAddDevice,
  },
  setup() {
    const loading = ref(false);
    const addDeviceDialog = ref(false);
    const editDeviceDialog = ref(false);
    const editData = ref({} as DeviceResponse);
    const category = ref("workpoints");
    const route = useRoute();
    const totalRecord = ref(0);
    const workPointData = ref([] as Array<WorkPointResponse>);
    const hubData = ref([] as Array<HubResponse>);
    const id = computed(() => route.params.id as string);
    const params = reactive({
      officeID: id.value,
      name: null,
      page: "1",
      limit: "9",
    });
    async function fetchDevice() {
      loading.value = true;
      if (category.value == "workpoints") {
        await WorkPoints.get(params).then((res) => {
          totalRecord.value = res.totalRecords;
          workPointData.value = res.data;
        });
      }
      if (category.value == "hubs") {
        await Hubs.get(params).then((res) => {
          totalRecord.value = res.totalRecords;
          hubData.value = res.data;
        });
      }

      loading.value = false;
    }
    const search = debounce(async () => {
      fetchDevice();
    }, 700);
    function changePage(page: number) {
      params.page = page.toString();
      fetchDevice();
    }
    onMounted(() => {
      fetchDevice();
    });
    return {
      workPointData,
      loading,
      params,
      search,
      changePage,
      hubData,
      fetchDevice,
      totalRecord,
      category,
      addDeviceDialog,
      editData,
      editDeviceDialog,
    };
  },
});
</script>
