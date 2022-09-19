/* eslint-disable arrow-parens */
import { Button, MenuItem } from "@mui/material";
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

import "./hospitalIndemnityForm.css";
import {
	HospitalIndemnityPlanCoverage,
	HospitalIndemnityPlanCoverageLevel,
	HospitalIndemnityPlanDetails,
	PaycheckFrequency
} from "../../../../../../../@types/plan.types";
import initCapitalize from "../../../../../../../utils/commonFunctions/initCapitalize";
import { PlanFormProps } from "../../../../../../../@types/components/enrollment.types";
import { getKemperCancerEligibleDependents } from "../../../../../../../utils/commonFunctions/eligibleDependents";
import { Member } from "../../../../../../../@types/member.types";
import { dollarize } from "../../../../../../../utils/commonFunctions/dollarize";
import {
	Enrollment,
	EnrollmentCommonDetails,
	EnrollmentStandardDetails
} from "../../../../../../../@types/enrollment.types";
import { getCoveredDependents } from "../../../../../../../utils/commonFunctions/coveredDependents";

const KemperHospitalIndemnityForm = ({ dependents }: PlanFormProps): JSX.Element => {
	const [writingNumber, setWritingNumber] = useState(1408);
	const [plan, setPlan] = useState({
		_id: "123zxkbnkabb3w2123",
		plan_name: "Hospital Idemnity",
		plan_code: "HI"
	});

	const [hospitalIndemnityPlanDetails, setHospitalIndemnityPlanDetails] = useState<HospitalIndemnityPlanDetails>({
		coverage: [],
		coverage_level: ["Plan 1", "Plan 2", "Plan 3", "Plan 4"],
		premium_amount: {
			standard_premium: {
				"Employee Only": {
					"Plan 1": {
						WEEKLY: 7.47,
						MONTHLY: 7.47
					},
					"Plan 2": {
						WEEKLY: 9.47,
						MONTHLY: 9.47
					},
					"Plan 3": {
						WEEKLY: 11.47,
						MONTHLY: 11.47
					},
					"Plan 4": {
						WEEKLY: 13.47,
						MONTHLY: 13.47
					}
				},
				"Employee & Dependents": {
					"Plan 1": {
						WEEKLY: 7.47,
						MONTHLY: 7.47
					},
					"Plan 2": {
						WEEKLY: 9.47,
						MONTHLY: 9.47
					},
					"Plan 3": {
						WEEKLY: 11.47,
						MONTHLY: 11.47
					},
					"Plan 4": {
						WEEKLY: 13.47,
						MONTHLY: 13.47
					}
				},
				"Employee & Spouse": {
					"Plan 1": {
						WEEKLY: 7.47,
						MONTHLY: 7.47
					},
					"Plan 2": {
						WEEKLY: 9.47,
						MONTHLY: 9.47
					},
					"Plan 3": {
						WEEKLY: 11.47,
						MONTHLY: 11.47
					},
					"Plan 4": {
						WEEKLY: 13.47,
						MONTHLY: 13.47
					}
				},
				"Employee & Family": {
					"Plan 1": {
						WEEKLY: 7.47,
						MONTHLY: 7.47
					},
					"Plan 2": {
						WEEKLY: 9.47,
						MONTHLY: 9.47
					},
					"Plan 3": {
						WEEKLY: 11.47,
						MONTHLY: 11.47
					},
					"Plan 4": {
						WEEKLY: 13.47,
						MONTHLY: 13.47
					}
				}
			}
		}
	});
	const [prevWritingNumber, setPrevWritingNumber] = useState(1408);
	const [showWritingNumberValidateButton, setShowWritingNumberValidateButton] = useState(false);
	const { theme } = useContext(ThemeContext);
	const [coverage_level, setCoverageLevel] = useState("");
	const [premium_amount, setPremiumAmount] = useState(0);
	const [eligibleDependents, setEligibleDependents] = useState<Member[]>([]);

	//new Changes
	const [hospitalIndemnityPlanInputs, setHospitalIndemnityPlanInputs] = useState<{
		coverage: null | string;
		coverage_level: null | string;
	}>({
		coverage: null,
		coverage_level: null
	});
	const [standardPremium, setStandardPremium] = useState(0);
	const { paycheck, member } = useContext(AuthContext);
	const { setCurrentEnrollment } = useContext(EnrollmentContext);
	//end new changes

	const handleCoverageForChange = (event: React.FormEvent<HTMLSelectElement>) => {
		const { name, value } = event.target as HTMLSelectElement;
		setHospitalIndemnityPlanInputs(
			Object.assign({}, hospitalIndemnityPlanInputs, {
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

	const handleActivateButtonCallback = useCallback(() => {
		if (member && hospitalIndemnityPlanInputs.coverage && hospitalIndemnityPlanInputs.coverage_level) {
			console.log("hospitalrPlanInputs", hospitalIndemnityPlanInputs);
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
					premium_amount: premium_amount,
					coverage_code: hospitalIndemnityPlanInputs.coverage
				}
			];
			console.log("eligible xxxx", eligibleDependents);
			const coveredDependents = getCoveredDependents(hospitalIndemnityPlanInputs.coverage, eligibleDependents);
			console.log("coveredDependents", coveredDependents);
			const member_SSNs = [...coveredDependents.dep_SSNs, member.SSN];
			const enrollment: Enrollment = {
				standard_details: enrollmentStandardDetails.concat(coveredDependents.enrollmentStandardDetails),
				common_details: enrollmentCommonDetails,
				dep_SSNs: member_SSNs
			};
			console.log("enrollment", enrollment);
		}
	}, [eligibleDependents, hospitalIndemnityPlanInputs, member, plan._id, plan.plan_code, premium_amount]);

	const calculatePremium = useCallback(() => {
		const { coverage, coverage_level } = hospitalIndemnityPlanInputs;
		if (coverage && coverage_level && paycheck) {
			const newStandardPremium =
				hospitalIndemnityPlanDetails.premium_amount.standard_premium[
					coverage as keyof HospitalIndemnityPlanCoverage
				][coverage_level as keyof HospitalIndemnityPlanCoverageLevel][
					paycheck.pay_frequency as keyof PaycheckFrequency
				];
			setStandardPremium(newStandardPremium);
			console.log("newStandardPremium", newStandardPremium);
			setCurrentEnrollment(
				Object.assign(
					{},
					{
						plan_name: "Hospital Indemnity",
						status: "Current",
						premium_amount: Number(newStandardPremium.toFixed(2))
					}
				)
			);
		}
	}, [hospitalIndemnityPlanDetails.premium_amount.standard_premium, hospitalIndemnityPlanInputs, paycheck]);

	useEffect(() => {
		calculatePremium();
	}, [calculatePremium, hospitalIndemnityPlanInputs.coverage, hospitalIndemnityPlanDetails.coverage_level]);

	useEffect(() => {
		console.log("HI3");
		setStandardPremium(standardPremium);
	}, [standardPremium]);

	useEffect(() => {
		console.log("UE1");
		const dependentCoverage = getKemperCancerEligibleDependents(dependents);
		console.log("dependentCoverage", dependentCoverage);
		setEligibleDependents(Object.assign([], dependentCoverage.dependents));
		setHospitalIndemnityPlanDetails((prevHospitalIndemnityPlanDetails: HospitalIndemnityPlanDetails) => {
			return Object.assign({}, prevHospitalIndemnityPlanDetails, {
				coverage: dependentCoverage.coverage
			});
		});
	}, [dependents]);

	const { _id, plan_name, plan_code } = plan;

	return (
		<div className="kemper-cancer-form plan-form">
			<div className="paper-form-container">
				<Paper className="theme-border-radius paper-container" elevation={1}>
					<PlanHeader
						planName="Kemper Group Hospital Indemnity Insurance Policy"
						effectiveDate={"start_date"}
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
							<Grid item xl={5} lg={5} md={5} sm={5} xs={6}>
								<div className="details-form-row">
									<div className="details-form-label  required">Coverage For</div>
									<Select
										input={<CustomSelectInput />}
										style={{ width: "100%" }}
										name="coverage"
										onChange={(event: any) => handleCoverageForChange(event)}
									>
										{COVERAGE.map((option: string, index: number) => {
											return (
												<MenuItem value={option} key={index}>
													{initCapitalize(option)}
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
										onChange={(event: any) => handleCoverageForChange(event)}
									>
										<MenuItem value={"Plan 1"}>PLAN 1</MenuItem>
										<MenuItem value={"Plan 2"}>PLAN 2</MenuItem>
										<MenuItem value={"Plan 3"}>PLAN 3</MenuItem>
										<MenuItem value={"Plan 4"}>PLAN 4</MenuItem>
									</Select>
								</div>
							</Grid>
							<Grid item xl={2} lg={2} md={2} sm={2} xs={6}>
								<div className="details-form-row">
									<div className="details-form-label required align-center">Premium</div>
									<div className="show-premium">{dollarize(standardPremium)}</div>
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
									<span className="show-premium margin-adjust">{dollarize(standardPremium)}</span>
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
						activateButtonCallback={handleActivateButtonCallback}
					/>
				</Paper>
			</div>
		</div>
	);
};

export default KemperHospitalIndemnityForm;
