import moment from "moment";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ROLES } from "../../../../constants/roles";
import { PLAN_STATUS } from "../../../../constants/planStatus";
import MESSAGE from "../../../../constants/message";
import service from "../../../../services";
import PlanModel from "../../../../models/plan/plan.model";
import { IPlan } from "../../../../@types/interface/plan.interface";
import { IObjectId } from "../../../../@types/objectId.interface";

// Plan creation
export const PlanCreation = async (req: Request, res: Response) => {
    try {
        const { plan_name, plan_code, start_date, end_date } = req.body;
        const planCreatorRole = req.user.role.toUpperCase(); // Extracting this role from the JWT
        let plan_start_date = null;
        let plan_end_date = null;
        let created_date = null

        // Validate plan creator role
        if (![ROLES.admin, ROLES.enroller_admin, ROLES.agent].includes(planCreatorRole)) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: MESSAGE.custom("Not authorized to create a plan")
            });
        }

        // Validate start date and end date
        if (end_date) {
            if (!moment(start_date).isBefore(end_date, "day")) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: MESSAGE.custom("End date should be less than a day of start date")
                });
            }
        }

        // converting into MongoDB format of start and end date, if given
        if (start_date) {
            plan_start_date = new Date(service.date.formateMongoDateService(start_date));
        }

        if (end_date) {
            plan_end_date = new Date(service.date.formateMongoDateService(end_date));
        }

        // Email of Group Owner cannot be duplicated.
        const isDuplicatePlanName = await service.plan.isDuplicateActivePlanNameService(PlanModel, plan_name);

        if (isDuplicatePlanName) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: MESSAGE.custom(`Plan: ${plan_name} is already created and in active status`)
            });
        }

        // Email of Group Owner cannot be duplicated.
        const isDuplicatePlanCode = await service.plan.isDuplicateActivePlanCodeService(PlanModel, plan_code);

        if (isDuplicatePlanCode) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: MESSAGE.custom(`Plan with code: ${plan_code} is already created and in active status`)
            });
        }

        created_date = new Date(service.date.formateMongoDateService(moment().format("YYYY-MM-DD")));

        // Saving data to Database
        const payload = {
            ...req.body,
            start_date: plan_start_date,
            end_date: plan_end_date,
            status: PLAN_STATUS.active,
            created: {
                by: req.user.user_name,
                on: created_date
            }
        };

        const createdPlanInstance: IPlan & IObjectId = await service.query.insert(PlanModel, payload);
        const plan_id: string = createdPlanInstance._id;

        return res.status(StatusCodes.OK).json({
            message: MESSAGE.post.succ,
            result: createdPlanInstance
        });
    } catch (err) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: MESSAGE.post.fail,
            err
        });
    }
};

//Get all plan
export const GetAllPlan = async (req: Request, res: Response) => {
    try {
        const status = req.query.status ? req.query.status : "";

        const plans = await service.plan.GetPlans(PlanModel, status.toString());
        if (plans) {
            return res.status(StatusCodes.OK).json({
                message: MESSAGE.get.succ,
                result: plans
            });
        } else {
            return res.status(StatusCodes.OK).json({
                message: "No plan found"
            });
        }
    } catch (err) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: MESSAGE.get.fail,
            err
        });
    }
}

//Get plan by name or code
export const GetPlanByNameOrCode = async (req: Request, res: Response) => {
    try {
        const planIdentifier = req.params.code;
        const status = req.query.status ? req.query.status : "";
        if (!req.user) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: MESSAGE.get.fail,
                result: "Not authorized!"
            });
        }
        if (!planIdentifier) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: MESSAGE.get.fail,
                result: "Plane name or code is required to find the plan details"
            });
        }
        const plan = await service.plan.GetPlan(PlanModel, planIdentifier, status.toString());
        if (plan) {
            return res.status(StatusCodes.OK).json({
                message: "Success",
                data: plan
            });
        } else {
            return res.status(StatusCodes.OK).json({
                message: "No plan found"
            });
        }
    } catch (err) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: MESSAGE.get.fail,
            err
        });
    }
}

//Check plan code exist or not
export const GetPlanCode = async (req: Request, res: Response) => {
    try {
        const code = req.query.plan_code;
        console.log(111, code, typeof (code));
        if (!req.user) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: MESSAGE.get.fail,
                result: "Not authorized!"
            });
        }
        if (!code) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: MESSAGE.get.fail,
                result: "Plane code is required to find the plan details"
            });
        }
        const isDuplicateCode = await service.plan.isDuplicatePlanCodeService(PlanModel, code.toString());
        if (isDuplicateCode) {
            return res.status(StatusCodes.OK).json({
                message: "Code Exist",
                codeExist: true
            });
        } else {
            return res.status(StatusCodes.OK).json({
                message: "Code does not exist",
                codeExist: false
            });
        }
    } catch (err) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: MESSAGE.get.fail,
            err
        });
    }
}