<template>
  <header class="bg-gray-800 border-b text-white">
    <div
      class="hidden lg:flex max-w-8xl py-3 flex-grow w-full  mx-auto  overflow-y-auto md:overflow-hidden  h-full"
    >
      <div
        class=" lg:flex-shrink-0  xl:pr-0 overflow-y-auto h-full space-y-3 border-r  border-gray-700"
      >
        <div class="px-3 lg:w-80 flex justify-between">
          <div class="flex space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enable-background="new 0 0 24 24"
              class="h-8 w-8 fill-current text-primary"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
            >
              <rect fill="none" height="24" width="24" />
              <path
                d="M21,6.5c-1.66,0-3,1.34-3,3c0,0.07,0,0.14,0.01,0.21l-2.03,0.68c-0.64-1.21-1.82-2.09-3.22-2.32V5.91 C14.04,5.57,15,4.4,15,3c0-1.66-1.34-3-3-3S9,1.34,9,3c0,1.4,0.96,2.57,2.25,2.91v2.16c-1.4,0.23-2.58,1.11-3.22,2.32L5.99,9.71 C6,9.64,6,9.57,6,9.5c0-1.66-1.34-3-3-3s-3,1.34-3,3s1.34,3,3,3c1.06,0,1.98-0.55,2.52-1.37l2.03,0.68 c-0.2,1.29,0.17,2.66,1.09,3.69l-1.41,1.77C6.85,17.09,6.44,17,6,17c-1.66,0-3,1.34-3,3s1.34,3,3,3s3-1.34,3-3 c0-0.68-0.22-1.3-0.6-1.8l1.41-1.77c1.36,0.76,3.02,0.75,4.37,0l1.41,1.77C15.22,18.7,15,19.32,15,20c0,1.66,1.34,3,3,3s3-1.34,3-3 s-1.34-3-3-3c-0.44,0-0.85,0.09-1.23,0.26l-1.41-1.77c0.93-1.04,1.29-2.4,1.09-3.69l2.03-0.68c0.53,0.82,1.46,1.37,2.52,1.37 c1.66,0,3-1.34,3-3S22.66,6.5,21,6.5z M3,10.5c-0.55,0-1-0.45-1-1c0-0.55,0.45-1,1-1s1,0.45,1,1C4,10.05,3.55,10.5,3,10.5z M6,21 c-0.55,0-1-0.45-1-1c0-0.55,0.45-1,1-1s1,0.45,1,1C7,20.55,6.55,21,6,21z M11,3c0-0.55,0.45-1,1-1s1,0.45,1,1c0,0.55-0.45,1-1,1 S11,3.55,11,3z M12,15c-1.38,0-2.5-1.12-2.5-2.5c0-1.38,1.12-2.5,2.5-2.5s2.5,1.12,2.5,2.5C14.5,13.88,13.38,15,12,15z M18,19 c0.55,0,1,0.45,1,1c0,0.55-0.45,1-1,1s-1-0.45-1-1C17,19.45,17.45,19,18,19z M21,10.5c-0.55,0-1-0.45-1-1c0-0.55,0.45-1,1-1 s1,0.45,1,1C22,10.05,21.55,10.5,21,10.5z"
              />
            </svg>
            <p class="text-lg font-semibold my-auto">Hubs</p>
          </div>
          <el-button type="primary" size="small" @click="openAddHubForm"
            >Add Hub</el-button
          >
        </div>
        <div class="w-full px-3">
          <el-input
            placeholder="Search hub"
            size="small"
            v-model="searchHubInput"
          ></el-input>
        </div>
      </div>
      <div class="flex-1 min-w-0  flex px-3 flex-col space-y-3 ">
        <div class="flex justify-between w-full">
          <div class="flex space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enable-background="new 0 0 24 24"
              class="h-8 w-8 fill-current text-primary"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
            >
              <rect fill="none" height="24" width="24"></rect>
              <path
                d="M7.76,16.24C6.67,15.16,6,13.66,6,12s0.67-3.16,1.76-4.24l1.42,1.42C8.45,9.9,8,10.9,8,12c0,1.1,0.45,2.1,1.17,2.83 L7.76,16.24z M16.24,16.24C17.33,15.16,18,13.66,18,12s-0.67-3.16-1.76-4.24l-1.42,1.42C15.55,9.9,16,10.9,16,12 c0,1.1-0.45,2.1-1.17,2.83L16.24,16.24z M12,10c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S13.1,10,12,10z M20,12 c0,2.21-0.9,4.21-2.35,5.65l1.42,1.42C20.88,17.26,22,14.76,22,12s-1.12-5.26-2.93-7.07l-1.42,1.42C19.1,7.79,20,9.79,20,12z M6.35,6.35L4.93,4.93C3.12,6.74,2,9.24,2,12s1.12,5.26,2.93,7.07l1.42-1.42C4.9,16.21,4,14.21,4,12S4.9,7.79,6.35,6.35z"
              ></path>
            </svg>
            <p class="text-lg font-semibold my-auto">Workpoints</p>
          </div>
          <el-button
            type="primary"
            size="small"
            @click.prevent="openAddWorkPointForm"
            >Add Workpoint</el-button
          >
        </div>
        <div class="flex justify-between w-full space-x-2">
          <el-input
            placeholder="Search workpoint"
            size="small"
            v-model="searchInput"
            @input="search"
          >
          </el-input>
          <el-dropdown trigger="click" @command="handleSort">
            <el-button size="small" type="default">
              Sort by
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="name">Name</el-dropdown-item>
                <el-dropdown-item command="mac">MAC Address</el-dropdown-item>
                <el-dropdown-item command="spaceType"
                  >Space Type</el-dropdown-item
                >
                <el-dropdown-item command="lastActivity"
                  >Last Activity</el-dropdown-item
                >
                <el-dropdown-item command="isActive"
                  >Deployment Status</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>

          <el-pagination
            background
            layout="prev, next"
            :page-size="20"
            :total="workPoints.totalCount"
            @current-change="handlePageChange"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <div
      class="max-w-8xl py-3 flex-grow w-full  mx-auto flex lg:hidden  overflow-y-auto md:overflow-hidden  h-full"
    >
      <div
        v-if="!query"
        class=" lg:flex-shrink-0  xl:pr-0 overflow-y-auto h-full space-y-3  w-full"
      >
        <div class="px-3 lg:w-80 flex justify-between">
          <div class="flex space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enable-background="new 0 0 24 24"
              class="h-8 w-8 fill-current text-primary"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
            >
              <rect fill="none" height="24" width="24" />
              <path
                d="M21,6.5c-1.66,0-3,1.34-3,3c0,0.07,0,0.14,0.01,0.21l-2.03,0.68c-0.64-1.21-1.82-2.09-3.22-2.32V5.91 C14.04,5.57,15,4.4,15,3c0-1.66-1.34-3-3-3S9,1.34,9,3c0,1.4,0.96,2.57,2.25,2.91v2.16c-1.4,0.23-2.58,1.11-3.22,2.32L5.99,9.71 C6,9.64,6,9.57,6,9.5c0-1.66-1.34-3-3-3s-3,1.34-3,3s1.34,3,3,3c1.06,0,1.98-0.55,2.52-1.37l2.03,0.68 c-0.2,1.29,0.17,2.66,1.09,3.69l-1.41,1.77C6.85,17.09,6.44,17,6,17c-1.66,0-3,1.34-3,3s1.34,3,3,3s3-1.34,3-3 c0-0.68-0.22-1.3-0.6-1.8l1.41-1.77c1.36,0.76,3.02,0.75,4.37,0l1.41,1.77C15.22,18.7,15,19.32,15,20c0,1.66,1.34,3,3,3s3-1.34,3-3 s-1.34-3-3-3c-0.44,0-0.85,0.09-1.23,0.26l-1.41-1.77c0.93-1.04,1.29-2.4,1.09-3.69l2.03-0.68c0.53,0.82,1.46,1.37,2.52,1.37 c1.66,0,3-1.34,3-3S22.66,6.5,21,6.5z M3,10.5c-0.55,0-1-0.45-1-1c0-0.55,0.45-1,1-1s1,0.45,1,1C4,10.05,3.55,10.5,3,10.5z M6,21 c-0.55,0-1-0.45-1-1c0-0.55,0.45-1,1-1s1,0.45,1,1C7,20.55,6.55,21,6,21z M11,3c0-0.55,0.45-1,1-1s1,0.45,1,1c0,0.55-0.45,1-1,1 S11,3.55,11,3z M12,15c-1.38,0-2.5-1.12-2.5-2.5c0-1.38,1.12-2.5,2.5-2.5s2.5,1.12,2.5,2.5C14.5,13.88,13.38,15,12,15z M18,19 c0.55,0,1,0.45,1,1c0,0.55-0.45,1-1,1s-1-0.45-1-1C17,19.45,17.45,19,18,19z M21,10.5c-0.55,0-1-0.45-1-1c0-0.55,0.45-1,1-1 s1,0.45,1,1C22,10.05,21.55,10.5,21,10.5z"
              />
            </svg>
            <p class="text-lg font-semibold my-auto">Hubs</p>
          </div>
          <el-button type="primary" size="small" @click="openAddHubForm"
            >Add Hub</el-button
          >
        </div>
        <div class="w-full px-3">
          <el-input
            placeholder="Search hub"
            size="small"
            v-model="searchHubInput"
          ></el-input>
        </div>
      </div>
      <div v-if="query" class="flex-1 min-w-0  flex px-3 flex-col space-y-3 ">
        <div class="flex justify-between w-full">
          <div class="flex space-x-2">
            <a @click.prevent="router.replace({ query: { id: null } })">
              <ChevronLeftIcon
                class="h-8 w-8 text-primary fill-current"
                aria-hidden="true"
              />
            </a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enable-background="new 0 0 24 24"
              class="h-8 w-8 fill-current text-primary"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
            >
              <rect fill="none" height="24" width="24"></rect>
              <path
                d="M7.76,16.24C6.67,15.16,6,13.66,6,12s0.67-3.16,1.76-4.24l1.42,1.42C8.45,9.9,8,10.9,8,12c0,1.1,0.45,2.1,1.17,2.83 L7.76,16.24z M16.24,16.24C17.33,15.16,18,13.66,18,12s-0.67-3.16-1.76-4.24l-1.42,1.42C15.55,9.9,16,10.9,16,12 c0,1.1-0.45,2.1-1.17,2.83L16.24,16.24z M12,10c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S13.1,10,12,10z M20,12 c0,2.21-0.9,4.21-2.35,5.65l1.42,1.42C20.88,17.26,22,14.76,22,12s-1.12-5.26-2.93-7.07l-1.42,1.42C19.1,7.79,20,9.79,20,12z M6.35,6.35L4.93,4.93C3.12,6.74,2,9.24,2,12s1.12,5.26,2.93,7.07l1.42-1.42C4.9,16.21,4,14.21,4,12S4.9,7.79,6.35,6.35z"
              ></path>
            </svg>
            <p class="text-lg font-semibold my-auto">Workpoints</p>
          </div>
          <el-button
            type="primary"
            size="small"
            @click.prevent="openAddWorkPointForm"
            >Add Workpoint</el-button
          >
        </div>
        <div class="flex justify-between w-full space-x-2">
          <el-input
            placeholder="Search workpoint"
            size="small"
            v-model="searchInput"
            @input="search"
          >
          </el-input>
          <el-dropdown trigger="click" @command="handleSort">
            <el-button size="small" type="default">
              Sort by
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="name">Name</el-dropdown-item>
                <el-dropdown-item command="mac">MAC Address</el-dropdown-item>
                <el-dropdown-item command="spaceType"
                  >Space Type</el-dropdown-item
                >
                <el-dropdown-item command="lastActivity"
                  >Last Activity</el-dropdown-item
                >
                <el-dropdown-item command="isActive"
                  >Deployment Status</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>

          <el-pagination
            background
            layout="prev, next"
            :page-size="20"
            :total="workPoints.totalCount"
            @current-change="handlePageChange"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </header>
  <main class="overflow-y-auto md:overflow-hidden h-full ">
    <div
      class="max-w-8xl  flex-grow w-full  mx-auto lg:flex hidden  overflow-y-auto md:overflow-hidden  h-full"
    >
      <div class="  lg:flex-shrink-0  xl:pr-0 overflow-y-auto h-full">
        <div class=" lg:w-80 border-r h-full">
          <div>
            <ul role="list" class="divide-y divide-gray-200">
              <li
                v-for="hub in filteredhubs"
                :key="hub.id"
                class="relative bg-white py-5 px-6 hover:bg-gray-100"
                :class="{ 'bg-gray-100': query == hub.id }"
              >
                <div class="flex justify-between space-x-3">
                  <div class="flex items-center space-x-3">
                    <span
                      v-if="hub.isActive == true"
                      class="h-4 w-4 bg-green-100 rounded-full flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <span class="h-2 w-2 bg-green-400 rounded-full"></span>
                    </span>
                    <span
                      v-else
                      class="h-4 w-4 bg-red-100 rounded-full flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <span class="h-2 w-2 bg-red-400 rounded-full"></span>
                    </span>
                    <span class="block">
                      <a
                        class="text-sm font-medium cursor-pointer hover:underline hover:text-primary"
                        @click.prevent="
                          router.replace({ query: { id: hub.id } })
                        "
                      >
                        <p class="text-sm font-semibold">
                          {{ hub.name }}
                        </p>
                      </a>
                    </span>
                  </div>
                  <el-dropdown
                    trigger="click"
                    @command="handeHubCommand($event, hub)"
                  >
                    <span class="el-dropdown-link">
                      <DotsVerticalIcon class="w-5 h-5" aria-hidden="true" />
                    </span>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item command="edit">Edit</el-dropdown-item>
                        <el-dropdown-item command="delete"
                          >Delete</el-dropdown-item
                        >
                        <el-dropdown-item command="viewLogs"
                          >View Logs</el-dropdown-item
                        >
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </div>
                <div class="mt-0.5">
                  <p class="text-sm text-gray-600 font-semibold mb-1">
                    Last Activity:
                    {{
                      format(new Date(hub.lastActivity), "MMM dd, yyyy hh:mm a")
                    }}
                  </p>

                  <p class="line-clamp-2 text-sm text-gray-600">
                    {{ hub.ipAddress }}
                  </p>
                  <p class="line-clamp-2 text-sm text-gray-600">
                    {{ hub.mac }}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- Left sidebar & main wrapper -->
      <div class="flex-1 min-w-0 bg-white xl:flex">
        <!-- Projects List -->

        <div class="bg-white lg:min-w-0 lg:flex-1 overflow-y-auto h-full">
          <ul
            role="list"
            class="relative z-0 divide-y divide-gray-200 border-b border-gray-200"
            v-loading="loading"
            element-loading-text="Loading..."
            element-loading-spinner="el-icon-loading"
          >
            <li
              v-for="(workPoint, index) in workPoints.items"
              :key="index"
              class="relative pl-4 pr-6 py-5 hover:bg-gray-50 sm:py-6 sm:pl-6 lg:pl-5 xl:pl-6"
            >
              <div class="flex items-center justify-between space-x-4">
                <!-- Repo name and link -->
                <div class="flex space-x-2">
                  <div class="min-w-0 space-y-3">
                    <div class="flex items-center space-x-3">
                      <span
                        v-if="workPoint.isActive"
                        :class="[
                          'h-4 w-4 rounded-full flex items-center justify-center bg-green-100',
                        ]"
                        aria-hidden="true"
                      >
                        <span :class="['h-2 w-2 rounded-full bg-green-400']" />
                      </span>
                      <span
                        v-else
                        :class="[
                          'h-4 w-4 rounded-full flex items-center justify-center bg-red-100',
                        ]"
                        aria-hidden="true"
                      >
                        <span :class="['h-2 w-2 rounded-full bg-red-400']" />
                      </span>
                      <span class="block">
                        <!-- <h2 class="text-sm font-semibold">
                          <div>
                            <span class="absolute inset-0" aria-hidden="true" />
                            {{ workPoint.name }}
                          </div>
                        </h2> -->
                        <a
                          class="text-sm font-medium cursor-pointer hover:underline hover:text-primary"
                          @click.prevent="viewWorkpointDetail(workPoint)"
                        >
                          <p class="text-sm font-semibold">
                            {{ workPoint.name }}
                          </p>
                        </a>
                      </span>
                    </div>

                    <p class="relative group flex items-center space-x-2.5">
                      <span
                        class="text-sm text-gray-500 group-hover:text-gray-900 font-medium truncate"
                      >
                        {{ workPoint.modelValue }} - {{ workPoint.mac }}
                      </span>
                    </p>
                  </div>
                </div>

                <div class="sm:hidden">
                  <ChevronRightIcon
                    class="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>

                <div
                  class="hidden sm:flex flex-col flex-shrink-0 items-end space-y-3"
                >
                  <p class="flex items-center space-x-4">
                    <span
                      v-if="workPoint.isActive == true"
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize bg-green-100 text-green-800"
                    >
                      Deployed
                    </span>
                    <el-dropdown
                      trigger="click"
                      @command="handleCommand($event, workPoint)"
                    >
                      <span class="el-dropdown-link">
                        <DotsVerticalIcon class="w-5 h-5" aria-hidden="true" />
                      </span>
                      <template #dropdown>
                        <el-dropdown-menu>
                          <el-dropdown-item command="edit"
                            >Edit</el-dropdown-item
                          >
                          <el-dropdown-item command="delete"
                            >Delete</el-dropdown-item
                          >
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
                  </p>
                  <p class="flex text-gray-500 text-sm space-x-2">
                    <span>{{ workPoint.spaceTypeValue }}</span>
                    <span aria-hidden="true">&middot;</span>
                    <span
                      >Last activity
                      {{
                        format(
                          new Date(workPoint.lastActivity),
                          "MMM dd, yyyy hh:mm a"
                        )
                      }}</span
                    >
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- Activity feed -->
    </div>
    <div
      class="max-w-8xl  flex-grow w-full  mx-auto flex lg:hidden overflow-y-auto md:overflow-hidden  h-full"
    >
      <div
        v-if="!query"
        class=" w-full lg:flex-shrink-0  xl:pr-0 overflow-y-auto h-full"
      >
        <div class=" lg:w-80 border-r h-full">
          <div>
            <ul role="list" class="divide-y divide-gray-200">
              <li
                v-for="hub in filteredhubs"
                :key="hub.id"
                class="relative bg-white py-5 px-6 hover:bg-gray-100"
                :class="{ 'bg-gray-100': query == hub.id }"
              >
                <div class="flex justify-between space-x-3">
                  <div class="flex items-center space-x-3">
                    <span
                      v-if="hub.isActive == true"
                      class="h-4 w-4 bg-green-100 rounded-full flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <span class="h-2 w-2 bg-green-400 rounded-full"></span>
                    </span>
                    <span
                      v-else
                      class="h-4 w-4 bg-red-100 rounded-full flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <span class="h-2 w-2 bg-red-400 rounded-full"></span>
                    </span>
                    <span class="block">
                      <a
                        class="text-sm font-medium cursor-pointer hover:underline hover:text-primary"
                        @click.prevent="
                          router.replace({ query: { id: hub.id } })
                        "
                      >
                        <p class="text-sm font-semibold">
                          {{ hub.name }}
                        </p>
                      </a>
                    </span>
                  </div>
                  <el-dropdown
                    trigger="click"
                    @command="handeHubCommand($event, hub)"
                  >
                    <span class="el-dropdown-link">
                      <DotsVerticalIcon class="w-5 h-5" aria-hidden="true" />
                    </span>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item command="edit">Edit</el-dropdown-item>
                        <el-dropdown-item command="delete"
                          >Delete</el-dropdown-item
                        >
                        <el-dropdown-item command="viewLogs"
                          >View Logs</el-dropdown-item
                        >
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </div>
                <div class="mt-0.5">
                  <p class="text-sm text-gray-600 font-semibold mb-1">
                    Last Activity:
                    {{
                      format(new Date(hub.lastActivity), "MMM dd, yyyy hh:mm a")
                    }}
                  </p>

                  <p class="line-clamp-2 text-sm text-gray-600">
                    {{ hub.ipAddress }}
                  </p>
                  <p class="line-clamp-2 text-sm text-gray-600">
                    {{ hub.mac }}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- Left sidebar & main wrapper -->
      <div v-if="query" class="flex-1 min-w-0 bg-white xl:flex">
        <!-- Projects List -->

        <div class="bg-white lg:min-w-0 lg:flex-1 overflow-y-auto h-full">
          <ul
            role="list"
            class="relative z-0 divide-y divide-gray-200 border-b border-gray-200"
            v-loading="loading"
            element-loading-text="Loading..."
            element-loading-spinner="el-icon-loading"
          >
            <li
              v-for="(workPoint, index) in workPoints.items"
              :key="index"
              class="relative pl-4 pr-6 py-5 hover:bg-gray-50 sm:py-6 sm:pl-6 lg:pl-5 xl:pl-6"
            >
              <div class="flex items-center justify-between space-x-4">
                <!-- Repo name and link -->
                <div class="flex space-x-2">
                  <div class="min-w-0 space-y-3">
                    <div class="flex items-center space-x-3">
                      <span
                        v-if="workPoint.isActive"
                        :class="[
                          'h-4 w-4 rounded-full flex items-center justify-center bg-green-100',
                        ]"
                        aria-hidden="true"
                      >
                        <span :class="['h-2 w-2 rounded-full bg-green-400']" />
                      </span>
                      <span
                        v-else
                        :class="[
                          'h-4 w-4 rounded-full flex items-center justify-center bg-red-100',
                        ]"
                        aria-hidden="true"
                      >
                        <span :class="['h-2 w-2 rounded-full bg-red-400']" />
                      </span>
                      <span class="block">
                        <!-- <h2 class="text-sm font-semibold">
                          <div>
                            <span class="absolute inset-0" aria-hidden="true" />
                            {{ workPoint.name }}
                          </div>
                        </h2> -->
                        <a
                          class="text-sm font-medium cursor-pointer hover:underline hover:text-primary"
                          @click.prevent="viewWorkpointDetail(workPoint)"
                        >
                          <p class="text-sm font-semibold">
                            {{ workPoint.name }}
                          </p>
                        </a>
                      </span>
                    </div>

                    <p class="relative group flex items-center space-x-2.5">
                      <span
                        class="text-sm text-gray-500 group-hover:text-gray-900 font-medium truncate"
                      >
                        {{ workPoint.modelValue }} - {{ workPoint.mac }}
                      </span>
                    </p>
                  </div>
                </div>

                <div class="sm:hidden">
                  <el-dropdown
                    trigger="click"
                    @command="handleCommand($event, workPoint)"
                  >
                    <span class="el-dropdown-link">
                      <DotsVerticalIcon class="w-5 h-5" aria-hidden="true" />
                    </span>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item command="edit">Edit</el-dropdown-item>
                        <el-dropdown-item command="delete"
                          >Delete</el-dropdown-item
                        >
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </div>

                <div
                  class="hidden sm:flex flex-col flex-shrink-0 items-end space-y-3"
                >
                  <p class="flex items-center space-x-4">
                    <span
                      v-if="workPoint.isActive == true"
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize bg-green-100 text-green-800"
                    >
                      Deployed
                    </span>
                    <el-dropdown
                      trigger="click"
                      @command="handleCommand($event, workPoint)"
                    >
                      <span class="el-dropdown-link">
                        <DotsVerticalIcon class="w-5 h-5" aria-hidden="true" />
                      </span>
                      <template #dropdown>
                        <el-dropdown-menu>
                          <el-dropdown-item command="edit"
                            >Edit</el-dropdown-item
                          >
                          <el-dropdown-item command="delete"
                            >Delete</el-dropdown-item
                          >
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
                  </p>
                  <p class="flex text-gray-500 text-sm space-x-2">
                    <span>{{ workPoint.spaceTypeValue }}</span>
                    <span aria-hidden="true">&middot;</span>
                    <span
                      >Last activity
                      {{
                        format(
                          new Date(workPoint.lastActivity),
                          "MMM dd, yyyy hh:mm a"
                        )
                      }}</span
                    >
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- Activity feed -->
    </div>
  </main>

  <AddHub ref="addHubRef" :editData="editData" @reload="getHubs" />
  <HubLogs ref="hubLogsRef" :hub="selectedHub" />
  <AddWorkPoint
    ref="addWorkPointRefs"
    :editData="editWorkPointData"
    :hub="activeHub"
    @reload="fetchWorkPoint"
  />
  <ViewLocation ref="viewLocationRefs" :workpoint="selectedWorkpoint" />
  <WorkPointDetails
    ref="workpointDetails"
    :workpoint="selectedWorkpoint"
    :image="image"
    :coordinates="coordinates"
  />
</template>

<script lang="ts">
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
import {
  BadgeCheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CollectionIcon,
  SearchIcon,
  SortAscendingIcon,
  StarIcon,
  DotsVerticalIcon,
  ChevronLeftIcon,
} from "@heroicons/vue/solid";
import { MenuAlt1Icon, XIcon } from "@heroicons/vue/outline";
import AppSubHeaderV2 from "@/components/layout/AppSubHeaderV2.vue";
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  watch,
} from "@vue/runtime-core";
import { Hubs, WorkPoints } from "@/api/app.service";
import { HubParameters } from "@/api/query.types";
import {
  ERPPaginationResponse,
  HubResponse,
  WorkPointByIdResponse,
  WorkPointResponse,
} from "@/api/response.types";
import router from "@/router";
import { useRoute } from "vue-router";
import { getNumberOfDays } from "@/common/date.filter";
import { WorkPointPayload } from "@/api/payload.type";
import format from "date-fns/esm/format";
import { debounce } from "ts-debounce";
import ViewLocation from "@/components/device-management/ViewLocation.vue";
import AddHub from "@/components/device-management/AddHub.vue";
import AddWorkPoint from "@/components/device-management/AddWorkPoint.vue";
import WorkPointDetails from "@/components/device-management/WorkPointDetails.vue";
import HubLogs from "@/components/device-management/HubLogs.vue";
import { VForm } from "@/store/modules/types/types";
import { ElMessageBox, ElNotification } from "element-plus";
import { CropImageResponse } from "@/common/types";
export default defineComponent({
  components: {
    ChevronLeftIcon,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    BadgeCheckIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    CollectionIcon,
    MenuAlt1Icon,
    SearchIcon,
    SortAscendingIcon,
    StarIcon,
    XIcon,
    AppSubHeaderV2,
    DotsVerticalIcon,
    ViewLocation,
    AddHub,
    AddWorkPoint,
    WorkPointDetails,
    HubLogs,
  },
  setup() {
    const route = useRoute();
    const hubs = ref([] as HubResponse[]);
    const loading = ref(false);
    const query = computed(() => route.query.id as string);
    const activeHub = computed(() =>
      hubs.value.find((h) => h.id == +query.value)
    );
    const searchInput = ref("");
    const searchHubInput = ref("");
    const hubParams = reactive({
      floorId: null,
      filter: null,
    } as HubParameters);
    const deviceParams = reactive({
      filter: null,
      hubId: query.value,
      isAll: true,
      pageNumber: 1,
      pageSize: 20,
      sortBy: null,
      isAscending: null,
    } as WorkPointPayload);
    const workPoints = ref({
      items: [],
      pageIndex: 0,
      totalPages: 0,
      totalCount: 0,
      hasPreviousPage: false,
      hasNextPage: false,
    } as ERPPaginationResponse<WorkPointResponse>);
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
    const filteredhubs = computed(() => {
      return hubs.value.filter((d) =>
        d.name.toLowerCase().includes(searchHubInput.value.toLowerCase())
      );
    });
    const addHubRef = ref(null as null | VForm);
    const hubLogsRef = ref(null as null | VForm);
    const addWorkPointRefs = ref(null as null | VForm);
    const viewLocationRefs = ref(null as null | VForm);
    const workpointDetails = ref(null as null | VForm);
    const selectedWorkpoint = ref({} as WorkPointByIdResponse);
    const selectedHub = ref({} as HubResponse);
    async function getHubs() {
      await Hubs.get(hubParams).then((res) => {
        hubs.value = res;
        if (!query.value) {
          router.replace({ query: { id: res[0].id } });
        }

        // hubs.value = res;
      });
    }
    async function fetchWorkPoint() {
      loading.value = true;
      if (query.value) {
        deviceParams.hubId = query.value;
        await WorkPoints.getPaginated(deviceParams).then((res) => {
          workPoints.value = res;
          loading.value = false;
        });
      }
    }
    function handlePageChange(event: number) {
      deviceParams.pageNumber = event;
      fetchWorkPoint();
    }

    const search = debounce(async () => {
      deviceParams.filter = searchInput.value;
      fetchWorkPoint();
    }, 700);
    watch(
      () => [query.value],
      () => {
        fetchWorkPoint();
      }
    );
    async function viewWorkpointDetail(workPoint: WorkPointResponse) {
      await WorkPoints.show(workPoint.id).then((res) => {
        workpointDetails.value?.mutateOpen(true);
        selectedWorkpoint.value = res;
        coordinates.value.height =
          res.area.floorplanCoordinates.coordinatesHeight;
        coordinates.value.width =
          res.area.floorplanCoordinates.coordinatesWidth;
        coordinates.value.left = res.area.floorplanCoordinates.coordinatesLeft;
        coordinates.value.top = res.area.floorplanCoordinates.coordinatesTop;
        image.value.height = res.area.floorplanCoordinates.transformHeight;
        image.value.width = res.area.floorplanCoordinates.transformWidth;
        image.value.src = res.area.floorPlanImage;
        image.value.transforms.rotate =
          res.area.floorplanCoordinates.transformRotate;
        image.value.transforms.scaleX =
          res.area.floorplanCoordinates.transformScaleX;
        image.value.transforms.scaleY =
          res.area.floorplanCoordinates.transformScaleY;
        image.value.transforms.translateX =
          res.area.floorplanCoordinates.transformTranslateX;
        image.value.transforms.translateY =
          res.area.floorplanCoordinates.transformTranslateY;
      });
    }
    function openAddWorkPointForm(
      action: string,
      event: WorkPointResponse | undefined
    ) {
      addWorkPointRefs.value?.mutateWorkPointSide(true, event);
    }
    function openAddHubForm(action: string, event: HubResponse | undefined) {
      addHubRef.value?.mutateHubSide(true, event);
    }
    function deleteHub(hub: HubResponse) {
      ElMessageBox.confirm(
        "This will delete the hub. Continue?",
        "Delete Hub",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      ).then(async () => {
        await Hubs.delete(hub.id).then(async () => {
          ElNotification({
            title: "Success",
            message: "Hub deleted",
            type: "warning",
          });
          await getHubs();
        });
      });
    }
    function deleteWorkpoint(hub: WorkPointResponse) {
      ElMessageBox.confirm(
        "This will delete the workpoint. Continue?",
        "Delete Workpoint",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      ).then(async () => {
        await WorkPoints.delete(hub.id).then(async () => {
          ElNotification({
            title: "Success",
            message: "Workpoint deleted",
            type: "warning",
          });
          await fetchWorkPoint();
        });
      });
    }
    function handeHubCommand(command: string, event: HubResponse) {
      if (command == "edit") {
        openAddHubForm("edit", event);
      }
      if (command == "delete") {
        deleteHub(event);
      }
      if (command == "viewLogs") {
        selectedHub.value = event;
        hubLogsRef.value?.mutateOpen(true);
      }
    }
    function handleCommand(command: string, event: WorkPointResponse) {
      if (command == "edit") {
        openAddWorkPointForm("edit", event);
      }
      if (command == "delete") {
        deleteWorkpoint(event);
      }
    }
    const lastSorted = ref(true);
    async function handleSort(event: string) {
      deviceParams.sortBy = event;
      deviceParams.isAscending = !lastSorted.value;
      lastSorted.value = !lastSorted.value;
      await fetchWorkPoint();
    }

    onMounted(async () => {
      await getHubs();
      await fetchWorkPoint();
    });

    return {
      format,
      hubs,
      getNumberOfDays,
      query,
      fetchWorkPoint,
      workPoints,
      handlePageChange,
      searchInput,
      search,
      viewWorkpointDetail,
      selectedWorkpoint,
      addHubRef,
      addWorkPointRefs,
      viewLocationRefs,
      workpointDetails,
      handeHubCommand,
      openAddWorkPointForm,
      handleCommand,
      openAddHubForm,
      router,
      searchHubInput,
      filteredhubs,
      handleSort,
      coordinates,
      image,
      loading,
      hubLogsRef,
      selectedHub,
      activeHub,
    };
  },
});
</script>
