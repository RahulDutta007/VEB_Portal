import { Button, MenuItem, SelectChangeEvent } from "@mui/material";
import { Select } from "@mui/material";
import { Grid, Paper } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { COVERAGE } from "../../../../../../../constants/coverage";
import { INSUARANCEPRIMIER } from "../../../../../../../constants/insuarancePremier";
import { AGERANGE } from "../../../../../../../constants/ageRange";
import { BENEFITAMOUNT } from "../../../../../../../constants/benefitAmount";
import { ThemeContext } from "../../../../../../../contexts";
import { LazyPlanActions, PlanHeader } from "../../../../../../shared";
import { CustomInput, CustomSelectInput } from "../../../../../../shared/customInput";
import { Checkbox } from "@mui/material";
import { useState } from "react";
import { useCallback } from "react";

import "./criticalIllness.css";
import { CriticalIllnessPremium } from "../../../../../../../@types/criticalIllnessPrimium.types";

const KemperCriticalIllnessForm = (): JSX.Element => {
	const [writingNumber, setWritingNumber] = useState(1408);
	const [prevWritingNumber, setPrevWritingNumber] = useState(1408);
	const [showWritingNumberValidateButton, setShowWritingNumberValidateButton] = useState(false);
	const [standerdPremium, setStanderdPremium] = useState("");
	const [criticalIllnessPremium, setCriticalIllnessPremium] = useState<CriticalIllnessPremium>({
		insuarance_premier: "",
		age_range: "",
		benefit_amount: "",
		coverage: ""
	});
	const { theme } = useContext(ThemeContext);

	function calculateCoverage(key: string, employeeValue: string, familyValue: string) {
		if (key === "Employee Only") {
			setStanderdPremium(employeeValue);
		} else {
			setStanderdPremium(familyValue);
		}
	}

	const handleChangePremium = (event: SelectChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setCriticalIllnessPremium(Object.assign({}, criticalIllnessPremium, { [name]: value }));
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

	useEffect(() => {
		if (
			Object.entries(criticalIllnessPremium).every(([key, value], index: number) => {
				return value.length > 0;
			})
		) {
			const { insuarance_premier, age_range, benefit_amount, coverage } = criticalIllnessPremium;
			if (insuarance_premier === "Without Cancer") {
				if (age_range === "18-39") {
					if (benefit_amount === "$10,000") {
						calculateCoverage(coverage, "$0.66", "$1.52");
					} else if (benefit_amount === "$20,000") {
						calculateCoverage(coverage, "$1.03", "$2.31");
					} else {
						calculateCoverage(coverage, "$1.40", "$3.10");
					}
				} else if (age_range === "40-59") {
					if (benefit_amount === "$10,000") {
						calculateCoverage(coverage, "$3.03", "$6.17");
					} else if (benefit_amount === "$20,000") {
						calculateCoverage(coverage, "$5.71", "$11.52");
					} else {
						calculateCoverage(coverage, "$8.40", "$16.86");
					}
				} else if (age_range === "60-64") {
					if (benefit_amount === "$10,000") {
						calculateCoverage(coverage, "$5.13", "$10.30");
					} else if (benefit_amount === "$20,000") {
						calculateCoverage(coverage, "$9.92", "$19.77");
					} else {
						calculateCoverage(coverage, "$14.71", "$29.24");
					}
				} else {
					if (benefit_amount === "$10,000") {
						calculateCoverage(coverage, "$8.47", "$16.03");
					} else if (benefit_amount === "$20,000") {
						calculateCoverage(coverage, "$16.59", "$31.22");
					} else {
						calculateCoverage(coverage, "$24.71", "$46.42");
					}
				}
			} else if (insuarance_premier === "With Cancer") {
				if (age_range === "18-39") {
					if (benefit_amount === "$10,000") {
						calculateCoverage(coverage, "$1.12", "$2.46");
					} else if (benefit_amount === "$20,000") {
						calculateCoverage(coverage, "$1.94", "$4.18");
					} else {
						calculateCoverage(coverage, "$2.77", "$5.91");
					}
				} else if (age_range === "40-59") {
					if (benefit_amount === "$10,000") {
						calculateCoverage(coverage, "$5.71", "$11.15");
					} else if (benefit_amount === "$20,000") {
						calculateCoverage(coverage, "$11.07", "$21.47");
					} else {
						calculateCoverage(coverage, "$16.44", "$31.79");
					}
				} else if (age_range === "60-64") {
					if (benefit_amount === "$10,000") {
						calculateCoverage(coverage, "$9.75", "$19.16");
					} else if (benefit_amount === "$20,000") {
						calculateCoverage(coverage, "$19.16", "$37.48");
					} else {
						calculateCoverage(coverage, "$28.57", "$55.81");
					}
				} else {
					if (benefit_amount === "$10,000") {
						calculateCoverage(coverage, "$15.05", "$28.37");
					} else if (benefit_amount === "$20,000") {
						calculateCoverage(coverage, "$29.75", "$55.90");
					} else {
						calculateCoverage(coverage, "$44.46", "$83.44");
					}
				}
			} else {
				setStanderdPremium("");
			}
		} else {
			setStanderdPremium("");
		}
	}, [criticalIllnessPremium]);

	return (
		<div className="kemper-cancer-form plan-form">
			<div className="paper-form-container">
				<Paper className="theme-border-radius paper-container" elevation={1}>
					<PlanHeader planName="Kemper Group Critical Illness Insurance Policy" effectiveDate="01/22/2022" />
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
							{/* New Row */}
							<Grid item xl={6} lg={10} md={10} sm={10} xs={10}>
								<div className="details-form-row">
									<div className="details-form-label  required">Insuarance Premier</div>
									<Select
										input={<CustomSelectInput />}
										style={{ width: "100%" }}
										name="insuarance_premier"
										onChange={(event: SelectChangeEvent<HTMLInputElement>) =>
											handleChangePremium(event)
										}
									>
										{INSUARANCEPRIMIER.map((option: string, index: number) => {
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
									<div className="details-form-label  required">Age Range</div>
									<Select
										input={<CustomSelectInput />}
										style={{ width: "100%" }}
										name="age_range"
										onChange={(event: SelectChangeEvent<HTMLInputElement>) =>
											handleChangePremium(event)
										}
									>
										{AGERANGE.map((option: string, index: number) => {
											return (
												<MenuItem value={option} key={index}>
													{option}
												</MenuItem>
											);
										})}
									</Select>
								</div>
							</Grid>
							{/* End New Row */}
							<Grid item xl={6} lg={10} md={10} sm={10} xs={10}>
								<div className="details-form-row">
									<div className="details-form-label  required">Coverage</div>
									<Select
										input={<CustomSelectInput />}
										style={{ width: "100%" }}
										name="coverage"
										onChange={(event: SelectChangeEvent<HTMLInputElement>) =>
											handleChangePremium(event)
										}
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
									<div className="details-form-label  required">Benefit Amount</div>
									<Select
										input={<CustomSelectInput />}
										style={{ width: "100%" }}
										name="benefit_amount"
										onChange={(event: SelectChangeEvent<HTMLInputElement>) =>
											handleChangePremium(event)
										}
									>
										{BENEFITAMOUNT.map((option: string, index: number) => {
											return (
												<MenuItem value={option} key={index}>
													{option}
												</MenuItem>
											);
										})}
									</Select>
								</div>
							</Grid>
							<Grid item xl={10} lg={10} md={10} sm={10} xs={10}>
								<div className="details-form-row">
									<div className="details-form-label required">Standard Premium</div>
									<CustomInput disabled value={standerdPremium} />
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
									<CustomInput disabled value={standerdPremium} />
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

export default KemperCriticalIllnessForm;
function index(arg0: any[], index: any, number: any) {
	throw new Error("Function not implemented.");
}