import { User } from "../../user.types";
import { Store } from "./store.types";

export type AuthAction = {
	type: string;
	payload: Store;
};
