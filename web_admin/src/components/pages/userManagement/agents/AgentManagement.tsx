import { useRef, useState } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import { CellValueChangedEvent, ColumnApi, GridApi, GridReadyEvent } from "ag-grid-community";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const AgentManagement = (): JSX.Element => {
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

	return (
		<div className="user-management">
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
		</div>
	);
};

export default AgentManagement;
