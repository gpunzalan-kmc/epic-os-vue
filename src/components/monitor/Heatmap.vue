<template>
  <CropPreview
    v-if="mount"
    id="heatmapContainer"
    :image="image"
    :coordinates="coordinates"
    :width="1280"
    :height="960"
  >
  </CropPreview>
  <!-- <div
    v-if="mount"
    id="heatmapContainer"
    class="relative"
    :style="
      `background-image: url('${details.floorPlanImage}');  background-size: 100%;   background-repeat: no-repeat;width:1280px; height:1280px; margin-left:auto; margin-right:auto`
    "
  ></div> -->
</template>
<script lang="ts">
import { computed, defineComponent, nextTick, PropType, ref } from "vue";
import CropPreview from "@/components/floorplan/CropPreview.vue";
import h337 from "heatmap.js";
import { Analytics } from "@/api/app.service";
import { HeatMapResponse } from "@/api/response.types";
import { useRoute } from "vue-router";
import { CropImageResponse } from "@/common/types";
export default defineComponent({
  props: {
    details: {
      type: Object,
      required: true,
    },
    timeRange: {
      type: Array as PropType<string[]>,
      required: true,
    },
    image: {
      type: Object as PropType<CropImageResponse["image"]>,
      required: true,
    },
    coordinates: {
      type: Object as PropType<CropImageResponse["image"]>,
      required: true,
    },
  },
  components: {
    CropPreview,
  },
  setup(props) {
    const heatLogs = ref([] as HeatMapResponse[]);
    const route = useRoute();
    const mount = ref(true);
    const Id = computed(() => route.params.id as string);
    async function getHeatMap() {
      mount.value = false;
      await nextTick();
      mount.value = true;
      await nextTick();
      const dom = document.getElementById("heatmapContainer");

      const heatmap = h337.create({
        maxOpacity: 0.6,
        radius: 120,
        blur: 0.9,
        backgroundColor: "rgba(0, 0, 58, 0)",
        container: dom,
      });

      console.log(heatmap);
      heatmap.repaint();
      await Analytics.getHeatLogs({
        DateStart: props.timeRange[0],
        DateEnd: props.timeRange[1],
        AreadId: Id.value,
      }).then((res) => {
        heatLogs.value = res;
        heatmap.setData({
          max: 5,
          data: heatLogs.value,
        });
        console.log(heatLogs.value);
      });
    }
    // onMounted(async () => {
    //   await getHeatMap();
    // });
    return { getHeatMap, mount };
  },
});
</script>
