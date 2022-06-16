export interface GetNeighborhoods {
  [key: string]: any;
  filter: string | null;
  pageNumber: number;
  pageSize: number;
  sortBy: string;
  isAscending: boolean;
  view: string;
}

export interface BuldingParameters {
  pageNumber: number;
  pageSize: number;
}

export interface HubParameters {
  floorId: number | null;
  filter: string | null;
  areaId: string | null;
  isActive: boolean | null;
}

export interface ReportQuery {
  dateStart: string;
  dateEnd: string;
  areaId: string;
}

export interface HubLogParameters {
  dateStart: string | null;
  dateEnd: string | null;
  hubId: number;
  pageNumber: number;
  pageSize: number;
  sortBy: string;
  isAscending: boolean;
}
