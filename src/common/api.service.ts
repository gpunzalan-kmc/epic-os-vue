import { createApp } from "vue";
import axios, { AxiosResponse } from "axios";
import VueAxios from "vue-axios";
import JwtService from "@/common/jwt.service";
import { API_URL, ERP_API_URL } from "@/common/config";

const app = createApp({});

const ApiService = {
  init(): void {
    app.use(VueAxios, axios);
    app.axios.defaults.baseURL = API_URL;
    axios.defaults.withCredentials = true;
  },

  initErpApi(): void {
    app.axios.defaults.baseURL = ERP_API_URL;
    axios.defaults.withCredentials = true;
  },

  resetApiUrl(): void {
    app.axios.defaults.baseURL = API_URL;
  },

  setHeader(): void {
    app.axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${JwtService.getToken()}`;
  },
  setCredentials() {
    axios.defaults.withCredentials = true;
  },
  get(
    resource: string,
    slug: string | number | undefined = "",
    version = null as number | null
  ): Promise<AxiosResponse<unknown>> {
    let params = "";
    if (slug) params = `/${slug}`;
    return app.axios
      .get(`${resource}${params}`, { headers: { "X-Version": version } })
      .catch((error) => {
        throw new Error(`[RWV] ApiService ${error}`);
      });
  },
  delete(
    resource: string,
    slug: string | number | undefined = "",
    version = null as number | null
  ): Promise<AxiosResponse<unknown>> {
    let params = "";
    if (slug) params = `/${slug}`;
    return app.axios
      .delete(`${resource}${params}`, { headers: { "X-Version": version } })
      .catch((error) => {
        throw new Error(`[RWV] ApiService ${error}`);
      });
  },
  query(
    resource: string,
    params: unknown,
    version = null as number | null
  ): Promise<AxiosResponse<unknown>> {
    return app.axios
      .get(resource, { params: params, headers: { "X-Version": version } })
      .catch((error) => {
        throw new Error(`[RWV] ApiService ${error}`);
      });
  },

  post(
    resource: string,
    params: unknown,
    version = null as number | null
  ): Promise<AxiosResponse<unknown>> {
    return app.axios.post(`${resource}`, params, {
      headers: { "X-Version": version },
    });
  },

  put(resource: string, params: unknown): Promise<AxiosResponse<unknown>> {
    return app.axios.put(`${resource}`, params);
  },
  upload(resource: string, params: FormData): Promise<AxiosResponse<unknown>> {
    return app.axios.post(`${resource}`, params);
  },
};

export default ApiService;
