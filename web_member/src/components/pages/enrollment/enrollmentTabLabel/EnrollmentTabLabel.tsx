import { Grid } from "@mui/material";
import { EnrollmentTabLabelProps, StatusIcon } from "../../../../@types/components/enrollment.types";
import PanToolOutlinedIcon from "@mui/icons-material/PanToolOutlined";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";

import "./enrollmentTabLabel.css";

const getStatusIcon: StatusIcon = {
	ENROLLED: <DoneAllOutlinedIcon className="status-icon" />,
	WAIVED: <PanToolOutlinedIcon className="status-icon" />
};

const EnrollmentTabLabel = ({ planName, status, carrier }: EnrollmentTabLabelProps): JSX.Element => {
	return (
		<div className="enrollment-tab-level">
			<Grid container spacing={2} direction="row" justifyContent="space-between" alignItems="center">
				<Grid item style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "center" }}>
					<div className="plan-name">{planName}</div>
				</Grid>
				<Grid item>
					<div>{getStatusIcon[status as keyof StatusIcon]}</div>
				</Grid>
			</Grid>
		</div>
	);
};

export default EnrollmentTabLabel;
