export const USER_KEY = "user";
export const USER_ACCESS_TOKEN = "access_token";
export enum AUTH_LOCAL_STORAGE_KEY {
	ACCESS_TOKEN = "token",
	REFRESH_TOKEN = "refreshToken",
}

export enum AUTH_API{
	LOGIN='/auth/login',
	REGISTER='/auth/register',
	CONFIRM='/auth/register/:token',
	PROFILE='/auth/profile'
}