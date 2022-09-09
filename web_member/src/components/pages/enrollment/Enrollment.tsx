import { Grid, Box, SpeedDial, Tabs, Tab, IconButton, SpeedDialAction } from "@mui/material";
import { useEffect } from "react";
import { useContext } from "react";
import { useCallback, useMemo, useState } from "react";
import Draggable from "react-draggable";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import { useLocation, useNavigate } from "react-router-dom";
import { OpenEnrollment } from "../../../@types/enrollment.types";
import { EnrollmentContext, ThemeContext } from "../../../contexts";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "./enrollment.css";
import KemperCancerForm from "./plans/kemper/cancer/form/CancerForm";
import KemperCriticalIllnessForm from "./plans/kemper/criticalIllness/form/CriticalIllness";
import KemperAccidentForm from "./plans/kemper/accident/form/AccidentForm";
import KemperHospitalIndemnityForm from "./plans/kemper/hospitalIndemnity/form/HospitalIndemnityForm";
import BeazleyIndemnityForm from "./plans/beazley/indemnity/form/IndemnityForm";
import KemperWholeLifeInsuranceForm from "./plans/kemper/wholeLife/form/WholeLifeInsuranceForm";
import KemperShortTermDisabilityForm from "./plans/kemper/shortTermDisability/form/ShortTermDisabilityForm";
import FiveStarFamilyProtectionForm from "./plans/fiveStar/familyProtection/form/FamilyProtectionForm";
import DoctorAndRxForm from "./plans/doc/docAndRx/form/DocAndRx";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { dollarize } from "../../../utils/commonFunctions/dollarize";
import KemperCancerBranding from "./plans/kemper/cancer/branding/Branding";
import DownloadIcon from "@mui/icons-material/Download";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.action.hover
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14
	}
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	"&:nth-of-type(even)": {
		backgroundColor: theme.palette.action.hover
	},
	// hide last border
	"&:last-child td, &:last-child th": {
		border: 0
	}
}));

function a11yProps(index: number) {
	return {
		id: `vertical-tab-${index}`,
		"aria-controls": `vertical-tabpanel-${index}`
	};
}

const Enrollment = (): JSX.Element => {
	const [activeTab, setActiveTab] = useState<string>();
	const { currentEnrollment, setCurrentEnrollment } = useContext(EnrollmentContext);
	const [value, setValue] = useState<string>();
	const [overallPremiums, setOverallPremiums] = useState<any[]>([]);
	const [openEnrollments, setOpenEnrollments] = useState<OpenEnrollment[]>([]);
	const [totalPremium, setTotalPremium] = useState<number>(0.0);
	const location = useLocation();
	const { theme } = useContext(ThemeContext);
	const urlSearchParams: URLSearchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
	const height = screen.height;
	const [showOverallPremium, setShowOverallPremium] = useState(true);
	const navigate = useNavigate();
	const speedDialActions = [
		// eslint-disable-next-line prettier/prettier
		{
			name: <div className="tooltip-speed-dial">Download&nbsp;Brochure</div>,
			icon: <DownloadIcon />
		},
		{ name: <div className="tooltip-speed-dial">Email&nbsp;Brochure</div>, icon: <AttachEmailIcon /> }
	];
	const [speedDialOpen, setSpeedDialOpen] = useState(true);

	const handleOpen = () => setSpeedDialOpen(true);

	const handleClose = () => setSpeedDialOpen(false);

	const handleChange = (event: React.SyntheticEvent<Element, Event>, newValue: string) => {
		setActiveTab(newValue);
		setValue(newValue);
	};

	const renderPlan = useCallback(() => {
		const step = urlSearchParams.get("step");
		const stage = urlSearchParams.get("stage");
		console.log("step", step);
		switch (step) {
			case "Cancer": {
				return stage === "0" ? <KemperCancerBranding /> : <KemperCancerForm />;
			}
			case "Whole Life": {
				return <KemperWholeLifeInsuranceForm />;
			}
			case "Short Term Disability": {
				return <KemperShortTermDisabilityForm />;
			}
			case "Critical Illness Group": {
				return <KemperCriticalIllnessForm />;
			}
			case "Accident": {
				return <KemperAccidentForm />;
			}
			case "Hospital Indemnity": {
				return <KemperHospitalIndemnityForm />;
			}
			case "Beazley Indemnity": {
				return <BeazleyIndemnityForm />;
			}
			case "Family Protection": {
				return <FiveStarFamilyProtectionForm />;
			}
			case "Doc and Rx": {
				return <DoctorAndRxForm />;
			}
		}
	}, [urlSearchParams]);

	const getOpenEnrollments = useCallback(() => {
		const _openEnrollments = [
			{
				plan_name: "Cancer"
			},
			{
				plan_name: "Whole Life"
			},
			{
				plan_name: "Short Term Disability"
			},
			{
				plan_name: "Critical Illness Group"
			},
			{
				plan_name: "Hospital Indemnity"
			},
			{
				plan_name: "Accident"
			},
			{
				plan_name: "Beazley Indemnity"
			},
			{
				plan_name: "Family Protection"
			},
			{
				plan_name: "Doc and Rx"
			}
		];
		setOpenEnrollments(Object.assign([], _openEnrollments));
		setActiveTab(_openEnrollments[0].plan_name);
	}, []);

	const handleOverallPremiumClick = () => {
		setShowOverallPremium((prevShowOverallPremium: boolean) => !prevShowOverallPremium);
	};

	const getOverallPremium = useCallback(() => {
		const _overallPremiums = [
			{
				plan_name: "Accident Insurance",
				premium_amount: 23.35,
				status: "Submitted"
			},
			{
				plan_name: "Group Life Insurance",
				premium_amount: 0.0,
				status: "Waived"
			},
			{
				plan_name: "Critical Illness",
				premium_amount: 23.35,
				status: "Submitted"
			}
		];
		const _totalPremium = 70.5;
		setTotalPremium(_totalPremium);
		setOverallPremiums(Object.assign([], _overallPremiums));
	}, []);

	useEffect(() => {
		getOpenEnrollments();
		getOverallPremium();
	}, [getOpenEnrollments, getOverallPremium]);

	useEffect(() => {
		if (activeTab) {
			navigate("?step=" + activeTab + "&stage=0");
		}
	}, [activeTab, navigate]);

	useEffect(() => {
		if (currentEnrollment) {
			setTotalPremium((prevTotalPremium: number) => prevTotalPremium + currentEnrollment.premium_amount);
		}
	}, [currentEnrollment]);

	return (
		<>
			<div className="veb-enrollment">
				<Box
					className="box-container"
					sx={{
						flexGrow: 1,
						//bgcolor: "background.paper",
						display: "block",
						marginLeft: "-2rem"
					}}
				>
					<Tabs
						orientation="vertical"
						className="tabs-cotainer"
						// variant="scrollable"
						//variant="fullWidth"
						style={{
							// boxShadow:
							//"rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
							boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
							borderTopLeftRadius: 20,
							borderTopRightRadius: 20,
							borderBottomLeftRadius: 20,
							borderBottomRightRadius: 20,
							color: theme.primary_color
						}}
						TabIndicatorProps={{
							style: {
								color: theme.primary_color,
								backgroundColor: theme.primary_color
							}
						}}
						value={value}
						onChange={handleChange}
					>
						{openEnrollments.map((openEnrollment: OpenEnrollment, index: number) => {
							const { plan_name } = openEnrollment;
							return (
								<Tab
									key={index}
									className={activeTab == plan_name ? "active-tab" : "default-tab"}
									style={{
										height: (height - 500) / 6,
										color: activeTab == plan_name ? theme.primary_color : undefined
									}}
									value={plan_name}
									label={plan_name}
									{...a11yProps(0)}
								/>
							);
						})}
					</Tabs>
					<div className="form-container">{renderPlan()}</div>
				</Box>
				{showOverallPremium ? (
					<Draggable>
						<div className="draggable-premium-box">
							<div>
								<div
									className={"top-bar-expand"}
									style={{ backgroundColor: theme.button.background_color }}
								>
									<div className="header" style={{ color: theme.button.color }}>
										Overall Amount
									</div>
									<div className={"icon-expand"}>
										<IconButton onClick={handleOverallPremiumClick}>
											<KeyboardArrowRightIcon style={{ color: theme.button.color }} />
										</IconButton>
									</div>
								</div>
							</div>
							<TableContainer component={Paper}>
								<Table sx={{ minWidth: 300 }} aria-label="customized table">
									<TableHead>
										<TableRow>
											<StyledTableCell>
												<span className="premium-table-header">Plan</span>
											</StyledTableCell>
											<StyledTableCell align="right">
												<span className="premium-table-header">Premium&nbsp;($)</span>
											</StyledTableCell>
											<StyledTableCell align="right">
												<span className="premium-table-header">Status</span>
											</StyledTableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{overallPremiums.map((overallPremium: any, index: number) => (
											<StyledTableRow key={index}>
												<StyledTableCell component="th" scope="row">
													{overallPremium.plan_name}
												</StyledTableCell>
												<StyledTableCell align="right">
													{overallPremium.premium_amount}
												</StyledTableCell>
												<StyledTableCell align="right">{overallPremium.status}</StyledTableCell>
											</StyledTableRow>
										))}
										{currentEnrollment ? (
											<StyledTableRow>
												<StyledTableCell
													component="th"
													scope="row"
													style={{ color: theme.primary_color }}
												>
													{currentEnrollment.plan_name}
												</StyledTableCell>
												<StyledTableCell align="right" style={{ color: theme.primary_color }}>
													{currentEnrollment.premium_amount}
												</StyledTableCell>
												<StyledTableCell align="right" style={{ color: theme.primary_color }}>
													{currentEnrollment.status}
												</StyledTableCell>
											</StyledTableRow>
										) : null}
										<StyledTableRow>
											<StyledTableCell
												component="th"
												scope="row"
												style={{
													fontWeight: "bold"
												}}
											>
												AMOUNT
											</StyledTableCell>
											<StyledTableCell
												align="right"
												style={{
													fontWeight: "bold",
													color: currentEnrollment ? theme.primary_color : "initial"
												}}
											>
												{dollarize(totalPremium) + (currentEnrollment ? "*" : "")}
											</StyledTableCell>
											<StyledTableCell align="right"></StyledTableCell>
										</StyledTableRow>
									</TableBody>
								</Table>
							</TableContainer>
						</div>
					</Draggable>
				) : (
					<Draggable axis="y">
						<div className="draggable-premium-box">
							<div>
								<div className={"top-bar"} style={{ backgroundColor: theme.button.background_color }}>
									<div className="header" style={{ color: theme.button.color }}>
										Overall Amount
									</div>
									<div className={"icon"}>
										<IconButton onClick={handleOverallPremiumClick}>
											<KeyboardArrowRightIcon style={{ color: theme.button.color }} />
										</IconButton>
									</div>
								</div>
							</div>
						</div>
					</Draggable>
				)}
			</div>
			<SpeedDial
				ariaLabel="SpeedDial tooltip example"
				sx={{ position: "fixed", bottom: 16, right: 16 }}
				icon={<SpeedDialIcon />}
				onOpen={handleOpen}
				onClose={handleClose}
				open={speedDialOpen}
				style={{ fontSize: "10px" }}
				FabProps={{
					sx: {
						bgcolor: theme.primary_color,
						"&:hover": {
							bgcolor: theme.primary_color
						}
					}
				}}
			>
				{speedDialActions.map((speedDialAction: any) => (
					<SpeedDialAction
						key={speedDialAction.name}
						icon={speedDialAction.icon}
						tooltipTitle={speedDialAction.name}
						tooltipOpen
						style={{ fontSize: "10px" }}
					/>
				))}
			</SpeedDial>
		</>
	);
};

export default Enrollment;
