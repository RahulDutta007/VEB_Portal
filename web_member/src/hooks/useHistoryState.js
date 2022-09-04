import { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
/* eslint-disable */

const useHistoryState = (key) => {
	const [state, setState] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		const { location } = navigate;
		if (key === null) return;
		if (key === undefined) return;
		if (typeof location.state[key] === typeof undefined) return;

		const type =
			typeof location.state[key] === "object"
				? Array.isArray(location.state[key])
					? "array"
					: "object"
				: typeof navigate.location.state[key];

		switch (type) {
			case "object":
				setState(Object.assign({}, location.state));
				break;
			case "array":
				setState(Object.assign([], location.state));
				break;
			case "number":
				setState(location.state);
				break;
			case "string":
				setState(location.state);
				break;
			default:
				console.log("Unexpected type");
		}
	}, [navigate, key]);

	const pushState = useCallback(
		(pathname, key, value) => {
			navigate({
				pathname,
				state: {
					[key]: value
				}
			});
		},
		[navigate]
	);

	return { state, pushState };
};

export default useHistoryState;
