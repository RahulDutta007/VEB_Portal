import { useCallback, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";

function createData(Name: string, Relation: number, Percentage: number, Type: number, protein: number) {
	return { Name, Relation, Percentage, Type };
}

// const rows = [createData("Frozen yoghurt", 159, 6.0, 24, 4.0), createData("Ice cream sandwich", 237, 9.0, 37, 4.3)];

export default function BasicTable(props: any) {
	const [rows, setRows] = useState([{ Name: "", Relation: "", Percentage: "", Type: "" }]);
	useEffect(() => {
		setRows([...rows, props.memberDetails]);
	}, [props.memberDetails]);
	const handleEdit = useCallback(
		(event: any, data: any) => {
			props.handleEdit(data);
		},
		[props]
	);

	const handleDelete = useCallback(
		(event: any, data: any) => {
			setRows(
				rows.filter((row: any, index: number) => {
					return row.Name != data.Name;
				})
			);
		},
		[rows]
	);
	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 400 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell align="right">Relation</TableCell>
						<TableCell align="right">Percntage</TableCell>
						<TableCell align="right">Type</TableCell>
						<TableCell align="right">&nbsp;</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.length > 1 &&
						rows.map((row, index) => {
							if (row.Name !== "" && row.Name !== undefined) {
								return (
									<TableRow key={row.Name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
										<TableCell component="th" scope="row">
											{row?.Name}
										</TableCell>
										<TableCell align="right">{row?.Relation}</TableCell>
										<TableCell align="right">{row?.Percentage}</TableCell>
										<TableCell align="right">{row?.Type}</TableCell>
										<TableCell
											align="right"
											style={{
												display: "flex",
												flexDirection: "row"
											}}
										>
											<CreateIcon onClick={(event: any) => handleEdit(event, row)} />
											<DeleteIcon onClick={(event: any) => handleDelete(event, row)} />
										</TableCell>
									</TableRow>
								);
							}
						})}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
