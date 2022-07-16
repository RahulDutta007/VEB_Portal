import { Store } from "./store.types";

export type UIAction = {
	type: string;
	payload: Store;
};
