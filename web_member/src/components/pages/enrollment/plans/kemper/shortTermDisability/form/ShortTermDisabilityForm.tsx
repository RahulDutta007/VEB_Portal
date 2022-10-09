import { Button, MenuItem, SelectChangeEvent } from "@mui/material";
import { Select } from "@mui/material";
import { Grid, Paper } from "@mui/material";
import React, { useContext, useEffect, Suspense } from "react";
import { COVERAGE } from "../../../../../../../constants/coverage";
import { AuthContext, ThemeContext } from "../../../../../../../contexts";
import { LazyPlanActions, LazyPlanDisclaimer, PlanHeader, VEBPlanCard } from "../../../../../../shared";
import CustomInput from "../../../../../../shared/customInput/CustomInput";
import CustomSelectInput from "../../../../../../shared/customInput/CustomSelectInput";
import { CustomDisclaimerDialogPropsType } from "../../../../../../../@types/dialogProps.types";
import CustomEnrollmentDisclaimerDialog from "../../../../../../shared/dialogs/customEnrollmentDisclaimerDialog/customEnrollmentDisclaimerDialog";
import { Checkbox } from "@mui/material";
import { useState } from "react";
import { useCallback } from "react";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, { AccordionSummaryProps } from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import "./shortTermDisabilityForm.css";
import {
	benefitenefitAmount,
	STDDependentsPlanDetails,
	STDPlanDetails
} from "../../../../../../../constants/stdPlanDetails";
import { getKemperCancerEligibleDependents } from "../../../../../../../utils/commonFunctions/eligibleDependents";
import { PlanFormProps } from "../../../../../../../@types/components/enrollment.types";
import {
	PaycheckFrequency,
	PaycheckSTDArrayFrequency,
	ShortTermDisabilityCoverageLevel,
	ShortTermDisabilityDependentPlanDetails,
	ShortTermDisabilityPlanCoverage,
	ShortTermDisabilityPlanDetails,
	STDAgeGroup,
	STDAgeGroups,
	STDEmployeeBenefitAmount
} from "../../../../../../../@types/plan.types";
import { Member } from "../../../../../../../@types/member.types";
import { PayFrequency } from "../../../../../../../@types/paycheck.types";
import { ShortTermDisabilityDependent } from "../../../../../../../@types/employee.types";
import { calculateAge, calculateAgeGroup } from "../../../../../../../constants/calculateAge";

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(
	({ theme }) => ({
		border: `1px solid ${theme.palette.divider}`,
		"&:not(:last-child)": {
			borderBottom: 0
		},
		"&:before": {
			display: "none"
		}
	})
);

const AccordionSummary = styled((props: AccordionSummaryProps) => (
	<MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />} {...props} />
))(({ theme }) => ({
	backgroundColor: theme.palette.mode === "dark" ? "rgba(255, 255, 255, .05)" : "rgba(0, 0, 0, .03)",
	flexDirection: "row-reverse",
	"& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
		transform: "rotate(90deg)"
	},
	"& .MuiAccordionSummary-content": {
		marginLeft: theme.spacing(1)
	}
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
	padding: theme.spacing(2),
	borderTop: "1px solid rgba(0, 0, 0, .125)"
}));

const KemperShortTermDisabilityForm = (): JSX.Element => {
	const [writingNumber, setWritingNumber] = useState(1408);
	const [shortTermDisabilityPlanDetails, setShortTermDisabilityPlanDetails] =
		useState<ShortTermDisabilityPlanDetails>(STDPlanDetails);
	const [shortTermDisabilityPlanInput, setShortTermDisabilityPlanInput] = useState<{
		coverage: null | string;
		benefit: null | string;
		benefit_amount: null | number;
	}>({
		coverage: null,
		benefit: null,
		benefit_amount: null
	});
	const [planDisclaimerChecked, setPlanDisclaimerChecked] = useState(false);
	const { paycheck, member, dependents, groupOwner } = useContext(AuthContext);
	const [memberAge, setMemberAge] = useState<number>(
		calculateAge(member?.date_of_birth === undefined ? new Date() : new Date(member?.date_of_birth))
	);
	const [plan, setPlan] = useState({
		plan_name: "Short Term Disability",
		plan_code: "plan001",
		start_date: "01/01/2023",
		end_date: "01/01/2024"
	});
	// const [enrollmentDisclaimerDialogProps, setEnrollmentDisclaimerDialogProps] =
	// 	useState<CustomDisclaimerDialogPropsType>({
	// 		openDialog: false,
	// 		title: "Disclaimer",
	// 		content:
	// 			"Cancer: I hereby apply to Reserve National Insurance Company for insurance coverage to be issued solely and entirely in reliance upon the written answers to the foregoing questions and/or information obtained by the Company in its underwriting process. I agree and understand that no insurance coverage will be in force until the effective date specified by the Company. I represent that no person to be covered under the terms of the certificate being applied for is also covered by Medicaid or any similar program. I have read or had read to me all the questions and answers in this application and such answers to the best of my (our) knowledge and belief are true and complete. I understand and agree that any falsity of any answer or statement in this application which materially affects the acceptance of the risk or hazard assumed by the Company may bar the right to recovery under any certificate issued. FRAUD WARNING: Any person who knowingly presents a false or fraudulent claim for the payment of a loss is guilty of a crime and may be subject to fines and confinement in state prison.",
	// 		importantTitle: "IMPORTANT",
	// 		importantContent:
	// 			"If an individual is insured under this policy and is also covered by Medicaid or a state variation of Medicaid, most non-disability benefits are automatically assigned according to state regulations.  This means that instead of paying the benefits to the insured individual, we must pay the benefits to Medicaid or the medical provider to reduce the charges billed to Medicaid.  Please consider your circumstances before enrolling in Kemper Benefits coverage.",
	// 		inputFields: [
	// 			{
	// 				name: "Email Discalimer",
	// 				value: emailDisclaimer,
	// 				placeholder: "Enter Your Email"
	// 			}
	// 		],
	// 		actions: [
	// 			{
	// 				label: "Email Disclaimer",
	// 				callback: () => {
	// 					setEnrollmentDisclaimerDialogProps(
	// 						Object.assign({}, enrollmentDisclaimerDialogProps, { openDialog: false })
	// 					);
	// 				}
	// 			}
	// 		]
	// 	});
	const [prevWritingNumber, setPrevWritingNumber] = useState(1408);
	const [showWritingNumberValidateButton, setShowWritingNumberValidateButton] = useState(false);
	const { theme } = useContext(ThemeContext);
	const [coverage_for, setCoverageFor] = useState("");
	const [plan_type, setPlanType] = useState("");
	const [premium_amount, setPremiumAmount] = useState(0);
	const [benefit_amount, setBenefitAmount] = useState(0);
	const [total_premium_amount, setTotalPremiumAmount] = useState(0);
	const [expanded, setExpanded] = useState<string | false>("panel_question");
	const [showMember, setShowMember] = useState(false);
	const [showQuestions, setShowQuestions] = useState(false);
	const [max_benefit_member, setMaxBenefitMember] = useState<any>([]);

	const handleSTDPlanChange = (event: SelectChangeEvent, dependentName: string | null) => {
		const { name, value } = event.target as HTMLSelectElement;
		setShortTermDisabilityPlanInput(
			Object.assign({}, shortTermDisabilityPlanInput, {
				[name]: value
			})
		);
		if (value !== "Employee Only") {
			setShowMember(true);
		} else {
			setShowMember(false);
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

	const calculatePremium = useCallback(() => {
		const { coverage, benefit, benefit_amount } = shortTermDisabilityPlanInput;
		if (coverage && benefit && benefit_amount && paycheck) {
			const calculatePremiumAmount =
				shortTermDisabilityPlanDetails.benefit_amount[coverage as keyof ShortTermDisabilityPlanCoverage][
					benefit as keyof ShortTermDisabilityCoverageLevel
				][benefit_amount as keyof PaycheckSTDArrayFrequency][
					calculateAgeGroup(memberAge) as keyof STDAgeGroups
				][paycheck.pay_frequency as keyof PaycheckFrequency];
			//const calculatePremiumAmount = 23;
			setPremiumAmount(calculatePremiumAmount ? calculatePremiumAmount : 0);
			setTotalPremiumAmount(calculatePremiumAmount ? calculatePremiumAmount : 0);
		}
	}, [memberAge, paycheck, shortTermDisabilityPlanDetails.benefit_amount, shortTermDisabilityPlanInput]);

	useEffect(() => {
		calculatePremium();
		max_benefit_member.length > 0 ? setShowQuestions(true) : setShowQuestions(false);
	}, [coverage_for, plan_type, benefit_amount, max_benefit_member, calculatePremium]);

	const { plan_name, plan_code, start_date, end_date } = plan;
	const { coverage, benefit } = shortTermDisabilityPlanInput;

	return (
		<>
			{/* <Suspense fallback={<div />}>
				<CustomEnrollmentDisclaimerDialog
					enrollmentDisclaimerDialogProps={enrollmentDisclaimerDialogProps}
					handleCloseDisclaimerDialog={handleCloseDisclaimerDialog}
					handleEscapeCloseDisclaimerDialog={handleEscapeCloseDisclaimerDialog}
					emailDisclaimer={emailDisclaimer}
					setEmailDisclaimer={setEmailDisclaimer}
				/>
			</Suspense> */}
			<div className="kemper-cancer-form plan-form">
				<div className="paper-form-container">
					<Paper className="theme-border-radius paper-container" elevation={1}>
						<PlanHeader
							planName="Kemper Short Term Disability Insurance Policy"
							effectiveDate={start_date}
						/>
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
												onChange={(event: SelectChangeEvent) =>
													handleSTDPlanChange(event, null)
												}
											>
												<MenuItem value="Employee Only">Employee Only</MenuItem>
											</Select>
										</div>
									</Grid>
									<Grid item xl={5} lg={5} md={5} sm={5} xs={6}>
										<div className="details-form-row">
											<div className="details-form-label  required">Benefit</div>
											<Select
												input={<CustomSelectInput />}
												style={{ width: "100%" }}
												name="benefit"
												onChange={(event: SelectChangeEvent) =>
													handleSTDPlanChange(event, null)
												}
											>
												<MenuItem value="Non-Occupational(Elim Period accident: 0 Sickness: 7 Benefit Period: 6 Months)">
													Non-Occupational(Elim Period accident: 0 Sickness: 7 Benefit Period:
													6 Months)
												</MenuItem>
												<MenuItem value="Non-Occupational(Elim Period accident: 14 Sickness: 14 Benefit Period: 6 Months)">
													Non-Occupational(Elim Period accident: 14 Sickness: 14 Benefit
													Period: 6 Months)
												</MenuItem>
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
												onChange={(event: SelectChangeEvent) =>
													handleSTDPlanChange(event, null)
												}
											>
												{benefitenefitAmount.map((plan, index) => {
													return (
														<MenuItem key={index} value={plan}>
															{plan.toFixed(2)}
														</MenuItem>
													);
												})}
											</Select>
										</div>
									</Grid>
									<Grid item xl={5} lg={5} md={5} sm={5} xs={6}></Grid>
									<Grid item xl={2} lg={2} md={2} sm={2} xs={6} className="amount-middle">
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
											{total_premium_amount == 0
												? "$0.00"
												: `$${total_premium_amount.toFixed(2)}`}
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
						<LazyPlanDisclaimer
							planDisclaimerChecked={planDisclaimerChecked}
							setPlanDisclaimerChecked={setPlanDisclaimerChecked}
						/>
						<div className="theme-plan-inner-section-margin-2" />
						<LazyPlanActions waiveButtonCallback={() => null} activateButtonCallback={() => null} />
					</Paper>
				</div>
			</div>
		</>
	);
};

export default KemperShortTermDisabilityForm;
