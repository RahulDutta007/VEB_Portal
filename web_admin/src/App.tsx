import React from "react";
import { UIContextProvider } from "./contexts";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { GroupOwnerSidebar, Login } from "./components/pages";

import "./App.css";

const App = (): JSX.Element => {
	return (
		<div className="App">
			<UIContextProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<GroupOwnerSidebar />} />
						<Route
							path="/login"
							element={
								localStorage.getItem("@jwt") ? <Navigate to="/dashboard" replace /> : <Login />
							}
						/>
					</Routes>
				</BrowserRouter>
			</UIContextProvider>
		</div>
	);
};

export default App;
