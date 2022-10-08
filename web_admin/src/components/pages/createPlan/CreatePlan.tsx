import React, { useState, useEffect, useRef, Suspense, useCallback, useContext } from "react";
import { DynamicForm, DynamicFormField } from "../../../@types/dynamicForm.types";
import { LazySnackbarAPI } from "../../shared";
import { SnackbarProps } from "../../../@types/snackbarAPI.types";
import {
	Button,
	Grid,
	MenuItem,
	Paper,
	Select,
	TextField,
	Checkbox,
	CheckboxProps,
	withStyles
} from "@material-ui/core";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import EventIcon from "@material-ui/icons/Event";
import DateFnsUtils from "@date-io/date-fns";
import { Validation } from "../../../@types/validation.types";
import { api } from "../../../utils/api";
import { useDebouncedCallback } from "use-debounce";
import { green } from "@material-ui/core/colors";
import { Plan } from "../../../@types/plan.types";

import "./createPlan.css";
import { UIContext } from "../../../contexts";
import { ADMIN_DASHBOARD_HEADER } from "../../../constants/caption/dashboardHeader";
import { useNavigate } from "react-router-dom";
import { PLAN_NAME } from "../../../constants/plan";

const GreenCheckbox = withStyles({
	root: {
		color: green[400],
		"&$checked": {
			color: green[600]
		}
	},
	checked: {}
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

const CreatePlan = () => {
	const [planForm, setPlanForm] = useState<DynamicForm>();
	const { setDashboardHeader } = useContext(UIContext);
	const [isPlanCodeExist, setIsPlanCodeExist] = useState(false);
	const [plan, setPlan] = useState<Plan>({
		plan_code: "",
		plan_name: "",
		start_date: "",
		end_date: "",
		has_end_date: false
	});
	const navigate = useNavigate();
	const [validation, setValidation] = useState<Validation>({
		plan: {},
		status: "invalid"
	});
	const _validation = useRef<Validation>();
	const [snackbarAPICallProps, setSnackbarAPICallProps] = useState<SnackbarProps>({
		open: false,
		severity: undefined,
		message: "",
		handleSnackbarClose: (event, reason) => {
			if (reason === "clickaway") return;
			setSnackbarAPICallProps(
				Object.assign({}, snackbarAPICallProps, {
					open: false
				})
			);
		}
	});

	const findPlanCode = useDebouncedCallback(async (value: string) => {
		if (value !== "") {
			const planResponse = await api.plan.findPlanCode(value);
			if (planResponse && planResponse.codeExist !== undefined && planResponse.codeExist === true) {
				setIsPlanCodeExist(true);
			} else if (planResponse && planResponse.codeExist !== undefined && planResponse.codeExist === false) {
				setIsPlanCodeExist(false);
			} else {
				setIsPlanCodeExist(false);
				setSnackbarAPICallProps(
					Object.assign({}, snackbarAPICallProps, {
						open: true,
						message: "Error Occurred",
						severity: "error"
					})
				);
			}
		} else {
			console.log("error");
		}
	}, 500);

	const handleEnableCheckbox = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const { name, checked } = event.target;
			setPlan(Object.assign({}, plan, { [name]: checked }));
		},
		[plan]
	);

	const handlePlanChange = useCallback(
		async (event: React.ChangeEvent<HTMLInputElement>) => {
			const { value } = event.target;
			const { name } = event.target;
			if (name === "plan_code") {
				setPlan(Object.assign({}, plan, { [name]: value }));
				await findPlanCode(value);
			} else if (name === "plan_name") {
				setPlan(Object.assign({}, plan, { [name]: value }));
			} else {
				setPlan(Object.assign({}, plan, { [name]: value }));
			}
		},
		[plan, findPlanCode]
	);

	const handleValidation = useCallback(() => {
		const { plan_code, plan_name, start_date, end_date } = plan;
		_validation.current = {
			...validation,
			plan: {},
			status: "invalid"
		};
		let flag = true;

		if (plan_code.length === 0) {
			_validation.current.plan["plan_code"] = "Plan Code is required";
			_validation.current["status"] = "invalid";
			flag = false;
		}
		if (plan_name.length === 0) {
			_validation.current.plan["plan_name"] = "Plan Name is required";
			_validation.current["status"] = "invalid";
			flag = false;
		}
		if (String(start_date).length === 0) {
			_validation.current.plan["start_date"] = "Plan Start is required";
			_validation.current["status"] = "invalid";
			flag = false;
		}
		if (String(start_date).length > 0 && String(end_date).length > 0) {
			const planStartDate = new Date(start_date).getTime();
			const planEndDate = new Date(end_date).getTime();

			if (planStartDate > planEndDate) {
				_validation.current.plan["start_date"] = "Plan Start Date cannot be less than Plan End Date";
				_validation.current["status"] = "invalid";
				flag = false;
			}
		}

		if (flag === true) _validation.current["status"] = "valid";
		else {
			_validation.current["status"] = "invalid";
			alert("Please, fill all required fields!");
		}
		setValidation(Object.assign({}, _validation.current));
		return _validation.current["status"];
	}, [plan, validation]);

	const handleCreatePlanClick = useCallback(
		async (event: React.MouseEvent<HTMLButtonElement>) => {
			event.preventDefault();
			const validation = handleValidation();
			if (validation === "valid" && !isPlanCodeExist) {
				const { end_date } = plan;
				const planEndDate = end_date.length > 0 ? end_date : null;

				const payload = {
					plan_name: plan.plan_name,
					plan_code: plan.plan_code,
					start_date: plan.start_date,
					end_date: planEndDate
				};
				const response = await api.plan.createPlan(payload);
				if (response.message === "Data added successfully") {
					setSnackbarAPICallProps(
						Object.assign({}, snackbarAPICallProps, {
							open: true,
							message: "Plan Creation Successful",
							severity: "success"
						})
					);
					setTimeout(() => null, 2000);
					navigate("/plans");
				} else {
					setPlan(
						Object.assign({}, plan, {
							plan_code: "",
							plan_name: "",
							start_date: "",
							end_date: ""
						})
					);
					setSnackbarAPICallProps(
						Object.assign({}, snackbarAPICallProps, {
							open: true,
							message: "Plan Creation Failed!",
							severity: "error"
						})
					);
				}
			} else {
				setSnackbarAPICallProps(
					Object.assign({}, snackbarAPICallProps, {
						open: true,
						message: "Plan Creation Failed!",
						severity: "error"
					})
				);
			}
		},
		[plan, handleValidation, isPlanCodeExist, snackbarAPICallProps]
	);

	const handlePlanDateChange = useCallback(
		(_date: MaterialUiPickersDate, name: string) => {
			const date = new Date(_date as any);
			const parsedDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

			setPlan(Object.assign({}, plan, { [name]: parsedDate }));
		},
		[plan]
	);

	const getActivePlans = useCallback(async () => {
		const activePlans: Plan[] = await api.plan.getAllPlan("ACTIVE");
		setPlanForm(
			Object.assign(
				{},
				{
					"Create Plan": [
						{
							label: "Plan Code",
							name: "plan_code",
							onChange: (event: React.ChangeEvent<HTMLInputElement>) => handlePlanChange(event),
							placeholder: "Enter Plan Code",
							value: plan.plan_code,
							type: "textfield"
						},
						{
							label: "Plan Name",
							name: "plan_name",
							onChange: (event: React.ChangeEvent<HTMLInputElement>) => handlePlanChange(event),
							placeholder: "Select Plan Name",
							value: plan.plan_name,
							type: "select",
							options: [PLAN_NAME.kemper.cancer.standard_cancer].filter((plan: string) => {
								console.log("plan", plan);
								return !activePlans.some((activePlan: Plan) => {
									return activePlan.plan_name === plan;
								});
							})
						},
						{
							label: "Start Date",
							name: "start_date",
							onChange: (date: MaterialUiPickersDate, name: string) => handlePlanDateChange(date, name),
							placeholder: "Enter Plan Start Date",
							value: plan.start_date,
							type: "date"
						},
						{
							label: "Plan has End Date?",
							name: "has_end_date",
							onChange: (event: React.ChangeEvent<HTMLInputElement>) => handleEnableCheckbox(event),
							value: plan.has_end_date,
							type: "checkbox"
						},
						{
							label: "End Date",
							name: "end_date",
							onChange: (date: MaterialUiPickersDate, name: string) => handlePlanDateChange(date, name),
							placeholder: "Enter Plan End Date",
							value: plan.end_date,
							type: "date"
						}
					]
				}
			)
		);
	}, [
		handleEnableCheckbox,
		handlePlanChange,
		handlePlanDateChange,
		plan.end_date,
		plan.has_end_date,
		plan.plan_code,
		plan.plan_name,
		plan.start_date
	]);

	useEffect(() => {
		getActivePlans();
		setDashboardHeader(ADMIN_DASHBOARD_HEADER.create_plan);
	}, [getActivePlans, setDashboardHeader]);

	return (
		<div className="create-createdUser" id="create-createdUser">
			<Suspense fallback={<div />}>
				<LazySnackbarAPI snackbarProps={snackbarAPICallProps} />
			</Suspense>
			<div className="pf-action-button-container" id="pf-action-button-container">
				<Button className="button-green" onClick={handleCreatePlanClick} variant="contained">
					<span className="button-label-with-icon">Create Plan</span>
				</Button>
			</div>
			<Grid container spacing={1} className="pf-grid-container">
				{planForm &&
					Object.entries(planForm).map(([key, value], index: number) => {
						return (
							<div key={index}>
								<div className="pf-title">Create Plan</div>
								<Suspense fallback={<div />}>
									<Paper className="pf-paper-container" elevation={3} variant="outlined">
										{value.map((field: DynamicFormField, index: number) => {
											return field.name === "end_date" && plan.has_end_date === false ? null : (
												<Grid key={index} item xl={12} lg={12} md={12} sm={12} xs={12}>
													<Grid container spacing={1} className="pf-label">
														<Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
															<div
																className={
																	field.name === "plan_code" ||
																	field.name === "plan_name" ||
																	field.name === "start_date" ||
																	field.name === "end_date"
																		? "pf-label-text required"
																		: "pf-label-text"
																}
																id="pf-label-text"
															>
																{field.label}
															</div>
														</Grid>
														<Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
															{field.type === "textfield" ? (
																<TextField
																	className="text-field-input text-field-input-create-enroller pointer-event-unset create-admin-input-width"
																	id="text-field-input"
																	name={field.name}
																	placeholder={field.placeholder}
																	value={field.value}
																	onChange={field.onChange}
																	variant="outlined"
																	helperText={
																		field.name === "plan_code" &&
																		field.value.length > 0 &&
																		isPlanCodeExist
																			? "Plan Code Exist"
																			: _validation.current !== undefined &&
																			  _validation?.current?.status ===
																					"invalid" &&
																			  Object.keys(
																					_validation?.current?.plan
																			  ).indexOf(field.name) > -1 &&
																			  field.type === "textfield"
																			? _validation?.current?.plan[field.name]
																			: ""
																	}
																/>
															) : field.type === "select" ? (
																<>
																	<Select
																		id="text-align-options"
																		className="pointer-event-unset select-input-style create-user-input-select"
																		name={field.name}
																		onChange={field.onChange}
																		MenuProps={{
																			style: { zIndex: 35960 }
																		}}
																		inputProps={{ "aria-label": "Without label" }}
																		value={field.value}
																	>
																		<MenuItem value="" disabled>
																			Select Value
																		</MenuItem>
																		{field?.options
																			?.filter((option: string) => option !== "")
																			.map((option: string) => (
																				<MenuItem key={option} value={option}>
																					{option}
																				</MenuItem>
																			))}
																	</Select>
																	{validation && validation.plan[field.name] ? (
																		<div className="details">
																			<span className="select-validation-text2">
																				{validation.plan[field.name]}
																			</span>
																		</div>
																	) : null}
																</>
															) : (field.type === "date" &&
																	field.name === "start_date") ||
															  (field.type === "date" &&
																	field.name === "end_date" &&
																	plan.has_end_date === true) ? (
																<MuiPickersUtilsProvider utils={DateFnsUtils}>
																	<KeyboardDatePicker
																		className="date-input pointer-event-unset create-admin-input-width create-user-input-date"
																		id="date-input"
																		inputVariant="outlined"
																		label={field.label}
																		placeholder={field.placeholder}
																		name={field.name}
																		format="MM/dd/yyyy"
																		error={false}
																		value={field.value}
																		onChange={(date: MaterialUiPickersDate) =>
																			field.onChange(date, field.name)
																		}
																		InputProps={{
																			readOnly: true
																		}}
																		InputLabelProps={{
																			shrink: true
																		}}
																		keyboardIcon={
																			<EventIcon className="theme-color-green" />
																		}
																		KeyboardButtonProps={{
																			"aria-label": "change date"
																		}}
																		helperText={
																			_validation.current !== undefined &&
																			_validation?.current?.status ===
																				"invalid" &&
																			Object.keys(
																				_validation?.current?.plan
																			).indexOf(field.name) > -1 &&
																			field.type === "date"
																				? _validation?.current?.plan[field.name]
																				: ""
																		}
																	/>
																</MuiPickersUtilsProvider>
															) : field.type === "checkbox" ? (
																<>
																	<GreenCheckbox
																		onChange={field.onChange}
																		name={field.name}
																		checked={field.value}
																	/>
																</>
															) : null}
														</Grid>
													</Grid>
												</Grid>
											);
										})}
									</Paper>
								</Suspense>
							</div>
						);
					})}
			</Grid>
			<div className="pf-action-button-container margin-top-action-button" id="pf-action-button-container">
				<Button className="button-green" onClick={handleCreatePlanClick} variant="contained">
					<span className="button-label-with-icon">Create Plan</span>
				</Button>
			</div>
		</div>
	);
};

export default CreatePlan;
