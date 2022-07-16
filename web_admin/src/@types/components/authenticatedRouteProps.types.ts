import { Role } from "../role.types";

export type AuthenticatedRouteProps = {
	Component: any;
	WrappedComponent: any;
	isAuth: string | null;
	path: string;
	[key: string]: any;
};
