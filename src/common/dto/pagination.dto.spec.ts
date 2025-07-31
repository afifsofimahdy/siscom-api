import { PaginationDto } from './pagination.dto';

describe('PaginationDto', () => {
  describe('default values', () => {
    it('should have default values when not provided', () => {
      const paginationDto = new PaginationDto();
      
      expect(paginationDto.page).toBe(1);
      expect(paginationDto.limit).toBe(10);
    });

    it('should use provided values when specified', () => {
      const paginationDto = new PaginationDto();
      paginationDto.page = 2;
      paginationDto.limit = 20;
      
      expect(paginationDto.page).toBe(2);
      expect(paginationDto.limit).toBe(20);
    });
  });

  describe('skip getter', () => {
    it('should calculate skip correctly with default values', () => {
      const paginationDto = new PaginationDto();
      
      expect(paginationDto.skip).toBe(0); // (1-1) * 10 = 0
    });

    it('should calculate skip correctly with custom values', () => {
      const paginationDto = new PaginationDto();
      paginationDto.page = 3;
      paginationDto.limit = 15;
      
      expect(paginationDto.skip).toBe(30); // (3-1) * 15 = 30
    });

    it('should handle null or undefined values', () => {
      const paginationDto = new PaginationDto();
      // @ts-ignore - Testing null case
      paginationDto.page = null;
      // @ts-ignore - Testing null case
      paginationDto.limit = null;
      
      expect(paginationDto.skip).toBe(0); // (1-1) * 10 = 0, using defaults
    });
  });
});