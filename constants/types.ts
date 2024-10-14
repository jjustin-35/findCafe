export type ApiResponse<T = any> = {
  data?: T;
  error?: {
    error_code: string;
    message: string;
  };
};

export type ApiFunction<T = any, P = any> = (...args: P[]) => Promise<ApiResponse<T>>;
