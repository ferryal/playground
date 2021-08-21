export interface DataMap<T> {
  [key: string]: T;
}

export interface Pagination {
  limit: number;
  page: number;
  total: number;
}

export interface PaginatedDataMap<T> extends Pagination {
  data: DataMap<T>;
}

export interface PaginatedData<T> extends Pagination {
  data: T[];
}

export interface DomainBox<T> {
  hasError: boolean;
  data: DataMap<T>;
}

export interface PaginatedDomainBox<T> {
  hasError: boolean;
  data: PaginatedData<T>;
}
