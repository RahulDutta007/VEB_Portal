export type UploadAdministrationType = {
	_id?: string;
	statementOfUnderstanding: string;
	registrationHelp: string;
};

export type Branding = {
	logo: File | any;
	favicon: File | any;
};

export type RichTextEditorProps = {
	initialValue: string;
	type: string;
};
