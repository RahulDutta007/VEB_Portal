import { Pagination, useMediaQuery } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import { Member } from "../../../@types/member.types";
import { PaginationQuery, PaginationTypes } from "../../../@types/pagination.types";
import { AssignedPaginatedMembers } from "../../../@types/user.types";
import { api } from "../../../api";
import { UIContext } from "../../../contexts";
import getLimit from "../../../utils/commonFunctions/getLimit";
import MembersGrid from "./membersGrid/MembersGrid";

const Members = (): JSX.Element => {
	const { setDashboardHeader } = useContext(UIContext);
	const [members, setMembers] = useState<Member[]>([]);
	const [limit, setLimit] = useState<number | null>(null);
	const [pagination, setPagination] = useState<PaginationTypes>({
		currentPage: 1,
		pageCount: undefined
	});
	const { currentPage, pageCount } = pagination;
	const xl = useMediaQuery("(min-width:1600px)");
	const lg = useMediaQuery("(min-width:1200px)");
	const md = useMediaQuery("(min-width:800px)");
	const sm = useMediaQuery("(min-width:600px)");
	const xs = useMediaQuery("(min-width:400px)");
	const _limit = getLimit(xl, lg, md, sm, xs);

	const handlePageChange = useCallback(
		(event: React.ChangeEvent<unknown>, page: number) => {
			setPagination(
				Object.assign({}, pagination, {
					currentPage: page
				})
			);
		},
		[pagination]
	);

	const getMembersCount = useCallback(async () => {
		if (limit) {
			const memberCount = await api.user.getAssignedMemberCount();
			const pageCount = Math.ceil(memberCount / limit);
			console.log("pageCount", pageCount);
			setPagination(Object.assign({}, pagination, { pageCount }));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [limit]);

	const getMembers = useCallback(async () => {
		if (typeof limit === "number" && typeof pagination.currentPage === "number") {
			const paginationQuery: PaginationQuery = {
				limit: limit,
				page: pagination.currentPage
			};
			const assignedPaginatedMembers: AssignedPaginatedMembers = await api.user.getAssignedPaginatedMembers(
				paginationQuery
			);
			setMembers(Object.assign([], assignedPaginatedMembers.members));
		}
	}, [limit, pagination.currentPage]);

	useEffect(() => {
		setLimit(_limit);
		getMembersCount();
		setDashboardHeader("Members");
	}, [_limit, getMembersCount, setDashboardHeader]);

	useEffect(() => {
		if (limit && pagination.pageCount) {
			getMembers();
		}
	}, [pagination, limit, getMembers]);

	return (
		<div className="members">
			<MembersGrid members={members} />
			<div className="display-flex-end mt-30px">
				<Pagination
					count={pageCount}
					defaultPage={1}
					page={currentPage}
					boundaryCount={2}
					onChange={handlePageChange}
					showFirstButton
					showLastButton
					className="pagination"
				/>
			</div>
		</div>
	);
};

export default Members;
