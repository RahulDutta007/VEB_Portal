import { Model } from "mongoose";
import PlanModel from "../../models/plan/plan.model";
import { PLAN_STATUS } from "../../constants/planStatus";

export const isDuplicateActivePlanNameService = async (
    planModel: Model<any>,
    plan_name: string,
): Promise<boolean> => {
    try {
        const filter = { plan_name, status: PLAN_STATUS.active };
        const planInstance = await planModel.findOne(filter);

        if (planInstance) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        throw err;
    }
};

export const isDuplicateActivePlanCodeService = async (
    planModel: Model<any>,
    plan_code: string,
): Promise<boolean> => {
    try {
        const filter = { plan_code, status: PLAN_STATUS.active };
        const planInstance = await planModel.findOne(filter);

        if (planInstance) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        throw err;
    }
};

export const GetPlans = async (
    planModel: Model<any>,
    status: string
): Promise<any> => {
    try {
        const filter = status !== "" ? { status } : {};
        const plans = await planModel.find(filter);

        if (plans) {
            return plans;
        } else {
            return [];
        }
    } catch (err) {
        throw err;
    }
};

export const GetPlan = async (
    planModel: Model<any>,
    plan: string,
    status: string
): Promise<any> => {
    try {
        const filter = status !== "" ? {
            $and: [
                {
                    $or: [
                        { plan_name: plan },
                        { plan_code: plan }
                    ]
                },
                {
                    status: PLAN_STATUS.active
                }
            ]
        } :
            {
                $or: [
                    { plan_name: plan },
                    { plan_code: plan }
                ]
            }
        const planInstance = await planModel.find(filter);

        if (planInstance) {
            return planInstance;
        } else {
            return [];
        }
    } catch (err) {
        throw err;
    }
};

export const isDuplicatePlanCodeService = async (
    planModel: Model<any>,
    plan_code: string
): Promise<boolean> => {
    try {
        const filter = { plan_code, status: PLAN_STATUS.active };
        const codeInstance = await planModel.findOne(filter);

        if (codeInstance) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        throw err;
    }
};