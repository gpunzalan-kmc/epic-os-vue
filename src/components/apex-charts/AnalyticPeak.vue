<template>
  <apexchart
    ref="apexChart"
    type="radialBar"
    :options="options"
    :series="series"
  ></apexchart>
</template>
<script lang="ts">
import { VForm } from "@/store/modules/types/types";
import { defineComponent, ref, watch } from "vue";
export default defineComponent({
  props: {
    rate: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const series = [0];
    const options = {
      chart: {
        height: 190,
        type: "radialBar",
      },
      colors: ["#f99d3a"],
      plotOptions: {
        radialBar: {
          hollow: {
            size: "70%",
          },
        },
      },
      labels: [props.date],
    };
    const apexChart = ref(null as null | VForm);
    function render() {
      apexChart.value?.updateSeries([props.rate]);
      apexChart.value?.updateOptions({ labels: [props.date] });
    }
    watch(
      () => props.rate,
      () => {
        render();
      }
    );
    return {
      series,
      options,
      render,
      apexChart,
    };
  },
});
</script>
