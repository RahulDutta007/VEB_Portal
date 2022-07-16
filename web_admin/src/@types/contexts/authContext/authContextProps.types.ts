import { User } from "../../user.types";

export type AuthContextProps = {
	user: User | null;
	setUser: (user: User) => void;
};
