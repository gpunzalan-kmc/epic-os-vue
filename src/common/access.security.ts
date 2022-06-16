import { SecurityClaims } from "@/api/response.types";
import { store } from "@/store";
import { computed } from "vue";

export const isAccessAllowed = computed(() => {
  const claims = store.getters.claims as SecurityClaims[];
  const check = claims.find((c) => c.value == "CANACCESSSYSTEM");
  if (check) return true;
  return false;
});
export const isManageAllowed = computed(() => {
  const claims = store.getters.claims as SecurityClaims[];
  const check = claims.find((c) => c.value == "CANMANAGESYSTEM");
  if (check) return true;
  return false;
});
