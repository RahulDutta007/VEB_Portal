import { Button, MenuItem } from "@mui/material";
import { Select } from "@mui/material";
import { Grid, Paper } from "@mui/material";
import React, { useContext } from "react";
import { COVERAGE } from "../../../../../../../constants/coverage";
import { ThemeContext } from "../../../../../../../contexts";
import { LazyPlanActions, PlanHeader } from "../../../../../../shared";
import CustomInput from "../../../../../../shared/customInput/CustomInput";
import CustomSelectInput from "../../../../../../shared/customInput/CustomSelectInput";
import { Checkbox } from "@mui/material";
import { useState } from "react";
import { useCallback } from "react";

import "./cancerForm.css";

const KemperCancerForm = (): JSX.Element => {
	const [writingNumber, setWritingNumber] = useState(1408);
	const [prevWritingNumber, setPrevWritingNumber] = useState(1408);
	const [showWritingNumberValidateButton, setShowWritingNumberValidateButton] = useState(false);
	const { theme } = useContext(ThemeContext);

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

	return (
		<div className="kemper-cancer-form plan-form">
			<div className="paper-form-container">
				<Paper className="theme-border-radius paper-container" elevation={1}>
					<PlanHeader planName="Kemper Group Cancer Insurance Policy" effectiveDate="01/22/2022" />
					<div className="plan-content">
						<div className="theme-plan-section-margin" />
						<div className="header-container">
							<div className="theme-plan-header">Standard Benefits</div>
							<div
								className="theme-plan-sub-header plan-text"
								style={{ borderLeftColor: theme.primary_color }}
							>
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
									>
										<MenuItem value={"High Plan"}>High Plan</MenuItem>
										<MenuItem value={"Low Plan"}>Low Plan</MenuItem>
									</Select>
								</div>
							</Grid>
							<Grid item xl={2} lg={2} md={2} sm={6} xs={6}>
								<div className="details-form-row">
									<div className="details-form-label required align-center">Premium</div>
									<div className="show-premium">$0.00</div>
								</div>
							</Grid>
						</Grid>
					</div>
					<div className="plan-content">
						<div className="theme-plan-section-margin" />
						<div className="header-container header-container-new">
							<div className="theme-plan-header">Rider Benefits</div>
						</div>
						<div>
							<div
								className="theme-plan-sub-header plan-text"
								style={{ borderLeftColor: theme.primary_color }}
							>
								In addition to yourself, who would you like to cover under this plan?
							</div>
							<Grid className="grid-container" container columnSpacing={2}>
								<Grid item xl={10} lg={10} md={10} sm={6} xs={6} className="margin-adjust-33">
									<input type="checkbox" disabled checked></input>
									<label className="details-form-label required">
										Intensive Care Unit - Rider Premium
									</label>
								</Grid>
								<Grid item xl={2} lg={2} md={2} sm={6} xs={6}>
									<div className="details-form-row">
										<div className="details-form-label required align-center">Premium</div>
										<div className="show-premium">$200.00</div>
									</div>
								</Grid>
							</Grid>
						</div>
					</div>
					<div className="theme-plan-inner-section-margin" />
					<Grid container className="theme-plan-inner-section-margin">
						<Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
							<div className="details-form-row">
								<div
									className="details-form-label theme-plan-total-premium align-right"
									style={{ color: theme.primary_color }}
								>
									Total Premium: <span className="show-premium margin-adjust">$200.00</span>
								</div>
							</div>
						</Grid>
					</Grid>
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

export default KemperCancerForm;
