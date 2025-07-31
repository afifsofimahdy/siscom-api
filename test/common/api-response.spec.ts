import { ApiResponse } from '../../src/common/response/api-response';

describe('ApiResponse', () => {
  describe('success', () => {
    it('should create a success response with data', () => {
      const data = { id: 1, name: 'Test' };
      const message = 'Success message';
      const response = ApiResponse.success(data, message);

      expect(response).toBeInstanceOf(ApiResponse);
      expect(response.success).toBe(true);
      expect(response.message).toBe(message);
      expect(response.data).toEqual(data);
      expect(response.error).toBeNull();
      expect(response.meta).toBeUndefined();
    });

    it('should create a success response with data and meta', () => {
      const data = { id: 1, name: 'Test' };
      const message = 'Success message';
      const meta = { total: 1, page: 1 };
      const response = ApiResponse.success(data, message, meta);

      expect(response).toBeInstanceOf(ApiResponse);
      expect(response.success).toBe(true);
      expect(response.message).toBe(message);
      expect(response.data).toEqual(data);
      expect(response.error).toBeNull();
      expect(response.meta).toEqual(meta);
    });

    it('should use default message if not provided', () => {
      const data = { id: 1, name: 'Test' };
      const response = ApiResponse.success(data);

      expect(response).toBeInstanceOf(ApiResponse);
      expect(response.success).toBe(true);
      expect(response.message).toBe('Success');
      expect(response.data).toEqual(data);
      expect(response.error).toBeNull();
    });
  });

  describe('error', () => {
    it('should create an error response with error details', () => {
      const message = 'Error message';
      const error = { code: 'E001', details: 'Something went wrong' };
      const response = ApiResponse.error(message, error);

      expect(response).toBeInstanceOf(ApiResponse);
      expect(response.success).toBe(false);
      expect(response.message).toBe(message);
      expect(response.data).toBeUndefined();
      expect(response.error).toEqual(error);
      expect(response.meta).toBeUndefined();
    });

    it('should create an error response with error details and meta', () => {
      const message = 'Error message';
      const error = { code: 'E001', details: 'Something went wrong' };
      const meta = { timestamp: new Date() };
      const response = ApiResponse.error(message, error, meta);

      expect(response).toBeInstanceOf(ApiResponse);
      expect(response.success).toBe(false);
      expect(response.message).toBe(message);
      expect(response.data).toBeUndefined();
      expect(response.error).toEqual(error);
      expect(response.meta).toEqual(meta);
    });

    it('should use default message if not provided', () => {
      const error = { code: 'E001', details: 'Something went wrong' };
      const response = ApiResponse.error(undefined, error);

      expect(response).toBeInstanceOf(ApiResponse);
      expect(response.success).toBe(false);
      expect(response.message).toBe('Error');
      expect(response.data).toBeUndefined();
      expect(response.error).toEqual(error);
    });
  });

  describe('constructor', () => {
    it('should create an instance with all properties', () => {
      const success = true;
      const message = 'Test message';
      const data = { id: 1, name: 'Test' };
      const error = null;
      const meta = { total: 1 };

      const response = new ApiResponse(success, message, data, error, meta);

      expect(response.success).toBe(success);
      expect(response.message).toBe(message);
      expect(response.data).toEqual(data);
      expect(response.error).toBeNull();
      expect(response.meta).toEqual(meta);
    });
  });
});