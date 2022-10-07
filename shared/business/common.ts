import { AxiosError } from "axios";
import { PaginationMeta } from "model/layout";

export enum ORDER {
	ASC= "asc",
	DESC= "desc",
}

export interface IResponsePagination<T>{
	data:T[],
	meta: PaginationMeta
}

export interface IErrorResponse extends AxiosError{
}

