export type ApiResponse<T = any> = {
  data?: T;
  error?: {
    error_code: string;
    message: string;
  };
};

export type ApiFunction<T = any> = (...args: any[]) => Promise<ApiResponse<T>>;
