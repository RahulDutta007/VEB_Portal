export type Theme = {
	primary_color: string;
	secondary_color: string;
	button: {
		background_color: string;
		color: string;
	};
	top_bar: {
		color: string;
		background_color: string;
	};
	theme_style: string;
	group_number: number;
	_v?: number;
	_id?: string;
};

export type ThemePreview = Theme & {
	_id?: string;
	__v?: number;
	user_id: string;
	group_number: number;
};
