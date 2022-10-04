import { PaginationMeta } from "./layout";

export interface IOption<D> {
	key: D;
	value: string;
}

export interface IResponsePagination<T>{
	meta: PaginationMeta,
	data: T[]
}