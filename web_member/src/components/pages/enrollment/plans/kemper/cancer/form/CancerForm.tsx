import { Button, MenuItem, SelectChangeEvent } from "@mui/material";
import { Select } from "@mui/material";
import { Grid, Paper } from "@mui/material";
import React, { useContext, useEffect, Suspense } from "react";
import { AuthContext, EnrollmentContext, ThemeContext } from "../../../../../../../contexts";
import { LazyPlanActions, PlanHeader } from "../../../../../../shared";
import CustomInput from "../../../../../../shared/customInput/CustomInput";
import CustomSelectInput from "../../../../../../shared/customInput/CustomSelectInput";
import CustomEnrollmentDisclaimerDialog from "../../../../../../shared/dialogs/customEnrollmentDisclaimerDialog/customEnrollmentDisclaimerDialog.jsx";
import { Checkbox } from "@mui/material";
import { useState } from "react";
import { useCallback } from "react";

import "./cancerForm.css";
import { CANCER_PLAN_DETAILS } from "../../../../../../../constants/plan";
import { COVERAGE } from "../../../../../../../constants/coverage";
import { dollarize } from "../../../../../../../utils/commonFunctions/dollarize";
import {
	CancerPlanCoverage,
	CancerPlanCoverageLevel,
	CancerPlanDetails,
	CancerPlanPremiumAmount,
	PaycheckFrequency
} from "../../../../../../../@types/plan.types";
import { CustomDisclaimerDialogPropsType } from "../../../../../../../@types/dialogProps.types";
import { PlanFormProps } from "../../../../../../../@types/components/enrollment.types";
import { Member } from "../../../../../../../@types/member.types";
import { getKemperCancerEligibleDependents } from "../../../../../../../utils/commonFunctions/eligibleDependents";
import initCapitalize from "../../../../../../../utils/commonFunctions/initCapitalize";
import {
	Enrollment,
	EnrollmentCommonDetails,
	EnrollmentStandardDetails
} from "../../../../../../../@types/enrollment.types";
import { getCoveredDependents } from "../../../../../../../utils/commonFunctions/coveredDependents";

const KemperCancerForm = ({ dependents }: PlanFormProps): JSX.Element => {
	const [writingNumber, setWritingNumber] = useState(1408);
	const [prevWritingNumber, setPrevWritingNumber] = useState(1408);
	const [emailDisclaimer, setEmailDisclaimer] = useState("");
	const { paycheck, member } = useContext(AuthContext);
	const [showWritingNumberValidateButton, setShowWritingNumberValidateButton] = useState(false);
	const [eligibleDependents, setEligibleDependents] = useState<Member[]>([]);
	const { theme } = useContext(ThemeContext);
	const [plan, setPlan] = useState({
		_id: "123zxkbnkabb3w2123",
		plan_name: "Kemper Cancer",
		plan_code: "KC"
	});
	const [cancerPlanDetails, setCancerPlanDetails] = useState<CancerPlanDetails>({
		coverage: [],
		coverage_level: ["High Plan", "Low Plan"],
		premium_amount: {
			standard_premium: {
				"Employee Only": {
					"High Plan": {
						WEEKLY: 7.47,
						MONTHLY: 7.47
					},
					"Low Plan": {
						WEEKLY: 6.41,
						MONTHLY: 6.41
					}
				},
				"Employee & Dependents": {
					"High Plan": {
						WEEKLY: 11.1,
						MONTHLY: 11.1
					},
					"Low Plan": {
						WEEKLY: 13.47,
						MONTHLY: 13.47
					}
				},
				"Employee & Spouse": {
					"High Plan": {
						WEEKLY: 11.1,
						MONTHLY: 11.1
					},
					"Low Plan": {
						WEEKLY: 13.47,
						MONTHLY: 13.47
					}
				},
				"Employee & Family": {
					"High Plan": {
						WEEKLY: 11.1,
						MONTHLY: 11.1
					},
					"Low Plan": {
						WEEKLY: 13.47,
						MONTHLY: 13.47
					}
				}
			},
			rider_premium: {
				"Employee Only": {
					// eslint-disable-next-line prettier/prettier
					"High Plan": {
						WEEKLY: 1.4,
						MONTHLY: 1.4
					},
					// eslint-disable-next-line prettier/prettier
					"Low Plan": {
						WEEKLY: 1.4,
						MONTHLY: 1.4
					}
				},
				"Employee & Dependents": {
					"High Plan": {
						WEEKLY: 2.83,
						MONTHLY: 2.83
					},
					"Low Plan": {
						WEEKLY: 2.83,
						MONTHLY: 2.83
					}
				},
				"Employee & Spouse": {
					"High Plan": {
						WEEKLY: 2.83,
						MONTHLY: 2.83
					},
					"Low Plan": {
						WEEKLY: 2.83,
						MONTHLY: 2.83
					}
				},
				"Employee & Family": {
					"High Plan": {
						WEEKLY: 2.83,
						MONTHLY: 2.83
					},
					"Low Plan": {
						WEEKLY: 2.83,
						MONTHLY: 2.83
					}
				}
			}
		}
	});
	const [enrollmentDisclaimerDialogProps, setEnrollmentDisclaimerDialogProps] =
		useState<CustomDisclaimerDialogPropsType>({
			openDialog: false,
			title: "Disclaimer",
			content:
				"Cancer: I hereby apply to Reserve National Insurance Company for insurance coverage to be issued solely and entirely in reliance upon the written answers to the foregoing questions and/or information obtained by the Company in its underwriting process. I agree and understand that no insurance coverage will be in force until the effective date specified by the Company. I represent that no person to be covered under the terms of the certificate being applied for is also covered by Medicaid or any similar program. I have read or had read to me all the questions and answers in this application and such answers to the best of my (our) knowledge and belief are true and complete. I understand and agree that any falsity of any answer or statement in this application which materially affects the acceptance of the risk or hazard assumed by the Company may bar the right to recovery under any certificate issued. FRAUD WARNING: Any person who knowingly presents a false or fraudulent claim for the payment of a loss is guilty of a crime and may be subject to fines and confinement in state prison.",
			importantTitle: "IMPORTANT",
			importantContent:
				"If an individual is insured under this policy and is also covered by Medicaid or a state variation of Medicaid, most non-disability benefits are automatically assigned according to state regulations.  This means that instead of paying the benefits to the insured individual, we must pay the benefits to Medicaid or the medical provider to reduce the charges billed to Medicaid.  Please consider your circumstances before enrolling in Kemper Benefits coverage.",
			inputFields: [
				{
					name: "Email Discalimer",
					value: emailDisclaimer,
					placeholder: "Enter Email"
				}
			],
			actions: [
				{
					label: "Email Disclaimer",
					callback: () => {
						setEnrollmentDisclaimerDialogProps(
							Object.assign({}, enrollmentDisclaimerDialogProps, { openDialog: false })
						);
					}
				}
			]
		});
	const [cancerPlanInputs, setCancerPlanInputs] = useState<{
		coverage: null | string;
		coverage_level: null | string;
	}>({
		coverage: null,
		coverage_level: null
	});
	const [standardPremium, setStandardPremium] = useState(0);
	const [riderPremium, setRiderPremium] = useState(0);
	const [totalPremium, setTotalPremium] = useState(0);
	const { setCurrentEnrollment } = useContext(EnrollmentContext);

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

	const handleCoverageChange = (event: SelectChangeEvent<unknown>, child: React.ReactNode) => {
		const { name, value } = event.target;
		setCancerPlanInputs(
			Object.assign({}, cancerPlanInputs, {
				[name]: value
			})
		);
	};

	const calculatePremium = useCallback(() => {
		const { coverage, coverage_level } = cancerPlanInputs;
		if (coverage && coverage_level && paycheck) {
			const newStandardPremium =
				cancerPlanDetails.premium_amount.standard_premium[coverage as keyof CancerPlanCoverage][
					coverage_level as keyof CancerPlanCoverageLevel
				][paycheck.pay_frequency as keyof PaycheckFrequency];
			setStandardPremium(newStandardPremium);
			const newRiderPremium =
				cancerPlanDetails.premium_amount.rider_premium[coverage as keyof CancerPlanCoverage][
					coverage_level as keyof CancerPlanCoverageLevel
				][paycheck.pay_frequency as keyof PaycheckFrequency];
			setRiderPremium(newRiderPremium);
			console.log("newRiderPremium", newRiderPremium);
			console.log("newStandardPremium", newStandardPremium);
			setCurrentEnrollment(
				Object.assign(
					{},
					{
						plan_name: "Cancer",
						status: "Current",
						premium_amount: Number((newStandardPremium + newRiderPremium).toFixed(2))
					}
				)
			);
		}
	}, [
		cancerPlanDetails.premium_amount.rider_premium,
		cancerPlanDetails.premium_amount.standard_premium,
		cancerPlanInputs,
		paycheck,
		setCurrentEnrollment
	]);

	const handleActivateButtonClick = useCallback(() => {
		if (member && cancerPlanInputs.coverage) {
			console.log("cancerPlanInputs", cancerPlanInputs);
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
			const enrollmentStandardDetails: EnrollmentStandardDetails[] = [];
			console.log("eligible xxxx", eligibleDependents);
			const coveredDependents = getCoveredDependents(cancerPlanInputs.coverage, eligibleDependents, member);
			console.log("coveredDependents", coveredDependents);
			const member_SSNs = [...coveredDependents.dep_SSNs, member.SSN];
			const enrollment: Enrollment = {
				standard_details: coveredDependents.enrollmentStandardDetails,
				common_details: enrollmentCommonDetails,
				dep_SSNs: member_SSNs
			};
			console.log("enrollment", enrollment);
		}
	}, [cancerPlanInputs, eligibleDependents, member, plan._id, plan.plan_code]);

	const handleOpenDisclaimerDialogClick = useCallback(() => {
		setEnrollmentDisclaimerDialogProps(Object.assign({}, enrollmentDisclaimerDialogProps, { openDialog: true }));
	}, [enrollmentDisclaimerDialogProps]);

	const handleCloseDisclaimerDialog = useCallback(() => {
		setEnrollmentDisclaimerDialogProps(Object.assign({}, enrollmentDisclaimerDialogProps, { openDialog: false }));
	}, [enrollmentDisclaimerDialogProps]);

	const handleEscapeCloseDisclaimerDialog = useCallback(
		(event: React.KeyboardEvent<HTMLInputElement | HTMLDivElement>) => {
			const Key = event.key;

			if (Key === "Escape")
				setEnrollmentDisclaimerDialogProps(
					Object.assign({}, enrollmentDisclaimerDialogProps, { openDialog: false })
				);
		},
		[enrollmentDisclaimerDialogProps]
	);

	useEffect(() => {
		console.log("UE3");
		setTotalPremium(standardPremium + riderPremium);
	}, [riderPremium, standardPremium]);

	useEffect(() => {
		console.log("UE2");
		calculatePremium();
	}, [calculatePremium, cancerPlanInputs.coverage, cancerPlanInputs.coverage_level]);

	useEffect(() => {
		console.log("UE1");
		const dependentCoverage = getKemperCancerEligibleDependents(dependents);
		console.log("dependentCoverage", dependentCoverage);
		setEligibleDependents(Object.assign([], dependentCoverage.dependents));
		setCancerPlanDetails((prevCancerPlanDetails: CancerPlanDetails) => {
			return Object.assign({}, prevCancerPlanDetails, {
				coverage: dependentCoverage.coverage
			});
		});
	}, [dependents]);

	return (
		<Suspense fallback={<div />}>
			{/* <CustomEnrollmentDisclaimerDialog
				enrollmentDisclaimerDialogProps={enrollmentDisclaimerDialogProps}
				handleCloseDisclaimerDialog={handleCloseDisclaimerDialog}
				handleEscapeCloseDisclaimerDialog={handleEscapeCloseDisclaimerDialog}
				emailDisclaimer={emailDisclaimer}
				setEmailDisclaimer={setEmailDisclaimer}
			/> */}
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
											name="coverage"
											onChange={handleCoverageChange}
										>
											{cancerPlanDetails.coverage.map((coverage: string, index: number) => {
												return (
													<MenuItem value={coverage} key={index}>
														{initCapitalize(coverage)}
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
											onChange={handleCoverageChange}
										>
											<MenuItem value={"High Plan"}>High Plan</MenuItem>
											<MenuItem value={"Low Plan"}>Low Plan</MenuItem>
										</Select>
									</div>
								</Grid>
								<Grid item xl={2} lg={2} md={2} sm={6} xs={6}>
									<div className="details-form-row">
										<div className="details-form-label required align-center">Premium</div>
										<div className="show-premium">{dollarize(standardPremium)}</div>
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
										<label className="details-form-label required">
											Intensive Care Unit - Rider Premium
										</label>
									</Grid>
									<Grid item xl={2} lg={2} md={2} sm={6} xs={6}>
										<div className="details-form-row">
											<div className="details-form-label required align-center">Premium</div>
											<div className="show-premium">{dollarize(riderPremium)}</div>
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
										<span className="show-premium margin-adjust">{dollarize(totalPremium)}</span>
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
						{/* <div className="dialog-btn-container">
							<Button className="dialog-btn" onClick={handleOpenDisclaimerDialogClick}>
								Open Dialog
							</Button>
						</div> */}
					</Paper>
				</div>
			</div>
		</Suspense>
	);
};

export default KemperCancerForm;
