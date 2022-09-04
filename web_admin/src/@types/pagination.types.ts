export type PaginationTypes = {
	currentPage: number | undefined;
	pageCount: number | undefined;
};

export type PaginationQuery = {
	limit: number;
	page: number;
};
