<template>
  <header class="bg-gray-800 ">
    <div
      class="max-w-8xl mx-auto py-3 px-4 sm:px-6 lg:px-8 flex-row flex justify-between "
    >
      <div class="flex  space-x-2 ">
        <NeighborhoodIcon class="w-7 h-7 text-primary" />
        <h2 class="text-lg my-auto leading-6 font-semibold text-white">
          Neighborhoods
        </h2>
      </div>
      <div class="flex">
        <el-button
          class="hidden md:block my-auto"
          v-if="isManageAllowed"
          type="primary"
          size="mini"
          @click="addNeighborhood.mutateSide(true)"
          icon="el-icon-plus"
          >Add
        </el-button>
      </div>
    </div>
  </header>

  <div class="border-b ">
    <div
      class="max-w-8xl mx-auto py-3 px-4 sm:px-6 lg:px-8 flex-row flex justify-between space-y-0 w-full space-x-2"
    >
      <div class="flex  md:space-x-2 ">
        <div class="hidden  bg-gray-100 rounded-lg items-center md:flex">
          <button
            type="button"
            @click="changeView"
            class="p-1.5 rounded-md hover:shadow-sm outline-none"
            :class="{
              'bg-primary text-white': view == 'table',
              'text-gray-400': view == 'card',
            }"
          >
            <ViewListIcon class="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            @click="changeView"
            class="ml-0.5 p-1.5 rounded-md shadow-sm outline-none"
            :class="{
              'bg-primary text-white': view == 'card',
              'text-gray-400': view == 'table',
            }"
          >
            <ViewGridIconSolid class="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <el-select
          size="small"
          v-if="view == 'card'"
          v-model="cardSorting"
          @change="sortCardView"
        >
          <el-option :value="0" label="Most Occupied Desks"></el-option>
          <el-option :value="1" label="Least Occupied Desk"></el-option>
          <el-option :value="2" label="Most Occupied Rooms"></el-option>
          <el-option :value="3" label="Least Occupied Rooms"></el-option>
        </el-select>
      </div>
      <div class="flex space-x-2 ">
        <el-input
          placeholder="Search neighborhood"
          v-model="inputSearch"
          class="input-with-select w-full"
          size="small"
          prefix-icon="el-icon-search"
          @keyup.enter="search"
        >
        </el-input>

        <!-- <el-button
          class="hidden md:block my-auto"
          v-if="isManageAllowed"
          type="primary"
          size="mini"
          @click="addNeighborhood.mutateSide(true)"
          icon="el-icon-plus"
          >Add
        </el-button> -->
        <!-- <el-button
          class="flex md:hidden my-auto"
          v-if="isManageAllowed"
          type="primary"
          size="mini"
          @click="addNeighborhood.mutateSide(true)"
          icon="el-icon-plus"
        >
        </el-button> -->
        <el-pagination
          class="hidden md:block"
          background
          layout="prev, next"
          :total="data.totalCount"
          :current-page="data.pageIndex"
          :page-size="params.pageSize"
          @current-change="changePage"
        >
        </el-pagination>
      </div>
    </div>
  </div>

  <main class="overflow-y-auto h-full">
    <div class="max-w-8xl mx-auto  sm:px-6 lg:px-8">
      <el-space
        v-if="view == 'card'"
        id="propertySkeleton"
        class="w-full"
        direction="vertical"
        alignment="flex-start"
      >
        <el-skeleton class="w-full" :loading="loading" animated>
          <template #template>
            <ul
              role="list"
              class="grid grid-cols-1 w-full gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 px-2 md:px-0 py-2"
            >
              <li
                v-for="index in 6"
                :key="index"
                class="col-span-1 flex flex-col divide-y divide-gray-200 hover:shadow-lg rounded-b-md"
              >
                <NeighborhoodSkeletonLoading />
              </li>
            </ul>
          </template>
          <template #default v-if="isAccessAllowed">
            <ul
              role="list"
              class="grid grid-cols-1 w-full gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 px-2 md:px-0 py-2"
            >
              <li
                v-for="(row, index) in data.items"
                :key="index"
                class="col-span-1 flex flex-col divide-y divide-gray-200 hover:shadow-lg rounded-b-md"
              >
                <NeighborhoodCard
                  :data="row"
                  @edit="editArea"
                  @delete="deleteArea"
                />
              </li>
            </ul>
          </template>
        </el-skeleton>
      </el-space>
      <div class="md:hidden flex justify-center px-2 pb-2">
        <el-button
          class="w-full "
          :loading="loadMoreLoading"
          size="small"
          type="primary"
          round
          @click="loadMore"
          >Load More</el-button
        >
      </div>
      <NeighborhoodTable
        :loading="loading"
        v-if="view == 'table'"
        :data="data.items"
        @edit="editArea"
        @delete="deleteArea"
        @sortColumn="sortProperties"
        :sortedBy="params.sortBy"
      />
    </div>
  </main>
  <AddNeighborhood
    ref="addNeighborhood"
    @reload="getNeighborhood"
    :editData="editData"
  />
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";
import NeighborhoodSkeletonLoading from "@/components/neighborhood/NeighborhoodSkeletonLoading.vue";
import { isAccessAllowed, isManageAllowed } from "@/common/access.security";
import { VForm } from "@/store/modules/types/types";
import { GetNeighborhoods } from "@/api/query.types";
import { Neighborhood } from "@/api/app.service";
import {
  ERPPaginationResponse,
  NeighborhoodResponse,
} from "@/api/response.types";
import AddNeighborhood from "@/components/neighborhood/AddNeighborhood.vue";
import NeighborhoodCard from "@/components/neighborhood/NeighborhoodCard.vue";
import AppSubHeaderV2 from "@/components/layout/AppSubHeaderV2.vue";
import { ElMessageBox } from "element-plus";
import NeighborhoodIcon from "@/svg-components/NeighborhoodIcon.vue";
import router from "@/router";
import { useRoute } from "vue-router";
import NeighborhoodTable from "@/components/neighborhood/NeighborhoodTable.vue";
import {
  ViewGridIcon as ViewGridIconSolid,
  ViewListIcon,
} from "@heroicons/vue/solid";

export default defineComponent({
  components: {
    NeighborhoodSkeletonLoading,
    AddNeighborhood,
    NeighborhoodCard,
    AppSubHeaderV2,
    NeighborhoodIcon,
    NeighborhoodTable,
    ViewListIcon,
    ViewGridIconSolid,
  },
  setup() {
    const inputSearch = ref("");
    const route = useRoute();
    const loading = ref(false);
    const cardSorting = ref(0);
    const params = reactive({
      filter: null,
      pageNumber: 1,
      pageSize: 6,
      sortBy: "name",
      isAscending: true,
      view: localStorage.getItem("propertyView") || "card",
    } as GetNeighborhoods);
    const data = ref({
      items: [],
      pageIndex: 0,
      totalPages: 0,
      totalCount: 0,
      hasPreviousPage: false,
      hasNextPage: false,
    } as ERPPaginationResponse<NeighborhoodResponse>);
    const editData = ref({
      id: 0,
      name: "",
      floorId: 0,
      floorName: "",
      floorPlanImage: "",
      siteImage: "",
    } as NeighborhoodResponse);
    const view = ref(localStorage.getItem("propertyView") || "card");

    const routeName = computed(() => route.name as string | null);
    const width = ref(0);
    function recalQuery() {
      const paramsKey = {} as { [key: string]: any };
      Object.keys(params).map((key) => {
        if (params[key]) paramsKey[key] = params[key];
      });

      router.push({ query: paramsKey });
    }
    async function getNeighborhood() {
      loading.value = true;
      await Neighborhood.get(params).then((res) => {
        data.value = res;
        loading.value = false;
      });
    }
    function sortCardView() {
      if (cardSorting.value == 0) {
        params.sortBy = "occupancyrate";
        params.isAscending = false;
      }
      if (cardSorting.value == 1) {
        params.sortBy = "occupancyrate";
        params.isAscending = true;
      }
      if (cardSorting.value == 2) {
        params.sortBy = "meetingroomsactive";
        params.isAscending = false;
      }
      if (cardSorting.value == 3) {
        params.sortBy = "meetingroomsactive";
        params.isAscending = true;
      }
      recalQuery();
      getNeighborhood();
    }
    function handleResize() {
      const w = window.innerWidth;
      if (w <= 767) {
        params.pageSize = 6;
        params.view = "card";
        view.value = "card";
        if (routeName.value == "KMC Neighborhoods") recalQuery();
        // sortCardView();
      }
      width.value = w;
    }

    const addNeighborhood = ref(null as null | VForm);

    const searchParams = computed(() => route.query.filter as string);
    const pageParams = computed(() => route.query.pageNumber as null | number);
    const sortByParams = computed(() => route.query.sortBy as null | string);
    const isAscendingParams = computed(
      () => route.query.isAscending as null | boolean
    );
    const viewParams = computed(() => route.query.view as null | string);

    function search() {
      params.pageNumber = 1;
      params.filter = inputSearch.value;
      recalQuery();
      getNeighborhood();
    }
    // watch(
    //   () => [
    //     searchParams.value,
    //     pageParams.value,
    //     sortByParams.value,
    //     isAscendingParams.value,
    //   ],
    //   () => {
    //     recalQuery();
    //     getNeighborhood();
    //   }
    // );

    onMounted(() => {
      params.filter = searchParams.value;
      if (pageParams.value) params.pageNumber = pageParams.value;
      if (sortByParams.value) params.sortBy = sortByParams.value;
      if (isAscendingParams.value) params.isAscending = isAscendingParams.value;
      if (viewParams.value) params.view = viewParams.value;
      inputSearch.value = searchParams.value;
      if (view.value == "table") {
        params.pageSize = 10;
      } else {
        params.pageSize = 6;
      }
      window.addEventListener("resize", handleResize);

      if (window.innerWidth <= 767) {
        params.pageSize = 6;
        params.view = "card";
        view.value = "card";
        recalQuery();
        // sortCardView();
      }
      sortCardView();
    });
    function changePage(event: number) {
      params.pageNumber = event;
      recalQuery();
      getNeighborhood();
    }
    function editArea(event: NeighborhoodResponse) {
      editData.value = event;
      addNeighborhood.value?.mutateSide(true);
    }
    function deleteArea(id: number) {
      ElMessageBox.confirm("This will delete the area. Continue?", "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      }).then(async () => {
        loading.value = true;
        await Neighborhood.delete(id).then(() => {
          getNeighborhood();
          loading.value = false;
        });
      });
    }

    function sortProperties(event: { prop: string; order: string }) {
      params.sortBy = event.prop;
      params.isAscending = event.order == "ascending" ? true : false;
      recalQuery();
      getNeighborhood();
    }
    function changeView() {
      if (view.value == "table") {
        params.pageSize = 6;
        params.view = "card";
        view.value = "card";
        params.view = view.value;
        localStorage.setItem("propertyView", "card");
      } else {
        params.pageSize = 10;
        params.view = "table";
        view.value = "table";
        params.view = view.value;
        localStorage.setItem("propertyView", "table");
      }
      recalQuery();
      getNeighborhood();
    }
    const loadMoreLoading = ref(false);
    function loadMore() {
      if (data.value.totalCount > params.pageSize) {
        loadMoreLoading.value = true;
        params.pageSize = params.pageSize + 6;
        recalQuery();
        getNeighborhood().then(() => {
          loadMoreLoading.value = false;
        });
      }
    }
    return {
      editArea,
      editData,
      isAccessAllowed,
      isManageAllowed,
      addNeighborhood,
      params,
      data,
      search,
      changePage,
      loading,
      deleteArea,
      inputSearch,
      getNeighborhood,
      sortProperties,
      changeView,
      view,
      sortByParams,
      isAscendingParams,
      viewParams,
      loadMore,
      loadMoreLoading,
      cardSorting,
      sortCardView,
      width,
    };
  },
});
</script>
