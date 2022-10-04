import { DTO } from "./base.dto";
import { METHOD } from "../../model/http";
import { USER_ROLE } from "shared/business/user";

export interface ILoginBody {
  email: string;
  password: string;
  role?: USER_ROLE;
}

export class LoginResponse {
  constructor(public access_token: string) {}
}

export class LoginDTO extends DTO {
  public url = "/v1/auth/login";
  public method = METHOD.POST;
  body: ILoginBody;
  public readonly responseClass = LoginResponse;
  public query: undefined;
  constructor(body: ILoginBody) {
    super();
    this.body = body;
  }
}
