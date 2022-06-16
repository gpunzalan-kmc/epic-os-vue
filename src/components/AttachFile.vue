<template>
  <el-upload
    class="upload-demo"
    :data="data"
    :action="action"
    :limit="limit"
    ref="upload"
    :before-upload="beforeUpload"
    :on-remove="handleRemove"
    :on-exceed="handleLimit"
    :auto-upload="true"
    :on-error="handleError"
    :on-success="handleSuccess"
    :headers="myHeaders"
  >
    <el-button :loading="uploading" size="small" type="primary"
      >Click to upload</el-button
    >
    <template #tip>
      <div class="el-upload__tip">
        JPEG or PNG file with a size less than {{ fileSize }}mb.
      </div>
    </template>
  </el-upload>
</template>
<script lang="ts">
import { FileStackUploadResponse } from "@/api/response.types";
import { getToken } from "@/common/jwt.service";
import { AttachFileResponse, BeforeUploadType } from "@/common/types";
import { VForm } from "@/store/modules/types/types";
import { ElNotification } from "element-plus";
import { computed, defineComponent, ref } from "vue";
import { prop } from "vue-class-component";
export default defineComponent({
  props: {
    action: String,
    fileSize: { type: Number, default: 25 },
    data: Object,
    limit: {
      type: Number,
      default: 1,
    },
  },
  setup(props, { emit }) {
    const uploading = ref(false);
    const files = ref([] as string[]);
    const myHeaders = computed(() => {
      return {
        Authorization: `Bearer ${getToken()}`,
      };
    });
    const upload = ref(null as null | VForm);
    function handleRemove(response: AttachFileResponse<string>) {
      const check = files.value.find((d) => d == response.response);
      if (check) {
        const index = files.value.indexOf(check);
        files.value.splice(index, 1);
      }
      // fileList.value = [];
      // files.forEach((file) => {
      //   fileList.value.push({
      //     id: 0,
      //     name: file.name,
      //     imageLink: file.response.filePath,
      //     isThumbNail: false,
      //   });
      // });
    }
    function handleSuccess(response: string) {
      files.value.push(response);
      ElNotification({
        title: "Success",
        type: "success",
      });
      uploading.value = false;
      emit("files", files.value);
    }
    function beforeUpload(file: BeforeUploadType) {
      uploading.value = true;
      const isJPG = file.type == "image/jpeg";
      const isPNG = file.type == "image/png";
      const isWebP = file.type == "image/webp";
      const isLt2M = (file.size as number) / 1024 / 1024 < props.fileSize;
      if (!isLt2M) {
        ElNotification({
          title: "Warning",
          type: "warning",
          message: "Document size can not exceed " + props.fileSize + "MB!",
        });
        uploading.value = false;
      } else if (!isJPG && !isPNG && !isWebP) {
        ElNotification({
          title: "Warning",
          type: "warning",
          message: "Floor plan must be JPG, PNG or Webp format",
        });
        uploading.value = false;
      }
      return isLt2M && (isPNG || isJPG || isWebP);
    }
    function handleError() {
      ElNotification({
        title: "Invalid",
        type: "error",
        message: "Invalid File",
      });
      uploading.value = false;
    }
    function handleLimit() {
      ElNotification({
        title: "Warning",
        type: "warning",
        message: "File limit exceeded. 1 file attachment only.",
      });
    }
    function sliceAttachments() {
      files.value = [];
      upload.value?.clearFiles();
    }
    return {
      uploading,
      files,
      myHeaders,
      upload,
      handleSuccess,
      handleRemove,
      beforeUpload,
      handleError,
      handleLimit,
      sliceAttachments,
    };
  },
});
</script>
