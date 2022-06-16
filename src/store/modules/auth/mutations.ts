import { MutationTree } from "vuex";

// import { UserDocuments, Count } from "@/@types";

import { AuthStateTypes, State } from "./state";
import { AuthMutationTypes } from "../types/mutation-types";
import jwtService from "@/common/jwt.service";
import router from "@/router";
import { SecurityClaims } from "@/api/response.types";

export type Mutations<S = State> = {
  [AuthMutationTypes.SET_USER](state: S, payload: AuthStateTypes["user"]): void;
  [AuthMutationTypes.SET_AUTH](state: S, payload: AuthStateTypes): void;
  [AuthMutationTypes.PURGE_AUTH](state: S, payload: null): void;
  [AuthMutationTypes.SET_GLOBAL_LOADING](state: S): void;
  [AuthMutationTypes.SET_MOUNT](state: S, payload: boolean): void;
  [AuthMutationTypes.SET_CLAIMS](state: S, payload: SecurityClaims[]): void;
  [AuthMutationTypes.SET_SUBNAME](
    state: S,
    payload: AuthStateTypes["subName"]
  ): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [AuthMutationTypes.SET_USER](state, payload: AuthStateTypes["user"]) {
    state.user = payload;
  },
  [AuthMutationTypes.SET_CLAIMS](state, payload: SecurityClaims[]) {
    state.claims = payload;
  },
  [AuthMutationTypes.SET_SUBNAME](state, payload) {
    state.subName = payload;
  },
  [AuthMutationTypes.SET_GLOBAL_LOADING](state) {
    state.loading = !state.loading;
  },
  [AuthMutationTypes.SET_MOUNT](state, payload) {
    state.mount = payload;
  },
  [AuthMutationTypes.SET_AUTH](state, payload: AuthStateTypes) {
    jwtService.saveToken(payload.token);
    state.user = payload.user;

    state.isAuthenticated = true;
  },
  [AuthMutationTypes.PURGE_AUTH](state) {
    state.isAuthenticated = false;
    state.user = {
      clientId: null,
      company: null,
      email: null,
      firstName: null,
      industry: null,
      lastName: null,
      personID: null,
      phoneNumber: null,
      position: null,
      profilePicture: null,
      tin: null,
    };
    jwtService.destroyToken();
    router.push({ name: "Auth" });
  },
};
