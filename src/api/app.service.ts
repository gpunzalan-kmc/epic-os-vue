import ApiService from "@/common/api.service";
import {
  AirQualityPayload,
  BulkLocationUpdate,
  ChangePasswordPayload,
  CreateWorkPointPayload,
  DevicePayload,
  GetLogsByWorkpoint,
  HubBulkLocationUpdate,
  NeighborhoodPayload,
  TelemetryPayload,
  TemperaturePayload,
  UserPayload,
  WorkPointPayload,
} from "./payload.type";
import {
  BuldingParameters,
  GetNeighborhoods,
  HubLogParameters,
  HubParameters,
  ReportQuery,
} from "./query.types";
import {
  FloorResponse,
  HubResponse,
  MutationResponse,
  OfficeResponse,
  PaginationResponse,
  TelemetryResponse,
  UserResponse,
  WorkPointResponse,
  LogResponse,
  ERPPaginationResponse,
  NeighborhoodResponse,
  EPRPaginationV2Response,
  HeatMapResponse,
  ActivitySummary,
  ActivitySummaryPerHour,
  ActivitySummaryPerWeek,
  UtilizationResponse,
  CurrentPeakResponse,
  SpaceTypeAnalyticResponse,
  DayTimeAnalyticResponse,
  SpaceTypeResponse,
  TemperatureHumidityResponse,
  HubLogResponse,
  WorkPointByIdResponse,
  AirQualityResponse,
} from "./response.types";

export const Auth = {
  async changePassword(payload: ChangePasswordPayload) {
    ApiService.initErpApi();
    const res = await ApiService.post(`/Security/change-password`, payload);
    return res.data as { succeeded: boolean; errors: string[] };
  },
};

export const WorkPoints = {
  async get(query: WorkPointPayload) {
    ApiService.resetApiUrl();
    const res = await ApiService.query(`/workpoints`, query);
    return res.data as WorkPointResponse[];
  },
  async show(id: number) {
    ApiService.resetApiUrl();
    const res = await ApiService.get(`/workpoints`, id);
    return res.data as WorkPointByIdResponse;
  },
  async getPaginated(query: WorkPointPayload) {
    ApiService.resetApiUrl();
    const res = await ApiService.query(`/workpoints`, query);
    return res.data as ERPPaginationResponse<WorkPointResponse>;
  },
  async put(payload: { data: BulkLocationUpdate[] }) {
    ApiService.resetApiUrl();
    const res = await ApiService.put(
      `/workpoints/bulk-update/location`,
      payload
    );
    return res.data as MutationResponse;
  },
  async putDetails(payload: CreateWorkPointPayload, id: number) {
    ApiService.resetApiUrl();
    const res = await ApiService.put(`/workpoints/details/${id}`, payload);
    return res.data as MutationResponse;
  },
  async deploy(id: number) {
    ApiService.resetApiUrl();
    const res = await ApiService.put(`/workpoints/deploy/${id}`, {});
    return res.data as MutationResponse;
  },
  async merge(id: number) {
    ApiService.resetApiUrl();
    const res = await ApiService.put(`/workpoints/deploy/${id}`, {});
    return res.data as MutationResponse;
  },
  async post(payload: CreateWorkPointPayload) {
    ApiService.resetApiUrl();
    const res = await ApiService.post(`/workpoints`, payload);
    return res.data as MutationResponse;
  },
  async getSpaceTypes() {
    ApiService.resetApiUrl();
    const res = await ApiService.get(`/workpoints/space-types`);
    return res.data as SpaceTypeResponse[];
  },
  async getDeviceTypes() {
    ApiService.resetApiUrl();
    const res = await ApiService.get(`/workpoints/device-types`);
    return res.data as SpaceTypeResponse[];
  },
  async delete(id: number) {
    ApiService.resetApiUrl();
    const res = await ApiService.delete(`/workpoints/${id}`);
    return res.data as MutationResponse;
  },
  async mergeWorkpoint(parentId: number, childWorkpoint: number[]) {
    const res = await ApiService.put(
      `/workpoints/merge-workpoint/${parentId}`,
      { childWorkPoints: childWorkpoint }
    );
    return res.data as MutationResponse;
  },
  async deleteMergeWorkpoint(id: number) {
    const res = await ApiService.delete(
      `/workpoints/delete-merge-workpoint/${id}`
    );
    return res.data as MutationResponse;
  },
};

export const Neighborhood = {
  async get(query: GetNeighborhoods) {
    ApiService.resetApiUrl();
    const res = await ApiService.query(`/neighborhood`, query);

    return res.data as ERPPaginationResponse<NeighborhoodResponse>;
  },
  async show(id: string) {
    ApiService.resetApiUrl();
    const res = await ApiService.get(`/neighborhood`, id);

    return res.data as NeighborhoodResponse;
  },
  async showByFloor(id: number) {
    ApiService.initErpApi();
    const res = await ApiService.get(`/Buildings/floors/${id}/neighborhood`);
    ApiService.resetApiUrl();
    return res.data as NeighborhoodResponse[];
  },
  async post(payload: NeighborhoodPayload) {
    ApiService.resetApiUrl();
    const res = await ApiService.post(`/neighborhood`, payload);
    return res.data;
  },
  async put(payload: NeighborhoodPayload, id: number) {
    ApiService.resetApiUrl();
    const res = await ApiService.put(`/neighborhood/${id}`, payload);

    return res.data;
  },
  async delete(id: number) {
    ApiService.initErpApi();
    const res = await ApiService.delete(`/Buildings/neighborhood/${id}`);
    ApiService.resetApiUrl();
    return res.data;
  },
};

export const Hubs = {
  async get(payload: HubParameters) {
    ApiService.resetApiUrl();
    const res = await ApiService.query(`/hubs`, payload);
    return res.data as HubResponse[];
  },
  async post(payload: DevicePayload) {
    ApiService.resetApiUrl();
    const res = await ApiService.post(`/hubs`, payload);
    return res.data;
  },
  async put(payload: DevicePayload, id: number) {
    ApiService.resetApiUrl();
    const res = await ApiService.put(`/hubs/${id}`, payload);
    return res.data as MutationResponse;
  },
  async delete(id: number) {
    ApiService.resetApiUrl();
    const res = await ApiService.delete(`/hubs/${id}`);
    return res.data as MutationResponse;
  },
  async putBulk(payload: { data: HubBulkLocationUpdate[] }) {
    ApiService.resetApiUrl();
    const res = await ApiService.put(`/hubs/bulk-update/location`, payload);
    return res.data as MutationResponse;
  },
  async getLog(payload: HubLogParameters) {
    ApiService.resetApiUrl();
    const res = await ApiService.query(`/telemerylog/hub-logs`, payload);
    return res.data as ERPPaginationResponse<HubLogResponse>;
  },
};

export const Floor = {
  async get(query: Record<string, string | null>) {
    const res = await ApiService.query(`/floor`, query);
    return res.data as PaginationResponse<FloorResponse>;
  },
  async show(buildingId: number) {
    ApiService.initErpApi();
    const res = await ApiService.get(`/Buildings/${buildingId}/floors`);
    return res.data as FloorResponse;
  },
  async create(payload: FloorResponse) {
    const res = await ApiService.post(`/floor`, payload);
    return res.data as MutationResponse;
  },
  async update(payload: FloorResponse, id: number) {
    const res = await ApiService.put(`/floor/${id}`, payload);
    return res.data as MutationResponse;
  },
};
export const Sites = {
  async get(query: BuldingParameters) {
    ApiService.initErpApi();
    const res = await ApiService.query(`/Buildings`, query, 1);
    ApiService.resetApiUrl();
    return res.data as EPRPaginationV2Response<OfficeResponse>;
  },
  async show(id: number) {
    ApiService.initErpApi();
    const res = await ApiService.get(`/Buildings/${id}/floors`);
    ApiService.resetApiUrl();
    return res.data as FloorResponse;
  },
};
export const Users = {
  async get(query: Record<string, string | null>) {
    const res = await ApiService.query(`/users`, query);
    return res.data as PaginationResponse<UserResponse>;
  },
  async post(payload: UserPayload) {
    const res = await ApiService.post(`/users`, payload);
    return res.data as MutationResponse;
  },
  async put(payload: UserPayload, id: number) {
    const res = await ApiService.put(`/users/${id}`, payload);
    return res.data as MutationResponse;
  },
};
export const Telemetry = {
  async getByAreaId(areadId: string) {
    ApiService.resetApiUrl();
    const res = await ApiService.query(`/telemerylog`, {
      AreadId: areadId,
    });
    return res.data as Array<TelemetryResponse>;
  },

  async get(payload: TelemetryPayload) {
    ApiService.resetApiUrl();
    const res = await ApiService.query(`/telemerylog`, payload);
    return res.data as Array<TelemetryResponse>;
  },

  async getLogs(payload: Record<string, unknown>) {
    ApiService.resetApiUrl();
    const res = await ApiService.query(`/telemery/log`, payload);
    return res.data as PaginationResponse<LogResponse>;
  },
  async getLogsByWorkpoint(payload: GetLogsByWorkpoint, id: number) {
    ApiService.resetApiUrl();
    const res = await ApiService.query(
      `/telemerylog/by-workpoint/${id}`,
      payload
    );
    return res.data as ERPPaginationResponse<TelemetryResponse>;
  },
};

export const Temperature = {
  async get(payload: TemperaturePayload) {
    ApiService.resetApiUrl();
    const res = await ApiService.query(`/temperature-humidity`, payload);
    return res.data as TemperatureHumidityResponse;
  },
};

export const AirQuality = {
  async get(payload: AirQualityPayload) {
    ApiService.resetApiUrl();
    const res = await ApiService.query(`/air-quality`, payload);
    return res.data as AirQualityResponse;
  },
};

export const Analytics = {
  async getDailySummary(query: ReportQuery) {
    ApiService.resetApiUrl();
    const res = await ApiService.query(`/analytics/activity-summary`, query);
    return res.data as ActivitySummary[];
  },
  async getHourSummary(query: ReportQuery) {
    ApiService.resetApiUrl();
    const res = await ApiService.query(`/analytics/overall-per-hour`, query);
    return res.data as ActivitySummaryPerHour[];
  },
  async getWeekSummary(query: ReportQuery) {
    ApiService.resetApiUrl();
    const res = await ApiService.query(`/analytics/overall-per-weekday`, query);
    return res.data as ActivitySummaryPerWeek[];
  },
  async getUtilization(query: ReportQuery) {
    ApiService.resetApiUrl();
    const res = await ApiService.query(`/analytics/utilization`, query);
    return res.data as UtilizationResponse[];
  },
  async getCurrentPeak(areaId: string) {
    ApiService.resetApiUrl();
    const res = await ApiService.query(`/analytics/current-peak`, {
      areaId: areaId,
    });
    return res.data as CurrentPeakResponse;
  },
  async getSpaceType(query: ReportQuery) {
    ApiService.resetApiUrl();
    const res = await ApiService.query(`/analytics/spacetype-metrics`, query);
    return res.data as SpaceTypeAnalyticResponse[];
  },
  async getDayTime(query: ReportQuery) {
    ApiService.resetApiUrl();
    const res = await ApiService.query(`/analytics/overall-daytime`, query);
    return res.data as DayTimeAnalyticResponse;
  },
  async getHeatLogs(payload: TelemetryPayload) {
    ApiService.resetApiUrl();
    const res = await ApiService.query(`/analytics/heat-map`, payload);
    return res.data as Array<HeatMapResponse>;
  },
};
