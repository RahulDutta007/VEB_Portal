import { model, Schema, Types, SchemaDefinitionProperty } from "mongoose";
import { IMemberSchema } from "../../@types/interface/memberSchema.interface";
import { GENERAL_SCHEMA_OPTIONS } from "../../constants/model/schemaOption";
import { ROLES } from "../../constants/roles/roles";
import { MARITAL_STATUS } from "../../constants/maritalStatus/maritalStatus";
import { CONTACTLABEL } from "../../constants/contactLabel/contactLabel";
import { UPLOAD_TYPE } from "../../constants/uploadType/uploadType";
import { GENDER } from "../../constants/gender/gender";
import { RELATIONSHIP } from "../../constants/relationship/relationship";
import { DEPENDENT_TYPE } from "../../constants/dependentType/dependentType";
import { EMPLOYEE_STATUS } from "../../constants/employeeStatus/employeeStatus";
import { DEPENDENT_STATUS } from "../../constants/dependentStatus/dependentStatus";
import { EVENT_NAME } from "../../constants/eventName/eventName";

const memberSchema: Schema<IMemberSchema> = new Schema(
	{
		member_id: {
			// This Id is mapped with Group HR (Group Specific)
			type: String,
			default: null
			// required: [true, "Employee Id cannot be empty"]
		},
		employee_number: {
			// This number will be generated from WLT database.
			type: Number,
			default: null
		},
		dependent_number: {
			// This number will be generated from WLT database.
			type: Number,
			default: null
		},
		group_number: {
			// Group Number is used as after mapping with WLT.
			type: Number,
			required: true
			//required: [true, "Group must be assigned"]
		},
		location_number: {
			// Location name is used as after mapping with WLT.
			type: Number,
			ref: "locations"
			//required: [true, "Add Location: foreign key"]
		},
		first_name: {
			type: String,
			trim: true,
			maxlength: [50, "Name cannot be more than 50 characters"]
		},
		middle_name: {
			type: String
		},
		last_name: {
			type: String,
			trim: true,
			maxlength: [50, "Name cannot be more than 50 characters"]
		},
		user_name: {
			type: String,
			// unique: [true, "Username already taken"],
			default: null
		},
		password: {
			type: String,
			default: null
		},
		role: {
			type: String,
			required: [true, "Please provide a role"],
			enum: [ROLES.employee, ROLES.dependent, null]
		},
		email: {
			type: String,
			//unique: true,
			required: [true, "Email is required"]
		},
		SSN: {
			type: String,
			required: [true, "SSN is required"],
			unique: true
		},
		employee_SSN: {
			type: String
			//required: [true, "SSN is required"]
		},
		date_of_birth: {
			type: Date,
			default: null
		},
		gender: {
			type: String,
			enum: [GENDER.male, GENDER.female, GENDER.others]
		},
		dependent_type: {
			// This is for dependent
			type: String,
			enum: [DEPENDENT_TYPE.d_dependent, DEPENDENT_TYPE.not_eligible, null],
			default: null
		},
		marital_status: {
			type: String,
			enum: [
				MARITAL_STATUS.single,
				MARITAL_STATUS.married,
				MARITAL_STATUS.divorced,
				MARITAL_STATUS.common_law_marriage,
				null
			],
			default: null
		},
		relationship: {
			// This is for dependent
			type: String,
			enum: [
				RELATIONSHIP.spouse,
				RELATIONSHIP.son,
				RELATIONSHIP.daughter,
				RELATIONSHIP.stepchild,
				RELATIONSHIP.court_ordered_dependent,
				RELATIONSHIP.legal_custody_child,
				RELATIONSHIP.disabled_child,
				RELATIONSHIP.grandchild,
				null
			],
			default: null
		},
		upload_type: {
			type: String,
			enum: [UPLOAD_TYPE.bulk, UPLOAD_TYPE.manual, UPLOAD_TYPE.migrated]
			//default: UPLOAD_TYPE.manual
		},
		address_line_1: {
			type: String
		},
		address_line_2: {
			type: String
		},
		city: {
			type: String
		},
		state: {
			type: String
		},
		country: {
			type: String,
			default: "USA - United States of America"
		},
		ZIP: {
			type: String,
			default: null
		},
		contact_label: {
			type: String,
			enum: [
				CONTACTLABEL.business,
				CONTACTLABEL.home,
				CONTACTLABEL.mail,
				CONTACTLABEL.mobile,
				CONTACTLABEL.other,
				null
			],
			default: null
		},
		phone_number: {
			type: Number,
			default: null
		},
		phone_extension: {
			type: Number,
			default: null
		},
		hire_date: {
			type: Date,
			default: null
			//required: [true, "Hire Date cannot be empty"]
		},
		hire_location_number: {
			// This field is to store the location number from where the Employee is hired.
			type: Number,
			ref: "locations",
			default: null
		},
		dependent_benefit_term_reason: {
			// This field is for dependent term reason from benefits
			type: String,
			default: null
		},
		employee_status: {
			type: String,
			enum: [EMPLOYEE_STATUS.active, EMPLOYEE_STATUS.inactive, EMPLOYEE_STATUS.relieved, null],
			default: null
			//required: [true, "Employement status cannot empty"]
		},
		dependent_status: {
			// This will be "ACTIVE" when a dependent is added for a particular employee and Will be "REMOVED" when moved to history by Group Owners.
			type: String,
			enum: [DEPENDENT_STATUS.active, DEPENDENT_STATUS.removed, null],
			default: null
		},
		dependent_profile_access: {
			type: Boolean,
			default: false
		},
		is_registered: {
			type: Boolean,
			default: false
		},
		is_active: {
			type: Boolean,
			default: false
		},
		is_term: {
			type: Boolean,
			default: false
		},
		term_date: {
			type: Date,
			default: null
		},
		term_reason: {
			type: String,
			default: null
		},
		event_date: {
			// This is for dependent
			type: Date,
			default: null
		},
		event_name: {
			// This is for dependent
			type: String,
			enum: [EVENT_NAME.marriage, EVENT_NAME.birth_of_baby, EVENT_NAME.adoption, EVENT_NAME.others, null],
			default: null
		},
		event_document: {
			// This is for dependent
			type: Object,
			default: null
		},
		created_by: {
			type: Schema.Types.ObjectId,
			ref: "group_owners"
			//required: [true, "Group must be assigned"]
		},
		created_date: {
			type: Date,
			default: Date.now
		},
		date: {
			type: Date,
			default: Date.now
		},
		last_login_date: {
			type: Date,
			default: null
		}
	},
	{ ...GENERAL_SCHEMA_OPTIONS, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

memberSchema.virtual("group", {
	ref: "groups",
	localField: "group_number",
	foreignField: "group_number",
	justOne: true
});

memberSchema.virtual("location", {
	ref: "locations",
	localField: "location_number",
	foreignField: "location_number",
	justOne: true
});

memberSchema.set("toJSON", { virtuals: true });
memberSchema.set("toObject", { virtuals: true });

const memberModel = model<IMemberSchema>("members", memberSchema);

export default memberModel;
