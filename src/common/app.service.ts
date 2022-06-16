import router from "@/router";
import { store } from "@/store";
import axios from "axios";
import { ElNotification } from "element-plus";
import { AuthMutationTypes } from "@/store/modules/types/mutation-types";
import { AuthActionTypes } from "@/store/modules/types/action-types";

const RouterService = {
  init(): void {
    router.beforeEach(async (to, from, next) => {
      if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (!store.getters.isAuthenticated) {
          next({
            name: "Auth",
          });
        } else {
          next();
        }
      } else if (to.matched.some((record) => record.meta.requiresVisitor)) {
        if (store.getters.isAuthenticated) {
          next({
            name: "KMC Neighborhoods",
          });
        } else {
          next();
        }
      } else {
        next();
      }
    });
  },
};

const AppService = {
  async init() {
    store.commit(AuthMutationTypes.SET_GLOBAL_LOADING);
    await Promise.all([store.dispatch(AuthActionTypes.REFRESH)]);
    // await Promise.all([store.dispatch(AuthActionTypes.CHECK_AUTH)]);

    setTimeout(() => {
      store.commit(AuthMutationTypes.SET_GLOBAL_LOADING);
    }, 1000);
  },
};

const AxiosService = {
  init(): void {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        if (error.response.status === 401) {
          store.commit(AuthMutationTypes.PURGE_AUTH, null);
          // const errors = error.response.data.errors as string[];
          // if (!errors) {
          //   ElNotification({
          //     title: "Error",
          //     type: "error",
          //     message: "Unauthorized",
          //   });
          // }
          return Promise.reject(error);
        } else if (error.response.status === 503) {
          router.push({ name: "SystemMaintenance" });
        } else if (error.response.status === 403) {
          router.push({ name: "Fobidden" });
        } else {
          if (error.response.data.errors) {
            const errors = error.response.data.errors as string[];
            errors.forEach((e) => {
              if (e !== "Email or Password is incorrect")
                ElNotification({
                  title: "Error",
                  type: "error",
                  message: e,
                });
            });
            return Promise.reject(error);
          }
        }
      }
    );
  },
};
export { RouterService, AxiosService, AppService };
