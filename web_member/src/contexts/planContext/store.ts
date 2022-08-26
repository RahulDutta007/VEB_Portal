import { Store } from "../../@types/contexts/planContext/store.types";

const initialState: Store = {
	accidentPlan: {
		coverage_for: "",
		plan_type: "",
		rider_type: "",
		rider_benefit_amount: 0,
		premium_amount: 0,
		total_premium_amount: 0
	}
};

export default initialState;
