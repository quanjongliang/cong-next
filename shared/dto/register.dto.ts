import { DTO, EmptyResponse } from "./base.dto";
import { METHOD } from "../../model/http";
import { AUTH_API } from "model/auth";

export interface IRegisterBody {
  username: string;
  firstName:string;
  lastName:string;
  phoneNumber:string;
  email:string;
  password: string;
  confirmPassword:string
}



export class RegisterDTO extends DTO {
  public url = AUTH_API.REGISTER;
  public method = METHOD.POST;
  body: IRegisterBody;
  public readonly responseClass = EmptyResponse;
  public query: undefined;
  public param:undefined;
  constructor(body: IRegisterBody) {
    super();
    this.body = body;
  }
}
