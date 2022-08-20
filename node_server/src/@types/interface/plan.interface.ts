import { IObjectId } from "./objectId.interface";
import { ICreated } from "../created.interface";

export interface IPlanSchema {
    name: string;
    code: string;
    start_date: Date;
    end_date: Date | null;
    is_active: boolean;
}

export interface IPlan extends IPlanSchema, ICreated, IObjectId { }
