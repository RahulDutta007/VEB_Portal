import { GroupOwner } from "../../@types/groupOwner.types";
import { Member } from "../../@types/member.types";
import { headers } from "../../config/config";
import { MESSAGE } from "../../constants/api/message";
import { request } from "../api";

const initialRoute = "users";
const { get } = request;

export const getGroupOwner = async (): Promise<GroupOwner> => {
	try {
		const endpoint = `${initialRoute}/group-owner`;
		const token = localStorage.getItem("@jwt_group_owner");
		const response = await get(endpoint, {
			...headers,
			Authorization: `Bearer ${token}`
		});
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
		//alert(err);
		throw err;
	}
};

export const getMemberByAuth = async (): Promise<Member> => {
	try {
		const endpoint = `${initialRoute}/auth-member`;
		const token = localStorage.getItem("@jwt_member");
		const response = await get(endpoint, {
			...headers,
			Authorization: `Bearer ${token}`
		});
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
		//alert(err);
		throw err;
	}
};

export const getEmployeeAndDependents = async (): Promise<{ employee: Member; dependents: Member[] }> => {
	try {
		const endpoint = `${initialRoute}/employee-dependents`;
		const token = localStorage.getItem("@jwt_member");
		const response = await get(endpoint, {
			...headers,
			Authorization: `Bearer ${token}`
		});
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
		//alert(err);
		throw err;
	}
};

export const user = {
	getGroupOwner,
	getEmployeeAndDependents,
	getMemberByAuth
};
