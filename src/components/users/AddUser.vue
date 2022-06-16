<template>
  <el-form :model="form" ref="deviceForm" :rules="userRules">
    <el-row :gutter="10">
      <el-col :span="12">
        <el-form-item prop="firstName">
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            for="grid-first-name"
          >
            First Name
          </label>
          <el-input
            v-model="form.firstName"
            placeholder="Input first name"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item prop="lastName">
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            for="grid-first-name"
          >
            Last Name
          </label>
          <el-input
            v-model="form.lastName"
            placeholder="Input last name"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item prop="lastName">
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            for="grid-first-name"
          >
            Username
          </label>
          <el-input
            v-model="form.userName"
            placeholder="Input username"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item prop="emailAddress">
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            for="grid-first-name"
          >
            Email Address
          </label>
          <el-input
            v-model="form.emailAddress"
            placeholder="Input email address"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item prop="isActive">
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            for="grid-first-name"
          >
            Status
          </label>
          <el-select class="w-full" v-model="form.isActive">
            <el-option :value="true" label="Active"></el-option>
            <el-option :value="false" label="Inactive"></el-option>
          </el-select>
        </el-form-item>
      </el-col> </el-row
  ></el-form>
  <div class="flex justify-end">
    <el-button
      type="primary"
      @click="submit"
      size="small"
      :loading="submitLoading"
      >Confirm</el-button
    >
  </div>
</template>
<script lang="ts">
import { Users } from "@/api/app.service";
import { MutationResponse, UserResponse } from "@/api/response.types";
import { defineComponent, PropType, reactive, ref } from "vue";
import { userRules } from "@/components/sites/form.rules";
import { VForm } from "@/store/modules/types/types";
import { UserPayload } from "@/api/payload.type";
import { ElNotification } from "element-plus";
export default defineComponent({
  props: {
    editData: {
      type: Object as PropType<UserResponse>,
    },
  },
  setup(props, context) {
    const submitLoading = ref(false);
    const form = reactive({
      firstName: props.editData?.firstName,
      lastName: props.editData?.lastName,
      userName: props.editData?.userName,
      emailAddress: props.editData?.emailAddress,
      isActive: props.editData?.isActive,
    });
    const deviceForm = ref(null as null | VForm);
    function submit() {
      deviceForm.value?.validate().then(async () => {
        if (props.editData?.id) {
          submitLoading.value = true;
          await Users.put(form as UserPayload, props.editData.id)
            .then((res) => {
              ElNotification({
                message: (res as MutationResponse).message,
                type: "success",
              });
              submitLoading.value = false;
              context.emit("reload");
            })
            .catch(() => (submitLoading.value = false));
        } else {
          submitLoading.value = true;
          await Users.post(form as UserPayload)
            .then((res) => {
              ElNotification({
                message: (res as MutationResponse).message,
                type: "success",
              });
              submitLoading.value = false;
              context.emit("reload");
            })
            .catch(() => (submitLoading.value = false));
        }
      });
    }
    return {
      form,

      userRules,
      deviceForm,
      submit,
      submitLoading,
    };
  },
});
</script>
