import { SchemaDefinitionProperty } from "mongoose";

export interface ILocationSchema {
	group_number: number;
	location_number: number;
	location_name: string;
	date: SchemaDefinitionProperty<Date>;
	ADDR1: string | null;
	ADDR2: string | null;
	CITY: string | null;
	STATE: string | null;
	ZIPCODE: number;
	CONTACT: string | null;
	EMAIL: string | null;
	PHONE: string | null;
	FAX: string | null;
	BEGDT: string | null;
	ENDDT: string | null;
	RENEWLDT: string | null;
	LASTUPDT: string | null;
	BALFWD: number;
	PAYMENTS: number;
	LSTPMTDT: string | null;
	ADJMENTS: number;
	LSTADJDT: string | null;
	EMPSBLD: number;
	PBSURCPERC: number;
	PBDISCPERC: number;
	PDTHRUDT: string | null;
	AGNADJYTD: number;
	EFTBEGDT: string | null;
	EFTENDDT: string | null;
	BNKROUTNOT: string | null;
	BNKACCTNOT: string | null;
	EFTLSTDT: string | null;
	EFTLSTAMT: number;
	EFTTOTALT: number;
	LSTCHGDT: string | null;
	LSTCHGOPER: number;
	INTLADDRFLAG: string | null;
	EFTFLAG: string | null;
	GTDRATEFLAG: string | null;
	PBEFFDT: string | null;
	MTHSBILLED: number;
	EFTDESTACCTNO: number;
	BNKNAMET: string | null;
	EMAILCONPWD: string | null;
	PBEFTPROCREDIT: string | null;
	PB2RPTOVRD: string | null;
	PB2RATEOVRD: string | null;
	LASTUPDTOPER: number;
}