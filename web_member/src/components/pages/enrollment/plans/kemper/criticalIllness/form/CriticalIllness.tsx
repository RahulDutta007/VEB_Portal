import { Button, MenuItem, SelectChangeEvent } from "@mui/material";
import { Select } from "@mui/material";
import { Grid, Paper } from "@mui/material";
import React, { Suspense, useContext, useEffect } from "react";
import { COVERAGE } from "../../../../../../../constants/coverage";
import { INSUARANCEPRIMIER } from "../../../../../../../constants/insuarancePremier";
import { AGERANGE } from "../../../../../../../constants/ageRange";
import { BENEFITAMOUNT } from "../../../../../../../constants/benefitAmount";
import { AuthContext, ThemeContext } from "../../../../../../../contexts";
import { LazyPlanActions, PlanHeader } from "../../../../../../shared";
import { CustomInput, CustomSelectInput } from "../../../../../../shared/customInput";
import { Checkbox } from "@mui/material";
import { useState } from "react";
import { useCallback } from "react";

import "./criticalIllness.css";
import { CriticalIllnessPremium } from "../../../../../../../@types/criticalIllnessPrimium.types";
import {
	CriticalIllnessBenefitLevel,
	CriticalIllnessCoverageLevel,
	CriticalIllnessPlanCoverage,
	CriticalIllnessPlanDetails,
	PaycheckFrequency,
	STDAgeGroups
} from "../../../../../../../@types/plan.types";
import { dollarize } from "../../../../../../../utils/commonFunctions/dollarize";
import { getCriticalIllnessPremium } from "../../../../../../../utils/commonFunctions/plan";
import { calculateAge, calculateAgeGroup } from "../../../../../../../constants/calculateAge";
import {
	Enrollment,
	EnrollmentCommonDetails,
	EnrollmentStandardDetails
} from "../../../../../../../@types/enrollment.types";
import { getKemperCancerEligibleDependents } from "../../../../../../../utils/commonFunctions/eligibleDependents";
import { PlanFormProps } from "../../../../../../../@types/components/enrollment.types";
import { getCoveredDependents } from "../../../../../../../utils/commonFunctions/coveredDependents";
import { Member } from "../../../../../../../@types/member.types";

const KemperCriticalIllnessForm = ({ dependents }: PlanFormProps): JSX.Element => {
	const [writingNumber, setWritingNumber] = useState(1408);
	const [prevWritingNumber, setPrevWritingNumber] = useState(1408);
	const [plan, setPlan] = useState({
		_id: "123zxkbnkabb3w2123",
		plan_name: "Critical Illness",
		plan_code: "HI"
	});
	const [criticalIllnessPlanDetails, setCriticalIllnessPlanDetails] = useState<CriticalIllnessPlanDetails>({
		benefit_amount: [10000.0, 20000.0, 30000.0],
		coverage: ["Employee Only", "Employee & Spouse", "Employee & Dependent", "Employee & Family"],
		coverage_level: ["With Cancer", "Without Cancer"],
		premium_amount: {
			standard_premium: {
				"Employee Only": {
					"With Cancer": {
						10000.0: {
							"18-49": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							},
							"50-59": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							},
							"60-64": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							}
						},
						20000.0: {
							"18-49": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							},
							"50-59": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							},
							"60-64": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							}
						},
						30000.0: {
							"18-49": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							},
							"50-59": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							},
							"60-64": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							}
						}
					},
					"Without Cancer": {
						10000.0: {
							"18-49": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							},
							"50-59": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							},
							"60-64": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							}
						},
						20000.0: {
							"18-49": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							},
							"50-59": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							},
							"60-64": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							}
						},
						30000.0: {
							"18-49": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							},
							"50-59": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							},
							"60-64": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							}
						}
					}
				},
				"Employee & Spouse": {
					"With Cancer": {
						10000.0: {
							"18-49": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							},
							"50-59": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							},
							"60-64": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							}
						},
						20000.0: {
							"18-49": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							},
							"50-59": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							},
							"60-64": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							}
						},
						30000.0: {
							"18-49": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							},
							"50-59": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							},
							"60-64": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							}
						}
					},
					"Without Cancer": {
						10000.0: {
							"18-49": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							},
							"50-59": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							},
							"60-64": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							}
						},
						20000.0: {
							"18-49": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							},
							"50-59": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							},
							"60-64": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							}
						},
						30000.0: {
							"18-49": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							},
							"50-59": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							},
							"60-64": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							}
						}
					}
				},
				"Employee & Dependent": {
					"With Cancer": {
						10000.0: {
							"18-49": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							},
							"50-59": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							},
							"60-64": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							}
						},
						20000.0: {
							"18-49": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							},
							"50-59": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							},
							"60-64": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							}
						},
						30000.0: {
							"18-49": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							},
							"50-59": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							},
							"60-64": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							}
						}
					},
					"Without Cancer": {
						10000.0: {
							"18-49": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							},
							"50-59": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							},
							"60-64": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							}
						},
						20000.0: {
							"18-49": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							},
							"50-59": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							},
							"60-64": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							}
						},
						30000.0: {
							"18-49": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							},
							"50-59": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							},
							"60-64": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							}
						}
					}
				},
				"Employee & Family": {
					"With Cancer": {
						10000.0: {
							"18-49": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							},
							"50-59": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							},
							"60-64": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							}
						},
						20000.0: {
							"18-49": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							},
							"50-59": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							},
							"60-64": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							}
						},
						30000.0: {
							"18-49": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							},
							"50-59": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							},
							"60-64": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							}
						}
					},
					"Without Cancer": {
						10000.0: {
							"18-49": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							},
							"50-59": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							},
							"60-64": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							}
						},
						20000.0: {
							"18-49": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							},
							"50-59": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							},
							"60-64": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							}
						},
						30000.0: {
							"18-49": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							},
							"50-59": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							},
							"60-64": {
								WEEKLY: 65.59,
								MONTHLY: 65.59
							}
						}
					}
				}
			}
		}
	});
	const [showWritingNumberValidateButton, setShowWritingNumberValidateButton] = useState(false);
	const [standerdPremium, setStanderdPremium] = useState(0.0);
	const [criticalIllnessPlanInputs, setCriticalIllnessPlanInputs] = useState<{
		coverage: null | string;
		coverage_level: null | "With Cancer" | "Without Cancer";
		benefit_amount: null | number;
	}>({
		coverage: null,
		coverage_level: null,
		benefit_amount: null
	});
	const { theme } = useContext(ThemeContext);
	const { member, paycheck, groupOwner } = useContext(AuthContext);
	const [memberAge, setMemberAge] = useState<number>(
		calculateAge(member?.date_of_birth === undefined ? new Date() : new Date(member?.date_of_birth))
	);
	const [eligibleDependents, setEligibleDependents] = useState<Member[]>([]);

	const handlePlanInputChange = (event: SelectChangeEvent<unknown>, child: React.ReactNode) => {
		const { name, value } = event.target;
		setCriticalIllnessPlanInputs(
			Object.assign({}, criticalIllnessPlanInputs, {
				[name]: value
			})
		);
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

	const calculatePremium = useCallback(() => {
		const { coverage, coverage_level, benefit_amount } = criticalIllnessPlanInputs;
		if (
			coverage !== null &&
			coverage_level !== null &&
			benefit_amount !== null &&
			member?.date_of_birth &&
			paycheck
		) {
			const calculatePremiumAmount =
				criticalIllnessPlanDetails.premium_amount.standard_premium[
					coverage as keyof CriticalIllnessPlanCoverage
				][coverage_level as keyof CriticalIllnessCoverageLevel][
					benefit_amount as keyof CriticalIllnessBenefitLevel
				][calculateAgeGroup(memberAge) as keyof STDAgeGroups][
					paycheck.pay_frequency as keyof PaycheckFrequency
				];
			//const calculatePremiumAmount = 23;
			setStanderdPremium(calculatePremiumAmount);
		}
	}, [
		criticalIllnessPlanDetails.premium_amount.standard_premium,
		criticalIllnessPlanInputs,
		member?.date_of_birth,
		memberAge,
		paycheck
	]);

	const handleValidation = useCallback((): boolean => {
		const { coverage, coverage_level, benefit_amount } = criticalIllnessPlanInputs;
		if (coverage === null && coverage_level === null && benefit_amount === null) {
			alert("Please fill all required fields");
			return false;
		} else {
			return true;
		}
	}, [criticalIllnessPlanInputs]);

	const handleActivateButtonClick = useCallback(() => {
		const isValid = handleValidation();
		if (isValid === false) {
			return;
		}
		if (
			member &&
			criticalIllnessPlanInputs.coverage &&
			criticalIllnessPlanInputs.coverage_level &&
			criticalIllnessPlanInputs.benefit_amount
		) {
			const enrollmentCommonDetails: EnrollmentCommonDetails = {
				agent_id: null,
				location_number: member.location_number,
				location_name: member.location.location_name,
				group_number: member.group_number,
				group_name: member.group.name,
				plan_object_id: plan._id,
				plan_code: plan.plan_code,
				enrollment_status: "APPROVED",
				insured_object_id: member._id,
				insured_SSN: member.SSN,
				unenrolled_reason: null,
				waive_reason: null,
				termination_reason: null,
				enrollment_date: "01/23/22",
				effective_date: "01/23/22",
				termination_date: null,
				open_enrollment_id: "0xqwe123123"
			};
			console.log("enrollmentCommonDetails", enrollmentCommonDetails);
			const enrollmentStandardDetails: EnrollmentStandardDetails[] = [
				{
					member_object_id: member._id,
					member_SSN: member.SSN,
					premium_amount: standerdPremium,
					coverage_code: criticalIllnessPlanInputs.coverage
				}
			];
			console.log("eligible xxxx", eligibleDependents);
			const coveredDependents = getCoveredDependents(criticalIllnessPlanInputs.coverage, eligibleDependents);
			console.log("coveredDependents", coveredDependents);
			const member_SSNs = [...coveredDependents.dep_SSNs, member.SSN];
			const enrollment: Enrollment = {
				standard_details: enrollmentStandardDetails.concat(coveredDependents.enrollmentStandardDetails),
				common_details: enrollmentCommonDetails,
				dep_SSNs: member_SSNs
			};
			console.log("enrollment", enrollment);
		}
	}, [
		criticalIllnessPlanInputs.benefit_amount,
		criticalIllnessPlanInputs.coverage,
		criticalIllnessPlanInputs.coverage_level,
		eligibleDependents,
		handleValidation,
		member,
		plan._id,
		plan.plan_code,
		standerdPremium
	]);

	useEffect(() => {
		calculatePremium();
	}, [
		calculatePremium,
		criticalIllnessPlanInputs.coverage,
		criticalIllnessPlanInputs.coverage_level,
		criticalIllnessPlanInputs.benefit_amount
	]);

	useEffect(() => {
		console.log("UE1");
		const dependentCoverage = getKemperCancerEligibleDependents(dependents);
		console.log("dependentCoverage", dependentCoverage);
		setEligibleDependents(Object.assign([], dependentCoverage.dependents));
	}, [dependents]);

	return (
		<Suspense fallback={<div />}>
			<div className="kemper-cancer-form plan-form">
				<div className="paper-form-container">
					<Paper className="theme-border-radius paper-container" elevation={1}>
						<PlanHeader
							planName="Kemper Group Critical Illness Insurance Policy"
							effectiveDate="01/22/2022"
						/>
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
							<Grid className="grid-container" container columnSpacing={2}>
								<Grid item xl={5} lg={5} md={5} sm={5} xs={6}>
									<div className="details-form-row">
										<div className="details-form-label  required">Coverage Level</div>
										<Select
											input={<CustomSelectInput />}
											style={{ width: "100%" }}
											name="coverage_level"
											onChange={handlePlanInputChange}
										>
											{criticalIllnessPlanDetails.coverage_level.map(
												(coverage_level: string, index: number) => {
													return (
														<MenuItem value={coverage_level} key={index}>
															{coverage_level}
														</MenuItem>
													);
												}
											)}
										</Select>
									</div>
								</Grid>
								<Grid item xl={5} lg={5} md={5} sm={5} xs={6}>
									<div className="details-form-row">
										<div className="details-form-label  required">Coverage For</div>
										<Select
											input={<CustomSelectInput />}
											style={{ width: "100%" }}
											name="coverage"
											onChange={handlePlanInputChange}
										>
											{criticalIllnessPlanDetails.coverage.map(
												(coverage: string, index: number) => {
													return (
														<MenuItem value={coverage} key={index}>
															{coverage}
														</MenuItem>
													);
												}
											)}
										</Select>
									</div>
								</Grid>
								<Grid item xl={5} lg={5} md={5} sm={5} xs={6}>
									<div className="details-form-row">
										<div className="details-form-label  required">Benefit Amount</div>
										<Select
											input={<CustomSelectInput />}
											style={{ width: "100%" }}
											name="benefit_amount"
											onChange={handlePlanInputChange}
										>
											{criticalIllnessPlanDetails.benefit_amount.map(
												(amount: number, index: number) => {
													return (
														<MenuItem key={index} value={amount}>
															{dollarize(amount)}
														</MenuItem>
													);
												}
											)}
										</Select>
									</div>
								</Grid>
								<Grid item xl={2} lg={2} md={2} sm={2} xs={6} className="amount-middle">
									<div className="details-form-row">
										<div className="details-form-label required align-center">Premium</div>
										<div className="show-premium">{dollarize(standerdPremium)}</div>
									</div>
								</Grid>
							</Grid>
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
												{dollarize(standerdPremium)}
											</span>
										</div>
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
							<Grid item xl={4} lg={4} md={4} sm={4} xs={10} columnSpacing={2}>
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
		</Suspense>
	);
};

export default KemperCriticalIllnessForm;
