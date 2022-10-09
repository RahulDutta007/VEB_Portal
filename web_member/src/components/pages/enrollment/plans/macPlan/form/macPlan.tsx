import { Button, MenuItem, SelectChangeEvent } from "@mui/material";
import { Select } from "@mui/material";
import { Grid, Paper } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { AuthContext, EnrollmentContext, ThemeContext } from "../../../../../../contexts";
import { LazyPlanActions, PlanHeader } from "../../../../../../components/shared";
import CustomInput from "../../../../../../components/shared/customInput/CustomInput";
import CustomSelectInput from "../../../../../../components/shared/customInput/CustomSelectInput";
import { Checkbox } from "@mui/material";
import { useState } from "react";
import { useCallback } from "react";
import "./macPlan.css";
import {
	BeazleyPlanCoverageLevel,
	BeazleyPlanDetails,
	BeazleyRiderPlanCoverage,
	BeazleyStanderdPlanCoverage,
	PaycheckFrequency
} from "../../../../../../@types/plan.types";
import { MacBenefitAmount, MacPlanDetails, MacCoverage } from "../../../../../../@types/plan.types";
import { Member } from "../../../../../../@types/member.types";
import { Enrollment } from "../../../../../../@types/enrollment.types";
import { generateCancerKemperActivateEnrollmentPayload } from "../../../../../../utils/commonFunctions/enrollment";
import { getKemperCancerEligibleDependents } from "../../../../../../utils/commonFunctions/eligibleDependents";

const MacPlanForm = (): JSX.Element => {
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
	const [macPlanInputs, setMacPlanInputs] = useState<{
		coverage: null | string;
		benefit_amount: null | number;
		primium: number;
	}>({
		coverage: null,
		benefit_amount: null,
		primium: 0
	});
	const [macPlan, setMacPlan] = useState<MacPlanDetails>({
		coverage: [],
		benefit_amount: [3000, 1500, 5000],
		premium_amount: {
			"Employee Only": {
				3000: {
					WEEKLY: 49.99,
					MONTHLY: 49.99
				},
				1500: {
					WEEKLY: 42.99,
					MONTHLY: 42.99
				},
				5000: {
					WEEKLY: 59.99,
					MONTHLY: 59.99
				}
			},
			"Employee & Spouse": {
				3000: {
					WEEKLY: 49.99,
					MONTHLY: 49.99
				},
				1500: {
					WEEKLY: 42.99,
					MONTHLY: 42.99
				},
				5000: {
					WEEKLY: 59.99,
					MONTHLY: 59.99
				}
			},
			"Employee & Dependents": {
				3000: {
					WEEKLY: 49.99,
					MONTHLY: 49.99
				},
				1500: {
					WEEKLY: 42.99,
					MONTHLY: 42.99
				},
				5000: {
					WEEKLY: 59.99,
					MONTHLY: 59.99
				}
			},
			"Employee & Family": {
				3000: {
					WEEKLY: 49.99,
					MONTHLY: 49.99
				},
				1500: {
					WEEKLY: 42.99,
					MONTHLY: 42.99
				},
				5000: {
					WEEKLY: 59.99,
					MONTHLY: 59.99
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

	const handleMacPlanInputChange = (event: SelectChangeEvent) => {
		const { name, value } = event.target as HTMLSelectElement;
		setMacPlanInputs(
			Object.assign({}, macPlanInputs, {
				[name]: value
			})
		);
	};

	const handleClinicCardChange = useCallback(
		(event: SelectChangeEvent) => {
			const { checked } = event.target as HTMLInputElement;
			setMacPlanInputs(
				Object.assign({}, macPlanInputs, {
					isRiderAdded: checked
				})
			);
		},
		[macPlanInputs]
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
		if (member && macPlanInputs.coverage) {
			console.log("macPlanInputs", macPlanInputs);
			const enrollments: { plan: any; premiumAmount: number }[] = [
				{ plan: macPlan, premiumAmount: premium_amount }
			];
			enrollments.forEach(({ plan, premiumAmount }: any, index: number) => {
				const enrollment: Enrollment = generateCancerKemperActivateEnrollmentPayload(
					plan,
					groupOwner,
					member,
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					macPlanInputs.coverage!,
					premiumAmount,
					eligibleDependents
				);
				console.log("enrollment", index, enrollment);
			});
		}
	}, [eligibleDependents, groupOwner, macPlan, macPlanInputs, member, premium_amount]);

	const calculatePremium = useCallback(() => {
		const { coverage, benefit_amount } = macPlanInputs;
		let macPremiumAmount = 0;
		if (coverage && benefit_amount && paycheck) {
			macPremiumAmount =
				macPlan.premium_amount[coverage as keyof MacCoverage][benefit_amount as keyof MacBenefitAmount][
					paycheck.pay_frequency as keyof PaycheckFrequency
				];
			setPremiumAmount(macPremiumAmount);
			setTotalPremiumAmount(macPremiumAmount);
			setCurrentEnrollment(
				Object.assign(
					{},
					{
						plan_name: "Mac Plan",
						status: "Current",
						premium_amount: Number(macPremiumAmount.toFixed(2))
					}
				)
			);
		}
	}, [macPlan.premium_amount, macPlanInputs, paycheck, setCurrentEnrollment]);

	useEffect(() => {
		calculatePremium();
	}, [calculatePremium]);

	useEffect(() => {
		console.log("UE1");
		if (dependents) {
			const dependentCoverage = getKemperCancerEligibleDependents(dependents);
			console.log("dependentCoverage", dependentCoverage);
			setEligibleDependents(Object.assign([], dependentCoverage.dependents));
			setMacPlan((macPlanDetails: MacPlanDetails) => {
				return Object.assign({}, macPlanDetails, {
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
					<PlanHeader planName="Mac Insurance Policy" effectiveDate={start_date} />
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
										onChange={(event: SelectChangeEvent) => handleMacPlanInputChange(event)}
									>
										{macPlan.coverage.map((option: string, index: number) => {
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
									<div className="details-form-label  required">Benefit Amount</div>
									<Select
										input={<CustomSelectInput />}
										style={{ width: "100%" }}
										name="benefit_amount"
										onChange={(event: SelectChangeEvent) => handleMacPlanInputChange(event)}
									>
										<MenuItem value={1500}>1500</MenuItem>
										<MenuItem value={3000}>3000</MenuItem>
										<MenuItem value={5000}>5000</MenuItem>
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

export default MacPlanForm;
