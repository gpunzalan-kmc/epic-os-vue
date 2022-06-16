<template>
  <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
    <div class=" sm:px-6 lg:px-8">
      <div class="border-b border-gray-700">
        <div class="flex items-center justify-between h-16 px-4 sm:px-0">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <img
                class="h-8"
                src="@/assets/img/epic-white.png"
                alt="Workflow"
              />
            </div>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <template v-for="(item, itemIdx) in nav" :key="itemIdx">
                  <template v-if="item.name === name">
                    <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                    <a
                      @click="
                        router.push({ name: item.name });
                        open = false;
                      "
                      class="bg-primary text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                      >{{ item.label }}</a
                    >
                  </template>
                  <a
                    v-else
                    @click="
                      router.push({ name: item.name });
                      open = false;
                    "
                    class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                    >{{ item.label }}</a
                  >
                </template>
              </div>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
              <!-- Profile dropdown -->
              <Menu as="div" class="ml-3 relative">
                <div>
                  <MenuButton
                    class="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  >
                    <span class="sr-only">Open user menu</span>
                    <el-avatar
                      :size="40"
                      class="border mx-auto"
                      :src="currentUser.profilePicture"
                      icon="el-icon-user-solid"
                    >
                    </el-avatar>
                  </MenuButton>
                </div>
                <transition
                  enter-active-class="transition ease-out duration-100"
                  enter-from-class="transform opacity-0 scale-95"
                  enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-from-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95"
                >
                  <MenuItems
                    class="z-10 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    <MenuItem>
                      <a :class="['block px-4 py-2 text-sm text-gray-700 ']">
                        {{ currentUser.firstName }}
                        {{ currentUser.lastName }}</a
                      >
                    </MenuItem>
                    <MenuItem>
                      <a
                        @click.prevent="logout"
                        :class="[
                          'block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100',
                        ]"
                        >Log Out</a
                      >
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>
            </div>
          </div>
          <div class="-mr-2 flex md:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton
              class="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span class="sr-only">Open main menu</span>
              <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
              <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>
    </div>

    <DisclosurePanel class="border-b border-gray-700 md:hidden">
      <div class="px-2 py-3 space-y-1 sm:px-3">
        <template v-for="item in nav" :key="item">
          <template v-if="item.name === name">
            <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
            <a
              @click="
                router.push({ name: item.name });
                open = false;
              "
              class="bg-primary text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer"
              >{{ item.label }}</a
            >
          </template>
          <a
            v-else
            @click="
              router.push({ name: item.name });
              open = false;
            "
            class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer"
            >{{ item.label }}</a
          >
        </template>
      </div>
      <div class="pt-4 pb-3 border-t border-gray-700">
        <div class="flex items-center px-5">
          <div class="flex-shrink-0">
            <el-avatar
              :size="50"
              class="border mx-auto"
              :src="currentUser.profilePicture"
              icon="el-icon-user-solid"
            >
            </el-avatar>
          </div>
          <div class="ml-3">
            <div class="text-base font-medium leading-none text-white">
              {{ currentUser.firstName }} {{ currentUser.lastName }}
            </div>
            <div class="text-sm font-medium leading-none text-gray-400">
              {{ currentUser.email }}
            </div>
          </div>
        </div>
        <div class="mt-3 px-2 space-y-1">
          <a
            @click.prevent="logout"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
            >Log Out</a
          >
        </div>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>
<script lang="ts">
import { computed, ref } from "vue";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/vue/outline";
import router from "@/router";
import { useRoute } from "vue-router";
import { store } from "@/store";
import { AuthStateTypes } from "@/store/modules/auth/state";
import { AuthActionTypes } from "@/store/modules/types/action-types";
import { isAccessAllowed, isManageAllowed } from "@/common/access.security";

const navigation = [
  {
    label: "Neighborhoods",
    name: "KMC Neighborhoods",
  },
  {
    label: "Devices",
    name: "Device Management",
  },
];

export default {
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    BellIcon,
    MenuIcon,
    XIcon,
  },
  setup() {
    const open = ref(false);
    const route = useRoute();
    const name = computed(() => route.meta.navName as string);
    const currentUser = computed(
      () => store.getters.currentUser as AuthStateTypes["user"]
    );
    function logout() {
      store.dispatch(AuthActionTypes.LOGOUT);
    }
    const nav = computed(() => {
      const menu = [] as Array<{ label: string; name: string }>;
      navigation.map((d) => {
        if (d.name == "KMC Neighborhoods" && isAccessAllowed.value)
          menu.push(d);
        if (d.name == "Device Management" && isManageAllowed.value) {
          menu.push(d);
        }
      });
      return menu;
    });
    return {
      navigation,
      logout,
      open,
      router,
      name,
      currentUser,
      nav,
    };
  },
};
</script>
