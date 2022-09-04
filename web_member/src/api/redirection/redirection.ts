import { headers } from "../../config/config";
import { MESSAGE } from "../../constants/api/message";
import { request } from "../api";

const initialRoute = "redirection";
const { get } = request;

export const redirectUser = async (_id: string, token: string): Promise<string> => {
	try {
		const endpoint = initialRoute;
		const params = {
			_id
		};
		const response = await get(
			endpoint,
			{
				...headers,
				Authorization: `Bearer ${token}`
			},
			params
		);
		if (response) {
			const {
				data: { message }
			} = response;
			if (message === MESSAGE.get.succ) {
				const {
					data: { result }
				} = response;
				const { token } = result;
				return token;
			}
			throw new Error();
		}
		throw new Error();
	} catch (err) {
		alert(err);
		throw err;
	}
};

export const redirection = {
	redirectUser
};
