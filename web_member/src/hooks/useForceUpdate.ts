import { useState, useCallback } from "react";
/* eslint-disable */

const useForceUpdate = () => {
	const [, setTick] = useState(0);
	const update = useCallback(() => {
		// eslint-disable-next-line prettier/prettier
		setTick((tick) => tick + 1);
	}, []);
	return update;
};

export default useForceUpdate;
