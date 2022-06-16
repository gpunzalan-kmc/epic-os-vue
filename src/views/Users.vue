<template>
  <div class="flex justify-end px-10 pt-4">
    <div class="flex">
      <el-input
        style="width:300px"
        size="small"
        v-model="searchVal"
        placeholder="Search User"
        prefix-icon="el-icon-search"
      ></el-input>
      <el-pagination
        @current-change="changePage"
        background
        layout="prev, next"
        :page-size="12"
        :total="total"
      >
      </el-pagination>
      <el-button size="small" type="primary" @click="addUserDialog = true"
        >Add User</el-button
      >
    </div>
  </div>

  <el-row
    class="px-10 pb-10 pt-5"
    :gutter="20"
    v-loading="loading"
    element-loading-text="Loading..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0)"
  >
    <el-col
      :sm="24"
      :md="12"
      :lg="6"
      class="mb-5"
      v-for="(user, index) in paginatedUser"
      :key="index"
    >
      <div
        class="w-full bg-white  p-3 rounded-md tracking-wide border hover:shadow-md"
      >
        <div id="header" class="flex items-center mb-4 truncate px-3 pt-2">
          <div id="header-text" class="leading-5  sm w-64">
            <h4 id="name" class="text-xl font-semibold  cursor-pointer">
              {{ user.firstName }} {{ user.lastName }}
            </h4>
            <p class="w-full text-sm font-semibold text-gray-600 truncate">
              {{ user.emailAddress }}
            </p>
          </div>
        </div>
        <div class="bg-subWall w-full p-2">
          <table class="text-sm class ">
            <tbody>
              <tr>
                <td class="px-2 text-gray-500 font-semibold">
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    ></path>
                  </svg>
                </td>
                <td class="px-2">{{ user.userName }}</td>
              </tr>
              <tr>
                <td class="px-2 py-1 text-gray-500 font-semibold">
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    ></path>
                  </svg>
                </td>
                <td class="px-2">
                  <p
                    class="truncate w-64 font-bold cursor-pointer text-primary"
                    @click="edit(user)"
                  >
                    Edit
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div></el-col
    >
  </el-row>
  <el-dialog title="Add User" v-model="addUserDialog" width="500px">
    <AddUser
      v-if="addUserDialog"
      @reload="
        fetchUsers();
        addUserDialog = false;
      "
    />
  </el-dialog>
  <el-dialog title="Edit User" v-model="editUserDialog" width="500px">
    <AddUser
      v-if="editUserDialog"
      :editData="userData"
      @reload="
        fetchUsers();
        editUserDialog = false;
      "
    />
  </el-dialog>
</template>
<script lang="ts">
import { Users } from "@/api/app.service";
import { UserResponse } from "@/api/response.types";
import router from "@/router";
import { computed, defineComponent, onMounted, reactive, ref } from "vue";
import AddUser from "@/components/users/AddUser.vue";
export default defineComponent({
  components: {
    AddUser,
  },
  setup() {
    const page = ref(0);
    const total = ref(1);
    const userData = ref({} as UserResponse);
    const loading = ref(false);
    const params = reactive({
      page: "1",
      limit: "1000",
    });
    const addUserDialog = ref(false);
    const editUserDialog = ref(false);
    const searchVal = ref("");
    const usersData = ref([] as Array<UserResponse>);
    const searchData = computed(() => {
      return usersData.value.filter(
        (user) =>
          user.firstName
            .toLowerCase()
            .includes(searchVal.value.toLowerCase()) &&
          user.lastName.toLowerCase().includes(searchVal.value.toLowerCase())
      );
    });
    function changePage(event: number) {
      page.value = event - 1;
    }
    const paginatedUser = computed(() =>
      searchData.value.slice(page.value * 12, (page.value + 1) * 12)
    );
    function changeRoute(id: number) {
      router.replace({ path: `/sites/${id}`, query: { view: "floors" } });
    }
    function edit(user: UserResponse) {
      editUserDialog.value = true;
      userData.value = user;
    }
    async function fetchUsers() {
      loading.value = true;
      await Users.get(params).then((res) => {
        total.value = res.totalRecords;
        usersData.value = res.data;
      });
      loading.value = false;
    }
    onMounted(() => {
      fetchUsers();
    });
    return {
      usersData,
      searchData,
      searchVal,
      loading,
      changeRoute,
      paginatedUser,
      changePage,
      total,
      addUserDialog,
      editUserDialog,
      userData,
      fetchUsers,
      edit,
    };
  },
});
</script>
