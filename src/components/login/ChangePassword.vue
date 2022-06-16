<template>
  <div class="mt-8 mx-auto sm:w-full sm:max-w-md">
    <div class="py-8 px-4 sm:px-10">
      <!-- <img class="h-12 w-auto" src="@/assets/img/logo.png" alt="Workflow" /> -->
      <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
        Change Password
      </h2>
      <div
        class="rounded-md bg-red-50 p-4 my-3"
        v-if="
          (warningDisplay && warning !== '') ||
          (apiWarning && apiWarning !== '')
        "
      >
        <div class="flex">
          <div class="flex-shrink-0">
            <!-- Heroicon name: solid/x-circle -->
            <svg
              class="h-5 w-5 text-red-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-3">
            <h3
              class="text-sm font-medium text-red-800"
              v-if="apiWarning && apiWarning !== ''"
            >
              {{ apiWarning }}
            </h3>
            <h3 class="text-sm font-medium text-red-800" v-else>
              {{ warning }}
            </h3>
          </div>
        </div>
      </div>
      <el-form class="space-y-6 my-5">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">
            Current Password
          </label>
          <div class="mt-1">
            <el-input
              v-model="form.currentPassword"
              type="password"
              placeholder="********"
            ></el-input>
          </div>
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <div class="mt-1">
            <el-input
              v-model="form.newPassword"
              type="password"
              placeholder="********"
            ></el-input>
          </div>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <div class="mt-1">
            <el-input
              v-model="form.confirmPassword"
              type="password"
              placeholder="********"
            ></el-input>
          </div>
        </div>

        <div>
          <el-button
            @click="changePass"
            :disabled="disabledButton"
            :loading="loading"
            class="w-full"
            type="primary"
            native-type="submit"
            >Confirm</el-button
          >
        </div>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts">
import { Auth } from "@/api/app.service";
import router from "@/router";
import { store } from "@/store";
import { ElMessageBox } from "element-plus";
import { computed, defineComponent, reactive, ref, watch } from "vue";
export default defineComponent({
  setup() {
    const form = reactive({
      email: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    const loading = ref(false);
    const hasMinimumLength = ref(false);
    const hasNumber = ref(false);
    const hasSpecial = ref(false);
    const doNotMatch = computed(() => {
      if (
        form.newPassword !== form.confirmPassword &&
        form.confirmPassword.length > 0
      )
        return true;
      return false;
    });
    const currentUser = computed(
      () => store.getters.currentUser as Record<string, unknown>
    );
    const disabledButton = computed(() => {
      if (
        doNotMatch.value == false &&
        hasMinimumLength.value == true &&
        hasNumber.value == true &&
        hasSpecial.value == true
      )
        return false;
      return true;
    });
    const warningDisplay = computed(() => {
      if (form.newPassword !== "") return true;
      return false;
    });

    const apiWarning = ref("");

    const warning = computed(() => {
      if (hasMinimumLength.value == false)
        return "At least 8 characters—the more characters, the better.";
      if (hasNumber.value == false) return "A mixture of letters and numbers.";
      if (doNotMatch.value == true) return "Passwords do not match.";
      if (hasSpecial.value == false)
        return "Inclusion of at least one special character, e.g., ! @ # ? ]";
      return "";
    });

    watch(
      () => form.newPassword,
      (event: string) => {
        apiWarning.value = "";
        hasMinimumLength.value = event.length >= 8;
        hasNumber.value = /\d/.test(event); // eslint-disable-line
        hasSpecial.value = /[!@#\$%\^\&*\)\(+=._-]/.test(event); // eslint-disable-line
      }
    );
    async function changePass() {
      loading.value = true;
      form.email = currentUser.value?.email as string;
      await Auth.changePassword(form)
        .then((res) => {
          if (res.succeeded == true) {
            ElMessageBox.alert(
              "Your password has been changed successfully",
              "Password changed",
              {
                confirmButtonText: "OK",
                callback: () => {
                  router.push({
                    name: "KMC Neighborhoods",
                  });
                },
              }
            );
          } else {
            res.errors.map((d) => {
              apiWarning.value = d;
            });
          }
          loading.value = false;
        })
        .catch(() => {
          loading.value = false;
        });
    }
    return {
      form,
      warning,
      disabledButton,
      changePass,
      loading,
      warningDisplay,
      apiWarning,
      currentUser,
    };
  },
});
</script>
