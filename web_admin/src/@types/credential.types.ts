import { Role } from "./role.types";

export type Credential = {
	user_id: string;
	role: Role | "";
	password: string;
	newPassword: string;
	confirmPassword: string;
};
