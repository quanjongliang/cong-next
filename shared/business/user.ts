export enum USER_ROLE {
	ADMIN = "Admin",
	MAKER = "Maker",
	CREATOR = "Creator",
}

export class User {
	public email!: string;
	public role!: USER_ROLE;
}
