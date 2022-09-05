import { Schema, model } from "mongoose";
import { ILocationSchema } from "../../@types/interface/location.interface";
import { GENERAL_SCHEMA_OPTIONS } from "../../constants/model/schemaOption";

const locationSchema: Schema<ILocationSchema> = new Schema(
	{
		group_number: {
			type: Number,
			required: true,
			default: 0
		},
		location_number: {
			type: Number,
			required: true
		},
		location_name: {
			type: String,
			required: true
		},
		date: {
			type: Date,
			default: Date.now
		},
		ADDR1: {
			type: String,
			default: null
		},
		ADDR2: {
			type: String,
			default: null
		},
		CITY: {
			type: String,
			default: null
		},
		STATE: {
			type: String,
			default: null
		},
		ZIPCODE: {
			type: Number,
			default: 0
		},
		CONTACT: {
			type: String,
			default: null
		},
		EMAIL: {
			type: String,
			default: null
		},
		PHONE: {
			type: String,
			default: null
		},
		FAX: {
			type: String,
			default: null
		},
		BEGDT: {
			type: String,
			default: null
		},
		ENDDT: {
			type: String,
			default: null
		},
		RENEWLDT: {
			type: String,
			default: null
		},
		LASTUPDT: {
			type: String,
			default: null
		},
		BALFWD: {
			type: Number,
			default: 0
		},
		PAYMENTS: {
			type: Number,
			default: 0
		},
		LSTPMTDT: {
			type: String,
			default: null
		},
		ADJMENTS: {
			type: Number,
			default: 0
		},
		LSTADJDT: {
			type: String,
			default: null
		},
		EMPSBLD: {
			type: Number,
			default: 0
		},
		PBSURCPERC: {
			type: Number,
			default: 0
		},
		PBDISCPERC: {
			type: Number,
			default: 0
		},
		PDTHRUDT: {
			type: String,
			default: null
		},
		AGNADJYTD: {
			type: Number,
			default: 0
		},
		EFTBEGDT: {
			type: String,
			default: null
		},
		EFTENDDT: {
			type: String,
			default: null
		},
		BNKROUTNOT: {
			type: String,
			default: null
		},
		BNKACCTNOT: {
			type: String,
			default: null
		},
		EFTLSTDT: {
			type: String,
			default: null
		},
		EFTLSTAMT: {
			type: Number,
			default: 0
		},
		EFTTOTALT: {
			type: Number,
			default: 0
		},
		LSTCHGDT: {
			type: String,
			default: null
		},
		LSTCHGOPER: {
			type: Number,
			default: 0
		},
		INTLADDRFLAG: {
			type: String,
			default: null
		},
		EFTFLAG: {
			type: String,
			default: null
		},
		GTDRATEFLAG: {
			type: String,
			default: null
		},
		PBEFFDT: {
			type: String,
			default: null
		},
		MTHSBILLED: {
			type: Number,
			default: 0
		},
		EFTDESTACCTNO: {
			type: Number,
			default: 0
		},
		BNKNAMET: {
			type: String,
			default: null
		},
		EMAILCONPWD: {
			type: String,
			default: null
		},
		PBEFTPROCREDIT: {
			type: String,
			default: null
		},
		PB2RPTOVRD: {
			type: String,
			default: null
		},
		PB2RATEOVRD: {
			type: String,
			default: null
		},
		LASTUPDTOPER: {
			type: Number,
			default: 0
		}
	},
	GENERAL_SCHEMA_OPTIONS
);

const locationModel = model<ILocationSchema>("locations", locationSchema);
export default locationModel;
