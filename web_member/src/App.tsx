import { useContext } from "react";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/navbar";
import { VEBEnrollment, VEBPlans } from "./components/pages";
import { THEME } from "./constants/theme/theme";
import { ThemeContext } from "./contexts";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import "./globalStyles/theme.css";
import "./globalStyles/currentTheme.css";
import "./globalStyles/paperForm.css";
import Draggable from "react-draggable";

const App = (): JSX.Element => {
	const { setTheme } = useContext(ThemeContext);

	useEffect(() => {
		setTheme(THEME);
	}, [setTheme]);

	return (
		<div className="App">
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/VEB/enrollment" element={<VEBEnrollment />} />
					<Route path="/VEB/plans" element={<VEBPlans />} />
				</Routes>
			</BrowserRouter>
			<div className="draggable-premium-box"></div>
		</div>
	);
};

export default App;
