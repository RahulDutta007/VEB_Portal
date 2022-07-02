import { IObjectId } from "./objectId.interface";

export interface ITestSchema {
	first_name: string;
	last_name: string;
}

export interface ITest extends ITestSchema, IObjectId {}
