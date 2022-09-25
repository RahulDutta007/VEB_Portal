import { Button, MenuItem, SelectChangeEvent } from "@mui/material";
import { Select } from "@mui/material";
import { Grid, Paper } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { COVERAGE } from "../../../../../../../constants/coverage";
import { AuthContext, EnrollmentContext, ThemeContext } from "../../../../../../../contexts";
import { LazyPlanActions, PlanHeader } from "../../../../../../shared";
import CustomInput from "../../../../../../shared/customInput/CustomInput";
import CustomSelectInput from "../../../../../../shared/customInput/CustomSelectInput";
import { Checkbox } from "@mui/material";
import { useState } from "react";
import { useCallback } from "react";
import "./indemnityForm.css";
import {
	BeazleyPlanCoverageLevel,
	BeazleyPlanDetails,
	BeazleyRiderPlanCoverage,
	BeazleyStanderdPlanCoverage,
	PaycheckFrequency
} from "../../../../../../../@types/plan.types";
import { Member } from "../../../../../../../@types/member.types";
import { getKemperCancerEligibleDependents } from "../../../../../../../utils/commonFunctions/eligibleDependents";
import { generateCancerKemperActivateEnrollmentPayload } from "../../../../../../../utils/commonFunctions/enrollment";
import { Enrollment } from "../../../../../../../@types/enrollment.types";

const BeazleyIndemnityForm = (): JSX.Element => {
	const [writingNumber, setWritingNumber] = useState(1408);
	const [plan, setPlan] = useState({
		plan_name: "Beazley Group Limited Indemnity",
		plan_code: "plan001",
		start_date: "01/01/2023",
		end_date: "01/01/2024"
	});
	const [riderBenefitPlan, setRiderBenefitPlan] = useState({
		_id: "123zxkbnkabb3w2123",
		plan_name: "Beazley - Intensive Care Unit",
		plan_code: "ICU"
	});
	const [beazleyPlanInputs, setBeazleyPlanInputs] = useState<{
		coverage: null | string;
		coverage_level: null | string;
		isRiderAdded: boolean;
	}>({
		coverage: null,
		coverage_level: null,
		isRiderAdded: false
	});
	const [beazleyPlan, setBeazleyPlan] = useState<BeazleyPlanDetails>({
		coverage: [],
		coverage_level: ["Plan 2", "Plan 3", "Plan 4 with RX"],
		premium_amount: {
			standard_premium: {
				"Employee Only": {
					"Plan 2": {
						WEEKLY: 10.38,
						MONTHLY: 10.38
					},
					"Plan 3": {
						WEEKLY: 14.31,
						MONTHLY: 14.31
					},
					"Plan 4 with RX": {
						WEEKLY: 35.35,
						MONTHLY: 35.35
					}
				},
				"Employee & Spouse": {
					"Plan 2": {
						WEEKLY: 10.38,
						MONTHLY: 10.38
					},
					"Plan 3": {
						WEEKLY: 14.31,
						MONTHLY: 14.31
					},
					"Plan 4 with RX": {
						WEEKLY: 35.35,
						MONTHLY: 35.35
					}
				},
				"Employee & Dependents": {
					"Plan 2": {
						WEEKLY: 10.38,
						MONTHLY: 10.38
					},
					"Plan 3": {
						WEEKLY: 14.31,
						MONTHLY: 14.31
					},
					"Plan 4 with RX": {
						WEEKLY: 35.35,
						MONTHLY: 35.35
					}
				},
				"Employee & Family": {
					"Plan 2": {
						WEEKLY: 10.38,
						MONTHLY: 10.38
					},
					"Plan 3": {
						WEEKLY: 14.31,
						MONTHLY: 14.31
					},
					"Plan 4 with RX": {
						WEEKLY: 35.35,
						MONTHLY: 35.35
					}
				}
			},
			rider_premium: {
				"Employee Only": {
					WEEKLY: 9.23,
					MONTHLY: 9.23
				},
				"Employee & Spouse": {
					WEEKLY: 13.85,
					MONTHLY: 13.85
				},
				"Employee & Dependents": {
					WEEKLY: 13.85,
					MONTHLY: 13.85
				},
				"Employee & Family": {
					WEEKLY: 13.85,
					MONTHLY: 13.85
				}
			}
		}
	});
	const [prevWritingNumber, setPrevWritingNumber] = useState(1408);
	const [showWritingNumberValidateButton, setShowWritingNumberValidateButton] = useState(false);
	const { theme } = useContext(ThemeContext);
	const [clinic_card_amount, setClinicCardAmount] = useState(0);
	const [premium_amount, setPremiumAmount] = useState(0);
	const [total_premium_amount, setTotalPremiumAmount] = useState(0);
	const { paycheck, member, dependents, groupOwner } = useContext(AuthContext);
	const [eligibleDependents, setEligibleDependents] = useState<Member[]>([]);
	const { setCurrentEnrollment } = useContext(EnrollmentContext);

	const handleBeazleyInputChange = (event: SelectChangeEvent) => {
		const { name, value } = event.target as HTMLSelectElement;
		setBeazleyPlanInputs(
			Object.assign({}, beazleyPlanInputs, {
				[name]: value
			})
		);
	};

	const handleClinicCardChange = useCallback(
		(event: SelectChangeEvent) => {
			const { checked } = event.target as HTMLInputElement;
			setBeazleyPlanInputs(
				Object.assign({}, beazleyPlanInputs, {
					isRiderAdded: checked
				})
			);
		},
		[beazleyPlanInputs]
	);

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

	const handleActivateButtonClick = useCallback(() => {
		if (member && beazleyPlanInputs.coverage) {
			console.log("beazleyPlanInputs", beazleyPlanInputs);
			const enrollments: { plan: any; premiumAmount: number }[] = [
				{ plan: beazleyPlan, premiumAmount: premium_amount }
			];
			if (beazleyPlanInputs.isRiderAdded) {
				enrollments.push({ plan: riderBenefitPlan, premiumAmount: clinic_card_amount });
			}
			enrollments.forEach(({ plan, premiumAmount }: any, index: number) => {
				const enrollment: Enrollment = generateCancerKemperActivateEnrollmentPayload(
					plan,
					groupOwner,
					member,
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					beazleyPlanInputs.coverage!,
					premiumAmount,
					eligibleDependents
				);
				console.log("enrollment", index, enrollment);
			});
		}
	}, [
		beazleyPlan,
		beazleyPlanInputs,
		clinic_card_amount,
		eligibleDependents,
		groupOwner,
		member,
		premium_amount,
		riderBenefitPlan
	]);

	const calculatePremium = useCallback(() => {
		const { coverage, coverage_level, isRiderAdded } = beazleyPlanInputs;
		let standeredPremiumAmount = 0;
		let riderPremiumAmount = 0;
		if (coverage && coverage_level && paycheck) {
			standeredPremiumAmount =
				beazleyPlan.premium_amount.standard_premium[coverage as keyof BeazleyStanderdPlanCoverage][
					coverage_level as keyof BeazleyPlanCoverageLevel
				][paycheck.pay_frequency as keyof PaycheckFrequency];
			setPremiumAmount(standeredPremiumAmount);
			if (coverage && isRiderAdded && paycheck) {
				riderPremiumAmount =
					beazleyPlan.premium_amount.rider_premium[coverage as keyof BeazleyRiderPlanCoverage][
						paycheck.pay_frequency as keyof PaycheckFrequency
					];
				setClinicCardAmount(riderPremiumAmount);
			}
			setTotalPremiumAmount(standeredPremiumAmount + riderPremiumAmount);
			setCurrentEnrollment(
				Object.assign(
					{},
					{
						plan_name: "Beazley Indementy",
						status: "Current",
						premium_amount: Number((standeredPremiumAmount + riderPremiumAmount).toFixed(2))
					}
				)
			);
		}
	}, [
		beazleyPlan.premium_amount.rider_premium,
		beazleyPlan.premium_amount.standard_premium,
		beazleyPlanInputs,
		paycheck,
		setCurrentEnrollment
	]);

	useEffect(() => {
		calculatePremium();
	}, [calculatePremium]);

	useEffect(() => {
		console.log("UE1");
		if (dependents) {
			const dependentCoverage = getKemperCancerEligibleDependents(dependents);
			console.log("dependentCoverage", dependentCoverage);
			setEligibleDependents(Object.assign([], dependentCoverage.dependents));
			setBeazleyPlan((prevBeazleyPlanDetails: BeazleyPlanDetails) => {
				return Object.assign({}, prevBeazleyPlanDetails, {
					coverage: dependentCoverage.coverage
				});
			});
		}
	}, [dependents]);

	const { start_date } = plan;

	return (
		<div className="kemper-cancer-form plan-form">
			<div className="paper-form-container">
				<Paper className="theme-border-radius paper-container" elevation={1}>
					<PlanHeader
						planName="Beazley Group Limited Indemnity Insurance Policy"
						effectiveDate={start_date}
					/>
					<div className="plan-content">
						<div className="theme-plan-section-margin" />
						<div className="header-container">
							<div className="header-container header-container-new">
								<div className="theme-plan-header">Standard Benefits</div>
							</div>
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
										name="coverage"
										onChange={(event: SelectChangeEvent) => handleBeazleyInputChange(event)}
									>
										{beazleyPlan.coverage.map((option: string, index: number) => {
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
										name="coverage_level"
										onChange={(event: SelectChangeEvent) => handleBeazleyInputChange(event)}
									>
										<MenuItem value={"Plan 2"}>PLAN 2</MenuItem>
										<MenuItem value={"Plan 3"}>PLAN 3</MenuItem>
										<MenuItem value={"Plan 4 with RX"}>PLAN 4 WITH RX</MenuItem>
									</Select>
								</div>
							</Grid>
							<Grid item xl={2} lg={2} md={2} sm={6} xs={6}>
								<div className="details-form-row">
									<div className="details-form-label required align-center">Premium</div>
									<div className="show-premium">
										{premium_amount == 0 ? "$0.00" : `$${premium_amount.toFixed(2)}`}
									</div>
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
								Clinic Card
							</div>
							<Grid className="grid-container" container columnSpacing={2}>
								<Grid item xl={10} lg={10} md={10} sm={6} xs={6} className="margin-adjust-33">
									<input
										type="checkbox"
										name="isRiderAdded"
										onChange={(event: SelectChangeEvent) => handleClinicCardChange(event)}
									></input>
									<label className="details-form-label required">Clinic Card</label>
								</Grid>
								<Grid item xl={2} lg={2} md={2} sm={6} xs={6}>
									<div className="details-form-row">
										<div className="details-form-label required align-center">Premium</div>
										<div className="show-premium">
											{beazleyPlanInputs.coverage &&
											beazleyPlanInputs.coverage_level &&
											beazleyPlanInputs.isRiderAdded
												? `$${clinic_card_amount}`
												: "$0.00"}
										</div>
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
									Total Premium:{" "}
									<span className="show-premium margin-adjust">
										{total_premium_amount == 0 ? "$0.00" : `$${total_premium_amount.toFixed(2)}`}
									</span>
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
					<LazyPlanActions
						waiveButtonCallback={() => null}
						activateButtonCallback={handleActivateButtonClick}
					/>
				</Paper>
			</div>
		</div>
	);
};

export default BeazleyIndemnityForm;
