import { METHOD } from "model/http";
import { Image, IMAGE_URL } from "model/image";
import { DTO, EmptyResponse } from "./base.dto";

export class GetImageBannerResponse{
    data:Image[]
}

export class IImageBody{
    data:Image[]
}

export class CreateImageDTO extends DTO {
    public url = IMAGE_URL.IMAGE;
    public method = METHOD.POST;
    body: IImageBody;
    public readonly responseClass = EmptyResponse;
    public query: undefined;
    public param:undefined;
    constructor(data:IImageBody) {
      super();
      this.body = data
    }
  }

  export class GetImageBannerDTO extends DTO{
    public url = IMAGE_URL.IMAGE;
    public method = METHOD.GET;
    body: undefined;
    public readonly responseClass = GetImageBannerResponse;
    public query: undefined;
    public param:undefined;
    constructor() {
      super();
    }
  }