<template>
  <el-table :data="hubs" height="700" class="border w-full">
    <el-table-column label="Name" prop="name" min-width="120" sortable>
      <template #default="scope">
        <div class="flex items-center space-x-3">
          <span
            v-if="getNumberOfDays(scope.row.lastActivity) < 7"
            class="h-4 w-4 bg-green-100 rounded-full flex items-center justify-center"
            aria-hidden="true"
          >
            <span class="h-2 w-2 bg-green-400 rounded-full"></span>
          </span>
          <span
            v-else
            class="h-4 w-4 bg-red-100 rounded-full flex items-center justify-center"
            aria-hidden="true"
          >
            <span class="h-2 w-2 bg-red-400 rounded-full"></span>
          </span>

          <span class="block">
            <h2 class="text-sm font-medium">
              <a
                @click.prevent="viewWorkpointDetail(scope.row)"
                class="text-md font-semibold text-gray-900 truncate hover:underline cursor-pointer"
              >
                {{ scope.row.name }}
              </a>
            </h2>
          </span>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>
<script lang="ts">
import { HubResponse } from "@/api/response.types";
import { getNumberOfDays } from "@/common/date.filter";
import { defineComponent, PropType } from "vue";
export default defineComponent({
  props: {
    hubs: {
      type: Array as PropType<HubResponse[]>,
      required: true,
    },
  },
  setup() {
    return { getNumberOfDays };
  },
});
</script>
