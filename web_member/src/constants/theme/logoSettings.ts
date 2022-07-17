import { LogoSettings } from "../../@types/logoSettings.types";
import { Logo } from "../../assets";

const logoSettings: LogoSettings = {
	logo: {
		attachment: Logo,
		xl: {
			height: 40,
			width: 400
		},
		lg: {
			height: 200,
			width: 400
		},
		md: {
			height: 200,
			width: 400
		},
		sm: {
			height: 200,
			width: 400
		},
		xs: {
			height: 200,
			width: 400
		}
	},
	favicon: "",
	group_number: 220
};

export const LOGO_SETTINGS = logoSettings;
