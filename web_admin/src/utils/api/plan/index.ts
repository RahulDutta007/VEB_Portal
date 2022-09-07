/* eslint-disable arrow-parens */
import { request } from "../../../api/api";
import { headers } from "../../../config/config";
import { MESSAGE } from "../../../constants/api/message";
import { AUTHORIZATION } from "../../../constants/api/auth";
import { CreatePlan, Plan } from "../../../@types/plan.types";
import { Endpoint } from "../../../@types/api/api.types";
import { StatusCodes } from "http-status-codes";
const { post, get } = request;
const { Authorization, Bearer } = AUTHORIZATION;

const initialRoute = "plan";

type CreatePlanPayload = CreatePlan;

/*
	Replace any with response type, which is
	group owner type here
*/
export const createPlan = async (_payload: CreatePlanPayload): Promise<any> => {
	try {
		// const payload = JSON.stringify(_payload);
		const endpoint: Endpoint = `${initialRoute}/`;
		/*
			Add response type here in next line
		*/
		const token = localStorage.getItem("@jwt");
		const _headers = Object.assign({}, headers, {
			authorization: `${Bearer} ${token}`
		});
		const response = await post(endpoint, _payload, _headers);
		if (response) {
			const {
				data: { message }
			} = response;
			if (message === "Data added successfully") {
				const {
					data: { message, result }
				} = response;
				return { message, result };
			}
		}
	} catch (error: any) {
		if (error.response.status === 400) {
			const { message } = error.response.data;
			return message;
		}
	}
};

export const findPlanCode = async (planCode: string): Promise<any> => {
	try {
		const endpoint: Endpoint = `${initialRoute}/check-plan-code?plan_code=${planCode}`;
		/*
			Add response type here in next line
		*/
		const token = localStorage.getItem("@jwt");
		const _headers = Object.assign({}, headers, {
			authorization: `${Bearer} ${token}`
		});
		const response = await get(endpoint, _headers);
		if (response) {
			const {
				data: { message, codeExist }
			} = response;
			if (codeExist !== undefined && codeExist === true) {
				return { message, codeExist };
			} else if (codeExist !== undefined && codeExist === false) {
				return { message, codeExist };
			} else {
				return { message: "Error Occurred" };
			}
		}
	} catch (error: any) {
		if (error.response.status === 400) {
			const { message } = error.response.data;
			return message;
		}
	}
};

export const getAllPlan = async (status: string): Promise<Plan[]> => {
	try {
		const endpoint: Endpoint = `${initialRoute}?status=${status}`;
		/*
			Add response type here in next line
		*/
		const token = localStorage.getItem("@jwt");
		const _headers = Object.assign({}, headers, {
			authorization: `${Bearer} ${token}`
		});
		const response = await get(endpoint, _headers);
		if (response?.status === StatusCodes.OK) {
			const {
				data: { result }
			} = response;
			return result;
		}
		throw "Unknown Error";
	} catch (error: any) {
		if (error.response.status === StatusCodes.BAD_REQUEST) {
			const { message } = error.response.data;
			return message;
		}
		throw error;
	}
};

export const plan = {
	createPlan,
	findPlanCode,
	getAllPlan
};
