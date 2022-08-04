import React, { useContext } from "react";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/navbar";
import { VEBPlans } from "./components/pages";
import { THEME } from "./constants/theme/theme";
import { ThemeContext } from "./contexts";

import "./globalStyles/theme.css";

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
					<Route path="/VEB-plans" element={<VEBPlans />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
