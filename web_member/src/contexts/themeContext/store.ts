import { Store } from "../../@types/contexts/themeContext/store.types";

const initialState: Store = {
	theme: {
		primary_color: "",
		secondary_color: "",
		button: {
			background_color: "",
			color: ""
		},
		top_bar: {
			color: "",
			background_color: ""
		},
		theme_style: "",
		group_number: Infinity
	}
};

export default initialState;
