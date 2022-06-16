import { ActionTree, ActionContext } from "vuex";

import { RootState } from "@/store";

import { AuthStateTypes, State } from "./state";
import { Mutations } from "./mutations";
// import { AuthMutationTypes } from "../types/mutation-types";
import { AuthActionTypes } from "../types/action-types";
import ApiService from "@/common/api.service";
import { AuthMutationTypes } from "../types/mutation-types";
import { AxiosResponse } from "axios";
import jwtService from "@/common/jwt.service";
import { SecurityResponse } from "@/api/response.types";
import router from "@/router";

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
  dispatch<K extends keyof Actions>(
    key: K,
    payload: Parameters<Actions[K]>[1]
  ): ReturnType<Actions[K]>;
} & Omit<ActionContext<State, RootState>, "commit"> &
  Omit<ActionContext<State, RootState>, "dispatch">;

export interface Actions {
  [AuthActionTypes.CHECK_AUTH](
    { commit, dispatch }: AugmentedActionContext,
    payload: null // Obsolete in here but left as an example
  ): void;
  [AuthActionTypes.LOGIN](
    { commit, dispatch }: AugmentedActionContext,
    payload: Record<string, string> // Obsolete in here but left as an example
  ): Promise<unknown>;
  [AuthActionTypes.REFRESH](
    { commit, dispatch }: AugmentedActionContext,
    payload: null // Obsolete in here but left as an example
  ): void;
  [AuthActionTypes.LOGOUT](
    { commit }: AugmentedActionContext,
    payload: null // Obsolete in here but left as an example
  ): void;
}

export const actions: ActionTree<State, RootState> & Actions = {
  [AuthActionTypes.REFRESH]({ commit, dispatch }) {
    if (jwtService.getToken()) {
      return new Promise((resolve) => {
        ApiService.setCredentials();
        ApiService.initErpApi();
        ApiService.post("/Hub/refresh-token?x-version=2", undefined, 2)
          .then(async (res: AxiosResponse) => {
            const payload: AuthStateTypes = res.data;
            let timeUntilRefresh = 900;
            timeUntilRefresh -= 5 * 60;
            commit(AuthMutationTypes.SET_AUTH, payload);
            setTimeout(
              () => dispatch(AuthActionTypes.REFRESH),
              timeUntilRefresh * 1000
            );
            ApiService.setHeader();
            dispatch(AuthActionTypes.SECURITY_CLAIMS);
            ApiService.resetApiUrl();
            resolve(res);
            commit(AuthMutationTypes.SET_MOUNT, true);
          })
          .catch(() => {
            commit(AuthMutationTypes.SET_MOUNT, true);
            commit(AuthMutationTypes.PURGE_AUTH, null);
          });
      });
    } else {
      commit(AuthMutationTypes.SET_MOUNT, true);
      commit(AuthMutationTypes.PURGE_AUTH, null);
    }
  },
  [AuthActionTypes.SECURITY_CLAIMS]({ commit }) {
    return new Promise((resolve) => {
      ApiService.initErpApi();
      ApiService.get("/Security/me").then(async (res: AxiosResponse) => {
        const payload: SecurityResponse = res.data;
        if (payload.user.isInitialLogIn == true) {
          router.push({
            name: "ChangePassword",
          });
        }
        commit(AuthMutationTypes.SET_USER, payload.user);
        commit(AuthMutationTypes.SET_CLAIMS, payload.user.claims);
        resolve(res);
      });
    });
  },
  [AuthActionTypes.CHECK_AUTH]({ commit, dispatch }) {
    if (jwtService.getToken()) {
      return new Promise((resolve) => {
        ApiService.setCredentials();
        ApiService.setHeader();
        ApiService.initErpApi();
        ApiService.get("/Hub/profile", undefined, 2)
          .then(async (res: AxiosResponse) => {
            const payload: AuthStateTypes["user"] = res.data;
            dispatch(AuthActionTypes.SECURITY_CLAIMS);
            commit(AuthMutationTypes.SET_USER, payload);
            ApiService.resetApiUrl();
            resolve(res);
          })
          .catch(() => {
            commit(AuthMutationTypes.PURGE_AUTH, null);
            ApiService.resetApiUrl();
          });
      });
    } else {
      commit(AuthMutationTypes.PURGE_AUTH, null);
    }
  },
  [AuthActionTypes.LOGIN](
    { commit, dispatch },
    payload: Record<string, string>
  ) {
    return new Promise((resolve, reject) => {
      ApiService.initErpApi();
      ApiService.setCredentials();
      ApiService.post(
        `/Hub/login`,
        {
          email: payload.username,
          password: payload.password,
        },
        2
      )
        .then((res: AxiosResponse): void => {
          const payload: AuthStateTypes = res.data;
          commit(AuthMutationTypes.SET_AUTH, payload);
          let timeUntilRefresh = 900;
          timeUntilRefresh -= 5 * 60;
          setTimeout(
            () => dispatch(AuthActionTypes.REFRESH),
            timeUntilRefresh * 1000
          );

          ApiService.setHeader();
          dispatch(AuthActionTypes.SECURITY_CLAIMS);
          resolve(res);
          // dispatch(AuthActionTypes.CHECK_AUTH);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  [AuthActionTypes.LOGOUT]({ commit }) {
    return new Promise((resolve, reject) => {
      ApiService.initErpApi();
      ApiService.setCredentials();
      ApiService.delete(`/Hub/logout`, undefined, 2)
        .then((res): void => {
          commit(AuthMutationTypes.PURGE_AUTH);

          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  [AuthActionTypes.GOOGLE_LOGIN]({ commit, dispatch }, payload: string) {
    return new Promise((resolve, reject) => {
      ApiService.initErpApi();
      ApiService.setCredentials();
      ApiService.post(`/Google/auth/${payload}`, {})
        .then((res: AxiosResponse): void => {
          const payload: AuthStateTypes = res.data;

          commit(AuthMutationTypes.SET_AUTH, payload);
          ApiService.setHeader();
          dispatch(AuthActionTypes.SECURITY_CLAIMS);

          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
