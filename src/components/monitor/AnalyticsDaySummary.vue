<template>
  <div
    class="rounded-lg p-3 pt-0 overflow-hidden"
    style="min-height: 300px"
    v-loading="summaryLineLoading"
    element-loading-text="Loading..."
    element-loading-spinner="el-icon-loading"
  >
    <p class="text-base font-bold text-gray-900 mb-2">Date Range</p>

    <DaySummaryLineChart
      ref="daySummaryLineChartRef"
      :labels="dataCharts.labels"
      :data="dataCharts.datasets"
    />
  </div>
</template>
<script lang="ts">
import { Analytics } from "@/api/app.service";
import { ReportQuery } from "@/api/query.types";
import format from "date-fns/format";
import { computed, defineComponent, PropType, reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";
import DaySummaryLineChart from "@/components/apex-charts/DaySummaryLineChart.vue";

import { VForm } from "@/store/modules/types/types";
import { date } from "@/common/date.filter";
import { getColorRate } from "@/components/monitor/functions";
import { ChartData } from "@/common/types";

export default defineComponent({
  components: {
    DaySummaryLineChart,
  },
  props: {
    dateRange: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
  setup(props) {
    const summaryLineLoading = ref(false);
    const route = useRoute();
    const areaId = computed(() => route.params.id as string);
    const params = reactive({
      dateStart: format(new Date(props.dateRange[0]), "yyyy-MM-dd"),
      dateEnd: format(new Date(props.dateRange[1]), "yyyy-MM-dd"),
      areaId: areaId.value,
    } as ReportQuery);

    const dataCharts = reactive({
      labels: [],
      datasets: [],
    } as ChartData);

    const daySummaryLineChartRef = ref(null as null | VForm);

    async function fetchChartData() {
      params.dateStart = format(new Date(props.dateRange[0]), "yyyy-MM-dd");
      params.dateEnd = format(new Date(props.dateRange[1]), "yyyy-MM-dd");
      dataCharts.labels = [];
      dataCharts.datasets = [];
      summaryLineLoading.value = true;
      await Analytics.getDailySummary(params).then((res) => {
        res.map((d) => {
          dataCharts.labels.push(date(d.date, "yyyy-MM-dd"));

          d.summaryPerHour.map((e) => {
            const check = dataCharts.datasets.find(
              (f) => f.name == e.hour.toString()
            );
            if (check) {
              check.data.push(e.rate > 0 ? e.rate : 1);
              check.colors.push(getColorRate(e.rate));
            } else {
              dataCharts.datasets.push({
                name: e.hour.toString(),
                colors: [getColorRate(e.rate)],
                data: [e.rate > 0 ? e.rate : 1],
              });
            }
          });
        });
      });

      daySummaryLineChartRef.value?.render();

      summaryLineLoading.value = false;
    }
    // watch(
    //   () => props.dateRange,
    //   () => {
    //     fetchChartData();
    //   }
    // );
    return {
      daySummaryLineChartRef,
      dataCharts,
      summaryLineLoading,
      fetchChartData,
    };
  },
});
</script>
