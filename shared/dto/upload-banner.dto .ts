import { BANNER_API } from "model/banner";
import { METHOD } from "../../model/http";
import { DTO, EmptyResponse } from "./base.dto";


export class GetBannerResponse{
  data:{url:string
    original_filename:string
    public_id:string}[]
}

export class UploadOneBannerDTO extends DTO {
  public url = BANNER_API.CLOUNDINARY_BANNER;
  public method = METHOD.POST;
  body: FormData;
  public readonly responseClass = EmptyResponse;
  public query: undefined;
  public param:undefined;
  constructor(data:FormData) {
    super();
    this.body = data
  }
}

export class UploadBannerDTO extends DTO {
  public url = BANNER_API.CLOUNDINARY;
  public method = METHOD.POST;
  body: FormData;
  public readonly responseClass = EmptyResponse;
  public query: undefined;
  public param:undefined;
  constructor(data:FormData) {
    super();
    this.body = data
  }
}

export class GetBannerDTO extends DTO{
  public url = BANNER_API.CLOUNDINARY;
  public method = METHOD.GET;
  body: undefined;
  public readonly responseClass = GetBannerResponse;
  public query: undefined;
  public param:undefined;
  constructor() {
    super();
  }
}