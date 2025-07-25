export class ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: any;
  meta?: any;

  constructor(success: boolean, message: string, data?: T, error?: any, meta?: any) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.error = error;
    this.meta = meta;
  }

  static success<T>(data: T, message = 'Success', meta?: any): ApiResponse<T> {
    return new ApiResponse<T>(true, message, data, null, meta);
  }

  static error<T>(message = 'Error', error?: any, meta?: any): ApiResponse<T> {
    return new ApiResponse<T>(false, message, undefined, error, meta);
  }
}