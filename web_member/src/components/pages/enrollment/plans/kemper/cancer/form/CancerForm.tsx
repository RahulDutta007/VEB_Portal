import { Button, MenuItem, SelectChangeEvent } from "@mui/material";
import { Select } from "@mui/material";
import { Grid, Paper } from "@mui/material";
import React, { useContext, useEffect, Suspense } from "react";
import { ThemeContext } from "../../../../../../../contexts";
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
	CancerPlanPremiumAmount
} from "../../../../../../../@types/plan.types";
import { CustomDisclaimerDialogPropsType } from "../../../../../../../@types/dialogProps.types";

const KemperCancerForm = (): JSX.Element => {
	const [writingNumber, setWritingNumber] = useState(1408);
	const [prevWritingNumber, setPrevWritingNumber] = useState(1408);
	const [emailDisclaimer, setEmailDisclaimer] = useState("");
	const [showWritingNumberValidateButton, setShowWritingNumberValidateButton] = useState(false);
	const { theme } = useContext(ThemeContext);
	const [cancerPlanDetails, setCancerPlanDetails] = useState<CancerPlanDetails>({
		coverage: ["Employee Only", "Employee & Family"],
		coverage_level: ["High Plan", "Low Plan"],
		premium_amount: {
			standard_premium: {
				"Employee Only": {
					"High Plan": 7.47,
					"Low Plan": 6.1
				},
				"Employee & Family": {
					// eslint-disable-next-line prettier/prettier
					"High Plan": 11.1,
					"Low Plan": 13.47
				}
			},
			rider_premium: {
				"Employee Only": {
					// eslint-disable-next-line prettier/prettier
					"High Plan": 1.4,
					// eslint-disable-next-line prettier/prettier
					"Low Plan": 1.4
				},
				"Employee & Family": {
					// eslint-disable-next-line prettier/prettier
					"High Plan": 2.83,
					"Low Plan": 2.83
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
					placeHolder: "Enter Email"
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
		if (coverage && coverage_level) {
			const newStandardPremium =
				cancerPlanDetails.premium_amount.standard_premium[coverage as keyof CancerPlanCoverage][
					coverage_level as keyof CancerPlanCoverageLevel
				];
			setStandardPremium(newStandardPremium);
			const newRiderPremium =
				cancerPlanDetails.premium_amount.rider_premium[coverage as keyof CancerPlanCoverage][
					coverage_level as keyof CancerPlanCoverageLevel
				];
			setRiderPremium(newRiderPremium);
		}
	}, [cancerPlanDetails, cancerPlanInputs]);

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
		setTotalPremium(standardPremium + riderPremium);
	}, [riderPremium, standardPremium]);

	useEffect(() => {
		calculatePremium();
	}, [calculatePremium, cancerPlanInputs.coverage, cancerPlanInputs.coverage_level]);

	return (
		<>
			<Suspense fallback={<div />}>
				<CustomEnrollmentDisclaimerDialog
					enrollmentDisclaimerDialogProps={enrollmentDisclaimerDialogProps}
					handleCloseDisclaimerDialog={handleCloseDisclaimerDialog}
					handleEscapeCloseDisclaimerDialog={handleEscapeCloseDisclaimerDialog}
					emailDisclaimer={emailDisclaimer}
					setEmailDisclaimer={setEmailDisclaimer}
				/>
			</Suspense>
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
											<MenuItem value={"Employee Only"}>{"Employee Only"}</MenuItem>
											<MenuItem value={"Employee & Family"}>{"Employee & Family"}</MenuItem>
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
						<LazyPlanActions waiveButtonCallback={() => null} activateButtonCallback={() => null} />
						<div className="dialog-btn-container">
							<Button className="dialog-btn" onClick={handleOpenDisclaimerDialogClick}>
								Open Dialog
							</Button>
						</div>
					</Paper>
				</div>
			</div>
		</>
	);
};

export default KemperCancerForm;
