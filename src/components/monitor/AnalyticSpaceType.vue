<template>
  <div
    class="rounded-lg p-3 pt-0 overflow-hidden"
    style="min-height: 300px"
    v-loading="loading"
    element-loading-text="Loading..."
    element-loading-spinner="el-icon-loading"
  >
    <p class="text-base font-bold text-gray-900 mb-2">Space Type</p>
    <WeekSummaryLineChart
      ref="lineChart"
      :labels="spaceTypeData.labels"
      :data="spaceTypeData.data"
      :backgroundColor="spaceTypeData.backgroundColor"
      height="300"
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
      await Analytics.getSpaceType(params).then((res) => {
        res.map((d) => {
          spaceTypeData.labels.push(d.spaceType);

          spaceTypeData.data.push(d.rate > 0 ? Math.round(d.rate) : 1);
          spaceTypeData.backgroundColor.push(getColorRate(d.rate));
        });
      });
      lineChart.value?.render();
      loading.value = false;
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
