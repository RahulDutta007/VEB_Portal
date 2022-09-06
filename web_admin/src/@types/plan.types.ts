export type CreatePlan = {
	plan_name: string;
	plan_code: string;
	start_date: string;
	end_date: string | null;
};

export type Plan = {
	status?: string;
	_id?: string;
	plan_code: string;
	plan_name: string;
	start_date: string;
	end_date: string;
	has_end_date: boolean;
};
