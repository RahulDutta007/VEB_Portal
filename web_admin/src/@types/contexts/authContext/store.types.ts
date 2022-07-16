import { User } from "../../user.types";

export type Store = {
	user: User | null;
	isLoggedIn: boolean;
};
