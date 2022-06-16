import { createStore, createLogger } from "vuex";

import {
  store as auth,
  AuthStore,
  State as AuthState,
} from "@/store/modules/auth";

export type RootState = {
  auth: AuthState;
};

export type Store = AuthStore<Pick<RootState, "auth">>;

// Plug in logger when in development environment
const debug = process.env.NODE_ENV !== "production";
const plugins = debug ? [createLogger({})] : [];

// Plug in session storage based persistence
// plugins.push(createPersistedState({ storage: window.sessionStorage }));

export const store = createStore({
  plugins,
  modules: {
    auth,
  },
});

export function useStore(): Store {
  return store as Store;
}
