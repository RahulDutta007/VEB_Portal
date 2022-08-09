import { SchemaDefinitionProperty } from "mongoose";
import { string } from "joi";

export interface IOTPSchema {
	otp: string;
	expiration_time: SchemaDefinitionProperty<Date>;
	verified: boolean;
}

// import { IObjectId } from "../objectId.interface";
// export interface IOTPSchema {
//   email: string;
//   otp: number;
//   createdAt: Date
// }

// export interface IOTP extends IOTPSchema, IObjectId { }
