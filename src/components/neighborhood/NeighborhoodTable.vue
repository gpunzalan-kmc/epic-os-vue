<template>
  <div class="py-2 sm:hidden">
    <ul role="list" class="divide-y divide-gray-200">
      <li v-for="(neighborhood, index) in data" :key="index">
        <a href="#" class="block hover:bg-gray-50">
          <div class="px-4 py-4 sm:px-6">
            <div class="flex items-center justify-between">
              <a
                @click.prevent="
                  router.push({
                    name: 'MonitorNeighborhood',
                    params: { id: neighborhood.id },
                    query: { pk: 'monitoring' },
                  })
                "
                class="text-sm font-bold hover:underline cursor-pointer"
              >
                {{ neighborhood.name }}
              </a>
              <!-- <div class="ml-2 flex-shrink-0 flex">
                <p
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                >
                  {{ position.type }}
                </p>
              </div> -->
            </div>
            <div class="mt-1 sm:flex sm:justify-between">
              <div class="sm:flex">
                <p class="flex items-center text-xs text-gray-500">
                  <!-- <LocationMarkerIcon
                    class="flex-shrink-0 mr-1.5 h-5 w-5 text-primary"
                    aria-hidden="true"
                  /> -->
                  {{ neighborhood.line1 }}
                </p>
                <p
                  class="mt-2 flex items-center text-xs text-gray-500 sm:mt-0 sm:ml-6 font-semibold"
                  :class="workStationRate(neighborhood.occupancyRate)"
                >
                  <WorkStationIconVue
                    class="flex-shrink-0 mr-1.5 h-4 w-4 "
                    :class="workStationRate(neighborhood.occupancyRate)"
                  />
                  {{ neighborhood.occupancyRate.toFixed(0) }}% Occupied
                </p>
                <p
                  class="mt-2 flex items-center text-xs text-gray-500 sm:mt-0 sm:ml-6 font-semibold"
                  :class="workStationRate(neighborhood.occupancyRate)"
                >
                  <MeetingRoomIconVue
                    class="flex-shrink-0 mr-1.5 h-4 w-4"
                    :class="workStationRate(neighborhood.occupancyRate)"
                  />

                  {{ neighborhood.meetingRoomsActive }}/{{
                    neighborhood.meetingRoomsTotal
                  }}
                  Occupied
                </p>
                <p
                  class="mt-2 flex items-center text-xs text-gray-500 sm:mt-0 sm:ml-6 font-semibold"
                  :class="temperatureRate(neighborhood.occupancyRate)"
                >
                  <TemperatureIconVue
                    class="flex-shrink-0 mr-1.5 h-4 w-4"
                    :class="temperatureRate(neighborhood.temperature)"
                  />

                  {{ neighborhood.temperature.toFixed(1) }}° Celcius
                </p>
                <p
                  class="mt-2 flex items-center text-xs text-gray-500 sm:mt-0 sm:ml-6 font-semibold"
                  :class="humidityRate(neighborhood.occupancyRate)"
                >
                  <HumidityIconVue
                    class="flex-shrink-0 mr-1.5 h-4 w-4"
                    :class="humidityRate(neighborhood.temperature)"
                  />

                  {{ neighborhood.humidity.toFixed(1) }}%
                </p>
              </div>
              <!-- <div class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                <CalendarIcon
                  class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <p>
                  Closing on
                  {{ " " }}
                  <time :datetime="position.closeDate">{{
                    position.closeDateFull
                  }}</time>
                </p>
              </div> -->
            </div>
          </div>
        </a>
      </li>
    </ul>
  </div>
  <!-- Projects table (small breakpoint and up) -->
  <div class="hidden  md:block rounded-md py-2">
    <div
      class="align-middle inline-block min-w-full  border-gray-200 border rounded"
    >
      <table class="min-w-full">
        <thead>
          <tr class=" border-gray-200">
            <th
              class="px-6 py-3 border-b border-gray-200 bg-gray-800 text-left text-xs font-medium text-white uppercase tracking-wider rounded-tl"
            >
              <div href="#" class="relative group flex items-center ">
                <NeighborhoodIconVue class="w-6 h-6 text-primary" />
                <a
                  @click.prevent="sortTable('name')"
                  class="flex  cursor-pointer ml-1"
                >
                  <span class="my-auto">Name</span>
                  <span class="flex flex-col my-auto" v-if="sortedBy == 'name'">
                    <svg
                      v-if="currentSort == 'ascending'"
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 15l7-7 7 7"
                      />
                    </svg>

                    <svg
                      v-if="currentSort == 'descending'"
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                  <svg
                    v-else
                    class="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </a>
                <!-- <span class="  font-medium truncate ml-1">
                  Name
                </span>
                <svg
                  class="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg> -->
              </div>
            </th>
            <th
              class="px-6 py-3 border-b border-gray-200 bg-gray-800 text-left text-xs font-medium text-white uppercase tracking-wider"
            >
              <div href="#" class="relative group flex items-center ">
                <WorkStationIconVue class="text-primary" />

                <a
                  @click.prevent="sortTable('occupancyrate')"
                  class="flex  cursor-pointer ml-1"
                >
                  <span class="my-auto">Desks</span>
                  <span
                    class="flex flex-col my-auto"
                    v-if="sortedBy == 'occupancyrate'"
                  >
                    <svg
                      v-if="currentSort == 'ascending'"
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 15l7-7 7 7"
                      />
                    </svg>

                    <svg
                      v-if="currentSort == 'descending'"
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                  <svg
                    v-else
                    class="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </th>
            <th
              class="px-6 py-3 border-b border-gray-200 bg-gray-800 text-left text-xs font-medium text-white uppercase tracking-wider"
            >
              <div href="#" class="relative group flex items-center ">
                <MeetingRoomIconVue class="text-primary" />

                <a
                  @click.prevent="sortTable('meetingroomsactive')"
                  class="flex  cursor-pointer ml-1"
                >
                  <span class="my-auto">Rooms</span>
                  <span
                    class="flex flex-col my-auto"
                    v-if="sortedBy == 'meetingroomsactive'"
                  >
                    <svg
                      v-if="currentSort == 'ascending'"
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 15l7-7 7 7"
                      />
                    </svg>

                    <svg
                      v-if="currentSort == 'descending'"
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                  <svg
                    v-else
                    class="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </th>
            <th
              class="px-6 py-3 border-b border-gray-200 bg-gray-800 text-left text-xs font-medium text-white uppercase tracking-wider"
            >
              <div href="#" class="relative group flex items-center ">
                <TemperatureIconVue class="text-primary" />
                <a
                  @click.prevent="sortTable('temperature')"
                  class="flex  cursor-pointer ml-1"
                >
                  <span class="my-auto">Temp</span>
                  <span
                    class="flex flex-col my-auto"
                    v-if="sortedBy == 'temperature'"
                  >
                    <svg
                      v-if="currentSort == 'ascending'"
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 15l7-7 7 7"
                      />
                    </svg>

                    <svg
                      v-if="currentSort == 'descending'"
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                  <svg
                    v-else
                    class="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </th>
            <th
              class="px-6 py-3 border-b border-gray-200 bg-gray-800 text-left text-xs font-medium text-white uppercase tracking-wider "
            >
              <div href="#" class="relative group flex items-center ">
                <HumidityIconVue class="text-primary" />

                <a
                  @click.prevent="sortTable('humidity')"
                  class="flex  cursor-pointer ml-1"
                >
                  <span class="my-auto">Humidity</span>
                  <span
                    class="flex flex-col my-auto"
                    v-if="sortedBy == 'humidity'"
                  >
                    <svg
                      v-if="currentSort == 'ascending'"
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 15l7-7 7 7"
                      />
                    </svg>

                    <svg
                      v-if="currentSort == 'descending'"
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                  <svg
                    v-else
                    class="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </th>
            <th
              class="px-6 py-3 border-b border-gray-200 bg-gray-800 text-left text-xs font-medium text-white uppercase tracking-wider rounded-tr"
            >
              <!-- <div href="#" class="relative group flex items-center ">
                <HumidityIconVue />

                <span class="  font-medium truncate ml-1">
                  Humidity
                </span>
              </div> -->
            </th>
            <!-- <th
                  class="hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Last updated
                </th>
                <th
                  class="pr-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                /> -->
          </tr>
        </thead>
        <tbody
          class="bg-white divide-y divide-gray-100 "
          v-loading="loading"
          element-loading-text="Loading..."
          element-loading-spinner="el-icon-loading"
        >
          <tr v-for="(neighborhood, index) in data" :key="index">
            <td
              class="pl-4 py-3 max-w-0 w-full whitespace-nowrap text-sm font-medium text-gray-900"
            >
              <div class="flex items-center space-x-3 lg:pl-2">
                <!-- <div
                  :class="[
                    project.bgColorClass,
                    'flex-shrink-0 w-2.5 h-2.5 rounded-full',
                  ]"
                  aria-hidden="true"
                /> -->
                <img
                  class="max-w-none h-12 w-12 rounded-full ring-2 ring-white"
                  :src="neighborhood.siteImage"
                />
                <div class="min-w-0 space-y-1">
                  <div class="flex items-center space-x-3">
                    <span class="block truncate">
                      <a
                        @click.prevent="
                          router.push({
                            name: 'MonitorNeighborhood',
                            params: { id: neighborhood.id },
                            query: { pk: 'monitoring' },
                          })
                        "
                        class="text-sm   text-primary font-bold hover:underline cursor-pointer"
                      >
                        {{ neighborhood.name }}
                      </a>
                    </span>
                  </div>
                  <div href="#" class="relative group flex items-center ">
                    <LocationMarkerIcon
                      class="flex-shrink-0 w-5 h-5 text-primary "
                    />

                    <span
                      class="text-sm text-gray-500  font-medium truncate ml-1"
                    >
                      {{ neighborhood.line1 }}
                    </span>
                  </div>
                </div>
              </div>
            </td>
            <!-- <td class="px-6 py-3 text-sm text-gray-500 font-medium">
                  <div class="flex items-center space-x-2">
                    <div class="flex flex-shrink-0 -space-x-1">
                      <img
                        v-for="member in project.members"
                        :key="member.handle"
                        class="max-w-none h-6 w-6 rounded-full ring-2 ring-white"
                        :src="member.imageUrl"
                        :alt="member.name"
                      />
                    </div>
                    <span
                      v-if="project.totalMembers > project.members.length"
                      class="flex-shrink-0 text-xs leading-5 font-medium"
                      >+{{
                        project.totalMembers - project.members.length
                      }}</span
                    >
                  </div>
                </td> -->
            <td
              class="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right"
            >
              <div class="flex items-left space-x-3 ">
                <span class="block text-left">
                  <h2
                    class="text-sm font-semibold "
                    :class="workStationRate(neighborhood.occupancyRate)"
                  >
                    {{ neighborhood.occupancyRate.toFixed(0) }}% Occupied
                  </h2>
                  <h2 class="text-xs font-medium text-gray-500">Desks</h2>
                </span>
              </div>
            </td>
            <td
              class="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right"
            >
              <div class="flex items-center space-x-3">
                <span class="block text-left">
                  <h2
                    class="text-sm font-semibold"
                    :class="
                      workStationRate(
                        (neighborhood.meetingRoomsActive /
                          neighborhood.meetingRoomsTotal) *
                          100
                      )
                    "
                  >
                    {{ neighborhood.meetingRoomsActive }}/{{
                      neighborhood.meetingRoomsTotal
                    }}
                    Occupied
                  </h2>
                  <h2 class="text-xs font-medium text-gray-500">
                    Meeting Rooms
                  </h2>
                </span>
              </div>
            </td>
            <td
              class="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right"
            >
              <div class="flex space-x-2 text-default justify-start ">
                <div class="flex items-center space-x-3">
                  <span class="block text-left">
                    <h2
                      v-if="neighborhood.temperature > 0"
                      class="text-sm font-semibold"
                      :class="temperatureRate(neighborhood.temperature)"
                    >
                      {{ neighborhood.temperature.toFixed(1) }}° Celcius
                    </h2>
                    <h2 v-else class="text-sm font-semibold text-yellow-600">
                      Not Available
                    </h2>
                    <h2 class="text-xs font-medium text-gray-500">
                      Temperature
                    </h2>
                  </span>
                </div>
              </div>
            </td>
            <td
              class="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right"
            >
              <div class="flex space-x-2 text-default justify-start ">
                <div class="flex items-center space-x-3">
                  <span class="block text-left">
                    <h2
                      v-if="neighborhood.humidity > 0"
                      class="text-sm font-semibold"
                      :class="humidityRate(neighborhood.humidity.toFixed(1))"
                    >
                      {{ neighborhood.humidity.toFixed(1) }} %
                    </h2>
                    <h2 v-else class="text-sm font-semibold text-yellow-600">
                      Not Available
                    </h2>
                    <h2 class="text-xs font-medium text-gray-500">Humidity</h2>
                  </span>
                </div>
              </div>
            </td>
            <td
              class="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right"
            >
              <div class="flex-shrink-0 self-center flex">
                <Menu as="div" class="relative inline-block text-left">
                  <div>
                    <MenuButton
                      class="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600"
                    >
                      <span class="sr-only">Open options</span>
                      <DotsVerticalIcon class="h-5 w-5" aria-hidden="true" />
                    </MenuButton>
                  </div>

                  <transition
                    enter-active-class="transition ease-out duration-100"
                    enter-from-class="transform opacity-0 scale-95"
                    enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75"
                    leave-from-class="transform opacity-100 scale-100"
                    leave-to-class="transform opacity-0 scale-95"
                  >
                    <MenuItems
                      class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                    >
                      <div class="py-1">
                        <MenuItem v-slot="{ active }">
                          <a
                            @click.prevent="
                              router.push({
                                name: 'MonitorNeighborhood',
                                params: { id: neighborhood.id },
                                query: { pk: 'monitoring' },
                              })
                            "
                            :class="[
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'flex px-4 py-2 text-sm cursor-pointer',
                            ]"
                          >
                            <span>Monitoring</span>
                          </a>
                        </MenuItem>
                        <MenuItem v-slot="{ active }">
                          <a
                            @click.prevent="
                              router.push({
                                name: 'MonitorNeighborhood',
                                params: { id: neighborhood.id },
                                query: { pk: 'analytics' },
                              })
                            "
                            :class="[
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'flex px-4 py-2 text-sm cursor-pointer',
                            ]"
                          >
                            <span>Analytics</span>
                          </a>
                        </MenuItem>
                        <MenuItem v-slot="{ active }">
                          <a
                            @click.prevent="
                              router.push({
                                name: 'NeighborhoodMapping',
                                params: { id: neighborhood.id },
                              })
                            "
                            :class="[
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'flex px-4 py-2 text-sm cursor-pointer',
                            ]"
                          >
                            <span>Device Mapping</span>
                          </a>
                        </MenuItem>
                        <MenuItem v-slot="{ active }">
                          <a
                            @click.prevent="editArea(neighborhood)"
                            :class="[
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'flex px-4 py-2 text-sm cursor-pointer',
                            ]"
                          >
                            <span>Edit</span>
                          </a>
                        </MenuItem>
                      </div>
                    </MenuItems>
                  </transition>
                </Menu>
              </div>
            </td>
            <!-- <td
                  class="px-6 py-3 whitespace-nowrap text-right text-sm font-medium"
                >
                  <a href="#" class="text-indigo-600 hover:text-indigo-900"
                    >Edit</a
                  >
                </td> -->
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import {
  Dialog,
  DialogOverlay,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import {
  ClockIcon,
  HomeIcon,
  MenuAlt1Icon,
  ViewListIcon,
  XIcon,
} from "@heroicons/vue/outline";
import {
  ChevronRightIcon,
  DotsVerticalIcon,
  SearchIcon,
  SelectorIcon,
} from "@heroicons/vue/solid";

const navigation = [
  { name: "Home", href: "#", icon: HomeIcon, current: true },
  { name: "My tasks", href: "#", icon: ViewListIcon, current: false },
  { name: "Recent", href: "#", icon: ClockIcon, current: false },
];
const teams = [
  { name: "Engineering", href: "#", bgColorClass: "bg-indigo-500" },
  { name: "Human Resources", href: "#", bgColorClass: "bg-green-500" },
  { name: "Customer Success", href: "#", bgColorClass: "bg-yellow-500" },
];
const positions = [
  {
    id: 1,
    title: "Back End Developer",
    type: "Full-time",
    location: "Remote",
    department: "Engineering",
    closeDate: "2020-01-07",
    closeDateFull: "January 7, 2020",
  },
  {
    id: 2,
    title: "Front End Developer",
    type: "Full-time",
    location: "Remote",
    department: "Engineering",
    closeDate: "2020-01-07",
    closeDateFull: "January 7, 2020",
  },
  {
    id: 3,
    title: "User Interface Designer",
    type: "Full-time",
    location: "Remote",
    department: "Design",
    closeDate: "2020-01-14",
    closeDateFull: "January 14, 2020",
  },
];
const projects = [
  {
    id: 1,
    title: "GraphQL API",
    initials: "GA",
    team: "Engineering",
    members: [
      {
        name: "Dries Vincent",
        handle: "driesvincent",
        imageUrl:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        name: "Lindsay Walton",
        handle: "lindsaywalton",
        imageUrl:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        name: "Courtney Henry",
        handle: "courtneyhenry",
        imageUrl:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        name: "Tom Cook",
        handle: "tomcook",
        imageUrl:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    ],
    totalMembers: 12,
    lastUpdated: "March 17, 2020",
    pinned: true,
    bgColorClass: "bg-pink-600",
  },
  // More projects...
];

const pinnedProjects = projects.filter((project) => project.pinned);
import { LocationMarkerIcon } from "@heroicons/vue/solid";
import { humidityRate, temperatureRate, workStationRate } from "./functions";
import WorkStationIconVue from "@/svg-components/WorkStationIcon.vue";
import MeetingRoomIconVue from "@/svg-components/MeetingRoomIcon.vue";
import TemperatureIconVue from "@/svg-components/TemperatureIcon.vue";
import HumidityIconVue from "@/svg-components/HumidityIcon.vue";
import NeighborhoodIconVue from "@/svg-components/NeighborhoodIcon.vue";
import router from "@/router";
export default defineComponent({
  components: {
    Dialog,
    DialogOverlay,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
    TransitionRoot,
    ChevronRightIcon,
    DotsVerticalIcon,
    MenuAlt1Icon,
    SearchIcon,
    SelectorIcon,
    XIcon,
    LocationMarkerIcon,
    WorkStationIconVue,
    MeetingRoomIconVue,
    TemperatureIconVue,
    HumidityIconVue,
    NeighborhoodIconVue,
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
    sortedBy: {
      type: String,
    },
    loading: {
      type: Boolean,
    },
  },
  setup(props, context) {
    const currentSort = ref("ascending" as null | string);
    const sortInstance = ref(0);
    const sidebarOpen = ref(false);

    function editArea(
      event: import("@/api/response.types").NeighborhoodResponse
    ) {
      context.emit("edit", event);
    }
    function deleteArea(id: number) {
      context.emit("delete", id);
    }
    function sortTable(prop: string | null) {
      let order = "ascending" as string | null;
      if (sortInstance.value == 2) {
        prop = null;
        sortInstance.value = 0;
      } else {
        if (currentSort.value == "ascending") {
          if (
            sortInstance.value == 0 &&
            props.sortedBy &&
            props.sortedBy == "sortOrder"
          ) {
            sortInstance.value = sortInstance.value + 2;
          } else {
            sortInstance.value = sortInstance.value + 1;
          }
          order = "descending";
        }
        if (currentSort.value == "descending") {
          sortInstance.value = sortInstance.value + 1;
          order = "ascending";
        }
      }
      currentSort.value = order;
      context.emit("sortColumn", { prop: prop, order: order });
    }
    return {
      navigation,
      teams,
      projects,
      pinnedProjects,
      sidebarOpen,
      workStationRate,
      temperatureRate,
      humidityRate,
      router,
      editArea,
      deleteArea,
      currentSort,
      sortTable,
      positions,
    };
  },
});
</script>
