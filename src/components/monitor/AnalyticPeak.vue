<template>
  <div
    class="rounded-lg px-3 overflow-hidden"
    v-loading="summaryLineLoading"
    element-loading-text="Loading..."
    element-loading-spinner="el-icon-loading"
  >
    <p class="text-base font-bold text-gray-900 mb-2">Latest Peak</p>

    <AnalyticPeak
      ref="radialChart"
      :rate="peakData.peakRate"
      :date="peakData.date"
    />
  </div>
  <!-- <div class="flex justify-center space-x-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
      />
    </svg>
    <p class="text-center font-semibold">Latest Peak</p>
  </div> -->
</template>
<script lang="ts">
import { Analytics } from "@/api/app.service";

import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import AnalyticPeak from "@/components/apex-charts/AnalyticPeak.vue";

import { date } from "@/common/date.filter";
import { VForm } from "@/store/modules/types/types";

export default defineComponent({
  components: {
    AnalyticPeak,
  },
  setup() {
    const loading = ref(false);
    const route = useRoute();
    const areaId = computed(() => route.params.id as string);

    const peakData = ref({
      date: "",
      peakRate: 0,
    });
    const radialChart = ref(null as null | VForm);
    async function fetchCurrentPeak() {
      loading.value = true;
      await Analytics.getCurrentPeak(areaId.value).then(async (res) => {
        peakData.value.date = date(res.date, "MMM dd, yyyy hh:mm a");
        peakData.value.peakRate = Math.round(res.peakRate);
        radialChart.value?.render();
      });
    }
    onMounted(() => {
      fetchCurrentPeak();
    });

    return {
      peakData,
      loading,
      radialChart,
    };
  },
});
</script>
