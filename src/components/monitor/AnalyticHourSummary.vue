<template>
  <section aria-labelledby="quick-links-title">
    <div
      class="rounded-lg overflow-hidden divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-1 md:grid-cols-2 sm:gap-px p-3"
    >
      <div
        class="pr-2"
        style="min-height: 300px"
        v-loading="lineChartPerHourLoading"
        element-loading-text="Loading..."
        element-loading-spinner="el-icon-loading"
      >
        <p class="text-base font-bold text-gray-900 mb-2">Overall Time Range</p>
        <HourSummaryLineChart
          ref="lineChartPerHour"
          :labels="summaryPerHour.labels"
          :data="summaryPerHour.data"
        />
      </div>
      <div
        class="pl-2"
        style="min-height: 300px"
        v-loading="lineChartPerWeekLoading"
        element-loading-text="Loading..."
        element-loading-spinner="el-icon-loading"
      >
        <p class="text-base font-bold text-gray-900 mb-2">Overall Week Range</p>

        <WeekSummaryLineChart
          ref="lineChartPerWeek"
          :labels="summaryPerWeek.labels"
          :data="summaryPerWeek.data"
        />
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { computed, defineComponent, PropType, reactive, ref, watch } from "vue";
import HourSummaryLineChart from "@/components/apex-charts/HourSummaryLineChart.vue";
import WeekSummaryLineChart from "@/components/apex-charts/WeekSummaryLineChart.vue";

import { Analytics } from "@/api/app.service";
import { useRoute } from "vue-router";
import { ReportQuery } from "@/api/query.types";
import { getColorRate } from "./functions";
import { VForm } from "@/store/modules/types/types";

import format from "date-fns/format";
export default defineComponent({
  props: {
    dateRange: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
  components: {
    HourSummaryLineChart,
    WeekSummaryLineChart,
  },
  setup(props) {
    const lineChartPerHourLoading = ref(false);
    const lineChartPerWeekLoading = ref(false);
    const summaryPerHour = reactive({
      labels: [],
      data: [],
      backgroundColor: [],
    } as { labels: string[]; data: number[]; backgroundColor: string[] });
    const summaryPerWeek = reactive({
      labels: [],
      data: [],
      backgroundColor: [],
    } as { labels: string[]; data: number[]; backgroundColor: string[] });
    const route = useRoute();
    const areaId = computed(() => route.params.id as string);
    const params = reactive({
      dateStart: "",
      dateEnd: "",
      areaId: areaId.value,
    } as ReportQuery);
    const lineChartPerHour = ref(null as null | VForm);
    const lineChartPerWeek = ref(null as null | VForm);

    async function fetchChartData() {
      params.dateStart = format(new Date(props.dateRange[0]), "yyyy-MM-dd");
      params.dateEnd = format(new Date(props.dateRange[1]), "yyyy-MM-dd");
      summaryPerWeek.labels = [];
      summaryPerWeek.data = [];
      summaryPerHour.labels = [];
      summaryPerHour.data = [];
      lineChartPerWeekLoading.value = true;
      lineChartPerHourLoading.value = true;
      await Analytics.getWeekSummary(params).then((res) => {
        res.map((d) => {
          summaryPerWeek.labels.push(d.week);

          summaryPerWeek.data.push(d.rate > 0 ? Math.round(d.rate) : 1);
          summaryPerWeek.backgroundColor.push(getColorRate(d.rate));
        });
      });
      await Analytics.getHourSummary(params).then((res) => {
        res.map((d) => {
          summaryPerHour.labels.push(d.hour.toString());

          summaryPerHour.data.push(d.rate > 0 ? Math.round(d.rate) : 1);
          summaryPerHour.backgroundColor.push(getColorRate(d.rate));
        });
      });
      lineChartPerWeek.value?.render();
      lineChartPerWeekLoading.value = false;
      lineChartPerHour.value?.render();
      lineChartPerHourLoading.value = false;
    }
    // watch(
    //   () => props.dateRange,
    //   () => {
    //     fetchChartData();
    //   }
    // );
    return {
      lineChartPerHour,
      summaryPerHour,
      lineChartPerWeek,
      summaryPerWeek,
      lineChartPerWeekLoading,
      lineChartPerHourLoading,
      fetchChartData,
    };
  },
});
</script>
