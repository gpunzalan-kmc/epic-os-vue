import { HubResponse, WorkPointResponse } from "@/api/response.types";
import { PeakChartData } from "@/common/types";
import { WorkPoint } from "@/components/floorplan/types";
import { Vue } from "vue-class-component";

export type VForm = Vue & {
  clearFiles: () => void;
  sliceAttachments: () => void;
  validate: () => Promise<Record<string, unknown>>;
  resetValidation: () => boolean;
  reset: () => void;
  fetchWorkPoints: () => void;
  query: string;
  submit: () => void;
  changesDetected: number[];
  addWorkPoint: (payload: WorkPoint) => void;
  saveWorkPoint: (payload: WorkPointResponse) => void;
  mutateSide: (action: boolean) => void;
  mutateOpen: (action: boolean) => void;
  mutateHubSide: (action: boolean, event: HubResponse | undefined) => void;
  mutateWorkPointSide: (
    action: boolean,
    event: WorkPointResponse | undefined
  ) => void;
  render: () => void;
  getHeatMap: () => void;
  fetchChartData: () => void;
  reloadCharts: () => void;
  updateSeries: (
    event:
      | Array<{ name: string; data: Array<number> | Array<PeakChartData> }>
      | Array<{ name: string; data: Array<number>; colors: string[] }>
      | Array<number>
  ) => void;
  updateOptions: (event: any) => void;
  setCoordinates: (event: {
    width: number;
    height: number;
    left: number;
    top: number;
  }) => void;
  rotate: (event: number) => void;
  flip: (x: boolean, y: boolean) => void;
  zoom: (x: number) => void;
  mountWorkpoint: () => void;
};
