type ErrorResponse = {
  error?: {
    error_code: string;
    message: string;
  };
};

type SuccessResponse<T> = {
  data?: T;
};

export type ApiResponse<T> = SuccessResponse<T> & ErrorResponse;

export type ApiFunctionWithoutParams<R = any> = () => Promise<ApiResponse<R>>;
export type ApiFunctionWithParams<P = any, R = any> = (params?: P) => Promise<ApiResponse<R>>;
export type ApiFunction<P = void, R = any> = P extends void ? ApiFunctionWithoutParams<R> : ApiFunctionWithParams<P, R>;

export enum Status {
  IDLE = 'idle',
  PENDING = 'pending',
  FULFILLED = 'fulfilled',
}

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
  areaKey?: string;
  district?: string;
  location?: string;
  position?: Omit<Position, 'info'>;
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

export type ApiCafeData = {
  id: string;
  name: string;
  city: string;
  wifi: number;
  seat: number;
  quiet: number;
  tasty: number;
  cheap: number;
  music: number;
  url: string;
  address: string;
  latitude: string;
  longitude: string;
  limited_time: 'yes' | 'no';
  socket: 'yes' | 'no';
  standing_desk: 'yes' | 'no';
  mrt: string;
  open_time: string;
};

export type CafeData = Omit<ApiCafeData, 'latitude' | 'longitude'> & {
  images?: ImageData[];
  cafeRank: number;
  latitude: number;
  longitude: number;
};

export type Position = {
  lat: number;
  lng: number;
  info?: CafeData;
};
