import { FileStackUploadResponse } from "@/api/response.types";

export interface NewDragResize {
  width: number;
  height: number;
  top: number;
  left: number;
}
export interface ChartData {
  labels: string[];
  datasets: Array<{
    name: string;
    colors: string[];
    data: number[];
  }>;
}

export interface PeakChartData {
  x: string;
  y: number;
  goals: Array<{ name: string; value: number; color: string }>;
}

export interface CropImageResponse {
  coordinates: {
    height: number;
    left: number;
    top: number;
    width: number;
  };
  image: {
    height: number;
    width: number;
    src: string;
    transforms: {
      rotate: number;
      scaleX: number;
      scaleY: number;
      translateX: number;
      translateY: number;
    };
  };
}

export interface AttachFileResponse<T> {
  name: string;
  percentage: number;
  response: T;
  size: number;
  status: string;
  uid: number;
}

export interface BeforeUploadType {
  name: string;
  size: number;
  type: string;
}
