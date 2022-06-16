<template>
  <el-row :gutter="10">
    <el-col :span="24">
      <el-form-item>
        <label
          class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
          for="grid-first-name"
        >
          Site
        </label>
        <el-input
          class="w-full"
          readonly
          :model-value="siteData.name"
        ></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="24">
      <el-form-item>
        <label
          class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
          for="grid-first-name"
        >
          Name
        </label>
        <el-input class="w-full" v-model="form.name"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="24">
      <el-form-item>
        <label
          class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
          for="grid-first-name"
        >
          Floor Plan
        </label>
        <AttachFile :action="uploadURL" @files="handleFiles" ref="attachFile" />
      </el-form-item>
    </el-col>
  </el-row>
  <div class="flex justify-end">
    <el-button
      type="primary"
      @click="saveFloor"
      size="small"
      :loading="submitLoading"
      >Confirm</el-button
    >
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, reactive, ref } from "vue";
import AttachFile from "@/components/AttachFile.vue";
import { API_URL } from "@/common/config";
import { ElNotification } from "element-plus";
import { FloorResponse, MutationResponse } from "@/api/response.types";
import { Floor } from "@/api/app.service";
import { VForm } from "@/store/modules/types/types";
export default defineComponent({
  props: {
    siteData: {
      type: Object,
      required: true,
    },
    editData: {
      type: Object as PropType<FloorResponse>,
    },
  },
  components: {
    AttachFile,
  },
  setup(props, context) {
    const submitLoading = ref(false);
    const uploadURL = `${API_URL}/floor/upload`;
    const form = reactive({
      name: props.editData?.name,
      officeID: props.editData?.officeID,
      filename: props.editData?.filename,
      isActive: props.editData?.isActive,
      isDeleted: props.editData?.isDeleted,
    });
    const attachFile = ref(null as null | VForm);
    async function saveFloor() {
      if (!form.name) {
        ElNotification({
          message: "Empty floor name",
          type: "warning",
        });
        return;
      }
      if (!form.filename) {
        ElNotification({
          message: "Empty floor plan",
          type: "warning",
        });
        return;
      }
      if (props.editData?.id) {
        submitLoading.value = true;
        form.officeID = props.siteData.buildingID;
        await Floor.update(form as FloorResponse, props.editData.id).then(
          (res) => {
            ElNotification({
              message: (res as MutationResponse).message,
              type: "success",
            });
            form.name = "";
            form.filename = "";
          }
        );
        context.emit("reload");
        attachFile.value?.sliceAttachments();
        submitLoading.value = false;
      } else {
        submitLoading.value = true;
        form.officeID = props.siteData.buildingID;
        await Floor.create(form as FloorResponse).then((res) => {
          ElNotification({
            message: (res as MutationResponse).message,
            type: "success",
          });
          form.name = "";
          form.filename = "";
        });
        context.emit("reload");
        attachFile.value?.sliceAttachments();
        submitLoading.value = false;
      }
    }
    function handleFiles(event: Array<Record<string, string>>) {
      form.filename = event[0].filename;
    }
    return {
      uploadURL,
      submitLoading,
      form,
      handleFiles,
      attachFile,
      saveFloor,
    };
  },
});
</script>
