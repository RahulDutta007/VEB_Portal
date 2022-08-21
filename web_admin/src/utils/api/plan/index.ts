/* eslint-disable arrow-parens */
import { request } from "../../../api/api";
import { headers } from "../../../config/config";
import { MESSAGE } from "../../../constants/api/message";
import { AUTHORIZATION } from "../../../constants/api/auth";
import { CreatePlan } from "../../../@types/plan.types";
import { Endpoint } from "../../../@types/api/api.types";
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
		const payload = JSON.stringify(_payload);
		const endpoint: Endpoint = `${initialRoute}/`;
		/*
			Add response type here in next line
		*/
		const token = localStorage.getItem("@jwt");
		const _headers = Object.assign({}, headers, {
			authorization: `${Bearer} ${token}`
		});
		const response = await post(endpoint, payload, _headers);
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

export const plan = {
	createPlan
};
