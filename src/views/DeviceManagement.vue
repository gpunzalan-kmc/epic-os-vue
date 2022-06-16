<template>
  <div class="relative h-screen flex bg-blue-gray-50 overflow-hidden">
    <div class="flex-1 min-w-0 flex flex-col overflow-hidden">
      <div class="flex-1 flex overflow-hidden">
        <div class="flex-1 flex flex-col overflow-y-auto xl:overflow-hidden">
          <div class="flex-1 flex xl:overflow-hidden mb-16">
            <!-- Secondary sidebar -->
            <nav
              aria-label="Sections"
              class="hidden flex-shrink-0 w-96 bg-white border-r border-blue-gray-200 xl:flex xl:flex-col"
            >
              <div
                class="flex-shrink-0 h-16 px-6 border-b border-blue-gray-200 flex items-center justify-between bg-gray-800"
              >
                <div class="flex space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    enable-background="new 0 0 24 24"
                    class="text-primary fill-current"
                    height="24px"
                    viewBox="0 0 24 24"
                    width="24px"
                  >
                    <rect fill="none" height="24" width="24" />
                    <path
                      d="M21,6.5c-1.66,0-3,1.34-3,3c0,0.07,0,0.14,0.01,0.21l-2.03,0.68c-0.64-1.21-1.82-2.09-3.22-2.32V5.91 C14.04,5.57,15,4.4,15,3c0-1.66-1.34-3-3-3S9,1.34,9,3c0,1.4,0.96,2.57,2.25,2.91v2.16c-1.4,0.23-2.58,1.11-3.22,2.32L5.99,9.71 C6,9.64,6,9.57,6,9.5c0-1.66-1.34-3-3-3s-3,1.34-3,3s1.34,3,3,3c1.06,0,1.98-0.55,2.52-1.37l2.03,0.68 c-0.2,1.29,0.17,2.66,1.09,3.69l-1.41,1.77C6.85,17.09,6.44,17,6,17c-1.66,0-3,1.34-3,3s1.34,3,3,3s3-1.34,3-3 c0-0.68-0.22-1.3-0.6-1.8l1.41-1.77c1.36,0.76,3.02,0.75,4.37,0l1.41,1.77C15.22,18.7,15,19.32,15,20c0,1.66,1.34,3,3,3s3-1.34,3-3 s-1.34-3-3-3c-0.44,0-0.85,0.09-1.23,0.26l-1.41-1.77c0.93-1.04,1.29-2.4,1.09-3.69l2.03-0.68c0.53,0.82,1.46,1.37,2.52,1.37 c1.66,0,3-1.34,3-3S22.66,6.5,21,6.5z M3,10.5c-0.55,0-1-0.45-1-1c0-0.55,0.45-1,1-1s1,0.45,1,1C4,10.05,3.55,10.5,3,10.5z M6,21 c-0.55,0-1-0.45-1-1c0-0.55,0.45-1,1-1s1,0.45,1,1C7,20.55,6.55,21,6,21z M11,3c0-0.55,0.45-1,1-1s1,0.45,1,1c0,0.55-0.45,1-1,1 S11,3.55,11,3z M12,15c-1.38,0-2.5-1.12-2.5-2.5c0-1.38,1.12-2.5,2.5-2.5s2.5,1.12,2.5,2.5C14.5,13.88,13.38,15,12,15z M18,19 c0.55,0,1,0.45,1,1c0,0.55-0.45,1-1,1s-1-0.45-1-1C17,19.45,17.45,19,18,19z M21,10.5c-0.55,0-1-0.45-1-1c0-0.55,0.45-1,1-1 s1,0.45,1,1C22,10.05,21.55,10.5,21,10.5z"
                    />
                  </svg>
                  <p class="text-lg font-semibold text-white">Hubs</p>
                </div>

                <el-button type="primary" size="small" @click="openAddHubForm"
                  >Add Hub</el-button
                >
              </div>
              <ul class="border-b border-gray-200 divide-y divide-gray-200">
                <li
                  v-for="hub in hubs"
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
                        <h2
                          class="text-sm font-medium cursor-pointer hover:underline hover:text-primary"
                          @click.prevent="
                            router.replace({ query: { id: hub.id } })
                          "
                        >
                          <p class="text-lg font-semibold">
                            {{ hub.name }}
                          </p>
                        </h2>
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
                          <el-dropdown-item command="edit"
                            >Edit</el-dropdown-item
                          >
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
                        format(
                          new Date(hub.lastActivity),
                          "MMM dd, yyyy hh:mm a"
                        )
                      }}
                    </p>
                    <p class="line-clamp-2 text-sm text-gray-600">
                      {{ hub.floor.name }}
                      {{ hub.floor.building }}
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
            </nav>

            <!-- Main content -->
            <div class="flex-1 max-h-screen xl:overflow-y-auto w-full">
              <div
                class="md:hidden w-full bg-white flex justify-between border-b border-gray-700 p-3 bg-gray-800"
              >
                <el-select
                  size="medium"
                  :model-value="+query"
                  @change="router.replace({ query: { id: $event } })"
                >
                  <el-option
                    v-for="hub in hubs"
                    :key="hub.id"
                    :value="hub.id"
                    :label="hub.name"
                  ></el-option>
                </el-select>
                <el-button
                  @click="openAddHubForm"
                  size="medium"
                  type="primary"
                  plain
                  >Add Hub</el-button
                >
              </div>
              <template v-if="view == 'logs'">
                <HubLogs />
              </template>
              <template v-else>
                <div
                  class="flex-shrink-0 h-16 px-6 border-b border-blue-gray-200 flex items-center justify-between bg-gray-800"
                >
                  <div class="flex space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      enable-background="new 0 0 24 24"
                      class="fill-current text-primary"
                      height="24px"
                      viewBox="0 0 24 24"
                      width="24px"
                    >
                      <rect fill="none" height="24" width="24" />
                      <path
                        d="M7.76,16.24C6.67,15.16,6,13.66,6,12s0.67-3.16,1.76-4.24l1.42,1.42C8.45,9.9,8,10.9,8,12c0,1.1,0.45,2.1,1.17,2.83 L7.76,16.24z M16.24,16.24C17.33,15.16,18,13.66,18,12s-0.67-3.16-1.76-4.24l-1.42,1.42C15.55,9.9,16,10.9,16,12 c0,1.1-0.45,2.1-1.17,2.83L16.24,16.24z M12,10c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S13.1,10,12,10z M20,12 c0,2.21-0.9,4.21-2.35,5.65l1.42,1.42C20.88,17.26,22,14.76,22,12s-1.12-5.26-2.93-7.07l-1.42,1.42C19.1,7.79,20,9.79,20,12z M6.35,6.35L4.93,4.93C3.12,6.74,2,9.24,2,12s1.12,5.26,2.93,7.07l1.42-1.42C4.9,16.21,4,14.21,4,12S4.9,7.79,6.35,6.35z"
                      />
                    </svg>
                    <p class="text-lg font-semibold text-white">Workpoints</p>
                  </div>

                  <div class="space-x-2 hidden md:flex">
                    <el-input
                      size="small"
                      style="width: 200px"
                      placeholder="Search Device"
                      prefix-icon="el-icon-search"
                      v-model="searchInput"
                      @keyup.enter="search"
                    >
                    </el-input>

                    <el-button
                      type="primary"
                      size="small"
                      @click.prevent="openAddWorkPointForm"
                      >Add Workpoint</el-button
                    >
                  </div>
                </div>
                <div class="w-full relative">
                  <div
                    class="bg-white rounded-lg"
                    v-loading="tableLoading"
                    element-loading-text="Loading..."
                    element-loading-spinner="el-icon-loading"
                  >
                    <div class="md:hidden flex justify-between p-3">
                      <el-button
                        type="primary"
                        size="small"
                        @click.prevent="openAddWorkPointForm"
                        >Add Workpoint</el-button
                      >

                      <el-input
                        size="small"
                        style="width: 200px"
                        placeholder="Search Device"
                        prefix-icon="el-icon-search"
                        v-model="searchInput"
                        @keyup.enter="search"
                      >
                      </el-input>
                    </div>
                    <el-table
                      :data="workPoints.items"
                      height="700"
                      class="border w-full"
                      @sort-change="sortTable"
                    >
                      <el-table-column
                        label="Name"
                        prop="name"
                        min-width="120"
                        sortable
                      >
                        <template #default="scope">
                          <div class="flex items-center space-x-3">
                            <span
                              v-if="getNumberOfDays(scope.row.lastActivity) < 7"
                              class="h-4 w-4 bg-green-100 rounded-full flex items-center justify-center"
                              aria-hidden="true"
                            >
                              <span
                                class="h-2 w-2 bg-green-400 rounded-full"
                              ></span>
                            </span>
                            <span
                              v-else
                              class="h-4 w-4 bg-red-100 rounded-full flex items-center justify-center"
                              aria-hidden="true"
                            >
                              <span
                                class="h-2 w-2 bg-red-400 rounded-full"
                              ></span>
                            </span>

                            <span class="block">
                              <h2 class="text-sm font-medium">
                                <a
                                  @click.prevent="
                                    viewWorkpointDetail(scope.row)
                                  "
                                  class="text-md font-semibold text-gray-900 truncate hover:underline cursor-pointer"
                                >
                                  {{ scope.row.name }}
                                </a>
                              </h2>
                            </span>
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="Space Type"
                        min-width="120"
                        prop="spaceType"
                        sortable
                      >
                        <template #default="scope">
                          <div class="text-sm text-gray-900">
                            {{ scope.row.spaceTypeValue }}
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="MAC Address"
                        min-width="170"
                        sortable
                      >
                        <template #default="scope">
                          <div class="text-sm text-gray-900">
                            {{ scope.row.mac }}
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="Last Activity"
                        min-width="180"
                        prop="lastActivity"
                        sortable
                      >
                        <template #default="scope">
                          <div class="text-sm text-gray-900">
                            {{
                              format(
                                new Date(scope.row.lastActivity),
                                "MMM dd, yyyy hh:mm a"
                              )
                            }}
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="Deployed"
                        min-width="100"
                        prop="isActive"
                        sortable
                      >
                        <template #default="scope">
                          <div class="text-sm text-gray-900">
                            <span
                              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
                              :class="{
                                'bg-green-100 text-green-800':
                                  scope.row.isActive == true,
                                'bg-red-100 text-red-800':
                                  scope.row.isActive == false,
                              }"
                            >
                              {{ scope.row.isActive == true ? "Yes" : "No" }}
                            </span>
                          </div>
                        </template>
                      </el-table-column>

                      <el-table-column min-width="60">
                        <template #default="scope">
                          <div class="flex my-auto justify-end">
                            <el-dropdown
                              trigger="click"
                              @command="handleCommand($event, scope.row)"
                            >
                              <span class="el-dropdown-link">
                                <DotsVerticalIcon
                                  class="w-5 h-5"
                                  aria-hidden="true"
                                />
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
                          </div>
                        </template>
                      </el-table-column>
                    </el-table>
                    <div class="flex justify-end p-3">
                      <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handlePageChange"
                        :currentPage="workPoints.pageIndex"
                        :page-sizes="[10, 20, 50, 100]"
                        :page-size="deviceParams.pageSize"
                        layout="sizes, prev, pager, next"
                        :total="workPoints.totalCount"
                      >
                      </el-pagination>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <AddHub ref="addHubRef" :editData="editData" @reload="getHubs" />
  <AddWorkPoint
    ref="addWorkPointRefs"
    :editData="editWorkPointData"
    @reload="fetchWorkPoint"
  />
  <ViewLocation ref="viewLocationRefs" :workpoint="selectedWorkpoint" />
  <WorkPointDetails
    ref="workpointDetails"
    :workpoint="selectedWorkpoint"
    :image="image"
    :coordinates="coordinates"
  />
  <!-- <el-dialog v-model="viewLocationDialog" title="Device Location" width="450px">
    <ViewLocation
      ref="viewLocationRefs"
      v-if="viewLocationDialog"
      :workpoint="selectedWorkpoint"
    />
  </el-dialog> -->
</template>
<script lang="ts">
import { computed, onMounted, reactive, ref, watch } from "vue";
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
  ArchiveIcon as ArchiveIconSolid,
  ChevronDownIcon,
  ChevronUpIcon,
  DotsVerticalIcon,
  FolderDownloadIcon,
  ReplyIcon,
  SearchIcon,
  UserAddIcon,
} from "@heroicons/vue/solid";
import {
  ArchiveIcon as ArchiveIconOutline,
  BanIcon,
  BellIcon,
  FlagIcon,
  InboxIcon,
  MenuIcon,
  PencilAltIcon,
  UserCircleIcon,
  XIcon,
} from "@heroicons/vue/outline";
import {
  EPRPaginationV2Response,
  ERPPaginationResponse,
  HubResponse,
  OfficeResponse,
  WorkPointResponse,
} from "@/api/response.types";

import { Hubs, WorkPoints } from "@/api/app.service";
import { useRoute } from "vue-router";
import router from "@/router";
import { WorkPointPayload } from "@/api/payload.type";

import { VForm } from "@/store/modules/types/types";
import { CheckIcon, PencilIcon, TrashIcon } from "@heroicons/vue/solid";
import { isManageAllowed } from "@/common/access.security";
import format from "date-fns/format";
import { getNumberOfDays } from "@/common/date.filter";
import { HubParameters } from "@/api/query.types";
import { ElMessageBox, ElNotification } from "element-plus";
import HubLogs from "@/components/device-management/HubLogs.vue";
import ViewLocation from "@/components/device-management/ViewLocation.vue";
import AddHub from "@/components/device-management/AddHub.vue";
import AddWorkPoint from "@/components/device-management/AddWorkPoint.vue";
import WorkPointDetails from "@/components/device-management/WorkPointDetails.vue";
import { CropImageResponse } from "@/common/types";
const user = {
  name: "Whitney Francis",
  email: "whitneyfrancis@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  {
    name: "Inboxes",
    href: "#",
    children: [
      { name: "Technical Support", href: "#" },
      { name: "Sales", href: "#" },
      { name: "General", href: "#" },
    ],
  },
  { name: "Reporting", href: "#", children: [] },
  { name: "Settings", href: "#", children: [] },
];
const sidebarNavigation = [
  { name: "Open", href: "#", icon: InboxIcon, current: true },
  { name: "Archive", href: "#", icon: ArchiveIconOutline, current: false },
  { name: "Customers", href: "#", icon: UserCircleIcon, current: false },
  { name: "Flagged", href: "#", icon: FlagIcon, current: false },
  { name: "Spam", href: "#", icon: BanIcon, current: false },
  { name: "Drafts", href: "#", icon: PencilAltIcon, current: false },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Sign out", href: "#" },
];

export default {
  components: {
    Dialog,
    DialogOverlay,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
    TransitionRoot,
    ArchiveIconSolid,
    BellIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    DotsVerticalIcon,
    FolderDownloadIcon,
    MenuIcon,
    PencilIcon,
    ReplyIcon,
    SearchIcon,
    UserAddIcon,
    XIcon,
    AddHub,
    CheckIcon,
    TrashIcon,
    AddWorkPoint,
    HubLogs,
    ViewLocation,
    WorkPointDetails,
  },
  setup() {
    const open = ref(false);
    const route = useRoute();
    const query = computed(() => route.query.id as string);
    const hubs = ref([] as HubResponse[]);
    const view = computed(() => route.query.view as string);
    const tableLoading = ref(false);
    const viewLocationDialog = ref(false);
    const workPoints = ref({
      items: [],
      pageIndex: 0,
      totalPages: 0,
      totalCount: 0,
      hasPreviousPage: false,
      hasNextPage: false,
    } as ERPPaginationResponse<WorkPointResponse>);

    const selectedWorkpoint = ref({} as WorkPointResponse);
    const hubParams = reactive({
      floorId: null,
      filter: null,
    } as HubParameters);
    async function getHubs() {
      await Hubs.get(hubParams).then((res) => {
        hubs.value = res;
        if (!query.value) {
          router.replace({ query: { id: res[0].id } });
        }

        // hubs.value = res;
      });
    }
    const searchInput = ref("");
    const searchHubInput = ref("");

    const editData = ref({
      id: 0,
      name: "",
      deviceModel: "",
      mac: "",
      ipAddress: "",
      floorId: 0,
    } as HubResponse);

    const editWorkPointData = ref({
      id: 0,
      name: "",
      mac: "",
      coordinateX: 0,
      coordinateY: 0,
      coordinateZ: 0,
      width: 0,
      height: 0,
      rotation: 0,
      areaId: 0,
      hubId: 0,
      isActive: false,
      locationType: 0,
    } as WorkPointResponse);
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
    const addHubRef = ref(null as null | VForm);
    const addWorkPointRefs = ref(null as null | VForm);
    const viewLocationRefs = ref(null as null | VForm);
    const workpointDetails = ref(null as null | VForm);
    const deviceParams = reactive({
      filter: null,
      hubId: query.value,
      isAll: true,
      pageNumber: 1,
      pageSize: 20,
      sortBy: null,
      isAscending: null,
    } as WorkPointPayload);
    async function fetchWorkPoint() {
      if (query.value) {
        tableLoading.value = true;
        deviceParams.hubId = query.value;
        await WorkPoints.getPaginated(deviceParams).then((res) => {
          workPoints.value = res;
          tableLoading.value = false;
        });
      }
    }

    function handlePageChange(event: number) {
      deviceParams.pageNumber = event;
      fetchWorkPoint();
    }
    function handleSizeChange(event: number) {
      deviceParams.pageSize = event;
      fetchWorkPoint();
    }
    function search() {
      deviceParams.filter = searchInput.value;

      fetchWorkPoint();
    }
    function searchHub() {
      hubParams.filter = searchHubInput.value;
      getHubs();
    }
    watch(
      () => [query.value],
      () => {
        fetchWorkPoint();
      }
    );
    onMounted(async () => {
      await getHubs();
      await fetchWorkPoint();
    });
    function editHub(hub: HubResponse) {
      editData.value = hub;
      addHubRef.value?.mutateSide(true);
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
    function editWorkPoint(workPoint: WorkPointResponse) {
      editWorkPointData.value = workPoint;
      addWorkPointRefs.value?.mutateWorkPointSide(true, workPoint);
    }

    function openAddHubForm(action: string, event: HubResponse | undefined) {
      addHubRef.value?.mutateHubSide(true, event);
    }
    function openAddWorkPointForm(
      action: string,
      event: WorkPointResponse | undefined
    ) {
      addWorkPointRefs.value?.mutateWorkPointSide(true, event);
    }

    function handleCommand(command: string, event: WorkPointResponse) {
      if (command == "edit") {
        openAddWorkPointForm("edit", event);
      }
      if (command == "delete") {
        deleteWorkpoint(event);
      }
    }
    const buildings = ref({
      data: [],
      paging: {
        pageNo: 0,
        pageSize: 0,
        pageCount: 0,
        totalRecordCount: 0,
      },
    } as EPRPaginationV2Response<OfficeResponse>);

    function handeHubCommand(command: string, event: HubResponse) {
      if (command == "edit") {
        openAddHubForm("edit", event);
      }
      if (command == "delete") {
        deleteHub(event);
      }
      if (command == "viewLogs") {
        router.replace({ query: { id: event.id, view: "logs" } });
      }
    }
    async function sortTable(event: {
      column: string;
      prop: string;
      order: string;
    }) {
      deviceParams.sortBy = event.prop;
      deviceParams.isAscending = event.order == "ascending" ? true : false;
      await fetchWorkPoint();
    }
    function viewLocationModal(workPoint: WorkPointResponse) {
      selectedWorkpoint.value = workPoint;
      viewLocationRefs.value?.mutateOpen(true);
    }
    function viewWorkpointDetail(workPoint: WorkPointResponse) {
      workpointDetails.value?.mutateOpen(true);
      selectedWorkpoint.value = workPoint;

      coordinates.value.height =
        workPoint.area.floorplanCoordinates.coordinatesHeight;
      coordinates.value.width =
        workPoint.area.floorplanCoordinates.coordinatesWidth;
      coordinates.value.left =
        workPoint.area.floorplanCoordinates.coordinatesLeft;
      coordinates.value.top =
        workPoint.area.floorplanCoordinates.coordinatesTop;
      image.value.height = workPoint.area.floorplanCoordinates.transformHeight;
      image.value.width = workPoint.area.floorplanCoordinates.transformWidth;
      image.value.src = workPoint.area.floorPlanImage;
      image.value.transforms.rotate =
        workPoint.area.floorplanCoordinates.transformRotate;
      image.value.transforms.scaleX =
        workPoint.area.floorplanCoordinates.transformScaleX;
      image.value.transforms.scaleY =
        workPoint.area.floorplanCoordinates.transformScaleY;
      image.value.transforms.translateX =
        workPoint.area.floorplanCoordinates.transformTranslateX;
      image.value.transforms.translateY =
        workPoint.area.floorplanCoordinates.transformTranslateY;
    }
    return {
      viewLocationDialog,
      handeHubCommand,
      sortTable,
      getNumberOfDays,
      format,
      buildings,
      router,
      addWorkPointRefs,
      user,
      navigation,
      sidebarNavigation,
      userNavigation,
      workPoints,
      addHubRef,
      open,
      hubs,
      query,
      getHubs,
      route,
      editHub,
      editData,
      fetchWorkPoint,
      editWorkPointData,
      editWorkPoint,
      isManageAllowed,
      handlePageChange,
      handleSizeChange,
      deviceParams,
      tableLoading,
      searchInput,
      search,
      handleCommand,
      searchHubInput,
      searchHub,
      deleteWorkpoint,
      view,
      openAddWorkPointForm,
      openAddHubForm,
      selectedWorkpoint,
      viewLocationModal,
      viewLocationRefs,
      workpointDetails,
      viewWorkpointDetail,
      coordinates,
      image,
    };
  },
};
</script>
