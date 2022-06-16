<template>
  <div
    class="rounded-lg p-3 overflow-hidden"
    style="min-height: 300px"
    v-loading="summaryLineLoading"
    element-loading-text="Loading..."
    element-loading-spinner="el-icon-loading"
  >
    <p class="text-base font-bold text-gray-900 mb-2">Utilization</p>

    <UtilizationLineChart ref="lineChart" :data="chartData" />
  </div>
</template>
<script lang="ts">
import { Analytics } from "@/api/app.service";
import { ReportQuery } from "@/api/query.types";
import format from "date-fns/format";
import { computed, defineComponent, PropType, reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";

import UtilizationLineChart from "@/components/apex-charts/UtilizationLineChart.vue";

import { VForm } from "@/store/modules/types/types";
import { date } from "@/common/date.filter";
import { PeakChartData } from "@/common/types";

export default defineComponent({
  props: {
    dateRange: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
  components: {
    UtilizationLineChart,
  },
  setup(props) {
    const summaryLineLoading = ref(false);
    const route = useRoute();
    const areaId = computed(() => route.params.id as string);
    const params = reactive({
      dateStart: "",
      dateEnd: "",
      areaId: areaId.value,
    } as ReportQuery);

    const dataCharts = reactive({
      labels: [],
      average: [],
      peak: [],
    } as { labels: string[]; average: number[]; peak: number[] });

    const chartData = ref([] as Array<PeakChartData>);

    const lineChart = ref(null as null | VForm);

    async function fetchChartData() {
      params.dateStart = format(new Date(props.dateRange[0]), "yyyy-MM-dd");
      params.dateEnd = format(new Date(props.dateRange[1]), "yyyy-MM-dd");
      dataCharts.labels = [];
      dataCharts.average = [];
      dataCharts.peak = [];
      chartData.value = [];
      summaryLineLoading.value = true;
      await Analytics.getUtilization(params).then((res) => {
        res.map((d) => {
          chartData.value.push({
            x: date(d.date),
            y: Math.round(d.average),
            goals: [
              {
                name: "Peak",
                value: Math.round(d.peak),
                color: "#333333",
              },
            ],
          });
          dataCharts.labels.push(date(d.date));
          dataCharts.average.push(Math.round(d.average));
          dataCharts.peak.push(Math.round(d.peak));
        });
      });
      lineChart.value?.render();
      summaryLineLoading.value = false;
    }
    // watch(
    //   () => props.dateRange,
    //   () => {
    //     fetchChartData();
    //   }
    // );
    return {
      chartData,
      fetchChartData,
      lineChart,
      dataCharts,
      summaryLineLoading,
    };
  },
});
</script>
