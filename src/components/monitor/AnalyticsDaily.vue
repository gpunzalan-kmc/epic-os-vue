<template>
  <div
    class="rounded-lg p-3 pt-0 overflow-hidden"
    style="min-height: 270px"
    v-loading="loading"
    element-loading-text="Loading..."
    element-loading-spinner="el-icon-loading"
  >
    <p class="text-base font-bold text-gray-900 mb-2">Overall Daily</p>
    <WeekSummaryLineChart
      ref="lineChart"
      :labels="spaceTypeData.labels"
      :data="spaceTypeData.data"
      :backgroundColor="spaceTypeData.backgroundColor"
      height="270"
    />
  </div>
</template>
<script lang="ts">
import { Analytics } from "@/api/app.service";
import { ReportQuery } from "@/api/query.types";
import format from "date-fns/format";
import { computed, defineComponent, PropType, reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";
import WeekSummaryLineChart from "@/components/apex-charts/WeekSummaryLineChart.vue";

import { VForm } from "@/store/modules/types/types";

import { getColorRate } from "@/components/monitor/functions";

export default defineComponent({
  components: {
    WeekSummaryLineChart,
  },
  props: {
    dateRange: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
  setup(props) {
    const loading = ref(false);
    const route = useRoute();
    const areaId = computed(() => route.params.id as string);
    const params = reactive({
      dateStart: "",
      dateEnd: "",
      areaId: areaId.value,
    } as ReportQuery);

    const spaceTypeData = reactive({
      labels: [],
      data: [],
      backgroundColor: [],
    } as { labels: string[]; data: number[]; backgroundColor: string[] });

    const lineChart = ref(null as null | VForm);

    async function fetchChartData() {
      params.dateStart = format(new Date(props.dateRange[0]), "yyyy-MM-dd");
      params.dateEnd = format(new Date(props.dateRange[1]), "yyyy-MM-dd");
      spaceTypeData.labels = [];
      spaceTypeData.data = [];
      loading.value = true;
      await Analytics.getDayTime(params).then((res) => {
        spaceTypeData.labels.push("Before Noon");
        spaceTypeData.labels.push("After Noon");
        spaceTypeData.data.push(
          res.beforeNoonRate > 0 ? Math.round(res.beforeNoonRate) : 1
        );
        spaceTypeData.data.push(
          res.afterNoonRate > 0 ? Math.round(res.afterNoonRate) : 1
        );
        spaceTypeData.backgroundColor.push(getColorRate(res.beforeNoonRate));
        spaceTypeData.backgroundColor.push(getColorRate(res.afterNoonRate));
        lineChart.value?.render();
        loading.value = false;
      });
    }
    // watch(
    //   () => props.dateRange,
    //   () => {
    //     fetchChartData();
    //   }
    // );
    return {
      fetchChartData,
      lineChart,
      spaceTypeData,
      loading,
    };
  },
});
</script>
