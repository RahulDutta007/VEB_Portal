/* eslint-disable arrow-parens */
import { useRef, useState } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const AdminManagementGrid = () => {
	const [agGridAPI, setAgGridAPI] = useState(null);
	const [agGridColumnAPI, setAgGridColumnAPI] = useState(null);
	const agGridRef = useRef(null);

	const handleAgGridReady = (params) => {
		const { api, columnApi } = params;
		setAgGridAPI(api);
		setAgGridColumnAPI(columnApi);
		api.sizeColumnsToFit();
	};

	const handleFirstDataRendered = (params: any) => null;

	return (
		<div className="admin-management-grid-container">
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
				>
					<AgGridColumn field="user_name" headerName="User Name" suppressSizeToFit={true}></AgGridColumn>
					<AgGridColumn field="is_registered" headerName="Registered" suppressSizeToFit={true}></AgGridColumn>
					<AgGridColumn field="email" headerName="Email"></AgGridColumn>
					<AgGridColumn field="role" headerName="Role"></AgGridColumn>
					<AgGridColumn field="date" headerName="Creation Date"></AgGridColumn>
					<AgGridColumn field="last_login_date" headerName="Last Login Date"></AgGridColumn>
					<AgGridColumn headerName="User Information" filter={false}></AgGridColumn>
				</AgGridReact>
			</div>
		</div>
	);
};

export default AdminManagementGrid;
