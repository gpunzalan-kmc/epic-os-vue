<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div
    class="h-screen w-full flex antialiased text-gray-700   "
    v-if="isMounted"
  >
    <div
      class="flex-1 flex flex-col overflow-hidden"
      v-loading="loading"
      element-loading-text="Loading..."
      element-loading-spinner="el-icon-loading"
    >
      <AppHeaderV3 v-if="isAuthenticated && name != 'ChangePassword'" />
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
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
import AppHeaderV3 from "@/components/layout/AppHeaderV3.vue";

import { computed, defineComponent } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { store } from "./store";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
  { name: "Reports", href: "#", current: false },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

export default defineComponent({
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
    AppHeaderV3,
  },

  setup() {
    const route = useRoute();
    const name = computed(() => route.name as string);
    const isAuthenticated = computed(
      () => store.getters.isAuthenticated as boolean
    );
    const isMounted = computed(() => store.getters.isMounted as boolean);
    return { name, isAuthenticated, isMounted };
  },
});
</script>
