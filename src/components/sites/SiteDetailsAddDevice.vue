<template>
  <el-form :model="form" ref="deviceForm" :rules="deviceRules">
    <el-row :gutter="10">
      <el-col :span="12">
        <el-form-item>
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            for="grid-first-name"
          >
            Device Type
          </label>
          <el-select class="w-full" v-model="category"
            ><el-option label="Workpoint" value="workpoints"></el-option
            ><el-option label="Hub" value="hubs"></el-option
          ></el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item>
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            for="grid-first-name"
          >
            Status
          </label>
          <el-select class="w-full" v-model="form.isActive"
            ><el-option label="Active" :value="true"></el-option
            ><el-option label="Inactive" :value="false"></el-option
          ></el-select>
        </el-form-item>
      </el-col>
      <el-col :span="category == 'workpoints' ? 12 : 24">
        <el-form-item prop="name">
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            for="grid-first-name"
          >
            Device Name
          </label>
          <el-input
            v-model="form.name"
            placeholder="Input device name"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12" v-if="category == 'workpoints'">
        <el-form-item prop="name">
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            for="grid-first-name"
          >
            Location
          </label>

          <el-select
            v-model="form.locationType"
            placeholder="Select location type"
          >
            <el-option :value="1" label="Workstation"></el-option>
            <el-option :value="2" label="Room"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item prop="iPaddress">
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            for="grid-first-name"
          >
            IP Address
          </label>
          <el-input
            v-model="form.iPaddress"
            placeholder="Input ip address"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item prop="mac">
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            for="grid-first-name"
          >
            MAC Address
          </label>
          <el-input
            v-model="form.mac"
            placeholder="Input mac address"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item>
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            for="grid-first-name"
          >
            Site
          </label>
          <el-input :model-value="siteData.name" readonly></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item prop="floorID">
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            for="grid-first-name"
          >
            Floor
          </label>
          <el-select
            @change="fetchHub"
            filterable
            v-model="form.floorID"
            class="w-full"
          >
            <el-option
              v-for="(data, index) in floorData"
              :key="index"
              :value="data.id"
              :label="data.name"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12" v-if="category == 'workpoints'">
        <el-form-item
          prop="hubID"
          :rules="[
            {
              required: true,
              message: 'Please select hub device',
              trigger: 'blur',
            },
          ]"
        >
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            for="grid-first-name"
          >
            Hub
          </label>
          <el-select filterable v-model="form.hubID" class="w-full">
            <el-option
              v-for="(data, index) in hubData"
              :key="index"
              :value="data.id"
              :label="data.name"
            ></el-option>
          </el-select>
        </el-form-item> </el-col></el-row
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
import { Floor, Hubs, WorkPoints } from "@/api/app.service";
import {
  DeviceResponse,
  FloorResponse,
  HubResponse,
  MutationResponse,
  WorkPointResponse,
} from "@/api/response.types";
import {
  defineComponent,
  onMounted,
  PropType,
  reactive,
  ref,
  watch,
} from "vue";
import { deviceRules } from "@/components/sites/form.rules";
import { VForm } from "@/store/modules/types/types";
import { DevicePayload } from "@/api/payload.type";
import { ElNotification } from "element-plus";
export default defineComponent({
  props: {
    propCategory: {
      type: String,
      required: true,
    },
    siteData: {
      type: Object,
      required: true,
    },
    editData: {
      type: Object as PropType<DeviceResponse>,
    },
  },
  setup(props, context) {
    const submitLoading = ref(false);
    const category = ref(props.propCategory);
    const form = reactive({
      mac: props.editData?.mac,
      name: props.editData?.name,
      iPaddress: props.editData?.iPaddress,
      officeID: props.editData?.officeID,
      hubID: props.editData?.hubID,
      floorID: props.editData?.floorID,
      isActive: props.editData?.isActive,
      locationType: props.editData?.locationType,
    });
    const params = reactive({
      officeID: props.siteData.buildingID,
      name: null,
      page: "1",
      limit: "10000",
    });
    watch(
      () => category.value,
      () => {
        form.mac = "";
        form.name = "";
        form.iPaddress = "";
        form.hubID = null;
        form.floorID = null;
      }
    );
    const deviceForm = ref(null as null | VForm);
    function submit() {
      deviceForm.value?.validate().then(async () => {
        if (props.editData?.id) {
          if (category.value == "hubs") {
            submitLoading.value = true;
            await Hubs.put(form as DevicePayload, props.editData.id)
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
          if (category.value == "workpoints") {
            submitLoading.value = true;
            await WorkPoints.put(form as WorkPointResponse, props.editData.id)
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
        } else {
          if (category.value == "hubs") {
            submitLoading.value = true;
            form.officeID = props.siteData.buildingID;
            await Hubs.post(form as DevicePayload)
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
          if (category.value == "workpoints") {
            submitLoading.value = true;
            form.officeID = props.siteData.buildingID;
            form.isActive = false;
            await WorkPoints.post(form as WorkPointResponse)
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
        }
      });
    }
    const floorData = ref([] as Array<FloorResponse>);
    const hubData = ref([] as Array<HubResponse>);
    async function fetchFloor() {
      await Floor.get(params).then((res) => {
        floorData.value = res.data;
      });
    }
    async function fetchHub(id: string) {
      form.hubID = null;
      await Hubs.get({
        officeID: props.siteData.buildingID,
        floorID: id,
        page: "1",
        limit: "10000",
      }).then((res) => {
        hubData.value = res.data;
      });
    }
    onMounted(() => fetchFloor());
    return {
      category,
      form,
      floorData,
      deviceRules,
      deviceForm,
      submit,
      submitLoading,
      fetchHub,
      hubData,
    };
  },
});
</script>
