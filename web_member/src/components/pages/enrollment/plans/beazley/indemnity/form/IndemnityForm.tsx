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

import "./indemnityForm.css";

const BeazleyIndemnityForm = (): JSX.Element => {
	const [writingNumber, setWritingNumber] = useState(1408);
	const [plan, setPlan] = useState({
		plan_name: "Beazley Group Limited Indemnity",
		plan_code: "plan001",
		start_date: "01/01/2023",
		end_date: "01/01/2024"
	});
	const [premium_plan, setPremiumPlan] = useState<any>({
		clinic_card: {
			employee: 9.23,
			employee_and_spouse: 13.85,
			employee_and_children: 13.85,
			employee_and_family: 13.85
		},
		coverage_for: {
			employee: [
				{
					name: "plan 2",
					premium_amount: 10.38
				},
				{
					name: "plan 3",
					premium_amount: 14.31
				},
				{
					name: "plan 4 with RX",
					premium_amount: 33.35
				}
			],
			employee_and_spouse: [
				{
					name: "plan 2",
					premium_amount: 20.77
				},
				{
					name: "plan 3",
					premium_amount: 28.62
				},
				{
					name: "plan 4 with Rx",
					premium_amount: 64.91
				}
			],
			employee_and_children: [
				{
					name: "plan 2",
					premium_amount: 16.62
				},
				{
					name: "plan 3",
					premium_amount: 22.89
				},
				{
					name: "plan 4 with RX",
					premium_amount: 52.29
				}
			],
			employee_and_family: [
				{
					name: "plan 2",
					premium_amount: 27.00
				},
				{
					name: "plan 3",
					premium_amount: 37.20
				},
				{
					name: "plan 4 with Rx",
					premium_amount: 83.84
				}
			]
		}
	});
	const [prevWritingNumber, setPrevWritingNumber] = useState(1408);
	const [showWritingNumberValidateButton, setShowWritingNumberValidateButton] = useState(false);
	const { theme } = useContext(ThemeContext);
	const [coverage_for, setCoverageFor] = useState("");
	const [coverage_level, setCoverageLevel] = useState("");
	const [clinic_card, setClinicCard] = useState(false);
	const [clinic_card_amount, setClinicCardAmount] = useState(0);
	const [premium_amount, setPremiumAmount] = useState(0);
	const [total_premium_amount, setTotalPremiumAmount] = useState(0);

	const handleCoverageForChange = (event: React.FormEvent<HTMLSelectElement>) => {
		const { value } = event.target as HTMLSelectElement;
		setCoverageFor(value);
	};

	const handleCoverageLevelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const { value } = event.target as HTMLSelectElement;
		setCoverageLevel(value);
	};

	const handleClinicCardChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { checked } = event.target as HTMLInputElement;
		setClinicCard(checked);
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
			let coverageFor = "";
			if (coverage_for === "Employee Only") coverageFor = "employee";
			else if (coverage_for === "Employee and Spouse") coverageFor = "employee_and_spouse";
			else if (coverage_for === "Employee and Dependent") coverageFor = "employee_and_children";
			else coverageFor = "employee_and_family";
			const calculatePremiumAmount = premium_plan.coverage_for[coverageFor]?.find((plan: { name: string; }) => plan.name.toLowerCase() === coverage_level.toLowerCase())?.premium_amount;
			setPremiumAmount(calculatePremiumAmount);
			setTotalPremiumAmount(calculatePremiumAmount);
			if (clinic_card) {
				const riderAmount = premium_plan.clinic_card[coverageFor];
				setClinicCardAmount(riderAmount);
				setTotalPremiumAmount(calculatePremiumAmount + riderAmount);
			}
		}
	};

	useEffect(() => {
		calculatePremium();
	}, [coverage_for, coverage_level, clinic_card]);

	const { plan_name, plan_code, start_date, end_date } = plan;

	return (
		<div className="kemper-cancer-form plan-form">
			<div className="paper-form-container">
				<Paper className="theme-border-radius paper-container" elevation={1}>
					<PlanHeader planName="Beazley Group Limited Indemnity Insurance Policy" effectiveDate={start_date} />
					<div className="plan-content">
						<div className="theme-plan-section-margin" />
						<div className="header-container">
							<div className="theme-plan-header">Standard Benefits</div>
							<div className="theme-plan-sub-header" style={{ borderLeftColor: theme.primary_color }}>
								In addition to yourself, who would you like to cover under this plan?
							</div>
						</div>
						<div className="theme-plan-inner-section-margin-2" />
						<Grid container columnSpacing={2}>
							<Grid item xl={6} lg={10} md={10} sm={10} xs={10}>
								<div className="details-form-row">
									<div className="details-form-label  required">Coverage</div>
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
							<Grid item xl={6} lg={10} md={10} sm={10} xs={10}>
								<div className="details-form-row">
									<div className="details-form-label  required">Coverage Level</div>
									<Select
										input={<CustomSelectInput />}
										style={{ width: "100%" }}
										name="contact_label"
										onChange={(event: any) => handleCoverageLevelChange(event)}
									>
										<MenuItem value={"plan 2"}>PLAN 2</MenuItem>
										<MenuItem value={"plan 3"}>PLAN 3</MenuItem>
										<MenuItem value={"plan 4 with rx"}>PLAN 4 WITH RX</MenuItem>
									</Select>
								</div>
							</Grid>
							<Grid item xl={10} lg={10} md={10} sm={10} xs={10}>
								<div className="details-form-row">
									<div className="details-form-label required">Premium</div>
									<CustomInput disabled value={premium_amount == 0 ? "" : `$${premium_amount}`} />
								</div>
							</Grid>
						</Grid>
						<div className="theme-plan-inner-section-margin" />
						<div className="header-container">
							<div className="theme-plan-header">Rider Benefits</div>
						</div>
						<Grid container className="theme-plan-inner-section-margin">
							<Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
								<div className="theme-plan-sub-header" style={{ borderLeftColor: theme.primary_color }}>
									<input type="checkbox" onChange={(event: any) => handleClinicCardChange(event)}></input>
									<label className="details-form-label required">Clinic Card</label>
								</div>
							</Grid>
							<Grid item xl={9} lg={9} md={9} sm={12} xs={12}>
								<div className="details-form-row">
									<CustomInput
										disabled
										value={coverage_for && coverage_level && clinic_card ? `$${clinic_card_amount}` : ""}
									/>
								</div>
							</Grid>
						</Grid>
						<div className="theme-plan-inner-section-margin" />
						<Grid container className="theme-plan-inner-section-margin">
							<Grid item xl={10} lg={10} md={10} sm={10} xs={10}>
								<div className="details-form-row">
									<div
										className="details-form-label theme-plan-total-premium"
										style={{ color: theme.primary_color }}
									>
										Total Premium
									</div>
									<CustomInput
										disabled
										value={total_premium_amount == 0 ? "" : `$${total_premium_amount.toFixed(2)}`}
									//value={10}
									/>
								</div>
							</Grid>
						</Grid>
					</div>
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

export default BeazleyIndemnityForm;
