import { NetworkType } from "./enum";

export interface PaginationResponse<T> {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
  statusCode: number;
  data: Array<T>;
  succeeded: boolean;
  errors: string;
  message: string;
}

export interface ERPPaginationResponse<T> {
  items: Array<T>;
  pageIndex: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface EPRPaginationV2Response<T> {
  data: Array<T>;
  paging: {
    pageNo: number;
    pageSize: number;
    pageCount: number;
    totalRecordCount: number;
  };
}

export interface NeighborhoodResponse {
  id: number;
  name: string;
  floorId: number;
  buildingId: number;
  floorName: string;
  buildingName: string;
  floorPlanImage: string;
  siteImage: string;
  occupancyRate: number;
  meetingRoomsActive: number;
  meetingRoomsTotal: number;
  temperature: number;
  humidity: number;
  airQuality: number;
  floorplanCoordinates: FloorplanCoordinatesResponse;
}

export interface FloorplanCoordinatesResponse {
  coordinatesHeight: 0;
  coordinatesLeft: 0;
  coordinatesTop: 0;
  coordinatesWidth: 0;
  transformHeight: 0;
  transformRotate: 0;
  transformScaleX: 0;
  transformScaleY: 0;
  transformTranslateX: 0;
  transformTranslateY: 0;
  transformWidth: 0;
}

export interface WorkPointResponse {
  id: number;
  name: string;
  mac: string;
  coordinateX: number;
  coordinateY: number;
  coordinateZ: number;
  scaleY: number;
  scaleX: number;
  width: number;
  height: number;
  rotation: number;
  areaId: number;
  hubId: number;
  isNotDetected: boolean;
  coordinatePoints: Array<{ x: number; y: number }>;
  hub: {
    id: number;
    name: string;
    deviceModel: string;
    mac: string;
    ipAddress: string;
  };
  isActive: boolean;
  locationType: number;
  spaceType: number;
  model: number;
  lastActivity: Date;
  mergedWorkpoints: MergeWorkPoints[];
}

export interface MergeWorkPoints {
  id: number;
  childWorkPointId: number;
  name: string;
  mac: string;
}

export interface WorkPointByIdResponse extends WorkPointResponse {
  area: {
    id: number;
    name: string;
    floorId: number;
    buildingId: number;
    buildingName: string;
    floorName: string;
    floorPlanImage: string;
    siteImage: string;
    floorplanCoordinates: FloorplanCoordinatesResponse;
  };
}

export interface HubLogResponse {
  id: number;
  dateCreated: string;
  hubId: number;
  message: string;
}
export interface HubResponse {
  id: number;
  name: string;
  deviceModel: string;
  mac: string;
  ipAddress: string;
  floorId: number;
  areaId: number;
  coordinateX: number;
  coordinateY: number;
  coordinateZ: number;
  isActive: boolean;
  floor: {
    floorID: number;
    buildingID: number;
    building: string;
    name: string;
    isActive: boolean;
  };
  hubConfiguration: {
    movementFrequency: number;
    tempHumidityFrequency: number;
    hubScanFrequency: number;
    hubResetAttempts: number;
    hubFailureLimitFailures: number;
    hubWorkPointListUpdate: number;
    configResetFrequency: number;
    refreshInterval: number;
    xs;
  };
}

export interface FloorResponse {
  floors: Array<{
    floorID: number;
    buildingId: number;
    building: string;
    name: string;
    isActive: boolean;
  }>;
}

export interface OfficeResponse {
  builingID: number;
  name: string;
  line1: string;
  hubCount: number;
  workPointCount: number;
  floorCount: number;
}

export interface MutationResponse {
  message: string;
  success: boolean;
}
export interface DeviceResponse {
  id: number;
  mac: string;
  name: string;
  iPaddress: string;
  isActive: boolean;
  officeID: number;
  floorID: number | null;
  hubID: number | null;
  locationType: number;
}
export interface TelemetryResponse {
  id: number;
  mac: string;
  ipAddress: string;
  dateCreated: Date;
  battery: boolean;
  locationType: number;
  hubID: number;
  workPointId: number;
  isActive: boolean;
  isDeleted: boolean;
}

export interface TemperatureHumidityResponse {
  id: number;
  mac: string;
  hubId: number;
  dateCreated: string;
  temperature: number;
  humidity: number;
  pressure: number;
  gasResistance: number;
  iaqValue: number;
}

export interface AirQualityResponse {
  id: number;
  mac: string;
  hubId: number;
  dateCreated: string;
  temperature: number;
  humidity: number;
  pressure: number;
  gasResistance: number;
  iaqValue: number;
}

export interface HeatMapResponse {
  workPointId: number;
  x: number;
  y: number;
  value: number;
}
export interface LogResponse {
  id: number;
  dateCreated: Date;
  mac: string;
  iPaddress: string;
  message: string;
  isDeleted: boolean;
}
export interface UserResponse {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  emailAddress: string;
  isActive: boolean;
  isDeleted: boolean;
}

export interface SecurityResponse {
  message: string;
  succeeded: boolean;
  token: string;
  user: {
    claims: Array<SecurityClaims>;
    clientCode: string;
    clientId: number;
    email: string;
    emailConfirmed: boolean;
    firstName: string;
    isInitialLogIn: boolean;
    lastName: string;
    userId: string;
  };
}

export interface SecurityClaims {
  type: string;
  value: string;
}

export interface ActivitySummary {
  date: string;
  summaryPerHour: ActivitySummaryPerHour[];
}
export interface ActivitySummaryPerHour {
  hour: number;
  rate: number;
}
export interface ActivitySummaryPerWeek {
  week: string;
  rate: number;
}
export interface UtilizationResponse {
  date: string;
  average: number;
  peak: number;
}
export interface CurrentPeakResponse {
  date: string;
  peakRate: number;
}
export interface SpaceTypeAnalyticResponse {
  spaceType: string;
  rate: number;
}
export interface DayTimeAnalyticResponse {
  beforeNoonRate: number;
  afterNoonRate: number;
}

export interface SpaceTypeResponse {
  id: number;
  value: string;
}

export interface FileStackUploadResponse {
  filename: string;
  size: number;
  type: string;
  url: string;
}
