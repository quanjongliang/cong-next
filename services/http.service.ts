import axios from "axios";
import { API_HOST } from "environment/environment";
import { USER_KEY } from "model/auth";
import { DTO, ResponseDTO } from "shared/dto/base.dto";
import { Service } from "typedi";

@Service()
export class HttpService {
  private token: string | null;

  constructor() {
    this.token = localStorage.getItem(USER_KEY);
    axios.interceptors.response.use((response) => {
      // TODO: handle token;
      return response;
    });
  }

  public get tokenInfo(): string {
    return this.token && JSON.parse(this.token);
  }

  public async request<T extends DTO>(
    dto: T
  ): Promise<ResponseDTO<InstanceType<T["responseClass"]>>> {
    const response = await axios({
      method: dto.method,
      headers: { Authorization: "Bearer " + this.token },
      baseURL: API_HOST,
      url: dto.url,
      data: dto.body,
      params: dto.query,
    });
    return response.data as ResponseDTO<InstanceType<T["responseClass"]>>;
  }
}
