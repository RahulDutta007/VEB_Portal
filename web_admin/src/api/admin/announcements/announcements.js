/* eslint-disable prettier/prettier */
import { request } from "../../api";
import { headers } from "../../../config/config";
import { MESSAGE } from "../../../../constants/api/message";
import { AUTHORIZATION } from "../../../../constants/api/auth";
const { post, get, put, del } = request;
const { Authorization, Bearer } = AUTHORIZATION;

const initialRoute = "announcements";

export const addAnnouncement = async formData => {
	const endpoint = initialRoute;
	const token = localStorage.getItem("@jwt");
	const response = await post(endpoint, formData, {
		[Authorization]: `${Bearer} ${token}`
	});
	if (response) {
		const {
			data: { message }
		} = response;
		if (message === MESSAGE.post.succ) {
			const {
				data: { result }
			} = response;
			return result;
		}
	}
};

export const editAnnouncement = async formData => {
	const endpoint = initialRoute;
	const token = localStorage.getItem("@jwt");
	const response = await put(endpoint, formData, {
		[Authorization]: `${Bearer} ${token}`
	});
	if (response) {
		const {
			data: { message }
		} = response;
		if (message === MESSAGE.put.succ) {
			const {
				data: { result }
			} = response;
			return result;
		}
	}
};

export const getAnnouncements = async () => {
	const endpoint = initialRoute;
	const response = await get(endpoint);
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
	}
};

//Paginated HTTP GET request
export const filterAnnouncements = async params => {
	console.log("Params", params);
	const endpoint = `${initialRoute}/show-announcements`;
	const response = await get(endpoint, {}, params);
	console.log("API Response", response);
	if (response) {
		const {
			data: { message }
		} = response;
		if (message === MESSAGE.get.succ || message === MESSAGE.get.empty) {
			const {
				data: { result }
			} = response;
			return result;
		}
	}
};

// Count All Announcements
export const countAnnouncements = async () => {
	const endpoint = `${initialRoute}/count-announcements`;
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
	}
};

export const getAnnouncementById = async _id => {
	const endpoint = `${initialRoute}/${_id}`;
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
	}
};

export const deleteAnnouncementById = async _id => {
	const endpoint = `${initialRoute}/${_id}`;
	const token = localStorage.getItem("@jwt");
	const response = await del(endpoint, {
		[Authorization]: `${Bearer} ${token}`
	});
	if (response) {
		const {
			data: { message }
		} = response;
		if (message === MESSAGE.delete.succ) {
			const {
				data: { result }
			} = response;
			return result;
		}
	}
};

export const getGroups = async params => {
	const endpoint = `${initialRoute}/groups`;
	const token = localStorage.getItem("@jwt");
	const response = await get(
		endpoint,
		{
			[Authorization]: `${Bearer} ${token}`
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
			return result;
		}
	}
};

export const assignGroups = async _payload => {
	const endpoint = `${initialRoute}/assign/group`;
	const payload = JSON.stringify(_payload);
	const token = localStorage.getItem("@jwt");
	const response = await post(endpoint, payload, {
		...headers,
		[Authorization]: `${Bearer} ${token}`
	});
	if (response) {
		const {
			data: { message }
		} = response;
		if (message === MESSAGE.post.succ || message === MESSAGE.delete.succ) {
			const {
				data: { result }
			} = response;
			return result;
		}
	}
};

export const assignLocations = async _payload => {
	const endpoint = `${initialRoute}/assign/location`;
	const payload = JSON.stringify(_payload);
	const token = localStorage.getItem("@jwt");
	const response = await post(endpoint, payload, {
		...headers,
		[Authorization]: `${Bearer} ${token}`
	});
	if (response) {
		const {
			data: { message }
		} = response;
		if (message === MESSAGE.post.succ || message === MESSAGE.delete.succ) {
			const {
				data: { result }
			} = response;
			return result;
		}
	}
};

export const assignAllGroups = async _payload => {
	const endpoint = `${initialRoute}/assign/all-groups`;
	const payload = JSON.stringify(_payload);
	const token = localStorage.getItem("@jwt");
	const response = await post(endpoint, payload, {
		...headers,
		[Authorization]: `${Bearer} ${token}`
	});
	if (response) {
		const {
			data: { message }
		} = response;
		if (message === MESSAGE.post.succ) {
			const {
				data: { result }
			} = response;
			return result;
		}
	}
};

export const assignAllLocations = async _payload => {
	const endpoint = `${initialRoute}/assign/all-locations`;
	const payload = JSON.stringify(_payload);
	const token = localStorage.getItem("@jwt");
	const response = await post(endpoint, payload, {
		...headers,
		[Authorization]: `${Bearer} ${token}`
	});
	if (response) {
		const {
			data: { message }
		} = response;
		if (message === MESSAGE.post.succ) {
			const {
				data: { result }
			} = response;
			return result;
		}
	}
};

export const announcements = {
	getGroups,
	addAnnouncement,
	editAnnouncement,
	getAnnouncements,
	countAnnouncements,
	filterAnnouncements,
	getAnnouncementById,
	deleteAnnouncementById,
	assignGroups,
	assignAllGroups,
	assignLocations,
	assignAllLocations
};
