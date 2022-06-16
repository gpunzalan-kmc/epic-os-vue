<template>
  <apexchart
    ref="apexChart"
    width="100%"
    :height="300"
    type="bar"
    :options="options"
    :series="series"
  ></apexchart>
</template>
<script lang="ts">
import { ChartData } from "@/common/types";
import { VForm } from "@/store/modules/types/types";
import { defineComponent, onMounted, PropType, reactive, ref } from "vue";
export default defineComponent({
  props: {
    labels: {
      type: Array as PropType<string[]>,
      required: true,
    },
    data: {
      type: Array as PropType<ChartData["datasets"]>,
      required: true,
    },
  },
  setup(props) {
    const options = reactive({
      plotOptions: {
        bar: {
          distributed: true,
          colors: {
            ranges: [
              {
                from: 0,
                to: 20,
                color: "#ff603b",
              },
              {
                from: 21,
                to: 40,
                color: "#fe9a2b",
              },
              {
                from: 41,
                to: 60,
                color: "#fcc62e",
              },
              {
                from: 61,
                to: 80,
                color: "#32aae9",
              },
              {
                from: 81,
                to: 100,
                color: "#6aba97",
              },
            ],
            backgroundBarColors: [],
            backgroundBarOpacity: 1,
            backgroundBarRadius: 0,
          },
        },
      },
      chart: {
        type: "area",

        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },

      xaxis: {
        categories: props.labels,
      },

      yaxis: {
        opposite: false,
        labels: {
          formatter: function(value: string) {
            return (+value).toFixed(2) + "%";
          },
        },
      },
      legend: {
        show: false,
      },
    });
    const series = ref(
      [] as Array<{ name: string; data: number[]; colors: string[] }>
    );

    const apexChart = ref(null as null | VForm);
    function render() {
      apexChart.value?.updateSeries(props.data);
      apexChart.value?.updateOptions({
        xaxis: { categories: props.labels },
      });
    }

    onMounted(() => {
      options.xaxis.categories = props.labels;
    });

    return { options, series, render, apexChart };
  },
});
</script>
