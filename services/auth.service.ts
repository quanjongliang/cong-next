import { AxiosError } from "axios";
import { EmptyResponse, ResponseDTO } from "shared/dto/base.dto";
import { ConfirmUserDTO } from "shared/dto/confirm-user.dto";
import { UserInfoDTO } from "shared/dto/get-user-info.dto";
import { LoginDTO, LoginResponse } from "shared/dto/login.dto";
import { RegisterDTO } from "shared/dto/register.dto";
import Container, { Service } from "typedi";
import { HttpService } from "./http.service";

@Service()
export class AuthService{
    private httpService = Container.get(HttpService)

    async login(dto: LoginDTO):Promise<ResponseDTO<LoginResponse>>{
            return this.httpService.request(dto)
    }

    async register(dto:RegisterDTO):Promise<ResponseDTO<EmptyResponse>>{
        return this.httpService.request(dto)
    }

    async confirmUser(dto:ConfirmUserDTO){
        return this.httpService.request(dto)
    }

    async getUserInfo(){
        return this.httpService.request(new UserInfoDTO)
    }
}