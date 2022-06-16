<template>
  <div class="grid grid-rows-3 grid-cols-1 lg:grid-cols-3 gap-4 w-full">
    <div
      class="grid grid-row-3 row-span-3 col-span-1 lg:col-span-2 bg-white border rounded-md"
    >
      <div class="row-span-1 py-2">
        <AnalyticsDaySummary :dateRange="dateRange" ref="daySummary" />
      </div>
      <div class="row-span-1 py-2">
        <AnalyticHourSummary :dateRange="dateRange" ref="hourSummary" />
      </div>
      <div class="row-span-1 py-2">
        <AnalyticUtilization :dateRange="dateRange" ref="utilization" />
      </div>
    </div>
    <div class="row-span-1 ... bg-white border rounded-md py-2">
      <AnalyticPeak />
    </div>
    <div class="row-span-1 ... bg-white border rounded-md py-2">
      <AnalyticsDaily :dateRange="dateRange" ref="overallDaily" />
    </div>
    <div class="row-span-1 ... bg-white border rounded-md py-2">
      <AnalyticSpaceType :dateRange="dateRange" ref="spaceType" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, PropType, ref, watch } from "vue";
import AnalyticsDaySummary from "@/components/monitor/AnalyticsDaySummary.vue";
import AnalyticHourSummary from "@/components/monitor/AnalyticHourSummary.vue";
import AnalyticUtilization from "@/components/monitor/AnalyticUtilization.vue";
import AnalyticSpaceType from "@/components/monitor/AnalyticSpaceType.vue";
import AnalyticPeak from "@/components/monitor/AnalyticPeak.vue";
import AnalyticsDaily from "@/components/monitor/AnalyticsDaily.vue";
import { date } from "@/common/date.filter";
import { VForm } from "@/store/modules/types/types";
export default defineComponent({
  components: {
    AnalyticsDaySummary,
    AnalyticHourSummary,
    AnalyticUtilization,
    AnalyticSpaceType,
    AnalyticPeak,
    AnalyticsDaily,
  },
  props: {
    dateRange: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
  setup(props) {
    const daySummary = ref(null as null | VForm);
    const hourSummary = ref(null as null | VForm);
    const utilization = ref(null as null | VForm);
    const spaceType = ref(null as null | VForm);
    const overallDaily = ref(null as null | VForm);
    function reloadCharts() {
      daySummary.value?.fetchChartData();
      hourSummary.value?.fetchChartData();
      utilization.value?.fetchChartData();
      spaceType.value?.fetchChartData();
      overallDaily.value?.fetchChartData();
    }

    onMounted(() => {
      reloadCharts();
    });
    return {
      date,
      overallDaily,
      reloadCharts,
      hourSummary,
      daySummary,
      spaceType,
      utilization,
    };
  },
});
</script>
