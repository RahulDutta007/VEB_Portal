import { useState, useCallback } from "react";
import axios from "axios";

const useAxios = (endpoint, headers, method, initialValue, payload) => {
	const [response, setResponse] = useState(initialValue);

	//for get api call
	const fetch = useCallback(async () => {
		const _response = await axios.get(endpoint);
		setResponse(_response);
	}, [endpoint]);

	//for post, put, patch api call
	const send = useCallback(async () => {
		const _response = await axios[method](endpoint, payload, {
			headers
		});
		setResponse(_response);
	}, [endpoint, headers, method, payload]);

	return { response, fetch, send };
};

export default useAxios;
