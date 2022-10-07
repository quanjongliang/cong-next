import { ResponseDTO } from "shared/dto/base.dto";
import { CreateImageDTO, GetImageBannerDTO, GetImageBannerResponse } from "shared/dto/image.dto";
import { GetBannerDTO, GetBannerResponse, UploadBannerDTO, UploadOneBannerDTO } from "shared/dto/upload-banner.dto ";
import Container, { Service } from "typedi";
import { HttpService } from "./http.service";

@Service()
export class ImageService{
    private httpService = Container.get(HttpService)

  async uploadImage(dto:CreateImageDTO){
    return this.httpService.request(dto)
  }

  async getBanner(dto:GetImageBannerDTO):Promise<ResponseDTO<GetImageBannerResponse>>{
    return this.httpService.request(dto)
  }
}