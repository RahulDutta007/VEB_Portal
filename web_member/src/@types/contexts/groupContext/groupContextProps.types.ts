import { Group } from "../../group.types";

export type GroupContextProps = {
	group: Group;
	setGroup: (group: Group) => void;
};
