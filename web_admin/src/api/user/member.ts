import { request } from "../api";
import { headers } from "../../config/config";
import { MESSAGE } from "../../constants/api/message";
import { AUTHORIZATION } from "../../constants/api/auth";
import { Credential } from "../../@types/credential.types";
import { Endpoint } from "../../@types/api/api.types";
import { Member } from "../../@types/member.types";
import { PaginationQuery, PaginationTypes } from "../../@types/pagination.types";
import { AssignedPaginatedMembers } from "../../@types/user.types";
import { Role } from "../../@types/role.types";

const { post, get } = request;
const { Authorization, Bearer } = AUTHORIZATION;

const initialRoute = "users";

export const getAssignedPaginatedMembers = async (query: PaginationQuery): Promise<AssignedPaginatedMembers> => {
	try {
		const endpoint = `${initialRoute}/members/assinged/paginated`;
		const token = localStorage.getItem("@jwt");
		const response = await get(
			endpoint,
			{
				...headers,
				[Authorization]: `${Bearer} ${token}`
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

export const getAssignedMemberCount = async (): Promise<number> => {
	try {
		const endpoint = `${initialRoute}/members/count`;
		const token = localStorage.getItem("@jwt");
		const response = await get(endpoint, {
			...headers,
			[Authorization]: `${Bearer} ${token}`
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
		alert(err);
		throw err;
	}
};

export const getGroupOwnersPaginated = async (query: PaginationQuery, role: Role) => {
	try {
		const endpoint: Endpoint = `${initialRoute}/group-owners/paginated/${role}`;
		const token = localStorage.getItem("@jwt");
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

export const getMemberCount = async (): Promise<number> => {
	try {
		const endpoint = `${initialRoute}/members/count`;
		const token = localStorage.getItem("@jwt");
		const response = await get(endpoint, {
			...headers,
			[Authorization]: `${Bearer} ${token}`
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
		alert(err);
		throw err;
	}
};

export const getGroupOwnerCount = async (role: Role): Promise<number> => {
	try {
		const endpoint = `${initialRoute}/group-owners/count/role`;
		const token = localStorage.getItem("@jwt");
		const response = await get(endpoint, {
			...headers,
			[Authorization]: `${Bearer} ${token}`
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
		alert(err);
		throw err;
	}
};

export const member = {
	getAssignedPaginatedMembers,
	getAssignedMemberCount,
	getGroupOwnersPaginated,
	getGroupOwnerCount
};
