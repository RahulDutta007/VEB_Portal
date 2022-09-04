import { Button, IconButton, Pagination, Tooltip } from "@mui/material";
import { ColumnApi, GridApi, GridReadyEvent } from "ag-grid-community";
import { AgGridColumn } from "ag-grid-react/lib/agGridColumn";
import { AgGridReact } from "ag-grid-react/lib/agGridReact";
import { useRef, useState } from "react";
import { MembersGridProps } from "../../../../@types/components/membersProps.types";

const MembersGrid = ({ members }: MembersGridProps) => {
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

	const handleEnrollButtonClick = () => {
		const focusedCell = agGridRef.current.api.getFocusedCell();
		const row = agGridRef.current.api.getDisplayedRowAtIndex(focusedCell.rowIndex);
		const {
			data: { _id }
		} = row;
		const token = localStorage.getItem("@jwt");
		const url = `http://localhost:3001/verify?token=${token}&id=${_id}`;
		const target = "_blank";
		window.open(url, target);
	};

	const handleActionCellRender = () => {
		return (
			<Button
				className="ag-grid-cell-button"
				variant="outlined"
				onClick={handleEnrollButtonClick}
				style={{ marginTop: "3px", marginBottom: "6px" }}
			>
				Enroll
			</Button>
		);
	};

	return (
		<div className="employee-dependent-container">
			<div className="employee-dependent-grid-container">
				<div className="ag-theme-alpine" style={{ height: "400px", width: "100%" }}>
					<AgGridReact
						ref={agGridRef}
						rowData={members}
						onGridReady={handleAgGridReady}
						onFirstDataRendered={handleFirstDataRendered}
						animateRows
						frameworkComponents={{
							handleActionCellRender
						}}
						defaultColDef={{
							filter: "agTextColumnFilter",
							floatingFilter: true,
							resizable: true
						}}
						rowSelection={"single"}
					>
						<AgGridColumn field="first_name" headerName="First Name"></AgGridColumn>
						<AgGridColumn field="last_name" headerName="Last Name"></AgGridColumn>
						<AgGridColumn
							field="date_of_birth"
							headerName="Date Of Birth"
							cellRenderer="handleDateCellRenderer"
						></AgGridColumn>
						<AgGridColumn field="SSN" headerName="SSN"></AgGridColumn>
						<AgGridColumn field="role" headerName="Role"></AgGridColumn>
						<AgGridColumn field="group_number" headerName="Group Number"></AgGridColumn>
						<AgGridColumn
							field="group.name"
							headerName="Group Name"
							floatingFilterComponent="customFloatingFilter"
							filter="customFilter"
						></AgGridColumn>
						<AgGridColumn
							field="location.location_name"
							headerName="Location"
							floatingFilterComponent="customFloatingFilter"
							filter="customFilter"
						></AgGridColumn>
						<AgGridColumn
							field="action"
							headerName="Action"
							cellRenderer="handleActionCellRender"
							filter={false}
							suppressSizeToFit={true}
						></AgGridColumn>
					</AgGridReact>
				</div>
			</div>
		</div>
	);
};

export default MembersGrid;
