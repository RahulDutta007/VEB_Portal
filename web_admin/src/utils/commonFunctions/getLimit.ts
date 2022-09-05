const getLimit = (xl: boolean, lg: boolean, md: boolean, sm: boolean, xs: boolean): number => {
	if (xl) return 5;
	else if (lg) return 5;
	else if (md) return 3;
	else if (sm) return 2;
	else if (xs) return 2;
	return -1;
};

export default getLimit;
