import { DTO } from "./base.dto";
import { METHOD } from "../../model/http";
import { USER_ROLE } from "shared/business/user";
import { AUTH_API } from "model/auth";

export interface ILoginBody {
  username: string;
  password: string;
  role?: USER_ROLE;
}

export class LoginResponse {
  constructor(public accessToken: string) {}
}

export class LoginDTO extends DTO {
  public url = AUTH_API.LOGIN;
  public method = METHOD.POST;
  body: ILoginBody;
  public readonly responseClass = LoginResponse;
  public param:undefined;
  public query: undefined;
  constructor(body: ILoginBody) {
    super();
    this.body = body;
  }
}
