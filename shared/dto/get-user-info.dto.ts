import { AUTH_API } from "model/auth";
import { UserInfoResponse } from "shared/business/user";
import { METHOD } from "../../model/http";
import { DTO } from "./base.dto";


export class UserInfoDTO extends DTO {
  public url = AUTH_API.PROFILE;
  public method = METHOD.GET;
  body: null;
  public readonly responseClass = UserInfoResponse;
  public query: undefined;
  public param:undefined;
  constructor() {
    super();
  }
}
