<template>
  <AppSubHeaderV2>
    <template v-slot:title>
      <div class="flex  items-center space-x-5">
        <div class="flex-shrink-0">
          <div class="relative">
            <img
              class="h-14 w-14 rounded-full object-cover"
              :src="details.siteImage"
              alt=""
            />
            <span
              class="absolute inset-0 shadow-inner rounded-full"
              aria-hidden="true"
            ></span>
          </div>
        </div>
        <div>
          <h1 class="text-md md:text-2xl font-bold text-white">
            {{ details.name }}
          </h1>
          <div class="flex space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-primary"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clip-rule="evenodd"
              />
            </svg>
            <p
              class="text-sm md:text-md font-medium  flex my-auto truncate text-white"
            >
              {{ details.line1 }}
            </p>
          </div>
        </div>
      </div></template
    >
    <template v-slot:action>
      <div class="flex justify-center my-auto">
        <el-radio-group
          class="flex my-auto"
          size="small"
          :model-value="pkView"
          @change="router.replace({ query: { pk: $event } })"
        >
          <el-radio-button label="monitoring"
            ><span class="hidden md:inline">Live</span>
            Monitoring</el-radio-button
          >
          <el-radio-button label="analytics"
            ><span class="hidden md:inline">Workplace</span>
            Analytics</el-radio-button
          >
        </el-radio-group>
      </div>
    </template>
  </AppSubHeaderV2>

  <main class="overflow-y-auto h-full">
    <div class="max-w-8xl mx-auto py-3 sm:px-6 lg:px-8">
      <div class=" pb-5" v-if="isAccessAllowed && pkView == 'monitoring'">
        <div class="rounded-lg px-2 md:px-0  ">
          <div class="rounded-lg">
            <div
              class="hidden md:grid-cols-3 md:grid-cols-4 md:grid-cols-5 md:grid-cols-6"
            ></div>
            <div>
              <dl
                :class="
                  `grid grid-cols-2 gap-2 md:gap-5 sm:grid-cols-2 md:grid-cols-${stats.length}`
                "
              >
                <div
                  class="flex items-center w-full justify-around p-3 md:p-6 bg-white rounded-xl space-x-2  border"
                  v-for="item in stats"
                  :key="item"
                >
                  <div>
                    <span
                      class="text-xs md:text-sm font-semibold text-gray-400"
                      >{{ item.name }}</span
                    >
                    <h1 class="text-lg md:text-2xl font-bold">
                      {{ item.stat }}
                    </h1>
                  </div>
                  <div>
                    <component
                      :is="item.icon"
                      class="h-5 w-5 md:h-8 md:w-8 text-primary"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
      <div
        class="space-y-2 flex-row md:flex md:space-y-0 justify-between  pb-4 px-2 md:px-0"
      >
        <div
          class="flex justify-center space-x-3 w-full md:w-auto   rounded"
          v-if="pkView == 'monitoring'"
        >
          <el-radio-group size="small" v-model="mode" @change="changeMode">
            <el-radio-button :label="1" size="small">Live</el-radio-button>
            <el-radio-button :label="2" size="small">History</el-radio-button>
            <el-radio-button :label="3" size="small">Heatmap</el-radio-button>
          </el-radio-group>
        </div>

        <div class="hidden md:block">
          <el-date-picker
            v-if="(mode == 2 || mode == 3) && pkView == 'monitoring'"
            size="small"
            v-model="timeRange"
            @change="changeTime"
            format="MMM DD, YYYY hh:mma"
            style="width: 100%"
            type="datetimerange"
            :shortcuts="shortcuts"
            range-separator="-"
            start-placeholder="Start date"
            end-placeholder="End date"
          >
          </el-date-picker>

          <el-date-picker
            style="width: 100%"
            size="small"
            v-if="pkView == 'analytics'"
            format="MMM DD, YYYY"
            v-model="analyticsRange"
            @change="changeAnalyticsDate"
            type="daterange"
            range-separator="-"
            start-placeholder="Start date"
            end-placeholder="End date"
          >
          </el-date-picker>
        </div>
        <div
          class="block md:hidden text-center border rounded-md"
          v-if="(mode == 2 || mode == 3) && pkView == 'monitoring'"
        >
          <van-cell
            :title="
              `${format(
                new Date(timeRange[0]),
                'MMM dd, yyyy hh:mm a'
              )} - ${format(new Date(timeRange[1]), 'MMM dd, yyyy hh:mm a')}`
            "
            @click="showFirstDate = true"
          />
          <van-popup v-model:show="showFirstDate" position="bottom ">
            <van-datetime-picker
              v-model="firstDate"
              type="datetime"
              title="Choose DateTime"
              @confirm="confirmFirstDate"
              @cancel="showFirstDate = false"
          /></van-popup>

          <van-popup v-model:show="showSecondDate" position="bottom ">
            <van-datetime-picker
              :min-date="firstDate"
              v-model="secondDate"
              type="datetime"
              title="Choose DateTime"
              @confirm="confirmSecondDate"
              @cancel="showSecondDate = false"
          /></van-popup>
        </div>
        <div
          class="block md:hidden text-center border rounded-md"
          v-if="pkView == 'analytics'"
        >
          <van-cell
            :title="
              `${format(
                new Date(analyticsRange[0]),
                'MMMM dd, yyyy'
              )} - ${format(new Date(analyticsRange[1]), 'MMMM dd, yyyy')}`
            "
            @click="showAnalyticFirstDate = true"
          />

          <van-calendar
            :default-date="[
              new Date(analyticsRange[0]),
              new Date(analyticsRange[1]),
            ]"
            color="#f99d3a"
            type="range"
            :minDate="new Date(2010, 0, 1)"
            @confirm="confirmAnalyticSecondDate"
            v-model:show="showAnalyticFirstDate"
          />
        </div>
      </div>
      <Analytics
        ref="analyticsCharts"
        :dateRange="analyticsRange"
        v-if="pkView == 'analytics'"
      />
      <div class=" border bg-gray-50  pt-0 " v-if="pkView == 'monitoring'">
        <div
          class="p-5 flex flex-col md:flex-row items-center md:justify-between space-x-3 p-2 space-y-3 md:space-y-0 rounded-md"
          v-if="isAccessAllowed"
        >
          <MonitoringLegends v-if="mode == 2 || mode == 1" />
          <el-checkbox size="medium" v-model="showPreview"
            >Show Name</el-checkbox
          >
        </div>
        <div class="overflow-auto">
          <LiveMonitoring
            ref="monitoring"
            v-if="mode == 2 || mode == 1"
            :details="details"
            :workPoints="workPoints"
            :hubs="hubs"
            :telemetryLogs="telemetryLogs"
            :mode="mode"
            :image="image"
            :coordinates="coordinates"
            :showPreview="showPreview"
            @changeTime="changeTime"
          />

          <Heatmap
            v-if="mode == 3"
            :details="details"
            :timeRange="timeRange"
            :image="image"
            :coordinates="coordinates"
            ref="heatMap"
          />
        </div>
      </div>
    </div>
  </main>
</template>
<script lang="ts">
import {
  AirQuality,
  Hubs,
  Neighborhood,
  Telemetry,
  Temperature,
  WorkPoints,
} from "@/api/app.service";
import {
  AirQualityResponse,
  HubResponse,
  NeighborhoodResponse,
  TelemetryResponse,
  TemperatureHumidityResponse,
  WorkPointResponse,
} from "@/api/response.types";
import {
  computed,
  defineComponent,
  nextTick,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";
import { useRoute } from "vue-router";
import { ArrowSmDownIcon, ArrowSmUpIcon } from "@heroicons/vue/solid";
import { UsersIcon } from "@heroicons/vue/outline";
import { dateRange } from "@/common/date.filter";
import { TelemetryPayload, WorkPointPayload } from "@/api/payload.type";
import VueDragResize from "vue-drag-resize";
import { store } from "@/store";

import { AuthMutationTypes } from "@/store/modules/types/mutation-types";
import { format } from "date-fns";
import { isAccessAllowed } from "@/common/access.security";
import { airQuality } from "@/components/neighborhood/functions";
import MeetingRoomIcon from "@/svg-components/MeetingRoomIcon.vue";
import TemperatureIcon from "@/svg-components/TemperatureIcon.vue";
import AirQualityIcon from "@/svg-components/AirQualityIcon.vue";
import HumidityIcon from "@/svg-components/HumidityIcon.vue";
import Analytics from "@/components/monitor/Analytics.vue";
import LiveMonitoring from "@/components/monitor/LiveMonitoring.vue";
import MonitoringLegends from "@/components/monitor/MonitoringLegends.vue";
import Heatmap from "@/components/monitor/Heatmap.vue";
import router from "@/router";
import { shortcuts } from "@/components/monitor/functions";
import { VForm } from "@/store/modules/types/types";
import AppSubHeaderV2 from "@/components/layout/AppSubHeaderV2.vue";
import { HubParameters } from "@/api/query.types";
import { CropImageResponse } from "@/common/types";
import CropPreview from "@/components/floorplan/CropPreview.vue";
import { API_URL } from "@/common/config";
export default defineComponent({
  components: {
    ArrowSmDownIcon,
    ArrowSmUpIcon,
    VueDragResize,
    Analytics,
    LiveMonitoring,
    MonitoringLegends,
    Heatmap,
    AppSubHeaderV2,
    CropPreview,
  },
  setup() {
    const route = useRoute();
    const monitoring = ref(null as null | VForm);
    const showPreview = ref(false);
    const mode = ref(1);
    const loading = ref(false);
    const showFirstDate = ref(false);
    const showAnalyticFirstDate = ref(false);
    const showSecondDate = ref(false);
    const showAnalyticSecondDate = ref(false);
    const firstDate = ref(new Date(dateRange(240)[0]));
    const analyticFirstDate = ref(new Date());
    const secondDate = ref(new Date(dateRange(240)[1]));
    const analyticSecondDate = ref(new Date());
    const lastDate = ref(new Date());
    const timeRange = ref([dateRange(240)[0], dateRange(240)[1]] as Array<
      string
    >);
    const analyticsRange = ref([
      dateRange(5760)[0],
      dateRange(5760)[1],
    ] as Array<string>);
    const analyticsCharts = ref(null as null | VForm);
    const heatMap = ref(null as null | VForm);
    const Id = computed(() => route.params.id as string);
    const refreshIntervalId = ref(0);
    const pkView = computed(() => route.query.pk as string);
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
      floorplanCoordinates: {
        coordinatesHeight: 0,
        coordinatesLeft: 0,
        coordinatesTop: 0,
        coordinatesWidth: 0,
        transformHeight: 0,
        transformRotate: 0,
        transformScaleX: 0,
        transformScaleY: 0,
        transformTranslateX: 0,
        transformTranslateY: 0,
        transformWidth: 0,
      },
    } as NeighborhoodResponse);

    async function getDetails() {
      await Neighborhood.show(Id.value).then((res) => {
        details.value = res;
        store.commit(AuthMutationTypes.SET_SUBNAME, {
          subject: res.name,
          subname: `${res.floorName} ${res.buildingName}`,
          image: res.siteImage,
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
    const hubs = ref([] as HubResponse[]);
    const telemetryLogs = ref([] as TelemetryResponse[]);
    const airQualityLogs = ref({} as AirQualityResponse);
    const telemetryPayload = reactive({
      DateStart: dateRange(10)[0],
      DateEnd: dateRange(10)[1],
      AreadId: Id.value,
    } as TelemetryPayload);

    const deviceParams = reactive({
      areaId: Id.value,
    } as WorkPointPayload);

    const hubParams = reactive({
      areaId: Id.value,
      isActive: true,
    } as HubParameters);

    async function fetchWorkPoints() {
      loading.value = true;
      await WorkPoints.get(deviceParams).then((res) => {
        workPoints.value = res;
      });
      monitoring.value?.mountWorkpoint();
      loading.value = false;
    }
    async function fetchHubs() {
      loading.value = true;
      await Hubs.get(hubParams).then((res) => {
        hubs.value = res;
      });
      loading.value = false;
    }
    async function fetchLogs() {
      await Telemetry.getByAreaId(Id.value).then((res) => {
        telemetryLogs.value = res;
      });
      monitoring.value?.mountWorkpoint();
    }
    async function fetchAirQuality() {
      telemetryPayload.DateStart = dateRange(10)[0];
      telemetryPayload.DateEnd = dateRange(10)[1];
      await AirQuality.get(telemetryPayload).then((res) => {
        airQualityLogs.value = res;
      });
    }
    async function changeTime(event: Array<string>) {
      if (mode.value == 3) {
        heatMap.value?.getHeatMap();
      } else {
        telemetryPayload.DateStart = format(
          new Date(event[0]),
          "yyyy-MM-dd HH:mm:ss"
        );
        telemetryPayload.DateEnd = format(
          new Date(event[1]),
          "yyyy-MM-dd HH:mm:ss"
        );
        await Telemetry.get(telemetryPayload).then((res) => {
          telemetryLogs.value = res;
        });
      }
    }

    function changeMode() {
      if (mode.value == 1) {
        telemetryPayload.DateStart = dateRange(4)[0];
        telemetryPayload.DateEnd = dateRange(4)[1];
        fetchLogs();
      }
      if (mode.value == 3) {
        heatMap.value?.getHeatMap();
      }
      if (mode.value == 2) {
        changeTime(timeRange.value);
      }
    }

    onMounted(async () => {
      await getDetails();
      await fetchWorkPoints();
      await fetchHubs();
      await fetchLogs();
      await fetchAirQuality();

      // refreshIntervalId.value = window.setInterval(() => {
      //   if (mode.value == 1) {
      //     telemetryPayload.DateStart = dateRange(10)[0];
      //     telemetryPayload.DateEnd = dateRange(10)[1];
      //     fetchLogs();
      //   }
      // }, 30000);
      window.SignalR.start();
      window.SignalR.on(
        "UploadLogBroadCast",
        (areaId: number, data: TelemetryResponse[]) => {
          if (areaId == +Id.value) {
            telemetryLogs.value = data;

            data.map((d) => {
              const filterWorkpoint = workPoints.value.find(
                (e) => e.id == d.workPointId
              );
              if (filterWorkpoint) {
                filterWorkpoint.lastActivity = d.dateCreated;
              }
            });
          }
        }
      );
    });

    onBeforeUnmount(() => {
      clearInterval(refreshIntervalId.value);
      window.SignalR.stop();
    });
    const activeUsers = computed(() => {
      const macs = [] as Array<string>;
      if (telemetryLogs.value) {
        telemetryLogs.value.filter((f) => {
          const workpoint = workPoints.value.find((d) => d.mac == f.mac);
          if (
            workpoint &&
            (workpoint.spaceType == 0 || workpoint.spaceType == 4)
          ) {
            if (!macs.includes(f.mac)) macs.push(f.mac);
          }
        });
        return macs.length;
      }
      return 0;
    });
    const activeDevices = computed(() => {
      const macs = [] as Array<string>;
      if (workPoints.value) {
        workPoints.value.filter((f) => {
          if (f.spaceType == 0 || f.spaceType == 4) {
            if (!macs.includes(f.mac)) macs.push(f.mac);
          }
        });
        return macs.length;
      }
      return 0;
    });
    const activeRoom = computed(() => {
      const macs = [] as Array<string>;
      if (telemetryLogs.value) {
        telemetryLogs.value.filter((f) => {
          const workpoint = workPoints.value.find((d) => d.mac == f.mac);
          if (
            workpoint &&
            (workpoint.spaceType == 1 ||
              workpoint.spaceType == 2 ||
              workpoint.spaceType == 3 ||
              workpoint.spaceType == 5)
          ) {
            if (!macs.includes(f.mac)) macs.push(f.mac);
          }
        });
        return macs.length;
      }
      return 0;
    });
    const roomDevices = computed(() => {
      const macs = [] as Array<string>;
      if (workPoints.value) {
        workPoints.value.filter((f) => {
          if (
            f.spaceType == 1 ||
            f.spaceType == 2 ||
            f.spaceType == 3 ||
            f.spaceType == 5
          ) {
            if (!macs.includes(f.mac)) macs.push(f.mac);
          }
        });
        return macs.length;
      }
      return 0;
    });
    const temperature = computed(() => {
      if (airQualityLogs.value && airQualityLogs.value.temperature)
        return airQualityLogs.value.temperature.toFixed(1);
      return 0;
    });
    const humidity = computed(() => {
      if (airQualityLogs.value && airQualityLogs.value.humidity)
        return airQualityLogs.value.humidity.toFixed(1);
      return 0;
    });
    const airQualityValue = computed(() => {
      if (airQualityLogs.value && airQualityLogs.value.iaqValue)
        return +airQualityLogs.value.iaqValue.toFixed(1);
      return 0;
    });

    const stats = computed(() => {
      const occupancyRate = (activeUsers.value / activeDevices.value) * 100;
      const returnArray = [
        {
          id: 1,
          name: "Desks",
          stat: isNaN(occupancyRate)
            ? 0 + " %"
            : occupancyRate.toFixed(0) + " %",
          icon: UsersIcon,
        },
        {
          id: 2,
          name: "Meeting Rooms",
          stat: `${activeRoom.value} / ${roomDevices.value}`,
          icon: MeetingRoomIcon,
        },
      ];
      if (temperature.value > 0) {
        returnArray.push({
          id: 3,
          name: "Temperature",
          stat: temperature.value + "° C",
          icon: TemperatureIcon,
        });
      }
      if (humidity.value > 0) {
        returnArray.push({
          id: 4,
          name: "Humidity",
          stat: humidity.value + " %",
          icon: HumidityIcon,
        });
      }
      if (airQualityValue.value > 0) {
        returnArray.push({
          id: 5,
          name: "Air Quality",
          stat:
            airQuality(+airQualityValue.value.toFixed(0)) +
            " - " +
            airQualityValue.value +
            " IAQ",
          icon: AirQualityIcon,
        });
      }
      return returnArray;
    });
    function changeAnalyticsDate() {
      analyticsCharts.value?.reloadCharts();
    }
    function confirmFirstDate() {
      showFirstDate.value = false;
      setTimeout(() => {
        showSecondDate.value = true;
      }, 500);
    }
    function confirmAnalyticFirstDate() {
      showAnalyticFirstDate.value = false;
      setTimeout(() => {
        showAnalyticSecondDate.value = true;
      }, 500);
    }
    function confirmAnalyticSecondDate(dates: Date[]) {
      analyticsRange.value = [
        format(new Date(dates[0]), "yyyy-MM-dd"),
        format(new Date(dates[1]), "yyyy-MM-dd"),
      ];

      showAnalyticFirstDate.value = false;
    }
    // watch(
    //   () => analyticsRange.value,
    //   () => {
    //     analyticsCharts.value?.reloadCharts();
    //   }
    // );
    async function confirmSecondDate() {
      timeRange.value = [
        format(new Date(firstDate.value), "yyyy-MM-dd HH:mm:ss"),
        format(new Date(secondDate.value), "yyyy-MM-dd HH:mm:ss"),
      ];
      telemetryPayload.DateStart = timeRange.value[0];
      telemetryPayload.DateEnd = timeRange.value[1];
      showSecondDate.value = false;
      await Telemetry.get(telemetryPayload).then((res) => {
        telemetryLogs.value = res;
      });
    }

    const apiUrl = API_URL;
    return {
      confirmFirstDate,
      confirmSecondDate,
      router,
      isAccessAllowed,
      activeUsers,
      activeDevices,
      details,
      stats,
      loading,
      workPoints,
      telemetryLogs,
      changeMode,
      mode,
      timeRange,
      changeTime,
      shortcuts,
      pkView,
      heatMap,
      analyticsRange,
      analyticsCharts,
      changeAnalyticsDate,
      hubs,
      coordinates,
      image,
      CropPreview,
      apiUrl,
      showFirstDate,
      firstDate,
      lastDate,
      format,
      showSecondDate,
      secondDate,
      showAnalyticFirstDate,
      showAnalyticSecondDate,
      analyticFirstDate,
      analyticSecondDate,
      confirmAnalyticFirstDate,
      confirmAnalyticSecondDate,
      showPreview,
      airQuality,
      monitoring,
    };
  },
});
</script>
