declare namespace Express {
	interface Request {
		user: import("../user").User;
	}
}

declare module "googleapis";
