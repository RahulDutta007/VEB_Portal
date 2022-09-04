import { Button, MenuItem } from "@mui/material";
import { Select } from "@mui/material";
import { Grid, Paper } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { COVERAGE } from "../../../../../../../constants/coverage";
import { ThemeContext } from "../../../../../../../contexts";
import { LazyPlanActions, PlanHeader } from "../../../../../../shared";
import CustomInput from "../../../../../../shared/customInput/CustomInput";
import CustomSelectInput from "../../../../../../shared/customInput/CustomSelectInput";
import { Checkbox } from "@mui/material";
import { useState } from "react";
import { useCallback } from "react";
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import "./shortTermDisabilityForm.css";

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const KemperShortTermDisabilityForm = (): JSX.Element => {
    const [writingNumber, setWritingNumber] = useState(1408);
    const [plan, setPlan] = useState({
        plan_name: "Short Term Disability",
        plan_code: "plan001",
        start_date: "01/01/2023",
        end_date: "01/01/2024"
    });
    const [premium_plan, setPremiumPlan] = useState({
        member: [
            {
                benefit_amount: 350,
                premium_amount: 10.06
            },
            {
                benefit_amount: 300,
                premium_amount: 8.62
            },
            {
                benefit_amount: 250,
                premium_amount: 7.18
            },
            {
                benefit_amount: 200,
                premium_amount: 5.75
            },
            {
                benefit_amount: 150,
                premium_amount: 4.31
            },
            {
                benefit_amount: 100,
                premium_amount: 2.87
            }
        ],
        non_occupational_non_accident: {
            employee: [
                {
                    benefit_amount: 350,
                    premium_amount: 10.06
                },
                {
                    benefit_amount: 300,
                    premium_amount: 8.62
                },
                {
                    benefit_amount: 250,
                    premium_amount: 7.18
                },
                {
                    benefit_amount: 200,
                    premium_amount: 5.75
                },
                {
                    benefit_amount: 150,
                    premium_amount: 4.31
                },
                {
                    benefit_amount: 100,
                    premium_amount: 2.87
                }
            ],
            employee_and_family: [
                {
                    benefit_amount: 350,
                    premium_amount: 10.06
                },
                {
                    benefit_amount: 300,
                    premium_amount: 8.62
                },
                {
                    benefit_amount: 250,
                    premium_amount: 7.18
                },
                {
                    benefit_amount: 200,
                    premium_amount: 5.75
                },
                {
                    benefit_amount: 150,
                    premium_amount: 4.31
                },
                {
                    benefit_amount: 100,
                    premium_amount: 2.87
                }
            ]
        },
        non_occupational_accident: {
            employee: [
                {
                    benefit_amount: 350,
                    premium_amount: 15.31
                },
                {
                    benefit_amount: 350,
                    premium_amount: 13.12
                },
                {
                    benefit_amount: 350,
                    premium_amount: 10.93
                },
                {
                    benefit_amount: 350,
                    premium_amount: 8.75
                },
                {
                    benefit_amount: 350,
                    premium_amount: 6.56
                },
                {
                    benefit_amount: 350,
                    premium_amount: 4.37
                }
            ],
            employee_and_family: [
                {
                    benefit_amount: 350,
                    premium_amount: 15.31
                },
                {
                    benefit_amount: 350,
                    premium_amount: 13.12
                },
                {
                    benefit_amount: 350,
                    premium_amount: 10.93
                },
                {
                    benefit_amount: 350,
                    premium_amount: 8.75
                },
                {
                    benefit_amount: 350,
                    premium_amount: 6.56
                },
                {
                    benefit_amount: 350,
                    premium_amount: 4.37
                }
            ]
        }
    });
    const [prevWritingNumber, setPrevWritingNumber] = useState(1408);
    const [showWritingNumberValidateButton, setShowWritingNumberValidateButton] = useState(false);
    const { theme } = useContext(ThemeContext);
    const [coverage_for, setCoverageFor] = useState("");
    const [plan_type, setPlanType] = useState("");
    const [premium_amount, setPremiumAmount] = useState(0);
    const [benefit_amount, setBenefitAmount] = useState(0);
    const [total_premium_amount, setTotalPremiumAmount] = useState(0);
    const [expanded, setExpanded] = useState<string | false>('panel1');
    const [family_member, setFamilyMembers] = useState(["Rahul"]);
    const [family_member_details, setFamilyMemberDetails] = useState<any>([{
        member_name: "",
        benefit_amount: 0,
        premium_amount: 0
    }]);
    const [showMember, setShowMember] = useState(false);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };

    const handleCoverageChange = (event: React.FormEvent<HTMLSelectElement>) => {
        const { value } = event.target as HTMLSelectElement;
        setCoverageFor(value);
        if (value !== "Employee Only") {
            setShowMember(true);
        } else {
            setShowMember(false);
        }
    };

    const handlePlanChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target as HTMLSelectElement;
        setPlanType(value);
    };

    const handleBenefitAmountChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target as HTMLSelectElement;
        setBenefitAmount(parseInt(value));
    };

    const handleMemberBenefitAmountChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target as HTMLSelectElement;
        if (!family_member_details.find((member: { member_name: string; }) => member.member_name === name)) {
            family_member_details.push({
                member_name: name,
                benefit_amount: value,
                premium_amount: premium_plan.member.find(plan => plan.benefit_amount == parseInt(value))?.premium_amount
            });
            const familyDetails = JSON.parse(JSON.stringify(family_member_details));
            setFamilyMemberDetails(familyDetails);
            console.log(333, family_member_details);
        } else {
            const familyDetails = family_member_details.map((member: { member_name: string; }) => {
                if (member.member_name === name) {
                    return {
                        member_name: name,
                        benefit_amount: value,
                        premium_amount: premium_plan.member.find(plan => plan.benefit_amount == parseInt(value))?.premium_amount
                    }
                }
            });
            setFamilyMemberDetails(familyDetails);
            console.log(222, familyDetails);
        }
        console.log(111, family_member_details);
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

    const calculatePremium = () => {
        if (plan_type && coverage_for && benefit_amount) {
            const planType = plan_type === "non_occupational_non_accident" ? "non_occupational_non_accident" : "non_occupational_accident";
            const coverageFor = coverage_for === "Employee Only" ? "employee" : "employee_and_family";
            const calculatePremiumAmount = premium_plan[planType][coverageFor].find(plan => plan.benefit_amount === benefit_amount)?.premium_amount;
            setPremiumAmount(calculatePremiumAmount ? calculatePremiumAmount : 0);
            setTotalPremiumAmount(calculatePremiumAmount ? calculatePremiumAmount : 0);
            if (family_member_details && family_member_details.length > 0) {

            }
        }
    };

    useEffect(() => {
        calculatePremium();
        if (family_member_details) {
            console.log(333, typeof family_member_details, family_member_details);
            console.log(222, family_member_details.find((plan: { member_name: string; }) => plan.member_name === "Rahul")?.premium_amount.toFixed(2));
        }
    }, [coverage_for, plan_type, benefit_amount, family_member_details]);

    const { plan_name, plan_code, start_date, end_date } = plan;

    return (
        <div className="kemper-cancer-form plan-form">
            <div className="paper-form-container">
                <Paper className="theme-border-radius paper-container" elevation={1}>
                    <PlanHeader planName="Kemper Whole Life Insurance Policy" effectiveDate={start_date} />
                    <div className="plan-content">
                        <div className="theme-plan-section-margin" />
                        <div className="header-container header-container-new">
                            <div className="theme-plan-header">Standard Benefits</div>
                        </div>
                        <div>
                            <div className="theme-plan-sub-header plan-text" style={{ borderLeftColor: theme.primary_color }}>
                                In addition to yourself, who would you like to cover under this plan?
                            </div>
                            <Grid className="grid-container" container columnSpacing={2} >
                                <Grid item xl={5} lg={5} md={5} sm={6} xs={6}>
                                    <div className="details-form-row">
                                        <div className="details-form-label  required">Coverage For</div>
                                        <Select
                                            input={<CustomSelectInput />}
                                            style={{ width: "100%" }}
                                            name="contact_label"
                                            onChange={(event: any) => handleCoverageChange(event)}
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
                                <Grid item xl={5} lg={5} md={5} sm={6} xs={6}>
                                    <div className="details-form-row">
                                        <div className="details-form-label  required">Benefit</div>
                                        <Select
                                            input={<CustomSelectInput />}
                                            style={{ width: "100%" }}
                                            name="contact_label"
                                            onChange={(event: any) => handlePlanChange(event)}
                                        >
                                            <MenuItem value={"non_occupational_non_accident"}>Non-Occupational(Elim Period accident: 0 Sickness: 7 Benefit Period: 6 Months)</MenuItem>
                                            <MenuItem value={"non_occupational_accident"}>Non-Occupational(Elim Period accident: 14 Sickness: 14 Benefit Period: 6 Months)</MenuItem>
                                        </Select>
                                    </div>
                                </Grid>
                                <Grid item xl={5} lg={5} md={5} sm={6} xs={6}>
                                    <div className="details-form-row">
                                        <div className="details-form-label  required">Benefit Amount</div>
                                        <Select
                                            input={<CustomSelectInput />}
                                            style={{ width: "100%" }}
                                            name="contact_label"
                                            onChange={(event: any) => handleBenefitAmountChange(event)}
                                        >
                                            <MenuItem value={350}>350.00</MenuItem>
                                            <MenuItem value={300}>300.00</MenuItem>
                                            <MenuItem value={250}>250.00</MenuItem>
                                            <MenuItem value={200}>200.00</MenuItem>
                                            <MenuItem value={150}>150.00</MenuItem>
                                            <MenuItem value={100}>100.00</MenuItem>
                                        </Select>
                                    </div>
                                </Grid>
                                <Grid item xl={5} lg={5} md={5} sm={6} xs={6}>
                                </Grid>
                                <Grid item xl={2} lg={2} md={2} sm={6} xs={6} className="amount-middle">
                                    <div className="details-form-row">
                                        <div className="details-form-label required align-center">Premium</div>
                                        <div className="show-premium">{premium_amount == 0 ? "$0.00" : `$${premium_amount.toFixed(2)}`}</div>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                        {
                            showMember && family_member.map((member, index) => {
                                return (
                                    <div key={index}>
                                        <div className="member-name">
                                            {member}
                                        </div>
                                        <Grid className="grid-container" container columnSpacing={2} >
                                            <Grid item xl={5} lg={5} md={5} sm={6} xs={6}>
                                                <div className="details-form-row">
                                                    <div className="details-form-label  required">Benefit Amount</div>
                                                    <Select
                                                        input={<CustomSelectInput />}
                                                        style={{ width: "100%" }}
                                                        name={member}
                                                        onChange={(event: any) => handleMemberBenefitAmountChange(event)}
                                                    >
                                                        <MenuItem value={350}>350.00</MenuItem>
                                                        <MenuItem value={300}>300.00</MenuItem>
                                                        <MenuItem value={250}>250.00</MenuItem>
                                                        <MenuItem value={200}>200.00</MenuItem>
                                                        <MenuItem value={150}>150.00</MenuItem>
                                                        <MenuItem value={100}>100.00</MenuItem>
                                                    </Select>
                                                </div>
                                            </Grid>
                                            <Grid item xl={5} lg={5} md={5} sm={6} xs={6}>
                                            </Grid>
                                            <Grid item xl={2} lg={2} md={2} sm={6} xs={6} className="amount-middle">
                                                <div className="details-form-row">
                                                    <div className="details-form-label required align-center">Premium</div>
                                                    <div className="show-premium">{family_member_details.length === 1 ? "$0.00" : `$${family_member_details.find((plan: { member_name: string; }) => plan.member_name === member)?.premium_amount.toFixed(2) || "0.00"}`}</div>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="accordion-container">
                        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                <Typography>Questions</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    No eligibility questions are required for the selected coverage, please press next.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                    <div className="theme-plan-inner-section-margin" />
                    {total_premium_amount > 0 ? <Grid container className="theme-plan-inner-section-margin">
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <div className="details-form-row">
                                <div
                                    className="details-form-label theme-plan-total-premium align-right"
                                    style={{ color: theme.primary_color }}
                                >
                                    Total Premium: <span className="show-premium margin-adjust">{total_premium_amount == 0 ? "" : `$${total_premium_amount.toFixed(2)}`}</span>
                                </div>
                            </div>
                        </Grid>
                    </Grid> : null
                    }
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

export default KemperShortTermDisabilityForm;
