<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <el-drawer
    title="Add Neighborhood"
    v-model="open"
    direction="rtl"
    :size="width"
    placeholder="background: #ffff"
  >
    <div class="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
      <div class="relative flex-1 px-4 sm:px-6">
        <div class="absolute inset-0 px-4 sm:px-6">
          <div class="h-full border-gray-200" aria-hidden="true">
            <form class="space-y-8 divide-y divide-gray-200">
              <div class="space-y-8 divide-y divide-gray-200">
                <div>
                  <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div class="sm:col-span-6">
                      <label
                        for="username"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Neighborhood Name
                      </label>
                      <div class="mt-1 flex rounded-md shadow-sm">
                        <el-input
                          v-model="neighborhoodForm.name"
                          placeholder="Input neighborhood name"
                          class="w-full"
                        ></el-input>
                      </div>
                    </div>

                    <div class="sm:col-span-6">
                      <label
                        for="username"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Building
                      </label>
                      <div class="mt-1 flex rounded-md shadow-sm">
                        <el-select
                          filterable
                          @change="changeSite"
                          v-model="neighborhoodForm.buildingId"
                          placeholder="Select building"
                          class="w-full"
                        >
                          <el-option
                            v-for="(building, index) in buildings.data"
                            :key="index"
                            :value="building.buildingID"
                            :label="building.name"
                          ></el-option>
                        </el-select>
                      </div>
                    </div>
                    <div class="sm:col-span-6">
                      <label
                        for="username"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Floor
                      </label>
                      <div class="mt-1 flex rounded-md shadow-sm">
                        <el-select
                          filterable
                          v-model="neighborhoodForm.floorId"
                          placeholder="Select floor"
                          class="w-full"
                        >
                          <el-option
                            v-for="(floor, index) in floors"
                            :key="index"
                            :value="floor.floorID"
                            :label="floor.name"
                          ></el-option>
                        </el-select>
                      </div>
                    </div>
                    <div class="sm:col-span-6">
                      <label
                        for="cover-photo"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Floor Plan
                      </label>
                      <div
                        class="mt-1 flex flex-col justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
                      >
                        <div class="space-y-1 text-center">
                          <div class=" text-sm text-gray-600">
                            <AttachFile
                              :action="uploadURL"
                              @files="handleFiles"
                              ref="attachFile"
                            />
                          </div>
                          <p class="text-xs text-gray-500">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                        <Cropper
                          v-if="neighborhoodForm.floorPlanImage"
                          ref="cropperRef"
                          :src="neighborhoodForm.floorPlanImage"
                          :stencil-props="{
                            aspectRatio: 4 / 3,
                          }"
                          :transitions="true"
                          @change="cropChange"
                        ></Cropper>
                        <span
                          v-if="neighborhoodForm.floorPlanImage"
                          class="relative z-0 inline-flex py-2  rounded-md justify-center divide-gray-200"
                        >
                          <el-button
                            type="primary"
                            size="mini"
                            style="margin:0!important; border-radius: 0!important;padding:7px!important"
                            @click="rotateImage(-15)"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="24px"
                              viewBox="0 0 24 24"
                              width="24px"
                              class="h-5 w-5 text-white fill-current"
                            >
                              <path d="M0 0h24v24H0z" fill="none" />
                              <path
                                d="M7.11 8.53L5.7 7.11C4.8 8.27 4.24 9.61 4.07 11h2.02c.14-.87.49-1.72 1.02-2.47zM6.09 13H4.07c.17 1.39.72 2.73 1.62 3.89l1.41-1.42c-.52-.75-.87-1.59-1.01-2.47zm1.01 5.32c1.16.9 2.51 1.44 3.9 1.61V17.9c-.87-.15-1.71-.49-2.46-1.03L7.1 18.32zM13 4.07V1L8.45 5.55 13 10V6.09c2.84.48 5 2.94 5 5.91s-2.16 5.43-5 5.91v2.02c3.95-.49 7-3.85 7-7.93s-3.05-7.44-7-7.93z"
                              />
                            </svg>
                          </el-button>
                          <el-button
                            type="primary"
                            size="mini"
                            style="margin:0!important; border-radius: 0!important;padding:7px!important"
                            @click="rotateImage(15)"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="24px"
                              viewBox="0 0 24 24"
                              width="24px"
                              class="h-5 w-5 text-white fill-current"
                            >
                              <path d="M0 0h24v24H0z" fill="none" />
                              <path
                                d="M15.55 5.55L11 1v3.07C7.06 4.56 4 7.92 4 12s3.05 7.44 7 7.93v-2.02c-2.84-.48-5-2.94-5-5.91s2.16-5.43 5-5.91V10l4.55-4.45zM19.93 11c-.17-1.39-.72-2.73-1.62-3.89l-1.42 1.42c.54.75.88 1.6 1.02 2.47h2.02zM13 17.9v2.02c1.39-.17 2.74-.71 3.9-1.61l-1.44-1.44c-.75.54-1.59.89-2.46 1.03zm3.89-2.42l1.42 1.41c.9-1.16 1.45-2.5 1.62-3.89h-2.02c-.14.87-.48 1.72-1.02 2.48z"
                              />
                            </svg>
                          </el-button>
                          <el-button
                            type="primary"
                            size="mini"
                            style="margin:0!important; border-radius: 0!important;padding:7px!important"
                            @click="flip(true, false)"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="24px"
                              viewBox="0 0 24 24"
                              width="24px"
                              class="h-5 w-5 text-white fill-current "
                            >
                              <path d="M0 0h24v24H0z" fill="none" />
                              <path
                                d="M15 21h2v-2h-2v2zm4-12h2V7h-2v2zM3 5v14c0 1.1.9 2 2 2h4v-2H5V5h4V3H5c-1.1 0-2 .9-2 2zm16-2v2h2c0-1.1-.9-2-2-2zm-8 20h2V1h-2v22zm8-6h2v-2h-2v2zM15 5h2V3h-2v2zm4 8h2v-2h-2v2zm0 8c1.1 0 2-.9 2-2h-2v2z"
                              />
                            </svg>
                          </el-button>
                          <el-button
                            type="primary"
                            size="mini"
                            style="margin:0!important; border-radius: 0!important;padding:7px!important"
                            @click="flip(false, true)"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="24px"
                              viewBox="0 0 24 24"
                              width="24px"
                              class="h-5 w-5 text-white fill-current"
                            >
                              <path d="M0 0h24v24H0z" fill="none" />
                              <path
                                d="M15 21h2v-2h-2v2zm4-12h2V7h-2v2zM3 5v14c0 1.1.9 2 2 2h4v-2H5V5h4V3H5c-1.1 0-2 .9-2 2zm16-2v2h2c0-1.1-.9-2-2-2zm-8 20h2V1h-2v22zm8-6h2v-2h-2v2zM15 5h2V3h-2v2zm4 8h2v-2h-2v2zm0 8c1.1 0 2-.9 2-2h-2v2z"
                              />
                            </svg>
                          </el-button>
                        </span>
                        <svg
                          v-else
                          class="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                    <div class="sm:col-span-6">
                      <label
                        for="cover-photo"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Image
                      </label>
                      <div
                        class="mt-1 flex flex-col justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
                      >
                        <div class="space-y-1 text-center">
                          <div class=" text-sm text-gray-600">
                            <AttachFile
                              :action="uploadURL"
                              @files="handleImageFiles"
                              ref="attachFile"
                            />
                          </div>
                          <p class="text-xs text-gray-500">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                        <img
                          v-if="neighborhoodForm.siteImage"
                          class=" w-full mx-auto"
                          :src="neighborhoodForm.siteImage"
                          alt=""
                        />
                        <svg
                          v-else
                          class="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="py-5">
                <div class="flex justify-end">
                  <el-button
                    @click="open = false"
                    type="button"
                    class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                  >
                    Cancel
                  </el-button>
                  <el-button
                    :disabled="disabledSave"
                    :loading="buttonLoading"
                    @click="createNeighborhood"
                    type="primary"
                    class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white"
                  >
                    Save
                  </el-button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <!-- /End replace -->
      </div>
    </div>
  </el-drawer>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  PropType,
  reactive,
  ref,
  watch,
} from "vue";
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { XIcon, ChevronLeftIcon } from "@heroicons/vue/outline";
import { Neighborhood, Sites } from "@/api/app.service";
import {
  EPRPaginationV2Response,
  FileStackUploadResponse,
  FloorResponse,
  NeighborhoodResponse,
  OfficeResponse,
} from "@/api/response.types";
import { NeighborhoodPayload } from "@/api/payload.type";
import AttachFile from "@/components/AttachFile.vue";
import { API_URL, ERP_API_URL } from "@/common/config";
import { Cropper } from "vue-advanced-cropper";
import { CropImageResponse } from "@/common/types";
import { VForm } from "@/store/modules/types/types";
export default defineComponent({
  props: {
    editData: {
      type: Object as PropType<NeighborhoodResponse>,
    },
  },
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    XIcon,
    AttachFile,
    Cropper,
    ChevronLeftIcon,
  },

  setup(props, context) {
    const open = ref(false);
    function mutateSide(event: boolean) {
      open.value = event;
    }
    const uploadURL = `${ERP_API_URL}/Azure/blob/upload`;
    const buttonLoading = ref(false);
    const editId = ref(0);
    const cropperRef = ref(null as null | VForm);
    const rotation = ref(0);
    const neighborhoodForm = reactive({
      buildingId: null,
      floorId: null,
      name: "",
      floorPlanImage: "",
      siteImage: "",
      foorplanCoordinates: {
        coordinatesHeight: 0,
        coordinatesLeft: 0,
        coordinatesTop: 0,
        coordinatesWidth: 0,
        transformRotate: 0,
        transformScaleX: 0,
        transformScaleY: 0,
        transformTranslateX: 0,
        transformTranslateY: 0,
        transformHeight: 0,
        transformWidth: 0,
      },
    } as NeighborhoodPayload);
    const buildingParams = reactive({
      pageNumber: 1,
      pageSize: 1000,
    });
    const disabledSave = computed(() => {
      if (
        !neighborhoodForm.floorId ||
        !neighborhoodForm.name ||
        !neighborhoodForm.floorPlanImage
      )
        return true;
      return false;
    });
    const buildings = ref({
      data: [],
      paging: {
        pageNo: 0,
        pageSize: 0,
        pageCount: 0,
        totalRecordCount: 0,
      },
    } as EPRPaginationV2Response<OfficeResponse>);
    const floors = ref([] as FloorResponse["floors"]);
    async function fetchBuildings() {
      await Sites.get(buildingParams).then((res) => {
        buildings.value = res;
      });
    }
    async function createNeighborhood() {
      buttonLoading.value = true;
      if (props.editData && props.editData.id > 0) {
        await Neighborhood.put(neighborhoodForm, props.editData.id).then(() => {
          buttonLoading.value = false;
          open.value = false;
          context.emit("reload");
          neighborhoodForm.buildingId = null;
          neighborhoodForm.floorId = null;
          neighborhoodForm.name = "";
          neighborhoodForm.floorPlanImage = "";
          neighborhoodForm.siteImage = "";
        });
      } else {
        await Neighborhood.post(neighborhoodForm).then(() => {
          buttonLoading.value = false;
          open.value = false;
          context.emit("reload");
          neighborhoodForm.buildingId = null;
          neighborhoodForm.floorId = null;
          neighborhoodForm.name = "";
          neighborhoodForm.floorPlanImage = "";
          neighborhoodForm.siteImage = "";
        });
      }
    }
    watch(
      () => [open.value],
      () => {
        if (open.value == true) {
          fetchBuildings();
        }
      }
    );
    async function changeSite(event: number) {
      await Sites.show(event).then((res) => {
        floors.value = res.floors;
      });
    }
    watch(
      () => [props.editData],
      () => {
        if (props.editData && props.editData.id > 0) {
          editId.value = props.editData.id;

          neighborhoodForm.buildingId = props.editData.buildingId;
          changeSite(props.editData.buildingId);
          neighborhoodForm.floorId = props.editData.floorId;
          neighborhoodForm.name = props.editData.name;
          neighborhoodForm.floorPlanImage = props.editData.floorPlanImage;
          neighborhoodForm.siteImage = props.editData.siteImage;
          // neighborhoodForm.foorplanCoordinates =
          //   props.editData.floorplanCoordinates;
        }
      }
    );
    watch(
      () => cropperRef.value,
      () => {
        if (cropperRef.value && props.editData) {
          cropperRef.value?.setCoordinates({
            width: props.editData.floorplanCoordinates.coordinatesWidth,
            height: props.editData.floorplanCoordinates.coordinatesHeight,
            left: props.editData.floorplanCoordinates.coordinatesLeft,
            top: props.editData.floorplanCoordinates.coordinatesTop,
          });
          rotation.value = props.editData.floorplanCoordinates.transformRotate;
          // cropperRef.value?.rotate(90);
        }
      }
    );

    function handleFiles(event: string[]) {
      neighborhoodForm.floorPlanImage = event[0];
    }
    function handleImageFiles(event: string[]) {
      neighborhoodForm.siteImage = event[0];
    }
    const width = ref("500px");
    function handleResize() {
      const h = window.innerWidth;
      if (h < 500) {
        width.value = "100%";
      }
    }
    onMounted(() => {
      window.addEventListener("resize", handleResize);
      const h = window.innerWidth;
      if (h < 500) {
        width.value = "100%";
      }
    });
    function cropChange(event: CropImageResponse) {
      console.log(event);
      neighborhoodForm.foorplanCoordinates.coordinatesHeight =
        event.coordinates.height;
      neighborhoodForm.foorplanCoordinates.coordinatesWidth =
        event.coordinates.width;
      neighborhoodForm.foorplanCoordinates.coordinatesLeft =
        event.coordinates.left;
      neighborhoodForm.foorplanCoordinates.coordinatesTop =
        event.coordinates.top;
      neighborhoodForm.foorplanCoordinates.transformRotate =
        event.image.transforms.rotate;
      neighborhoodForm.foorplanCoordinates.transformScaleX =
        event.image.transforms.scaleX;
      neighborhoodForm.foorplanCoordinates.transformScaleY =
        event.image.transforms.scaleY;
      neighborhoodForm.foorplanCoordinates.transformTranslateX =
        event.image.transforms.translateX;
      neighborhoodForm.foorplanCoordinates.transformTranslateY =
        event.image.transforms.translateY;
      neighborhoodForm.foorplanCoordinates.transformHeight = event.image.height;
      neighborhoodForm.foorplanCoordinates.transformWidth = event.image.width;
    }
    function rotateImage(rotation: number) {
      cropperRef.value?.rotate(-rotation);
    }
    function flip(x: boolean, y: boolean) {
      cropperRef.value?.flip(x, y);
    }
    function zoom(x: number) {
      cropperRef.value?.zoom(x);
    }
    return {
      flip,
      zoom,
      open,
      mutateSide,
      neighborhoodForm,
      fetchBuildings,
      buildings,
      changeSite,
      floors,
      createNeighborhood,
      buttonLoading,
      disabledSave,
      uploadURL,
      handleFiles,
      handleImageFiles,
      width,
      cropChange,
      cropperRef,
      rotation,
      rotateImage,
    };
  },
});
</script>
<style>
.cropper {
  height: 600px;
  background: #ddd;
}
</style>
