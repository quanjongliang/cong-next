import { CreateUpdateCategoryDTO, GetCategoryDTO } from "shared/dto/category.dto";
import Container, { Service } from "typedi";
import { HttpService } from "./http.service";

@Service()
export class CategoryService {
  private httpService = Container.get(HttpService);

  async getAllCategory(dto: GetCategoryDTO){
    return this.httpService.request(dto)
  }

  async createUpdateCategory(dto:CreateUpdateCategoryDTO){
    return this.httpService.request(dto)
  }

}
