import { useCallback, useEffect, useRef, useState } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import { CellValueChangedEvent, ColumnApi, GridApi, GridReadyEvent } from "ag-grid-community";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "./planManagement.css";
import { api } from "../../../../utils/api";

const PlanManagement = (): JSX.Element => {
	const [plans, setPlans] = useState([]);
	const [agGridAPI, setAgGridAPI] = useState<GridApi | null>(null);
	const [agGridColumnAPI, setAgGridColumnAPI] = useState<ColumnApi | null>(null);
	const agGridRef = useRef<any>(null);

	const handleAgGridReady = (params: GridReadyEvent) => {
		const { api, columnApi } = params;
		setAgGridAPI(api);
		setAgGridColumnAPI(columnApi);
		api.sizeColumnsToFit();
	};

	const handleFirstDataRendered = (params: any) => null;

	const getPlans = useCallback(async () => {
		const _plans = await api.plan.getAllPlan("ACTIVE");
		console.log("Plans ", _plans.data);
		setPlans(Object.assign([], _plans.data));
	}, []);

	useEffect(() => {
		getPlans();
	}, [getPlans]);

	return (
		<div className="plan-management">
			<div className="ag-theme-alpine" style={{ height: "400px", width: "100%" }}>
				<AgGridReact
					ref={agGridRef}
					rowData={plans}
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
						field="plan_name"
						headerName="Plan Name"
						checkboxSelection={true}
						suppressSizeToFit={true}
					></AgGridColumn>
					<AgGridColumn
						field="plan_code"
						headerName="Plan Code"
						checkboxSelection={true}
						suppressSizeToFit={true}
					></AgGridColumn>
					<AgGridColumn field="start_date" headerName="Start Date" checkboxSelection={true}></AgGridColumn>
					<AgGridColumn
						field="end_date"
						headerName="End Date"
						cellRenderer="handleRegisteredCellRender"
					></AgGridColumn>
					<AgGridColumn
						headerName="Actions"
						cellRenderer="handleActionCellRenderer"
						filter={false}
						suppressSizeToFit={true}
					></AgGridColumn>
				</AgGridReact>
			</div>
		</div>
	);
};

export default PlanManagement;
