import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import { store } from "./store";
import "@/assets/css/index.css";
import ElementPlus from "element-plus";
import "@/assets/css/element-variables.scss";
import ApiService from "@/common/api.service";
import "vue-advanced-cropper/dist/style.css";
import { AxiosService, RouterService, AppService } from "./common/app.service";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { API_URL } from "./common/config";

import { Locale } from "vant";
import enUS from "vant/es/locale/lang/en-US";

Locale.use("en-US", enUS);

declare global {
  interface Window {
    SignalR: any;
  }
}

import VueApexCharts from "vue3-apexcharts";
import Vant from "vant";
import "vant/lib/index.css";

ApiService.init();
AxiosService.init();
RouterService.init();
AppService.init();

window.SignalR = new HubConnectionBuilder()
  .withUrl(API_URL + "/telemery-hub")
  .configureLogging(LogLevel.Information)
  .build();

createApp(App)
  .use(ElementPlus)
  .use(store)
  .use(router)
  .use(VueApexCharts)
  .use(Vant)
  .mount("#app");
