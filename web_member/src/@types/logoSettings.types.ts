type LogoSize = {
	height: number;
	width: number;
};

export type LogoSettings = {
	logo: {
		_id?: string;
		attachment: Record<string, unknown> | any;
		xl: LogoSize;
		lg: LogoSize;
		md: LogoSize;
		sm: LogoSize;
		xs: LogoSize;
	};
	favicon: Record<string, unknown> | any;
	group_number: number;
	_id?: string;
	_v?: 0;
};

export type LogoSettingsPreview = LogoSettings & {
	_id?: string;
	__v?: number;
	user_id: string;
	group_number: number;
};
