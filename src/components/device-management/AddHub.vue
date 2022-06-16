<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <el-drawer
    title="Add Hub"
    v-model="open"
    direction="rtl"
    :size="width"
    placeholder="background: #ffff"
  >
    <div
      class="h-full flex flex-col bg-white shadow-xl overflow-y-scroll"
      v-if="open"
    >
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
                          placeholder="Input hub name"
                          class="w-full"
                          readonly
                        ></el-input>
                      </div>
                    </div>
                    <div class="sm:col-span-6">
                      <label
                        for="username"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Device Model
                      </label>
                      <div class="mt-1 flex rounded-md shadow-sm">
                        <el-input
                          v-model="hubForm.deviceModel"
                          placeholder="Input device model"
                          class="w-full"
                        ></el-input>
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
                          placeholder="Input mac address"
                          @input="handleMac($event)"
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
                        Area
                      </label>
                      <div class="mt-1 flex rounded-md shadow-sm">
                        <el-select
                          filterable
                          v-model="hubForm.areaId"
                          placeholder="Select Area"
                          class="w-full"
                          @change="handleAreaChange"
                        >
                          <el-option
                            v-for="(neighborhood, index) in neighborhoods"
                            :key="index"
                            :value="neighborhood.id"
                            :label="neighborhood.name"
                          ></el-option>
                        </el-select>
                      </div>
                    </div>
                    <div class="sm:col-span-6">
                      <label
                        for="username"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Active
                      </label>
                      <div class="mt-1 flex rounded-md shadow-sm">
                        <el-select class="w-full" v-model="hubForm.isActive">
                          <el-option :value="true" label="Yes"></el-option>
                          <el-option :value="false" label="No"></el-option>
                        </el-select>
                      </div>
                    </div>

                    <!-- <h2 class="font-semibold text-md">Configurations</h2> -->
                    <div class="sm:col-span-3">
                      <label
                        for="username"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Occupancy Cloud Freq.
                        <el-tooltip
                          content="Measurement of time to publish occupancy data"
                          placement="top"
                          effect="dark"
                        >
                          <i class="el-icon-info"></i>
                        </el-tooltip>
                      </label>
                      <div class="mt-1 flex rounded-md shadow-sm">
                        <el-input
                          placeholder="Input cloud frequency"
                          v-model.number="hubForm.movementFrequency"
                          @change="
                            $event < 30
                              ? (hubForm.movementFrequency = 30)
                              : hubForm.movementFrequency
                          "
                          :min="30"
                        >
                          <template #append>sec</template>
                        </el-input>
                      </div>
                    </div>
                    <div class="sm:col-span-3">
                      <label
                        for="username"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Temp/Humidity Cloud Freq.
                        <el-tooltip
                          content="Measurement of time to publish temperature and humidity data"
                          placement="top"
                          effect="dark"
                        >
                          <i class="el-icon-info"></i>
                        </el-tooltip>
                      </label>
                      <div class="mt-1 flex rounded-md shadow-sm">
                        <el-input
                          placeholder="Input temp/humidity frequency"
                          v-model.number="hubForm.tempHumidityFrequency"
                          @change="
                            $event < 30
                              ? (hubForm.tempHumidityFrequency = 30)
                              : hubForm.tempHumidityFrequency
                          "
                          :min="30"
                        >
                          <template #append>sec</template>
                        </el-input>
                      </div>
                    </div>
                    <div class="sm:col-span-3">
                      <label
                        for="username"
                        class="block text-sm font-medium text-gray-700"
                      >
                        BLE Scan Frequency
                        <el-tooltip
                          content="Measurement of time to scan for devices"
                          placement="top"
                          effect="dark"
                        >
                          <i class="el-icon-info"></i>
                        </el-tooltip>
                      </label>
                      <div class="mt-1 flex rounded-md shadow-sm">
                        <el-input
                          placeholder="Input scan frequency"
                          v-model.number="hubForm.hubScanFrequency"
                          @change="
                            $event < 10
                              ? (hubForm.hubScanFrequency = 10)
                              : hubForm.hubScanFrequency
                          "
                          :min="10"
                        >
                          <template #append>sec</template>
                        </el-input>
                      </div>
                    </div>
                    <div class="sm:col-span-3">
                      <label
                        for="username"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Reset BLE Frequency
                        <el-tooltip
                          content="Measurement of time to check if device has failed too many times to reboot "
                          placement="top"
                          effect="dark"
                        >
                          <i class="el-icon-info"></i>
                        </el-tooltip>
                      </label>
                      <div class="mt-1 flex rounded-md shadow-sm">
                        <el-input
                          placeholder="Input reset ble frequency"
                          v-model.number="hubForm.hubResetAttempts"
                          @change="
                            $event < 10
                              ? (hubForm.hubResetAttempts = 10)
                              : hubForm.hubResetAttempts
                          "
                          :min="10"
                        >
                          <template #append>sec</template>
                        </el-input>
                      </div>
                    </div>
                    <div class="sm:col-span-3">
                      <label
                        for="username"
                        class="block text-sm font-medium text-gray-700"
                      >
                        BLE Limit Failures
                      </label>
                      <div class="mt-1 flex rounded-md shadow-sm">
                        <el-input
                          placeholder="Input BLE limit failures frequency"
                          v-model.number="hubForm.hubFailureLimitFailures"
                          @change="
                            $event < 5
                              ? (hubForm.hubFailureLimitFailures = 5)
                              : hubForm.hubFailureLimitFailures
                          "
                          :min="5"
                        >
                        </el-input>
                      </div>
                    </div>
                    <div class="sm:col-span-3">
                      <label
                        for="username"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Workpoint List Update Freq.
                        <el-tooltip
                          content="Measurement of time to check and update the workpoint local list"
                          placement="top"
                          effect="dark"
                        >
                          <i class="el-icon-info"></i>
                        </el-tooltip>
                      </label>
                      <div class="mt-1 flex rounded-md shadow-sm">
                        <el-input
                          placeholder="Input workpoint list update frequency"
                          v-model.number="hubForm.hubWorkPointListUpdate"
                          @change="
                            $event < 30
                              ? (hubForm.hubWorkPointListUpdate = 30)
                              : hubForm.hubWorkPointListUpdate
                          "
                          :min="30"
                        >
                          <template #append>sec</template>
                        </el-input>
                      </div>
                    </div>
                    <div class="sm:col-span-3">
                      <label
                        for="username"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Hub Config Update Frequency
                        <el-tooltip
                          content="Measurement of time to check and update the the device configurations"
                          placement="top"
                          effect="dark"
                        >
                          <i class="el-icon-info"></i>
                        </el-tooltip>
                      </label>
                      <div class="mt-1 flex rounded-md shadow-sm">
                        <el-input
                          placeholder="Input hub config update frequency"
                          v-model.number="hubForm.configResetFrequency"
                          @change="
                            $event < 30
                              ? (hubForm.configResetFrequency = 30)
                              : hubForm.configResetFrequency
                          "
                          :min="30"
                        >
                          <template #append>sec</template>
                        </el-input>
                      </div>
                    </div>
                    <div class="sm:col-span-3">
                      <label
                        for="username"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Monitoring Refresh Rate
                      </label>
                      <div class="mt-1 flex rounded-md shadow-sm">
                        <el-input
                          placeholder="Input hub config update frequency"
                          v-model.number="hubForm.refreshInterval"
                          @change="
                            $event < 60
                              ? (hubForm.refreshInverval = 60)
                              : hubForm.refreshInverval
                          "
                          :min="30"
                        >
                          <template #append>sec</template>
                        </el-input>
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
                    @click="createHub"
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
        <!-- /End replace -->
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
import { Hubs, Neighborhood, Sites } from "@/api/app.service";
import {
  EPRPaginationV2Response,
  FloorResponse,
  HubResponse,
  NeighborhoodResponse,
  OfficeResponse,
} from "@/api/response.types";
import { DevicePayload } from "@/api/payload.type";
import AttachFile from "@/components/AttachFile.vue";
import { ERP_API_URL } from "@/common/config";
import { NetworkType } from "@/api/enum";
export default defineComponent({
  props: {
    editData: {
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
      buildingId: null,
      floorId: null,
      areaId: null,
      name: "iHub",
      mac: null,
      deviceModel: null,
      movementFrequency: 120,
      tempHumidityFrequency: 120,
      hubScanFrequency: 10,
      hubResetAttempts: 30,
      hubFailureLimitFailures: 10,
      hubWorkPointListUpdate: 120,
      configResetFrequency: 120,
      refreshInterval: 300,
      isActive: false,
    } as DevicePayload);
    const floors = ref([] as FloorResponse["floors"]);
    const neighborhoods = ref([] as NeighborhoodResponse[]);
    async function changeSite(event: number) {
      await Sites.show(event).then((res) => {
        floors.value = res.floors;
      });
    }
    async function changeFloor(event: number) {
      await Neighborhood.showByFloor(event).then((res) => {
        neighborhoods.value = res;
      });
    }
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
    async function fetchBuildings() {
      await Sites.get(buildingParams).then((res) => {
        buildings.value = res;
      });
    }
    async function mutateHubSide(
      action: boolean,
      event: HubResponse | undefined
    ) {
      await fetchBuildings();
      if (event) {
        hubForm.id = event.id;
        hubForm.name = event.name;
        hubForm.mac = event.mac;
        hubForm.deviceModel = event.deviceModel;
        hubForm.areaId = event.areaId;
        hubForm.floorId = event.floorId;
        hubForm.buildingId = event.floor.buildingID;
        hubForm.isActive = event.isActive;
        if (event?.hubConfiguration) {
          hubForm.movementFrequency = event.hubConfiguration.movementFrequency;
          hubForm.tempHumidityFrequency =
            event.hubConfiguration.movementFrequency;
          hubForm.hubScanFrequency = event.hubConfiguration.hubScanFrequency;
          hubForm.hubResetAttempts = event.hubConfiguration.hubResetAttempts;
          hubForm.hubFailureLimitFailures =
            event.hubConfiguration.hubFailureLimitFailures;
          hubForm.hubWorkPointListUpdate =
            event.hubConfiguration.hubWorkPointListUpdate;
          hubForm.configResetFrequency =
            event.hubConfiguration.configResetFrequency;
          hubForm.refreshInterval = event.hubConfiguration.refreshInterval;
        }

        changeSite(event.floor.buildingID);
        changeFloor(event.floorId);
      } else {
        hubForm.id = null;
        hubForm.name = "iHub";
        hubForm.mac = null;
        hubForm.deviceModel = null;
        hubForm.floorId = null;
        hubForm.areaId = null;
        hubForm.buildingId = null;
        hubForm.movementFrequency = 120;
        hubForm.tempHumidityFrequency = 120;
        hubForm.hubScanFrequency = 10;
        hubForm.hubResetAttempts = 30;
        hubForm.hubFailureLimitFailures = 10;
        hubForm.hubWorkPointListUpdate = 120;
        hubForm.configResetFrequency = 120;
      }

      open.value = action;
    }
    const uploadURL = `${ERP_API_URL}/Azure/blob/upload`;
    const buttonLoading = ref(false);

    const disabledSave = computed(() => {
      if (
        !hubForm.floorId ||
        !hubForm.name ||
        !hubForm.mac ||
        !hubForm.deviceModel ||
        !hubForm.areaId
      )
        return true;
      return false;
    });

    async function createHub() {
      if (hubForm.id) {
        buttonLoading.value = true;
        await Hubs.put(hubForm, hubForm.id)
          .then(() => {
            buttonLoading.value = false;
            open.value = false;
            context.emit("reload");
          })
          .catch(() => {
            buttonLoading.value = false;
          });
      } else {
        buttonLoading.value = true;
        await Hubs.post(hubForm)
          .then(() => {
            buttonLoading.value = false;
            open.value = false;
            context.emit("reload");
          })
          .catch(() => {
            buttonLoading.value = false;
          });
      }
      hubForm.name = "iHub";
      hubForm.mac = null;
      hubForm.deviceModel = null;
      hubForm.floorId = null;
      hubForm.areaId = null;
      hubForm.buildingId = null;
      hubForm.movementFrequency = 120;
      hubForm.tempHumidityFrequency = 120;
      hubForm.hubScanFrequency = 10;
      hubForm.hubResetAttempts = 30;
      hubForm.hubFailureLimitFailures = 10;
      hubForm.hubWorkPointListUpdate = 120;
      hubForm.configResetFrequency = 120;
    }

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
    function handleMac(event: string) {
      const neighbor = neighborhoods.value.find((d) => d.id == hubForm.areaId);

      const r = /([a-f0-9]{2})([a-f0-9]{2})/i;
      let str = event.replace(/[^a-f0-9]/gi, "");

      while (r.test(str)) {
        str = str.replace(r, "$1" + ":" + "$2");
      }
      // console.log(str.slice(0, 17));
      hubForm.mac = str.slice(0, 17).toUpperCase();
      if (neighbor) {
        hubForm.name = `iHub-${hubForm.mac.slice(
          hubForm.mac.length - 5
        )} | ${neighbor.name.toUpperCase()}`;
      } else {
        hubForm.name = `iHub-${hubForm.mac.slice(hubForm.mac.length - 5)}`;
      }
    }
    function handleAreaChange(event: number) {
      const neighbor = neighborhoods.value.find((d) => d.id == event);
      if (neighbor) {
        if (hubForm.mac) {
          hubForm.name = `iHub-${hubForm.mac.slice(
            hubForm.mac.length - 5
          )} | ${neighbor.name.toUpperCase()}`;
        } else {
          hubForm.name = `iHub | ${neighbor.name.toUpperCase()}`;
        }
      }
    }

    return {
      width,
      handleMac,
      open,
      mutateHubSide,
      hubForm,
      fetchBuildings,
      buildings,
      changeSite,
      floors,
      buttonLoading,
      changeFloor,
      uploadURL,
      neighborhoods,
      disabledSave,
      createHub,
      handleAreaChange,
      NetworkType,
    };
  },
});
</script>
