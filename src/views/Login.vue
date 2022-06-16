<template>
  <div
    class="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img
        class="m-auto mb-5"
        src="@/assets/img/epic-black.png"
        alt=""
        width="250"
      />
    </div>
    <div class="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="py-4 px-4 sm:px-10">
        <LoginForm />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import LoginForm from "@/components/login/LoginForm.vue";
export default defineComponent({
  components: {
    LoginForm,
  },
  setup() {
    return {};
  },
});
</script>
