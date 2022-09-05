import { SchemaDefinitionProperty, Types } from "mongoose";

export interface ICreated {
	created_by: SchemaDefinitionProperty<Types.ObjectId | null>;
	created_date: SchemaDefinitionProperty<Date>;
	date: SchemaDefinitionProperty<Date>;
}
