import { useContext } from "react";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/navbar";
import { VEBEnrollment, VEBPlans } from "./components/pages";
import { THEME } from "./constants/theme/theme";
import { AuthContext, EnrollmentContextProvider, ThemeContext } from "./contexts";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import "./globalStyles/theme.css";
import "./globalStyles/currentTheme.css";
import "./globalStyles/paperForm.css";
import Redirection from "./components/pages/auth/redirection/Redirection";
import { EMPLOYEE } from "./constants/demo/employee";

const App = (): JSX.Element => {
	const { setTheme } = useContext(ThemeContext);
	const { setMember } = useContext(AuthContext);

	useEffect(() => {
		setMember(EMPLOYEE);
		setTheme(THEME);
	}, [setTheme, setMember]);

	return (
		<div className="App">
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route
						path="/VEB/enrollment"
						element={
							<EnrollmentContextProvider>
								<VEBEnrollment />
							</EnrollmentContextProvider>
						}
					/>
					<Route path="/verify" element={<Redirection />} />
					<Route path="/VEB/plans" element={<VEBPlans />} />
				</Routes>
			</BrowserRouter>
			<div className="draggable-premium-box"></div>
		</div>
	);
};

export default App;
