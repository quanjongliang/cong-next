import { ResponseDTO } from "shared/dto/base.dto";
import { CreateImageDTO, DeleteImageByIdDTO, GetImageBannerDTO, GetImageBannerResponse } from "shared/dto/image.dto";
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

  async deleteImageById(dto:DeleteImageByIdDTO){
    return this.httpService.request(dto)
  }
}