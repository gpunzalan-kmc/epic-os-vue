import { NetworkType } from "./enum";

export interface DevicePayload {
  id: number | null;
  name: string | null;
  deviceModel: string | null;
  mac: string | null;
  ipAddress: string | null;
  floorId: number | null;
  areaId: number | null;
  buildingId: number | null;
  movementFrequency: number | null;
  tempHumidityFrequency: number | null;
  hubScanFrequency: number | null;
  hubResetAttempts: number | null;
  hubFailureLimitFailures: number | null;
  hubWorkPointListUpdate: number | null;
  configResetFrequency: number | null;
  refreshInterval: number | null;
  isActive: boolean | null;
}

export interface CreateWorkPointPayload {
  id: number | null;
  name: string | null;
  mac: string | null;
  areaId: number | null;
  buildingId: number | null;
  floorId: number | null;
  hubId: number | null;
  isActive: boolean;
  spaceType: number | null;
  model: number | null;
  locationType: number | null;
}

export interface TelemetryPayload {
  DateStart: string;
  DateEnd: string;
  AreadId: string;
}

export interface TemperaturePayload {
  DateStart: string;
  DateEnd: string;
  AreadId: string;
}

export interface AirQualityPayload {
  DateStart: string;
  DateEnd: string;
  AreadId: string;
}

export interface WorkPointPayload {
  filter: string | null;
  hubId: string | null;
  isActive: boolean | null;
  areaId: string;
  isAll: boolean | null;
  pageNumber: number | null;
  pageSize: number | null;
  sortBy: string | null;
  isAscending: boolean | null;
}

export interface WorkPointDetailsPayload {
  name: string;
  mac: string;
  areaId: number;
  hubId: number;
  isActive: boolean;
}
export interface UserPayload {
  firstName: string;
  lastName: string;
  userName: string;
  emailAddress: string;
  isActive: boolean;
}

export interface BulkLocationUpdate {
  id: number;
  coordinateX: number;
  coordinateY: number;
  coordinateZ: number;
  width: number;
  height: number;
  rotation: number;
  isActive: boolean;
  scaleX: number;
  scaleY: number;
  points: Array<{ x: number; y: number }>;
}

export interface HubBulkLocationUpdate {
  id: number;
  coordinateX: number;
  coordinateY: number;
  coordinateZ: number;
  isActive: boolean;
}

export interface NeighborhoodPayload {
  buildingId: number | null;
  floorId: number | null;
  name: string;
  floorPlanImage: string | null;
  siteImage: string | null;
  foorplanCoordinates: {
    coordinatesHeight: number;
    coordinatesLeft: number;
    coordinatesTop: number;
    coordinatesWidth: number;
    transformRotate: number;
    transformScaleX: number;
    transformScaleY: number;
    transformTranslateX: number;
    transformTranslateY: number;
    transformHeight: number;
    transformWidth: number;
  };
}

export interface HubPayload {
  buildingId: number | null;
  floorId: number | null;
  areaId: number | null;
  isActive: boolean | null;
  name: string;
  mac: string;
}

export interface ChangePasswordPayload {
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface GetLogsByWorkpoint {
  pageNumber: number;
  pageSize: number;
}
