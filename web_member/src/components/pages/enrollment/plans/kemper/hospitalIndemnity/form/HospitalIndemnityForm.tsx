/* eslint-disable arrow-parens */
import { Button, MenuItem } from "@mui/material";
import { Select } from "@mui/material";
import { Grid, Paper } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { COVERAGE } from "../../../../../../../constants/coverage";
import { ThemeContext } from "../../../../../../../contexts";
import { LazyPlanActions, PlanHeader } from "../../../../../../shared";
import CustomInput from "../../../../../../shared/customInput/CustomInput";
import CustomSelectInput from "../../../../../../shared/customInput/CustomSelectInput";
import { Checkbox } from "@mui/material";
import { useState } from "react";
import { useCallback } from "react";

import "./hospitalIndemnityForm.css";

const KemperHospitalIndemnityForm = (): JSX.Element => {
	const [writingNumber, setWritingNumber] = useState(1408);
	const [plan, setPlan] = useState({
		plan_name: "Accident",
		plan_code: "plan001",
		start_date: "01/01/2023",
		end_date: "01/01/2024"
	});
	const [premium_plan, setPremiumPlan] = useState({
		employee: [
			{
				name: "plan 1",
				premium_amount: 1.05
			},
			{
				name: "plan 2",
				premium_amount: 1.57
			},
			{
				name: "plan 3",
				premium_amount: 2.09
			},
			{
				name: "plan 4",
				premium_amount: 3.14
			}
		],
		employee_and_family: [
			{
				name: "plan 1",
				premium_amount: 1.05
			},
			{
				name: "plan 2",
				premium_amount: 1.57
			},
			{
				name: "plan 3",
				premium_amount: 2.09
			},
			{
				name: "plan 4",
				premium_amount: 3.14
			}
		]
	});
	const [prevWritingNumber, setPrevWritingNumber] = useState(1408);
	const [showWritingNumberValidateButton, setShowWritingNumberValidateButton] = useState(false);
	const { theme } = useContext(ThemeContext);
	const [coverage_for, setCoverageFor] = useState("");
	const [coverage_level, setCoverageLevel] = useState("");
	const [premium_amount, setPremiumAmount] = useState(0);

	const handleCoverageForChange = (event: React.FormEvent<HTMLSelectElement>) => {
		const { value } = event.target as HTMLSelectElement;
		setCoverageFor(value);
	};

	const handleCoverageLevelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const { value } = event.target as HTMLSelectElement;
		setCoverageLevel(value);
	};

	const handleWritingNumberChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const { value } = event.target as HTMLInputElement;
			setWritingNumber(Number(value));
			if (Number(value) !== prevWritingNumber) {
				setShowWritingNumberValidateButton(true);
			} else {
				setShowWritingNumberValidateButton(false);
			}
		},
		[prevWritingNumber]
	);

	const calculatePremium = () => {
		if (coverage_for && coverage_level) {
			const coverageFor = coverage_for === "Employee Only" ? "employee" : "employee_and_family";
			const calculatePremiumAmount = premium_plan[coverageFor]?.find(
				(plan) => plan.name.toLowerCase() === coverage_level.toLowerCase()
			);
			setPremiumAmount(calculatePremiumAmount?.premium_amount ? calculatePremiumAmount?.premium_amount : 0);
		}
	};

	useEffect(() => {
		calculatePremium();
	}, [coverage_for, coverage_level]);

	const { plan_name, plan_code, start_date, end_date } = plan;

	return (
		<div className="kemper-cancer-form plan-form">
			<div className="paper-form-container">
				<Paper className="theme-border-radius paper-container" elevation={1}>
					<PlanHeader
						planName="Kemper Group Hospital Indemnity Insurance Policy"
						effectiveDate={start_date}
					/>
					<div className="plan-content">
						<div className="theme-plan-section-margin" />
						<div className="header-container">
							<div className="header-container header-container-new">
								<div className="theme-plan-header">Standard Benefits</div>
							</div>
							<div className="theme-plan-sub-header plan-text" style={{ borderLeftColor: theme.primary_color }}>
								In addition to yourself, who would you like to cover under this plan?
							</div>
						</div>
						<div className="theme-plan-inner-section-margin-2" />
						<Grid className="grid-container" container columnSpacing={2}>
							<Grid item xl={5} lg={5} md={5} sm={6} xs={6}>
								<div className="details-form-row">
									<div className="details-form-label  required">Coverage For</div>
									<Select
										input={<CustomSelectInput />}
										style={{ width: "100%" }}
										name="contact_label"
										onChange={(event: any) => handleCoverageForChange(event)}
									>
										{COVERAGE.map((option: string, index: number) => {
											return (
												<MenuItem value={option} key={index}>
													{option}
												</MenuItem>
											);
										})}
									</Select>
								</div>
							</Grid>
							<Grid item xl={5} lg={5} md={5} sm={6} xs={6}>
								<div className="details-form-row">
									<div className="details-form-label  required">Coverage Level</div>
									<Select
										input={<CustomSelectInput />}
										style={{ width: "100%" }}
										name="contact_label"
										onChange={(event: any) => handleCoverageLevelChange(event)}
									>
										<MenuItem value={"plan 1"}>PLAN 1</MenuItem>
										<MenuItem value={"plan 2"}>PLAN 2</MenuItem>
										<MenuItem value={"plan 3"}>PLAN 3</MenuItem>
										<MenuItem value={"plan 4"}>PLAN 4</MenuItem>
									</Select>
								</div>
							</Grid>
							<Grid item xl={2} lg={2} md={2} sm={6} xs={6}>
								<div className="details-form-row">
									<div className="details-form-label required align-center">Premium</div>
									<div className="show-premium">{premium_amount == 0 ? "" : `$${premium_amount.toFixed(2)}`}</div>
								</div>
							</Grid>
						</Grid>
					</div>
					<div className="theme-plan-inner-section-margin" />
					{premium_amount > 0 ? <Grid container className="theme-plan-inner-section-margin">
						<Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
							<div className="details-form-row">
								<div
									className="details-form-label theme-plan-total-premium align-right"
									style={{ color: theme.primary_color }}
								>
									Total Premium: <span className="show-premium margin-adjust">{premium_amount == 0 ? "" : `$${premium_amount.toFixed(2)}`}</span>
								</div>
							</div>
						</Grid>
					</Grid> : null
					}
					<div className="theme-plan-option-content">
						<Checkbox defaultChecked style={{ paddingLeft: 0 }} />
						<p className="theme-plan-checkbox-label">
							<strong>Are you actively at work 20 or more hours per week?</strong>
						</p>
					</div>
					<div className="theme-plan-inner-section-margin-2" />
					<Grid container>
						<Grid item xl={4} lg={4} md={4} sm={10} xs={10} columnSpacing={2}>
							<div className="details-form-row">
								<div className="details-form-label required">Writing Number</div>
								<Grid container>
									<Grid item xl={9}>
										<CustomInput value={writingNumber} onChange={handleWritingNumberChange} />
									</Grid>
									{showWritingNumberValidateButton ? (
										<Grid item xl={3}>
											<div className="writing-number-validate-container">
												<Button
													style={{
														backgroundColor: theme.button.background_color,
														color: theme.button.color,
														opacity: 0.8
													}}
												>
													Validate
												</Button>
											</div>
										</Grid>
									) : null}
								</Grid>
							</div>
						</Grid>
					</Grid>
					<div className="theme-plan-inner-section-margin-2" />
					<LazyPlanActions waiveButtonCallback={() => null} activateButtonCallback={() => null} />
				</Paper>
			</div>
		</div>
	);
};

export default KemperHospitalIndemnityForm;
