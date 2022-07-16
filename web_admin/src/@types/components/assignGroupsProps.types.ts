import { AssignedLocation, AssignmentStatus, GroupsAndLocations, LocationSchema } from "../group.types";

export type GroupDetails = {
	[key: string]: string;
};

export type GroupProfileProps = {
	details: GroupDetails;
	header: string;
};

export type TreeViewProps = {
	groups: GroupsAndLocations[];
	handleAssignGroup: (group: GroupsAndLocations, assigned: boolean) => void;
	handleAssignLocation: (location: LocationSchema, assigned: boolean) => void;
	handleSaveAllGroups: () => void;
	handleSaveAllLocations: () => void;
	assignmentStatus: AssignmentStatus;
	handleSelectProfile: (group: GroupsAndLocations, assigned: "group" | "location") => void;
};
