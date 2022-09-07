import { Pagination, useMediaQuery } from "@mui/material";
import { CellValueChangedEvent, ColumnApi, GridApi, GridReadyEvent } from "ag-grid-community";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { GroupOwner } from "../../../../@types/groupOwner.types";
import { PaginationQuery, PaginationTypes } from "../../../../@types/pagination.types";
import { api } from "../../../../api";
import { UIContext } from "../../../../contexts";
import getLimit from "../../../../utils/commonFunctions/getLimit";
import { AgGridColumn, AgGridReact } from "ag-grid-react";

const EnrollersGrid = (): JSX.Element => {
	const { setDashboardHeader } = useContext(UIContext);
	const [agGridAPI, setAgGridAPI] = useState<GridApi | null>(null);
	const [agGridColumnAPI, setAgGridColumnAPI] = useState<ColumnApi | null>(null);
	const agGridRef = useRef<any>(null);
	const [enrollers, setEnrollers] = useState<GroupOwner[]>();
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

	const handleAgGridReady = (params: GridReadyEvent) => {
		const { api, columnApi } = params;
		setAgGridAPI(api);
		setAgGridColumnAPI(columnApi);
		api.sizeColumnsToFit();
	};

	const handleFirstDataRendered = (params: any) => null;

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

	const getEnrollersCount = useCallback(async () => {
		if (limit) {
			const enrollerCount = await api.user.getGroupOwnerCount("ENROLLER ADMIN");
			const pageCount = Math.ceil(enrollerCount / limit);
			console.log("pageCount", pageCount);
			setPagination(Object.assign({}, pagination, { pageCount }));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [limit]);

	const getEnrollers = useCallback(async () => {
		if (typeof limit === "number" && typeof pagination.currentPage === "number") {
			const paginationQuery: PaginationQuery = {
				limit: limit,
				page: pagination.currentPage
			};
			const assignedPaginatedEnrollers = await api.user.getGroupOwnersPaginated(
				paginationQuery,
				"ENROLLER ADMIN"
			);
			setEnrollers(Object.assign([], assignedPaginatedEnrollers.enrollers));
		}
	}, [limit, pagination.currentPage]);

	useEffect(() => {
		setLimit(_limit);
		getEnrollersCount();
		setDashboardHeader("Enrollers");
	}, [_limit, getEnrollersCount, setDashboardHeader]);

	useEffect(() => {
		if (limit && pagination.pageCount) {
			getEnrollers();
		}
	}, [pagination, limit, getEnrollers]);

	return (
		<div className="enroller-grid">
			<div className="ag-theme-alpine" style={{ height: "400px", width: "100%" }}>
				<AgGridReact
					ref={agGridRef}
					rowData={[]}
					onGridReady={handleAgGridReady}
					onFirstDataRendered={handleFirstDataRendered}
					animateRows
					rowDragManaged
					defaultColDef={{
						filter: "agTextColumnFilter",
						floatingFilter: true,
						resizable: true,
						floatingFilterComponentParams: { suppressFilterButton: true }
					}}
					defaultColGroupDef={{ marryChildren: true }}
					rowSelection="single"
					onCellValueChanged={(params: CellValueChangedEvent) => {
						params.api.refreshCells({
							force: true,
							columns: ["handleMemberSupportCellRender", "is_employee_support"]
						});
					}}
					enableCellChangeFlash={true}
				>
					<AgGridColumn
						field="user_name"
						headerName="User Name"
						checkboxSelection={true}
						suppressSizeToFit={true}
					></AgGridColumn>
					<AgGridColumn
						field="first_name"
						headerName="First Name"
						checkboxSelection={true}
						suppressSizeToFit={true}
					></AgGridColumn>
					<AgGridColumn
						field="last_name"
						headerName="Last Name"
						checkboxSelection={true}
						suppressSizeToFit={true}
					></AgGridColumn>
					<AgGridColumn
						field="is_registered"
						headerName="Registered"
						cellRenderer="handleRegisteredCellRender"
						filter={false}
						suppressSizeToFit={true}
					></AgGridColumn>
					<AgGridColumn field="email" headerName="Email"></AgGridColumn>
					<AgGridColumn field="role" headerName="Role"></AgGridColumn>
					<AgGridColumn
						field="date"
						headerName="Creation Date"
						cellRenderer="handleDateCellRenderer"
					></AgGridColumn>
					<AgGridColumn
						field="last_login_date"
						headerName="Last Login Date"
						cellRenderer="handleDateCellRenderer"
					></AgGridColumn>
					<AgGridColumn
						headerName="User Information"
						cellRenderer="handleUserInformationCellRenderer"
						filter={false}
						suppressSizeToFit={true}
					></AgGridColumn>
				</AgGridReact>
			</div>
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

export default EnrollersGrid;
