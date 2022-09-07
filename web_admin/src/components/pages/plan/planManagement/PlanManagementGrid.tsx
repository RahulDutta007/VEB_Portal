/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
import { useCallback, useRef, useState, Suspense, useEffect } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import { CellValueChangedEvent, ColumnApi, GridApi, GridReadyEvent } from "ag-grid-community";
import CustomDatePickerDialog from "../../../shared/dialogs/customDatePickerDialog/CustomDatePickerDialog";

import { Tooltip, IconButton } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { PlanManagementProps } from "../../../../@types/components/planProps.types";
import { Plan } from "../../../../@types/plan.types";
import { api } from "../../../../utils/api";

const PlanManagementGrid = ({ status }: PlanManagementProps): JSX.Element => {
	const [agGridAPI, setAgGridAPI] = useState<GridApi | null>(null);
	const [agGridColumnAPI, setAgGridColumnAPI] = useState<ColumnApi | null>(null);
	const [customDatePickerDialogProps, setCustomDatePickerDialogProps] = useState({
		openDialog: false,
		title: "Edit Plan ",
		_id: -1,
		value: "",
		textFields: [
			{
				label: " End Date",
				placeHolder: "Enter  End Date",
				name: "end_date"
			}
		],
		actions: [
			{
				label: "Cancel",
				callback: () => {
					setCustomDatePickerDialogProps(
						Object.assign({}, customDatePickerDialogProps, { openDialog: false })
					);
				}
			},
			{
				label: "Submit"
			}
		]
	});
	const agGridRef = useRef<any>(null);
	const [plans, setPlans] = useState<Plan[]>([]);

	const handleAgGridReady = (params: GridReadyEvent) => {
		const { api, columnApi } = params;
		setAgGridAPI(api);
		setAgGridColumnAPI(columnApi);
		api.sizeColumnsToFit();
	};

	const handleFirstDataRendered = (params: any) => {
		params.api.sizeColumnsToFit();
		params.columnApi.setColumnWidth("action", "100%", true);
		const { api, columnApi } = params;
		api.sizeColumnsToFit();
	};

	const handleOpenDialog = useCallback(() => {
		const focusedCell = agGridRef.current.api.getFocusedCell();
		const row = agGridRef.current.api.getDisplayedRowAtIndex(focusedCell.rowIndex);
		const {
			data: { id }
		} = row;

		setCustomDatePickerDialogProps(Object.assign({}, customDatePickerDialogProps, { openDialog: true, _id: id }));
	}, [customDatePickerDialogProps]);

	const handleActionCellRenderer = useCallback(() => {
		return (
			<Tooltip title="Edit" enterDelay={200} leaveDelay={200} arrow>
				<IconButton onClick={handleOpenDialog}>
					<EditIcon />
				</IconButton>
			</Tooltip>
		);
	}, [handleOpenDialog]);

	const getPlans = useCallback(async () => {
		const _plans = await api.plan.getAllPlan(status);
		console.log("Plans ", _plans);
		setPlans(Object.assign([], _plans));
	}, [status]);

	useEffect(() => {
		getPlans();
	}, [getPlans]);

	return (
		<>
			<Suspense fallback={<div />}>
				<CustomDatePickerDialog
					dialogProps={customDatePickerDialogProps}
					setDialogProps={setCustomDatePickerDialogProps}
				/>
			</Suspense>
			<div className="plan-management-grid-container">
				<div className="ag-theme-alpine" style={{ height: "400px", width: "100%" }}>
					<AgGridReact
						ref={agGridRef}
						rowData={gridData}
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
						frameworkComponents={{ handleActionCellRenderer: handleActionCellRenderer }}
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
						<AgGridColumn
							field="start_date"
							headerName="Start Date"
							checkboxSelection={true}
						></AgGridColumn>
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
		</>
	);
};

export default PlanManagementGrid;
