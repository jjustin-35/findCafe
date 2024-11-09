type ErrorResponse = {
  error?: {
    error_code: string;
    message: string;
  };
};

type SuccessResponse<T> = {
  data?: T;
};

type ApiResponse<T> = SuccessResponse<T> & ErrorResponse;

export type ApiFunction<ReturnValue = any, Parameter extends Record<string, any> = {}> = (
  data: Parameter,
) => Promise<ApiResponse<ReturnValue>>;

export type DistrictData = {
  zip: string;
  name: string;
};

export type AreaData = {
  name: string;
  districts: DistrictData[];
};

export enum CafeAdvantage {
  SEAT = 'SEAT',
  UNLIMITED = 'UNLIMITED',
  WIFI = 'WIFI',
  HAVE_SOCKET = 'HAVE_SOCKET',
  ATMOSPHERE = 'ATMOSPHERE',
  STUDY = 'STUDY',
  OPEN = 'OPEN',
}

export type SearchCafesData = {
  area?: string;
  district?: string;
  location?: string;
  keyword?: string;
  rank?: number;
  advantages?: CafeAdvantage[];
};

export type ImageData = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};
