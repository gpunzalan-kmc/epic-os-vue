import { GetterTree } from "vuex";

import { RootState } from "@/store";

import { State, AuthStateTypes } from "./state";

export type Getters = {
  currentUser(state: AuthStateTypes): Record<string, unknown>;
  isAuthenticated(state: AuthStateTypes): boolean;
  userState(state: AuthStateTypes): boolean;
  loading(state: AuthStateTypes): boolean;
  subName(state: AuthStateTypes): AuthStateTypes["subName"];
  isMounted(state: AuthStateTypes): AuthStateTypes["mount"];
};

export const getters: GetterTree<State, RootState> & Getters = {
  currentUser: (state) => state.user,
  claims: (state) => state.claims,
  isAuthenticated: (state) => state.isAuthenticated,
  userState(state) {
    return Object.keys(state.user).length > 0;
  },
  loading(state) {
    return state.loading;
  },
  subName: (state) => state.subName,
  isMounted: (state) => state.mount,
};
