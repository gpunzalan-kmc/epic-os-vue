<template>
  <div class="flex justify-end px-10 pt-4">
    <div class="flex">
      <el-input
        style="width:300px"
        size="small"
        v-model="searchVal"
        placeholder="Search Site"
        prefix-icon="el-icon-search"
      ></el-input>
      <el-pagination
        @current-change="changePage"
        background
        layout="prev, next"
        :page-size="12"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>

  <el-row
    class="px-10 pb-10 pt-5 "
    :gutter="20"
    v-loading="loading"
    element-loading-text="Loading..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0)"
  >
    <el-col
      :sm="24"
      :md="12"
      :lg="6"
      class="mb-5"
      v-for="(site, index) in paginatedSite"
      :key="index"
    >
      <div
        class="w-full bg-white  p-3 rounded-md tracking-wide border hover:shadow-md"
        @click="changeRoute(site.buildingID)"
      >
        <div id="header" class="flex items-center mb-4 px-3 pt-2 truncate">
          <div id="header-text" class="leading-5 sm w-64">
            <h4 id="name" class="text-xl font-semibold  cursor-pointer">
              {{ site.name }}
            </h4>
            <p class="w-full text-sm font-semibold text-gray-600 truncate">
              {{ site.line1 }}
            </p>
            <!-- <h5 id="job" class="font-semibold text-sm text-gray-500">
              {{ employee.deparment }}
            </h5> -->
          </div>
        </div>
        <div class="bg-subWall w-full p-2">
          <table class="text-sm class ">
            <tbody>
              <tr>
                <td class="px-2 text-gray-500 font-semibold">
                  <svg
                    class="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z"
                    ></path>
                    <path
                      d="M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"
                    ></path>
                  </svg>
                </td>
                <td class="px-2">{{ site.floorCount }} Floors</td>
              </tr>
              <tr>
                <td class="px-2 text-gray-500 font-semibold">
                  <svg
                    class="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M13 7H7v6h6V7z"></path>
                    <path
                      fill-rule="evenodd"
                      d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </td>
                <td class="px-2">
                  {{ site.hubCount }} Hubs | {{ site.workPointCount }} Sensors
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div></el-col
    >
  </el-row>
</template>
<script lang="ts">
import { Sites } from "@/api/app.service";
import { OfficeResponse } from "@/api/response.types";
import router from "@/router";
import { computed, defineComponent, onMounted, reactive, ref } from "vue";
export default defineComponent({
  setup() {
    const page = ref(0);
    const total = ref(1);
    const loading = ref(false);
    const params = reactive({
      page: "1",
      limit: "100",
    });
    const searchVal = ref("");
    const sitesData = ref([] as Array<OfficeResponse>);
    const searchData = computed(() => {
      return sitesData.value.filter((site) =>
        site.name.toLowerCase().includes(searchVal.value.toLowerCase())
      );
    });
    function changePage(event: number) {
      page.value = event - 1;
    }
    const paginatedSite = computed(() =>
      searchData.value.slice(page.value * 12, (page.value + 1) * 12)
    );
    function changeRoute(id: number) {
      router.replace({ path: `/sites/${id}`, query: { view: "floors" } });
    }
    async function fetchSites() {
      loading.value = true;
      await Sites.get(params).then((res) => {
        total.value = res.totalRecords;
        sitesData.value = res.data;
      });
      loading.value = false;
    }
    onMounted(() => {
      fetchSites();
    });
    return {
      sitesData,
      searchData,
      searchVal,
      loading,
      changeRoute,
      paginatedSite,
      changePage,
      total,
    };
  },
});
</script>
