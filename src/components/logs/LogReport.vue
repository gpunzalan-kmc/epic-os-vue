<template>
  <div
    href="#"
    class="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
    v-for="(log, index) in logData"
    :key="index"
  >
    <div class="ml-4">
      <p class="text-base font-medium text-gray-900">
        {{ log.mac }} - {{ log.iPaddress }}
      </p>
      <p class="text-xs font-medium text-gray-400">
        {{ date(log.dateCreated, "yyyy-MM-dd hh:mm a") }}
      </p>
      <p class="mt-1 text-sm text-gray-500">
        {{ log.message }}
      </p>
    </div>
  </div>
</template>
<script lang="ts">
import { date } from "@/common/date.filter";
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    logData: {
      type: Array,
      required: true,
    },
  },
  setup() {
    return { date };
  },
});
</script>
