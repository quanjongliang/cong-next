import { PaginationMeta } from "./layout";

export interface IOption<D> {
	key: D;
	value: string;
}

export interface IResponsePagination<T>{
	meta: PaginationMeta,
	data: T[]
}

export interface FormItem<T extends object>{
	id:keyof T
	label:string
    havePasswordHandle?: boolean;
}