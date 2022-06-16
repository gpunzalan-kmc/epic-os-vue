import { ElMessage } from "element-plus";
import { reg } from "./reg";

export function checkArrayEmail(payload: Array<string>): boolean {
  let status = false;
  payload.map((item: string): void => {
    if (!reg.test(item)) {
      ElMessage({ message: "Invalid Email", type: "warning" });
      status = true;
    }
  });
  return status;
}
