<template>
  <div class="rounded-md bg-red-50 p-4 mb-3" v-if="warning">
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
        <h3 class="text-sm font-medium text-red-800">
          Incorrect username or password
        </h3>
      </div>
    </div>
  </div>
  <el-form :model="form" ref="loginForm">
    <el-form-item
      prop="username"
      :rules="[
        { required: true, message: 'Please input username', trigger: 'blur' },
      ]"
    >
      <label for="email" class="block text-sm font-medium text-gray-700">
        Email
      </label>
      <div class="mt-3">
        <el-input
          class="text-md block shadow rounded-lg w-full"
          placeholder="Email"
          v-model="form.username"
        >
          <template #prefix>
            <i class="ml-1 el-icon-user"></i>
          </template>
        </el-input>
      </div>
    </el-form-item>

    <el-form-item
      prop="password"
      :rules="[
        { required: true, message: 'Please input password', trigger: 'blur' },
      ]"
    >
      <label for="password" class="block text-sm font-medium text-gray-700">
        Password
      </label>
      <div class="mt-3">
        <el-input
          type="password"
          class="text-md block shadow rounded-lg w-full"
          placeholder="***********"
          v-model="form.password"
          show-password
        >
          <template #prefix>
            <i class="ml-1 el-icon-lock"></i>
          </template>
        </el-input>
      </div>
    </el-form-item>
    <!-- <div class="flex items-center justify-end mb-3">
      <div class="text-xs">
        <a
          @click.prevent="router.push({ query: { action: 'resetPassword' } })"
          class="font-medium text-primary cursor-pointer"
          >Forgot your password?</a
        >
      </div>
    </div> -->
    <el-button
      :loading="loading"
      @click.prevent="login"
      class="mt-5 text-md font-semibold w-full text-white rounded-full px-6 py-3 block shadow-xl hover:text-white focus:outline-none"
      type="primary"
      native-type="submit"
      round
      >{{ status }}</el-button
    >
  </el-form>

  <div class="mt-6">
    <div class="flex mt-5 items-center text-center">
      <hr class="border-gray-300 border-1 w-full rounded-md" />
      <label class="block font-medium text-sm text-gray-600 w-full">Or</label>
      <hr class="border-gray-300 border-1 w-full rounded-md" />
    </div>

    <div class="mt-6 w-full">
      <div>
        <GoogleLogin :params="params" :onSuccess="onSuccess" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import GoogleLogin from "@/components/login/GoogleLogin.vue";
import { VUE_APP_CLIENT_ID } from "@/common/config";
import { GoogleUser } from "@/components/login/types";
import { VForm } from "@/store/modules/types/types";
import { store } from "@/store";
import { AuthActionTypes } from "@/store/modules/types/action-types";
import router from "@/router";
export default defineComponent({
  components: {
    GoogleLogin,
  },
  setup() {
    const loading = ref(false);
    const status = ref("Sign In");
    const warning = ref(false);
    const form = reactive({
      username: "",
      password: "",
    });
    const params = {
      client_id: VUE_APP_CLIENT_ID,
    };
    const loginForm = ref(null as null | VForm);
    function onSuccess(googleUser: GoogleUser) {
      store
        .dispatch(AuthActionTypes.GOOGLE_LOGIN, googleUser.id_token)
        .then(async () => {
          router.push({
            name: "KMC Neighborhoods",
          });

          status.value = "Sign In";
          loading.value = false;
        })
        .catch(() => {
          status.value = "Sign In";
          warning.value = true;
          loading.value = false;
        });
    }

    function login() {
      loginForm.value?.validate().then(async () => {
        loading.value = true;
        status.value = "Validating";
        store
          .dispatch(AuthActionTypes.LOGIN, form)
          .then(async () => {
            router.push({
              name: "KMC Neighborhoods",
            });

            status.value = "Sign In";
            loading.value = false;
          })
          .catch(() => {
            status.value = "Sign In";
            warning.value = true;
            loading.value = false;
          });
      });
    }
    return {
      form,
      loading,
      status,
      warning,
      params,
      onSuccess,
      loginForm,
      login,
    };
  },
});
</script>
