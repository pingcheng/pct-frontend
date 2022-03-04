export enum LOADING_STATUS {
  LOADING,
  FAILED,
  LOADED,
}

export type ApiResponse<T> = {
  data: T;
  message: string;
};

export type PaginatedItems<T> = {
  items: T[];
  totalItems: number;
  perPage: number;
  currentPage: number;
  totalPages: number;
};

export type PaginatedApiResponse<T> = ApiResponse<PaginatedItems<T>>;
