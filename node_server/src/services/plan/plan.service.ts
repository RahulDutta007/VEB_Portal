import { Model } from "mongoose";
import PlanModel from "../../models/plan/plan.model";

export const isDuplicateActivePlanNameService = async (
    planModel: Model<any>,
    name: string,
): Promise<boolean> => {
    try {
        const filter = { name, is_active: true };
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
    code: string,
): Promise<boolean> => {
    try {
        const filter = { code, is_active: true };
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
    planModel: Model<any>
): Promise<any> => {
    try {
        const filter = { is_active: true };
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
    plan: string
): Promise<any> => {
    try {
        const filter = {
            $and: [
                {
                    $or: [
                        { name: plan },
                        { code: plan }
                    ]
                },
                {
                    is_active: true
                }
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
    code: string
): Promise<boolean> => {
    try {
        const filter = { code, is_active: true };
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