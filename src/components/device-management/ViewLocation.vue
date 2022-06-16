<template>
  <TransitionRoot as="template" :show="open">
    <Dialog
      as="div"
      class="fixed z-10 inset-0 overflow-y-auto"
      @close="open = false"
    >
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          />
        </TransitionChild>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 translate-y-0 sm:scale-100"
          leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div
            class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
          >
            <div>
              <div class="mt-3 text-center sm:mt-5">
                <DialogTitle
                  as="h3"
                  class="text-lg leading-6 font-semibold text-gray-900"
                >
                  {{ workpoint.name }}
                </DialogTitle>
                <div class="overflow-auto border bg-white p-5 pt-0">
                  <div
                    class="relative"
                    :style="
                      `background-image: url('${workpoint.area.floorPlanImage}');  background-size: 100%;   background-repeat: no-repeat;width:426px; height:426px; margin-left:auto; margin-right:auto`
                    "
                  >
                    <VueDragResize
                      :w="35"
                      :h="35"
                      :x="coordinateX"
                      :y="coordinateY"
                      :isResizable="false"
                      :isDraggable="false"
                      :parentLimitation="true"
                    >
                      <div
                        class="mx-auto flex items-center justify-center h-6 w-6 rounded-full bg-yellow-100"
                      >
                        <LocationMarkerIcon
                          class="h-5 w-5 text-primary"
                          aria-hidden="true"
                        />
                      </div>
                    </VueDragResize>
                  </div>
                </div>
              </div>
            </div>

            <div class="my-2">
              <el-button class="w-full" type="default" @click="open = false"
                >Cancels</el-button
              >
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { LocationMarkerIcon } from "@heroicons/vue/solid";
import { WorkPointResponse } from "@/api/response.types";
import VueDragResize from "vue-drag-resize";
export default defineComponent({
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    LocationMarkerIcon,
    VueDragResize,
  },
  props: {
    workpoint: {
      type: Object as PropType<WorkPointResponse>,
      required: true,
    },
  },
  setup(props) {
    const open = ref(false);
    function mutateOpen(value: boolean) {
      open.value = value;
    }
    const coordinateX = computed(() => {
      let coordinate = props.workpoint.coordinateX / 3 - 14;
      if (props.workpoint.width > 0 && props.workpoint.height > 0) {
        coordinate = coordinate + props.workpoint.width / 3 / 2 - 5;
      }
      return coordinate;
    });
    const coordinateY = computed(() => {
      let coordinate = props.workpoint.coordinateY / 3 - 14;
      if (props.workpoint.width > 0 && props.workpoint.height > 0) {
        coordinate = coordinate + props.workpoint.height / 3 / 2 - 5;
      }
      return coordinate;
    });
    return {
      open,
      mutateOpen,
      coordinateY,
      coordinateX,
    };
  },
});
</script>
