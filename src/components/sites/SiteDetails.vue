<template>
  <el-row class="h-3/4">
    <el-col :md="6" :lg="6" :sm="24" :xs="24">
      <SiteDetailsNavigation :siteData="siteData" />
    </el-col>
    <el-col :md="18" :lg="18" :sm="24" :xs="24">
      <FloorDetails :siteData="siteData" v-if="view && view == 'floors'" />
      <SiteDeviceDetails
        :siteData="siteData"
        v-if="view && view == 'devices'"
      />
    </el-col>
  </el-row>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import SiteDetailsNavigation from "@/components/sites/SiteDetailsNavigation.vue";
import FloorDetails from "@/components/sites/SiteFloorDetails.vue";
import SiteDeviceDetails from "@/components/sites/SiteDeviceDetails.vue";
import { useRoute } from "vue-router";
import { OfficeResponse } from "@/api/response.types";
import router from "@/router";
import { Sites } from "@/api/app.service";
export default defineComponent({
  components: {
    SiteDetailsNavigation,
    FloorDetails,
    SiteDeviceDetails,
  },
  setup() {
    const route = useRoute();
    const view = computed(() => route.query.view as string);
    const siteData = ref({} as OfficeResponse);
    const siteID = computed(() => route.params.id as string);
    function changeRoute(view: string) {
      router.replace({ query: { view: view } });
    }
    onMounted(async () => {
      await Sites.show(siteID.value).then((res) => {
        siteData.value = res;
      });
    });
    return { siteData, siteID, view, changeRoute };
  },
});
</script>
