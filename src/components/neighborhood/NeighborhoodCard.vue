<template>
  <div
    class="text-red-500 text-red-700 text-green-500 text-green-700 text-yellow-500 text-yellow-700 hidden"
  ></div>
  <div
    class="w-full bg-white pb-3 rounded-xl md:shadow-lg shadow transform md:hover:scale-105 transition duration-500"
  >
    <div class="relative cursor-pointer">
      <img
        @click.prevent="
          router.push({
            name: 'MonitorNeighborhood',
            params: { id: data.id },
            query: { pk: 'monitoring' },
          })
        "
        class="w-full h-64 rounded-t-xl object-cover object-center"
        :src="resizeImage(600, data.siteImage)"
      />
      <div
        class="absolute top-1 right-1 bg-white hover:bg-gray-100 text-gray-800 font-semibold px-1.5 py-0.5 rounded-full"
        v-if="isManageAllowed"
      >
        <Menu as="div" class="relative inline-block text-left w-full">
          <menu-button
            class="inline-flex mt-0.5 justify-center w-full text-sm font-medium border border-transparent focus:outline-none"
          >
            <DotsVerticalIcon
              class="w-5 h-5 text-gray-600"
              aria-hidden="true"
            />
          </menu-button>

          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <menu-items
              class="origin-top-right z-50 absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
            >
              <div class="py-1">
                <menu-item>
                  <a
                    @click.prevent="
                      router.push({
                        name: 'NeighborhoodMapping',
                        params: { id: data.id },
                      })
                    "
                    class="text-gray-700', 'group flex items-center px-4 py-2 text-sm cursor-default hover:bg-gray-50"
                  >
                    <MapIcon
                      class="w-5 h-5 pr-1 text-gray-400"
                      aria-hidden="true"
                    />
                    Device Mapping
                  </a>
                </menu-item>
                <menu-item>
                  <a
                    @click.prevent="editArea(data)"
                    class="text-gray-700', 'group flex items-center px-4 py-2 text-sm cursor-default hover:bg-gray-50"
                  >
                    <PencilIcon
                      class="w-5 h-5 pr-1 text-gray-400"
                      aria-hidden="true"
                    />
                    Edit
                  </a>
                </menu-item>
                <menu-item>
                  <a
                    @click.prevent="deleteArea(data.id)"
                    class="text-gray-700', 'group flex items-center px-4 py-2 text-sm cursor-default hover:bg-gray-50"
                  >
                    <TrashIcon
                      class="w-5 h-5 pr-1 text-gray-400"
                      aria-hidden="true"
                    />
                    Delete
                  </a>
                </menu-item>
              </div>
            </menu-items>
          </transition>
        </Menu>
      </div>
    </div>
    <div class="px-2 md:px-6">
      <h1 class="mt-4 text-gray-800 text-xl font-bold cursor-pointer">
        {{ data.name }}
      </h1>
      <div class="flex space-x-2 mt-1 ">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="h-5 w-5 text-primary"
          >
            <path
              fill-rule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
        <h3
          class="text-sm text-gray-600 font-semibold mb-2 h-10 flex my-auto box-clamp"
        >
          {{ data.line1 }}
        </h3>
      </div>
      <div
        class="py-2 px-2 md:px-4 text-center tracking-wide bg-white grid grid-cols-2 gap-2 "
      >
        <div class="flex space-x-2 text-default border-r justify-center">
          <div class="flex items-center space-x-3 ">
            <WorkStationIcon
              :class="workStationRate(data.occupancyRate, 'icon')"
            />
            <span class="block text-left">
              <h2
                class="text-sm font-semibold "
                :class="workStationRate(data.occupancyRate)"
              >
                {{ data.occupancyRate.toFixed(0) }}% Occupied
              </h2>
              <h2 class="text-xs font-medium text-gray-500">Desks</h2>
            </span>
          </div>
        </div>
        <div class="flex space-x-2 text-default justify-center">
          <div class="flex items-center space-x-3">
            <MeetingRoomIcon
              :class="
                workStationRate(
                  (data.meetingRoomsActive / data.meetingRoomsTotal) * 100,
                  'icon'
                )
              "
            />
            <span class="block text-left">
              <h2
                class="text-sm font-semibold"
                :class="
                  workStationRate(
                    (data.meetingRoomsActive / data.meetingRoomsTotal) * 100
                  )
                "
              >
                {{ data.meetingRoomsActive }}/{{ data.meetingRoomsTotal }}
                Occupied
              </h2>
              <h2 class="text-xs font-medium text-gray-500">Meeting Rooms</h2>
            </span>
          </div>
        </div>
      </div>
      <div
        class="pt-2 pb-8 px-2 md:px-4 text-center tracking-wide grid bg-white gap-2 border-t"
        :class="{
          'grid-cols-3': data.airQuality > 0,
          'grid-cols-2': data.airQuality == 0,
        }"
      >
        <div class="flex space-x-2 text-default justify-center border-r">
          <div class="flex items-center space-x-3">
            <TemperatureIcon
              v-if="data.temperature > 0"
              :class="temperatureRate(data.temperature, 'icon')"
            />
            <TemperatureIcon v-else class="text-yellow-500" />
            <span class="block text-left">
              <h2
                v-if="data.temperature > 0"
                class="text-sm font-semibold"
                :class="temperatureRate(data.temperature)"
              >
                {{ data.temperature.toFixed(1) }}° Celcius
              </h2>
              <h2 v-else class="text-sm font-semibold text-yellow-600">
                Not Available
              </h2>
              <h2 class="text-xs font-medium text-gray-500">Temperature</h2>
            </span>
          </div>
        </div>
        <div
          class="flex space-x-2 text-default justify-center "
          :class="{
            'border-r': data.airQuality > 0,
          }"
        >
          <div class="flex items-center space-x-3">
            <HumidityIcon
              v-if="data.humidity > 0"
              :class="humidityRate(data.humidity.toFixed(1), 'icon')"
            />
            <HumidityIcon v-else class="text-yellow-500" />
            <span class="block text-left">
              <h2
                v-if="data.humidity > 0"
                class="text-sm font-semibold"
                :class="humidityRate(data.humidity.toFixed(1))"
              >
                {{ data.humidity.toFixed(1) }} %
              </h2>
              <h2 v-else class="text-sm font-semibold text-yellow-600">
                Not Available
              </h2>
              <h2 class="text-xs font-medium text-gray-500">Humidity</h2>
            </span>
          </div>
        </div>
        <div
          class="flex space-x-2 text-default justify-center"
          v-if="data.airQuality > 0"
        >
          <div class="flex items-center space-x-3">
            <AirQualityIcon
              :class="airQualityRate(data.airQuality.toFixed(0), 'icon')"
            />
            <span class="block text-left">
              <h2
                class="text-sm font-semibold"
                :class="airQualityRate(data.airQuality.toFixed(0))"
              >
                {{ airQuality(data.airQuality.toFixed(0)) }} ({{
                  data.airQuality.toFixed()
                }}
                IAQ)
              </h2>
              <h2 class="text-xs font-medium text-gray-500">Air Quality</h2>
            </span>
          </div>
        </div>
      </div>
      <div class="flex space-x-2 w-full">
        <el-button
          class="w-full"
          size="medium"
          type="default"
          @click.prevent="
            router.push({
              name: 'MonitorNeighborhood',
              params: { id: data.id },
              query: { pk: 'monitoring' },
            })
          "
        >
          Monitoring
        </el-button>
        <el-button
          class="w-full"
          type="primary"
          size="medium"
          @click.prevent="
            router.push({
              name: 'MonitorNeighborhood',
              params: { id: data.id },
              query: { pk: 'analytics' },
            })
          "
          >Analytics</el-button
        >
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import router from "@/router";
import { defineComponent } from "vue";
import {
  LocationMarkerIcon,
  DesktopComputerIcon,
  ChartPieIcon,
  DotsVerticalIcon,
  MapIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/vue/outline";
import WorkStationIcon from "@/svg-components/WorkStationIcon.vue";
import MeetingRoomIcon from "@/svg-components/MeetingRoomIcon.vue";
import TemperatureIcon from "@/svg-components/TemperatureIcon.vue";
import HumidityIcon from "@/svg-components/HumidityIcon.vue";
import AirQualityIcon from "@/svg-components/AirQualityIcon.vue";
import {
  humidityRate,
  resizeImage,
  temperatureRate,
  workStationRate,
  airQualityRate,
  airQuality,
} from "@/components/neighborhood/functions";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { isManageAllowed } from "@/common/access.security";
import { NeighborhoodResponse } from "@/api/response.types";
import { API_URL } from "@/common/config";
export default defineComponent({
  components: {
    LocationMarkerIcon,
    DotsVerticalIcon,
    WorkStationIcon,
    MeetingRoomIcon,
    TemperatureIcon,
    HumidityIcon,
    DesktopComputerIcon,
    ChartPieIcon,
    AirQualityIcon,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    MapIcon,
    PencilIcon,
    TrashIcon,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(_, context) {
    function editArea(event: NeighborhoodResponse) {
      context.emit("edit", event);
    }
    function deleteArea(id: number) {
      context.emit("delete", id);
    }

    const apiUrl = API_URL;
    return {
      deleteArea,
      router,
      editArea,
      workStationRate,
      temperatureRate,
      humidityRate,
      isManageAllowed,
      apiUrl,
      resizeImage,
      airQuality,
      airQualityRate,
    };
  },
});
</script>
