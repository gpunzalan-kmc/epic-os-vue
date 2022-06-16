<template>
  <div class="flex justify-evenly">
    <template v-if="currentRoute == 'Employees'">
      <el-button size="small" type="default" icon="el-icon-download"
        >Export</el-button
      >
      <el-button size="small" type="default">Org Chart</el-button>
      <el-button size="small" type="primary" icon="el-icon-plus"
        >Add</el-button
      ></template
    >
  </div>
</template>
<script lang="ts">
import { useRoute } from "vue-router";
import { computed, defineComponent } from "vue";
export default defineComponent({
  setup() {
    const currentRoute = computed(() => useRoute().meta.appNavigation);
    return { currentRoute };
  },
});
</script>
