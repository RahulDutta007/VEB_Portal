import React, { useContext } from "react";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { THEME } from "./constants/theme/theme";
import { ThemeContext } from "./contexts";

const App = (): JSX.Element => {
	const { setTheme } = useContext(ThemeContext);

	useEffect(() => {
		setTheme(THEME);
	}, [setTheme]);

	return (
		<div className="App">
			<BrowserRouter>
				<Navbar />
				<Routes>{/* <Route path="/" element={() => null} /> */}</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
