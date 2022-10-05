import { DTO, EmptyResponse } from "./base.dto";
import { METHOD } from "../../model/http";
import { AUTH_API } from "model/auth";
import { LoginResponse } from "./login.dto";

export interface IConfirmUserDTOParam {
  token:string
}


export class ConfirmUserDTO extends DTO {
  public url = AUTH_API.CONFIRM;
  public method = METHOD.POST;
  body: null;
  public readonly responseClass = EmptyResponse;
  public query: undefined;
  public param:IConfirmUserDTOParam;
  constructor(param: IConfirmUserDTOParam) {
    super();
    this.param = param;
  }
}
