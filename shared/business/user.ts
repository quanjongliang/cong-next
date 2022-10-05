export enum USER_ROLE{
	ADMIN='ADMIN',
	USER='USER'
  }

export class UserInfoResponse {
	firstName:string
	lastName:string
	username:string
	email:string
	role:USER_ROLE
  }