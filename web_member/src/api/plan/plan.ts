import { Plan } from "../../@types/plan.types";
import { headers } from "../../config/config";
import { MESSAGE } from "../../constants/api/message";
import { request } from "../api";

const initialRoute = "plan";
const { get } = request;

export type PlansWithRiderQuery = {
	plan_name: string;
	[key: string]: string;
};

export const getPlansWithRider = async (query: PlansWithRiderQuery): Promise<Plan[]> => {
	try {
		const endpoint = `${initialRoute}/riders`;
		const token = localStorage.getItem("@jwt_member");
		const response = await get(
			endpoint,
			{
				...headers,
				Authorization: `Bearer ${token}`
			},
			query
		);
		if (response) {
			const {
				data: { message }
			} = response;
			if (message === MESSAGE.get.succ) {
				const {
					data: { result }
				} = response;
				return result;
			}
			throw new Error();
		}
		throw new Error();
	} catch (err) {
		alert(err);
		throw err;
	}
};

export const plan = {
	getPlansWithRider
};
