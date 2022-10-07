import { AUTH_API } from "model/auth";
import { Category, CATEGORY_API } from "model/category";
import { IResponsePagination } from "model/common";
import { PaginationOption } from "model/layout";
import { METHOD } from "../../model/http";
import { DTO, EmptyResponse } from "./base.dto";

export interface IGetCategoryParam extends PaginationOption{
  parentId?:string
}

export class GetCategoryResponse {
  constructor(public data: IResponsePagination<Category>) {}
}

export class CreateUpdateCategoryResponse{
  constructor(public data: Category) {}

}

export class GetCategoryDTO extends DTO {
  public url = CATEGORY_API.CATEGORY;
  public method = METHOD.GET;
  body: undefined;
  public readonly responseClass = GetCategoryResponse;
  public param:undefined;
  public query: IGetCategoryParam;
  constructor(query?: IGetCategoryParam) {
    super();
    if(query){
      this.query = query;
    }
  }
}

export class CreateUpdateCategoryDTO extends DTO {
  public url = CATEGORY_API.CATEGORY;
  public method = METHOD.POST;
  body: Partial<Category>;
  public readonly responseClass = CreateUpdateCategoryResponse;
  public param:undefined;
  public query: undefined;
  constructor(body:  Partial<Category>) {
    super();
   this.body = body;
  }
}
