import { SchemaDefinitionProperty } from "mongoose";
import { string } from "joi";
import { IObjectId } from "../objectId.interface";

export interface IOTPSchema {
	otp: string;
	expiration_time: SchemaDefinitionProperty<Date>;
	verified: boolean;
}

export interface IOTP {
	email: string;
	otp: number;
	createdAt: Date
}

// export interface IOTP extends IOTPSchema, IObjectId { }
