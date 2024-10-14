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
