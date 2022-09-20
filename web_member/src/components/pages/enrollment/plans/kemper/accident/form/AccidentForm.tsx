import { Button, MenuItem, SelectChangeEvent } from "@mui/material";
import { Select } from "@mui/material";
import { Grid, Paper } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { COVERAGE } from "../../../../../../../constants/coverage";
import { AuthContext, ThemeContext } from "../../../../../../../contexts";
import { LazyPlanActions, PlanHeader } from "../../../../../../shared";
import CustomInput from "../../../../../../shared/customInput/CustomInput";
import CustomSelectInput from "../../../../../../shared/customInput/CustomSelectInput";
import { Checkbox } from "@mui/material";
import { useState } from "react";
import { useCallback } from "react";

import "./accidentForm.css";
import {
	AccidentDocAndRxPlanDetails,
	AccidentPlanCoverage,
	AccidentPlanCoverageLevel,
	AccidentPlanDetails,
	AccidentRiderPlanCoverage,
	AccidentRiderPlanDetails,
	PaycheckFrequency
} from "../../../../../../../@types/plan.types";
import { PayFrequency } from "../../../../../../../@types/paycheck.types";
import { getKemperCancerEligibleDependents } from "../../../../../../../utils/commonFunctions/eligibleDependents";
import { PlanFormProps } from "../../../../../../../@types/components/enrollment.types";
import { Member } from "../../../../../../../@types/member.types";
import { Enrollment } from "../../../../../../../@types/enrollment.types";
import { EnrollmentCommonDetails, EnrollmentStandardDetails } from "../../../../../../../@types/enrollment.types";
import { getCoveredDependents } from "../../../../../../../utils/commonFunctions/coveredDependents";
import { generateCancerKemperActivateEnrollmentPayload } from "../../../../../../../utils/commonFunctions/enrollment";

const KemperAccidentForm = ({ dependents }: PlanFormProps): JSX.Element => {
	const [writingNumber, setWritingNumber] = useState(1408);
	const [accidentPlan, setPlan] = useState({
		_id: "123zxkbnkabb3w2123",
		plan_name: "Accident",
		plan_code: "plan001",
		start_date: "01/01/2023",
		end_date: "01/01/2024"
	});
	const [intensiveCareUnitPlan, setIntensiveCareUnitPlan] = useState({
		_id: "123zxkbnkabb3w2123",
		plan_name: "Accident - Intensive Care Unit",
		plan_code: "ICU"
	});
	const [eligibleDependents, setEligibleDependents] = useState<Member[]>([]);
	const { paycheck, member, groupOwner } = useContext(AuthContext);
	const [docAndRx, setDocAndRx] = useState<AccidentDocAndRxPlanDetails>({
		standard_premium: {
			WEEKLY: 1.16,
			MONTHLY: 1.16
		}
	});
	const [hasSelectedRider, setHasSelectedRider] = useState(false);
	const [riderPlanDetails, setRiderPlanDetails] = useState<AccidentRiderPlanDetails>({
		rider_type: ["Rider Accident Only", "Rider Accident Only"],
		monthly_benefit: [600, 900, 1200, 1800],
		standard_premium: {
			"Rider Accident Only": {
				WEEKLY: [
					{
						coverageAmount: 600,
						premiumAmount: 1.33
					}
				],
				MONTHLY: [
					{
						coverageAmount: 600,
						premiumAmount: 1.33
					}
				]
			},
			"Rider Accident And Sickness": {
				WEEKLY: [
					{
						coverageAmount: 600,
						premiumAmount: 5.86
					}
				],
				MONTHLY: [
					{
						coverageAmount: 600,
						premiumAmount: 5.86
					}
				]
			}
		}
	});
	const [accidentPlanDetails, setAccidentPlanDetails] = useState<AccidentPlanDetails>({
		coverage: [],
		coverage_level: ["Edge Enhanced", "Edge Premier"],
		premium_amount: {
			standard_premium: {
				"Employee Only": {
					"Edge Enhanced": {
						WEEKLY: 7.47,
						MONTHLY: 7.47
					},
					"Edge Premier": {
						WEEKLY: 9.47,
						MONTHLY: 9.47
					}
				},
				"Employee & Dependents": {
					"Edge Enhanced": {
						WEEKLY: 7.47,
						MONTHLY: 7.47
					},
					"Edge Premier": {
						WEEKLY: 9.47,
						MONTHLY: 9.47
					}
				},
				"Employee & Spouse": {
					"Edge Enhanced": {
						WEEKLY: 7.47,
						MONTHLY: 7.47
					},
					"Edge Premier": {
						WEEKLY: 9.47,
						MONTHLY: 9.47
					}
				},
				"Employee & Family": {
					"Edge Enhanced": {
						WEEKLY: 7.47,
						MONTHLY: 7.47
					},
					"Edge Premier": {
						WEEKLY: 9.47,
						MONTHLY: 9.47
					}
				}
			}
		}
	});
	const [accidentPlanInputs, setAccidentPlanInputs] = useState<{
		coverage: null | string;
		coverage_level: null | string;
		rider_type: null | string;
		monthly_benefit: null | string;
		doc_and_rx: number;
	}>({
		coverage: null,
		coverage_level: null,
		rider_type: null,
		monthly_benefit: null,
		doc_and_rx: 0
	});

	// const [premium_plan, setPremiumPlan] = useState({
	// 	edge_enhanced: {
	// 		employee: 3.82,
	// 		employee_and_family: 8.08
	// 	},
	// 	edge_premier: {
	// 		employee: 6.07,
	// 		employee_and_family: 12.8
	// 	},
	// 	rider_doc_Rx: 1.16,
	// 	rider_accidentOnly: [
	// 		{
	// 			coverage_amount: 600,
	// 			premium_amount: 1.33
	// 		},
	// 		{
	// 			coverage_amount: 900,
	// 			premium_amount: 2.0
	// 		},
	// 		{
	// 			coverage_amount: 1200,
	// 			premium_amount: 2.67
	// 		},
	// 		{
	// 			coverage_amount: 1800,
	// 			premium_amount: 4.0
	// 		}
	// 	],
	// 	rider_accident_and_sickness: [
	// 		{
	// 			coverage_amount: 600,
	// 			premium_amount: 5.86
	// 		},
	// 		{
	// 			coverage_amount: 900,
	// 			premium_amount: 8.79
	// 		},
	// 		{
	// 			coverage_amount: 1200,
	// 			premium_amount: 11.72
	// 		},
	// 		{
	// 			coverage_amount: 1800,
	// 			premium_amount: 17.59
	// 		}
	// 	]
	// });
	const [prevWritingNumber, setPrevWritingNumber] = useState(1408);
	const [showWritingNumberValidateButton, setShowWritingNumberValidateButton] = useState(false);
	const { theme } = useContext(ThemeContext);
	const [coverage_for, setCoverageFor] = useState("");
	const [plan_type, setPlanType] = useState("");
	const [premium_amount, setPremiumAmount] = useState(0);
	const [rider_premium_amount, setRiderPremiumAmount] = useState(0);
	const [doc_premium_amount, setDocPremiumAmount] = useState(0);
	const [total_premium_amount, setTotalPremiumAmount] = useState(0);
	const [rider_type, setRiderType] = useState("none");
	const [rider_benefit_amount, setRiderBenefitAmount] = useState(0);

	const handleAccidentFormChange = (event: SelectChangeEvent) => {
		const { name, value } = event.target as HTMLSelectElement;
		setAccidentPlanInputs(
			Object.assign({}, accidentPlanInputs, {
				[name]: value
			})
		);
	};

	const handleSelectedRiderCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { checked } = event.target;
		setHasSelectedRider(checked);
		if (!checked) {
			setAccidentPlanInputs(
				Object.assign({}, accidentPlanInputs, {
					rider_type: null,
					monthly_benefit: null
				})
			);
		}
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

	const handleActivateButtonCallback = useCallback(() => {
		if (
			member &&
			accidentPlanInputs.coverage &&
			accidentPlanInputs.coverage_level &&
			accidentPlanInputs.rider_type &&
			accidentPlanInputs.monthly_benefit
		) {
			console.log("cancerPlanInputs", accidentPlanInputs);
			const enrollments: { plan: any; premiumAmount: number }[] = [
				{ plan: accidentPlan, premiumAmount: premium_amount }
			];
			if (hasSelectedRider) {
				enrollments.push({ plan: intensiveCareUnitPlan, premiumAmount: rider_premium_amount });
			}
			enrollments.forEach(({ plan, premiumAmount }: any, index: number) => {
				const enrollment: Enrollment = generateCancerKemperActivateEnrollmentPayload(
					plan,
					groupOwner,
					member,
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					accidentPlanInputs.coverage!,
					premiumAmount,
					eligibleDependents
				);
				console.log("enrollment", index, enrollment);
			});
		}
	}, [
		member,
		accidentPlanInputs,
		accidentPlan,
		premium_amount,
		hasSelectedRider,
		intensiveCareUnitPlan,
		rider_premium_amount,
		groupOwner,
		eligibleDependents
	]);

	const calculatePremium = useCallback(() => {
		const { coverage, coverage_level, rider_type, monthly_benefit } = accidentPlanInputs;
		let calculatePremiumAmount = 0;
		let riderPremiumAmount = 0;
		if (coverage && coverage_level && paycheck) {
			calculatePremiumAmount =
				accidentPlanDetails.premium_amount.standard_premium[coverage as keyof AccidentPlanCoverage][
					coverage_level as keyof AccidentPlanCoverageLevel
				][paycheck.pay_frequency as keyof PaycheckFrequency];
			setPremiumAmount(calculatePremiumAmount);
			setDocPremiumAmount(docAndRx.standard_premium[paycheck.pay_frequency as keyof PaycheckFrequency]);
			setTotalPremiumAmount(calculatePremiumAmount + doc_premium_amount + riderPremiumAmount);
		}
		if (rider_type && monthly_benefit && paycheck) {
			const riderPremiumAmountArray =
				riderPlanDetails.standard_premium[rider_type as keyof AccidentRiderPlanCoverage][
					paycheck.pay_frequency as keyof PaycheckFrequency
				];
			const riderPremiumAmountDetails = riderPremiumAmountArray.find(
				(amount: any) => amount.coverageAmount === parseInt(monthly_benefit)
			);
			riderPremiumAmount = riderPremiumAmountDetails !== undefined ? riderPremiumAmountDetails.premiumAmount : 0;
			setRiderPremiumAmount(riderPremiumAmount);
			setTotalPremiumAmount(calculatePremiumAmount + riderPremiumAmount + doc_premium_amount);
		}
	}, [
		accidentPlanDetails.premium_amount.standard_premium,
		accidentPlanInputs,
		docAndRx.standard_premium,
		doc_premium_amount,
		paycheck,
		riderPlanDetails.standard_premium
	]);

	useEffect(() => {
		calculatePremium();
	}, [calculatePremium, coverage_for, plan_type, rider_benefit_amount, rider_type]);

	useEffect(() => {
		console.log("UE3");
		setTotalPremiumAmount(rider_premium_amount + premium_amount + doc_premium_amount);
	}, [rider_premium_amount, premium_amount, doc_premium_amount]);

	useEffect(() => {
		console.log("UE1");
		const dependentCoverage = getKemperCancerEligibleDependents(dependents);
		console.log("dependentCoverage", dependentCoverage);
		setEligibleDependents(Object.assign([], dependentCoverage.dependents));
		setAccidentPlanDetails((prevCancerPlanDetails: AccidentPlanDetails) => {
			return Object.assign({}, prevCancerPlanDetails, {
				coverage: dependentCoverage.coverage
			});
		});
	}, [dependents]);

	const { start_date } = accidentPlan;

	return (
		<div className="kemper-cancer-form plan-form">
			<div className="paper-form-container">
				<Paper className="theme-border-radius paper-container" elevation={1}>
					<PlanHeader planName="Kemper Accident Insurance Policy" effectiveDate={start_date} />
					<div className="plan-content">
						<div className="theme-plan-section-margin" />
						<div className="header-container header-container-new">
							<div className="theme-plan-header">Standard Benefits</div>
						</div>
						<div>
							<div
								className="theme-plan-sub-header plan-text"
								style={{ borderLeftColor: theme.primary_color }}
							>
								In addition to yourself, who would you like to cover under this plan?
							</div>
							<Grid className="grid-container" container columnSpacing={2}>
								<Grid item xl={5} lg={5} md={5} sm={5} xs={6}>
									<div className="details-form-row">
										<div className="details-form-label  required">Coverage For</div>
										<Select
											input={<CustomSelectInput />}
											style={{ width: "100%" }}
											name="coverage"
											onChange={(event: SelectChangeEvent) => handleAccidentFormChange(event)}
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
								<Grid item xl={5} lg={5} md={5} sm={5} xs={6}>
									<div className="details-form-row">
										<div className="details-form-label  required">Coverage Level</div>
										<Select
											input={<CustomSelectInput />}
											style={{ width: "100%" }}
											name="coverage_level"
											onChange={(event: SelectChangeEvent) => handleAccidentFormChange(event)}
										>
											<MenuItem value={"Edge Enhanced"}>Edge Enhanced</MenuItem>
											<MenuItem value={"Edge Premier"}>Edge Premier</MenuItem>
										</Select>
									</div>
								</Grid>
								<Grid item xl={2} lg={2} md={2} sm={2} xs={6}>
									<div className="details-form-row">
										<div className="details-form-label required align-center">Premium</div>
										<div className="show-premium">
											{premium_amount == 0 ? "$0.00" : `$${premium_amount.toFixed(2)}`}
										</div>
									</div>
								</Grid>
							</Grid>
						</div>
					</div>
					<Grid item xl={10} lg={10} md={10} sm={6} xs={6} className="margin-adjust-33">
						<Checkbox
							checked={hasSelectedRider}
							value={hasSelectedRider}
							style={{ paddingLeft: 0 }}
							onChange={handleSelectedRiderCheckboxChange}
						/>
						<label className="details-form-label required">Intensive Care Unit - Rider Premium</label>
					</Grid>
					<div className="plan-content">
						<div className="theme-plan-section-margin" />
						{hasSelectedRider ? (
							<>
								<div className="header-container header-container-new">
									<div className="theme-plan-header">Rider Benefits</div>
								</div>
								<div>
									<div
										className="theme-plan-sub-header plan-text"
										style={{ borderLeftColor: theme.primary_color }}
									>
										Disability income rider rates
									</div>
									<Grid className="grid-container" container columnSpacing={2}>
										<Grid item xl={5} lg={5} md={5} sm={5} xs={6}>
											<div className="details-form-row">
												<div className="details-form-label  required">
													Disability income rider type
												</div>
												<Select
													input={<CustomSelectInput />}
													style={{ width: "100%" }}
													name="rider_type"
													onChange={(event: SelectChangeEvent) =>
														handleAccidentFormChange(event)
													}
												>
													<MenuItem value={"no_rider"} className="empty-option"></MenuItem>
													<MenuItem value={"Rider Accident Only"}>Accident Only</MenuItem>
													<MenuItem value={"Rider Accident And Sickness"}>
														Accident and Sickness
													</MenuItem>
												</Select>
											</div>
										</Grid>
										<Grid item xl={5} lg={5} md={5} sm={5} xs={6}>
											<div className="details-form-row">
												<div className="details-form-label  required">
													Monthly disability benefit
												</div>
												<Select
													input={<CustomSelectInput />}
													style={{ width: "100%" }}
													name="monthly_benefit"
													onChange={(event: SelectChangeEvent) =>
														handleAccidentFormChange(event)
													}
												>
													<MenuItem value={0} className="empty-option"></MenuItem>
													<MenuItem value={600}>$600</MenuItem>
													<MenuItem value={900}>$900</MenuItem>
													<MenuItem value={1200}>$1200</MenuItem>
													<MenuItem value={1800}>$1800</MenuItem>
												</Select>
											</div>
										</Grid>
										<Grid item xl={2} lg={2} md={2} sm={2} xs={6} className="">
											<div className="details-form-row">
												<div className="details-form-label required align-center">Premium</div>
												<div className="show-premium">
													{rider_premium_amount == 0
														? "$0.00"
														: `$${rider_premium_amount.toFixed(2)}`}
												</div>
											</div>
										</Grid>
									</Grid>
								</div>
							</>
						) : null}
						<div>
							<div
								className="theme-plan-sub-header plan-text"
								style={{ borderLeftColor: theme.primary_color }}
							>
								Doctor & Rx
							</div>
							<Grid className="grid-container" container columnSpacing={2}>
								<Grid item xl={10} lg={10} md={10} sm={10} xs={6} className="margin-adjust-33">
									<label className="details-form-label required">Doctor & RX</label>
								</Grid>
								<Grid item xl={2} lg={2} md={2} sm={2} xs={6}>
									<div className="details-form-row">
										<div className="details-form-label required align-center">Premium</div>
										<div className="show-premium">
											{doc_premium_amount == 0 ? "$0.00" : `$${doc_premium_amount.toFixed(2)}`}
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
						activateButtonCallback={handleActivateButtonCallback}
					/>
				</Paper>
			</div>
		</div>
	);
};

export default KemperAccidentForm;
