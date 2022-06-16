<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <el-drawer
    title="Add Workpoint"
    v-model="open"
    direction="rtl"
    :size="width"
    placeholder="background: #ffff"
  >
    <div class="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
      <div class="relative flex-1 px-4 sm:px-6">
        <div class="absolute inset-0 px-4 sm:px-6">
          <div class="h-full border-gray-200" aria-hidden="true">
            <form class="space-y-8 divide-y divide-gray-200">
              <div class="space-y-8 divide-y divide-gray-200">
                <div>
                  <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div class="sm:col-span-6">
                      <label
                        for="username"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Name
                      </label>
                      <div class="mt-1 flex rounded-md shadow-sm">
                        <el-input
                          v-model="hubForm.name"
                          placeholder="Input workpoint name"
                          readonly
                          class="w-full"
                        >
                        </el-input>
                      </div>
                    </div>

                    <div class="sm:col-span-6">
                      <label
                        for="username"
                        class="block text-sm font-medium text-gray-700"
                      >
                        MAC Address
                      </label>
                      <div class="mt-1 flex rounded-md shadow-sm">
                        <el-input
                          v-model="hubForm.mac"
                          @input="handleMac"
                          placeholder="Input mac address"
                          class="w-full"
                        ></el-input>
                      </div>
                    </div>

                    <div class="sm:col-span-6">
                      <label
                        for="username"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Building
                      </label>
                      <div class="mt-1 flex rounded-md shadow-sm">
                        <el-select
                          filterable
                          @change="changeSite"
                          v-model="hubForm.buildingId"
                          placeholder="Select building"
                          class="w-full"
                        >
                          <el-option
                            v-for="(building, index) in buildings.data"
                            :key="index"
                            :value="building.buildingID"
                            :label="building.name"
                          ></el-option>
                        </el-select>
                      </div>
                    </div>
                    <div class="sm:col-span-6">
                      <label
                        for="username"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Floor
                      </label>
                      <div class="mt-1 flex rounded-md shadow-sm">
                        <el-select
                          filterable
                          @change="changeFloor"
                          v-model="hubForm.floorId"
                          placeholder="Select floor"
                          class="w-full"
                        >
                          <el-option
                            v-for="(floor, index) in floors"
                            :key="index"
                            :value="floor.floorID"
                            :label="floor.name"
                          ></el-option>
                        </el-select>
                      </div>
                    </div>
                    <div class="sm:col-span-6">
                      <label
                        for="username"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Neighborhood
                      </label>
                      <div class="mt-1 flex rounded-md shadow-sm">
                        <el-select
                          filterable
                          @change="changeArea"
                          v-model="hubForm.areaId"
                          placeholder="Select floor"
                          class="w-full"
                        >
                          <el-option
                            v-for="(area, index) in neighborhoods"
                            :key="index"
                            :value="area.id"
                            :label="area.name"
                          ></el-option>
                        </el-select>
                      </div>
                    </div>

                    <div class="sm:col-span-6">
                      <label
                        for="username"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Hub
                      </label>
                      <div class="mt-1 flex rounded-md shadow-sm">
                        <el-select
                          filterable
                          v-model="hubForm.hubId"
                          placeholder="Select hub"
                          class="w-full"
                        >
                          <el-option
                            v-for="(area, index) in hubs"
                            :key="index"
                            :value="area.id"
                            :label="area.name"
                          ></el-option>
                        </el-select>
                      </div>
                    </div>
                    <!-- <div class="sm:col-span-6">
                      <label
                        for="username"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Location Type
                      </label>
                      <div class="mt-1 flex rounded-md shadow-sm">
                        <el-select
                          filterable
                          v-model="hubForm.locationType"
                          placeholder="Select floor"
                          class="w-full"
                        >
                          <el-option :value="0" label="Workstation"></el-option>
                          <el-option :value="1" label="Room"></el-option>
                        </el-select>
                      </div>
                    </div> -->
                    <div class="sm:col-span-6">
                      <label
                        for="username"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Space Type
                      </label>
                      <div class="mt-1 flex rounded-md shadow-sm">
                        <el-select
                          filterable
                          v-model="hubForm.spaceType"
                          placeholder="Select floor"
                          class="w-full"
                        >
                          <el-option
                            v-for="space in spaceTypes"
                            :key="space.id"
                            :value="space.id"
                            :label="space.value"
                          ></el-option>
                        </el-select>
                      </div>
                    </div>
                    <div class="sm:col-span-6">
                      <label
                        for="username"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Device Type
                      </label>
                      <div class="mt-1 flex rounded-md shadow-sm">
                        <el-select
                          filterable
                          v-model="hubForm.model"
                          placeholder="Select floor"
                          class="w-full"
                        >
                          <el-option
                            v-for="device in deviceTypes"
                            :key="device.id"
                            :value="device.id"
                            :label="device.value"
                          ></el-option>
                        </el-select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="py-5">
                <div class="flex justify-end">
                  <el-button
                    @click="open = false"
                    type="button"
                    class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                  >
                    Cancel
                  </el-button>
                  <el-button
                    :disabled="disabledSave"
                    :loading="buttonLoading"
                    @click="createWorkPoint"
                    type="primary"
                    class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white"
                  >
                    Save
                  </el-button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </el-drawer>
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
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { XIcon } from "@heroicons/vue/outline";
import { Hubs, Neighborhood, Sites, WorkPoints } from "@/api/app.service";
import {
  EPRPaginationV2Response,
  FloorResponse,
  HubResponse,
  NeighborhoodResponse,
  OfficeResponse,
  SpaceTypeResponse,
  WorkPointResponse,
} from "@/api/response.types";
import { CreateWorkPointPayload } from "@/api/payload.type";
import AttachFile from "@/components/AttachFile.vue";
import { ERP_API_URL } from "@/common/config";
import { HubParameters } from "@/api/query.types";
export default defineComponent({
  props: {
    editData: {
      type: Object as PropType<WorkPointResponse>,
    },
    hub: {
      type: Object as PropType<HubResponse>,
    },
  },
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    XIcon,
    AttachFile,
  },
  setup(props, context) {
    const open = ref(false);
    const hubForm = reactive({
      id: null,
      name: "iSensor",
      mac: null,
      areaId: null,
      buildingId: null,
      floorId: null,
      hubId: null,
      isActive: false,
      spaceType: null,
      model: null,
    } as CreateWorkPointPayload);
    const buildingParams = reactive({
      pageNumber: 1,
      pageSize: 1000,
    });
    const buildings = ref({
      data: [],
      paging: {
        pageNo: 0,
        pageSize: 0,
        pageCount: 0,
        totalRecordCount: 0,
      },
    } as EPRPaginationV2Response<OfficeResponse>);

    const floors = ref([] as FloorResponse["floors"]);
    const neighborhoods = ref([] as NeighborhoodResponse[]);
    const hubs = ref([] as HubResponse[]);
    async function fetchBuildings() {
      await Sites.get(buildingParams).then((res) => {
        buildings.value = res;
      });
    }
    async function changeSite(event: number) {
      await Sites.show(event).then((res) => {
        floors.value = res.floors;
      });
    }
    const hubParams = reactive({
      floorId: null,
      areaId: null,
      filter: null,
      isActive: true,
    } as HubParameters);

    async function changeFloor(event: number) {
      await Neighborhood.showByFloor(event).then((res) => {
        neighborhoods.value = res;
      });
      hubParams.floorId = event;
      await Hubs.get(hubParams).then((res) => {
        hubs.value = res;
      });
    }

    async function mutateWorkPointSide(
      action: boolean,
      event: WorkPointResponse | undefined
    ) {
      await fetchBuildings();
      if (event) {
        await WorkPoints.show(event.id).then((res) => {
          hubForm.id = res.id;
          hubForm.name = res.name;
          hubForm.mac = res.mac;
          hubForm.areaId = res.areaId;
          hubForm.buildingId = res.area.buildingId;
          hubForm.floorId = res.area.floorId;
          hubForm.hubId = res.hubId;
          hubForm.spaceType = res.spaceType;
          hubForm.model = res.model;
          hubForm.mac = res.mac;
          hubForm.isActive = res.isActive;
          changeSite(hubForm.buildingId);
          changeFloor(hubForm.floorId);
        });
      } else {
        hubForm.id = null;
        hubForm.name = "iSensor";
        hubForm.mac = null;
        hubForm.areaId = null;
        hubForm.buildingId = null;
        hubForm.floorId = null;
        hubForm.hubId = null;
        hubForm.spaceType = null;
        if (props.hub) {
          hubForm.areaId = props.hub.areaId;
          hubForm.buildingId = props.hub.floor.buildingID;
          hubForm.floorId = props.hub.floor.floorID;
          hubForm.hubId = props.hub.id;
          changeSite(hubForm.buildingId);
          changeFloor(hubForm.floorId);
        }
        hubForm.spaceType = 0;
        hubForm.model = 1;
      }

      open.value = true;
    }
    const uploadURL = `${ERP_API_URL}/Azure/blob/upload`;
    const buttonLoading = ref(false);
    const editId = ref(0);

    const disabledSave = computed(() => {
      if (
        !hubForm.buildingId ||
        !hubForm.floorId ||
        !hubForm.areaId ||
        !hubForm.name ||
        !hubForm.mac ||
        !hubForm.hubId ||
        !hubForm.mac ||
        hubForm.spaceType == null
      )
        return true;
      return false;
    });

    async function createWorkPoint() {
      if (hubForm.id) {
        buttonLoading.value = true;
        await WorkPoints.putDetails(hubForm, hubForm.id)
          .then(() => {
            buttonLoading.value = false;
            open.value = false;
            context.emit("reload");
          })
          .catch(() => {
            buttonLoading.value = false;
          });
      } else {
        hubForm.isActive = false;
        buttonLoading.value = true;
        await WorkPoints.post(hubForm)
          .then(() => {
            buttonLoading.value = false;
            open.value = false;
            context.emit("reload");
          })
          .catch(() => {
            buttonLoading.value = false;
          });
      }
      hubForm.name = "iSensor";
      hubForm.mac = null;
      hubForm.areaId = null;
      hubForm.buildingId = null;
      hubForm.floorId = null;
      hubForm.hubId = null;
      hubForm.spaceType = 0;
    }

    const spaceTypes = ref([] as SpaceTypeResponse[]);
    const deviceTypes = ref([] as SpaceTypeResponse[]);
    async function fetchSpaceType() {
      await WorkPoints.getSpaceTypes().then((res) => {
        spaceTypes.value = res;
      });
    }
    async function fetchDeviceType() {
      await WorkPoints.getDeviceTypes().then((res) => {
        deviceTypes.value = res;
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
      fetchSpaceType();
      fetchDeviceType();
      window.addEventListener("resize", handleResize);
      const h = window.innerWidth;
      if (h < 500) {
        width.value = "100%";
      }
    });
    // function handleFiles(event: Array<string>) {
    //   neighborhoodForm.floorPlanImage = event[0];
    //   console.log(event);
    // }
    function handleMac(event: string) {
      const r = /([a-f0-9]{2})([a-f0-9]{2})/i;
      let str = event.replace(/[^a-f0-9]/gi, "");

      while (r.test(str)) {
        str = str.replace(r, "$1" + ":" + "$2");
      }
      // console.log(str.slice(0, 17));
      hubForm.mac = str.slice(0, 17).toUpperCase();
      hubForm.name = `iSensor-${hubForm.mac.slice(hubForm.mac.length - 5)}`;
    }
    return {
      width,
      open,
      mutateWorkPointSide,
      hubForm,
      fetchBuildings,
      buildings,
      changeSite,
      floors,
      buttonLoading,
      changeFloor,
      uploadURL,
      neighborhoods,
      spaceTypes,
      hubs,
      createWorkPoint,
      disabledSave,
      handleMac,
      deviceTypes,
    };
  },
});
</script>
