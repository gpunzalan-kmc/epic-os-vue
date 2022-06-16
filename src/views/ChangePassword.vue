<template>
  <div
    class="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8"
  >
    <ChangePassword />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import ChangePassword from "@/components/login/ChangePassword.vue";

export default defineComponent({
  components: {
    ChangePassword,
  },
});
</script>
