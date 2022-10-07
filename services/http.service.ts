import axios, { AxiosError } from "axios";
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
      const {status} = response
      const isError = response instanceof AxiosError
      if(isError && status ===401){
        window.location.href=ROUTE.HOME
      } 
      if(isError){
        throw response 
      }
      return response;
    },
    (error)=>{
      const {status} = error.response
      if(status === 401){
        window.location.href=ROUTE.HOME
        localStorage.removeItem(USER_KEY)
      }
      return Promise.reject(error);
    });
  }

  public async request<T extends DTO>(
    dto: T
  ): Promise<ResponseDTO<InstanceType<T["responseClass"]>>> {
    const response = await axios({
      method: dto.method,
      headers: { Authorization: "Bearer " + this.token },
      baseURL: API_HOST ,
      url: `${this.replaceUrlToParam(dto.url,dto.param || {})}`,
      data: dto.body,
      params: dto.query,
    });
    if(response instanceof AxiosError) {
      throw response
    }

    return response.data as ResponseDTO<InstanceType<T["responseClass"]>>;
   
  }

  private replaceUrlToParam = (url:string,param:object):string=>{
    return Object.entries(param).reduce((newUrl,[key,value])=>newUrl.replace(":" + key.toString(),value.toString()),url)
  }
  private queryToUrl = (query?:Record<string,string>):string=>{
    if(!query) return ""
    return `?${new URLSearchParams(query).toString()}`

  }
}
