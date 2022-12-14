import { EmptyResponse, ResponseDTO } from "shared/dto/base.dto";
import { GetBannerDTO, GetBannerResponse, UploadBannerDTO, UploadOneBannerDTO } from "shared/dto/upload-banner.dto ";
import Container, { Service } from "typedi";
import { HttpService } from "./http.service";

@Service()
export class CloundinaryService{
    private httpService = Container.get(HttpService)

  async uploadBanner(dto:UploadBannerDTO){
    return this.httpService.request(dto)
  }

  async uploadOneBanner(dto:UploadOneBannerDTO){
    return this.httpService.request(dto)
  }

  async getBanner(dto:GetBannerDTO):Promise<ResponseDTO<GetBannerResponse>>{
    return this.httpService.request(dto)
  }
}