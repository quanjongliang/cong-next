import axios from "axios";
import { API_HOST } from "environment/environment";
import { STATUS_CODES } from "http";
import { USER_KEY } from "model/auth";
import { ROUTE } from "model/route";
import { DTO, ResponseDTO } from "shared/dto/base.dto";
import { Service } from "typedi";

@Service()
export class HttpService {
  private token: string | null;

  constructor() {
   if(typeof window !== "undefined" && window.localStorage){
    this.token = localStorage.getItem(USER_KEY);
   }
    axios.interceptors.response.use(
      (response) => {
      // TODO: handle token; 
      console.log('res',response)
      const {status} = response
      if(status === 401){
        window.location.href=ROUTE.HOME
      }
      return response;
    },
    (error)=>{
      const {status} = error.response
      if(status === 401){
        window.location.href=ROUTE.HOME
        localStorage.removeItem(USER_KEY)
      }
      return error;
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
      baseURL: API_HOST ,
      url: this.replaceUrlToParam(dto.url,dto.param || {}),
      data: dto.body,
      params: dto.query,
    });
    return response.data as ResponseDTO<InstanceType<T["responseClass"]>>;
  }

  private replaceUrlToParam = (url:string,param:object):string=>{
    return Object.entries(param).reduce((newUrl,[key,value])=>newUrl.replace(":" + key.toString(),value.toString()),url)
  }
}
