/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState, useEffect, useRef, Suspense, useCallback, useContext } from "react";
import { DynamicForm, DynamicFormField } from "../../../@types/dynamicForm.types";
import { LazySnackbarAPI } from "../../shared";
import { SnackbarProps } from "../../../@types/snackbarAPI.types";
import "./CreatePlan.css";
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
	const [userForm, setUserForm] = useState<DynamicForm>();
	const [hasCreatePlanClick, setHasCreatePlanClick] = useState(false);
	const [isPlanCodeExist, setIsPlanCodeExist] = useState(false);
	const [addedPlan, setAddedPlan] = useState<null | string>(null);
	const [createdPlan, setCreatedPlan] = useState({
		plan_code: "",
		plan_name: "",
		start_date: "",
		end_date: "",
		has_end_date: false
	});
	const [validation, setValidation] = useState<Validation>({
		createdPlan: {},
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
			setCreatedPlan(Object.assign({}, createdPlan, { [name]: checked }));
		},
		[createdPlan]
	);

	const handlePlanChange = useCallback(
		async (event: React.ChangeEvent<HTMLInputElement>) => {
			const { value } = event.target;
			const { name } = event.target;
			if (name === "plan_code") {
				setCreatedPlan(Object.assign({}, createdPlan, { [name]: value }));
				await findPlanCode(value);
			} else if (name === "plan_name") {
				setCreatedPlan(Object.assign({}, createdPlan, { [name]: value }));
			} else {
				setCreatedPlan(Object.assign({}, createdPlan, { [name]: value }));
			}
		},
		[createdPlan, findPlanCode]
	);

	const handleValidation = useCallback(() => {
		const { plan_code, plan_name, start_date, end_date } = createdPlan;
		_validation.current = {
			...validation,
			createdPlan: {},
			status: "invalid"
		};
		let flag = true;

		if (plan_code.length === 0) {
			_validation.current.createdPlan["plan_code"] = "Plan Code is required";
			_validation.current["status"] = "invalid";
			flag = false;
		}
		if (plan_name.length === 0) {
			_validation.current.createdPlan["plan_name"] = "Plan Name is required";
			_validation.current["status"] = "invalid";
			flag = false;
		}
		if (String(start_date).length === 0) {
			_validation.current.createdPlan["start_date"] = "Plan Start is required";
			_validation.current["status"] = "invalid";
			flag = false;
		}
		if (String(start_date).length > 0 && String(end_date).length > 0) {
			const planStartDate = new Date(start_date).getTime();
			const planEndDate = new Date(end_date).getTime();

			if (planStartDate > planEndDate) {
				_validation.current.createdPlan["start_date"] = "Plan Start Date cannot be less than Plan End Date";
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
	}, [createdPlan, validation]);

	const handleCreatePlan = useCallback(
		async (event: React.MouseEvent<HTMLButtonElement>) => {
			event.preventDefault();
			setHasCreatePlanClick(true);
			const validation = handleValidation();
			if (validation === "valid" && !isPlanCodeExist) {
				const { end_date } = createdPlan;
				const planEndDate = end_date.length > 0 ? end_date : null;

				const payload = {
					plan_name: createdPlan.plan_name,
					plan_code: createdPlan.plan_code,
					start_date: createdPlan.start_date,
					end_date: planEndDate
				};
				const response = await api.plan.createPlan(payload);
				if (response.message === "Data added successfully") {
					setCreatedPlan(
						Object.assign({}, createdPlan, {
							plan_code: "",
							plan_name: "",
							start_date: "",
							end_date: ""
						})
					);
					setHasCreatePlanClick(false);
					setAddedPlan(createdPlan.plan_name);
					setCreatedPlan(
						Object.assign({}, createdPlan, {
							plan_code: "",
							plan_name: "",
							start_date: "",
							end_date: ""
						})
					);
					setSnackbarAPICallProps(
						Object.assign({}, snackbarAPICallProps, {
							open: true,
							message: "Plan Creation Successful",
							severity: "success"
						})
					);
				} else {
					setHasCreatePlanClick(false);
					setCreatedPlan(
						Object.assign({}, createdPlan, {
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
				setHasCreatePlanClick(false);
				setSnackbarAPICallProps(
					Object.assign({}, snackbarAPICallProps, {
						open: true,
						message: "Plan Creation Failed!",
						severity: "error"
					})
				);
			}
		},
		[createdPlan, handleValidation, isPlanCodeExist, snackbarAPICallProps]
	);

	const handleKeyCheck = useCallback((event: React.KeyboardEvent<HTMLInputElement | HTMLDivElement>) => {
		const abc = event;
	}, []);

	const handlePaste = useCallback((event: React.ClipboardEvent<HTMLInputElement | HTMLDivElement>) => {
		const abc = event;
	}, []);

	const handleUserDateChange = useCallback(
		(_date: MaterialUiPickersDate, name: string) => {
			const date = new Date(_date as any);
			const parsedDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

			setCreatedPlan(Object.assign({}, createdPlan, { [name]: parsedDate }));
		},
		[createdPlan]
	);

	useEffect(() => {
		async function fetchData() {
			const response = await api.plan.getAllPlan("ACTIVE");
			if (response.message === "Success") {
				setUserForm(
					Object.assign(
						{},
						{
							Create_Plan: [
								{
									label: "Plan Code",
									name: "plan_code",
									onChange: (event: React.ChangeEvent<HTMLInputElement>) => handlePlanChange(event),
									placeholder: "Enter Plan Code",
									value: createdPlan.plan_code,
									type: "textfield"
								},
								{
									label: "Plan Name",
									name: "plan_name",
									onChange: (event: React.ChangeEvent<HTMLInputElement>) => handlePlanChange(event),
									placeholder: "Select Plan Name",
									value: createdPlan.plan_name,
									type: "select",
									options: [
										"",
										"Accident",
										"Cancer",
										"Short Term Disability",
										"Hospital Indemnity",
										"Critical Illness Group",
										"Whole Life"
									].filter((plan: string) => {
										return !response.data.some((dbPlan: any) => {
											return dbPlan.plan_name === plan;
										});
									})
								},
								{
									label: "Plan Start Date",
									name: "start_date",
									onChange: (date: MaterialUiPickersDate, name: string) =>
										handleUserDateChange(date, name),
									placeholder: "Enter Plan Start Date",
									value: createdPlan.start_date,
									type: "date"
								},
								{
									label: "Plan has End Date?",
									name: "has_end_date",
									onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
										handleEnableCheckbox(event),
									value: createdPlan.has_end_date,
									type: "checkbox"
								},
								{
									label: "Plan End Date",
									name: "end_date",
									onChange: (date: MaterialUiPickersDate, name: string) =>
										handleUserDateChange(date, name),
									placeholder: "Enter Plan End Date",
									value: createdPlan.end_date,
									type: "date"
								}
							]
						}
					)
				);
			}
		}
		fetchData();
	}, [
		createdPlan.plan_code,
		createdPlan.end_date,
		createdPlan.plan_name,
		createdPlan.start_date,
		handlePlanChange,
		handleUserDateChange,
		createdPlan.has_end_date,
		handleEnableCheckbox
	]);
	return (
		<div className="create-createdUser" id="create-createdUser">
			<Suspense fallback={<div />}>
				<LazySnackbarAPI snackbarProps={snackbarAPICallProps} />
			</Suspense>
			<Grid container spacing={1} className="pf-grid-container">
				{userForm &&
					Object.entries(userForm).map(([key, value], index) => {
						return (
							<div key={index}>
								<div className="pf-title">Create Plan</div>
								<Suspense fallback={<div />}>
									<div className="pf-action-button-container" id="pf-action-button-container">
										<Button
											className="button-green"
											onClick={handleCreatePlan}
											variant="contained"
											disabled={hasCreatePlanClick}
											disableElevation={hasCreatePlanClick}
											style={{
												cursor: hasCreatePlanClick ? "not-allowed" : "pointer",
												pointerEvents: "unset"
											}}
										>
											<span className="button-label-with-icon">Create Plan</span>
										</Button>
									</div>
									<Paper className="pf-paper-container" elevation={3} variant="outlined">
										{value.map((field: DynamicFormField, index: number) => {
											return (
												<Grid key={index} item xl={12} lg={12} md={12} sm={12} xs={12}>
													<Grid container spacing={1} className="pf-label">
														<Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
															<div
																className={
																	field.name === "plan_code" ||
																	field.name === "plan_name" ||
																	field.name === "start_date"
																		? "pf-label-text required"
																		: "pf-label-text"
																}
																id="pf-label-text"
															>
																{createdPlan.has_end_date === false &&
																field.name === "end_date"
																	? null
																	: field.label}
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
																					_validation?.current?.createdPlan
																			  ).indexOf(field.name) > -1 &&
																			  field.type === "textfield"
																			? _validation?.current?.createdPlan[
																					field.name
																			  ]
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
																			?.filter(
																				(option: any) => option !== addedPlan
																			)
																			.map((option: any) => (
																				<MenuItem key={option} value={option}>
																					{option}
																				</MenuItem>
																			))}
																	</Select>
																	{validation &&
																	validation.createdPlan[field.name] ? (
																		<div className="details">
																			<span className="select-validation-text2">
																				{validation.createdPlan[field.name]}
																			</span>
																		</div>
																	) : null}
																</>
															) : (field.type === "date" &&
																	field.name === "start_date") ||
															  (field.type === "date" &&
																	field.name === "end_date" &&
																	createdPlan.has_end_date === true) ? (
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
																				_validation?.current?.createdPlan
																			).indexOf(field.name) > -1 &&
																			field.type === "date"
																				? _validation?.current?.createdPlan[
																						field.name
																				  ]
																				: ""
																		}
																	/>
																</MuiPickersUtilsProvider>
															) : field.type === "checkbox" ? (
																<>
																	<div className="check-support" id="check-support">
																		<span>
																			<GreenCheckbox
																				onChange={field.onChange}
																				name={field.name}
																				checked={field.value}
																			/>
																		</span>
																		<span
																			className="pf-label-text"
																			id="pf-label-text"
																		>
																			{field.label}
																		</span>
																	</div>
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
				<Button
					className="button-green"
					onClick={handleCreatePlan}
					variant="contained"
					disabled={hasCreatePlanClick}
					disableElevation={hasCreatePlanClick}
					style={{
						cursor: hasCreatePlanClick ? "not-allowed" : "pointer",
						pointerEvents: "unset"
					}}
				>
					<span className="button-label-with-icon">Create Plan</span>
				</Button>
			</div>
		</div>
	);
};

export default CreatePlan;
