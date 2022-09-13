import { useState, useCallback, Suspense } from "react";
import CustomEnrollmentDisclaimerDialog from "../dialogs/customEnrollmentDisclaimerDialog/customEnrollmentDisclaimerDialog";
import { CustomDisclaimerDialogPropsType } from "../../../@types/dialogProps.types";

import { Button, Checkbox } from "@mui/material";

const PlanDisclaimer = ({ planDisclaimerChecked, setPlanDisclaimerChecked }: any) => {
	const [emailDisclaimer, setEmailDisclaimer] = useState("");
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
					placeholder: "Enter Your Email"
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

	const handleDisclaimerCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { checked } = event.target as HTMLInputElement;
		setPlanDisclaimerChecked(checked);
	};

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
			<div className="theme-plan-option-content">
				<span>
					<Checkbox
						checked={planDisclaimerChecked}
						onChange={handleDisclaimerCheckboxChange}
						style={{ paddingLeft: 0, paddingTop: 15 }}
					/>
				</span>
				<span className="theme-plan-checkbox-label">
					<strong>I have read the </strong>
					<Button variant="text" onClick={handleOpenDisclaimerDialogClick} className="disclaimer-text-btn">
						Disclaimer
					</Button>
				</span>
			</div>
		</>
	);
};

export default PlanDisclaimer;
