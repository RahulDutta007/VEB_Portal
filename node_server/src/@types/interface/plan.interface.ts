import { IObjectId } from "./objectId.interface";
import { ICreated } from "../created.interface";
import { PlanStatus } from "../enum/plan.status.enum";

export interface IPlanSchema {
    plan_name: string;
    plan_code: string;
    start_date: Date;
    end_date: Date | null;
    status: PlanStatus | null;
}

export interface IPlan extends IPlanSchema, ICreated, IObjectId { }
