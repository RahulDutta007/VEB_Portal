import React from "react";
import { AuthContextProvider, UIContextProvider } from "./contexts";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./components/pages";
import { GroupOwnerSidebar } from "./components/shared";

import "./App.css";
import SignUp from "./components/pages/auth/signUp/SignUp";

const App = (): JSX.Element => {
	return (
		<div className="App">
			<AuthContextProvider>
				<UIContextProvider>
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<GroupOwnerSidebar />} />
							<Route
								path="/login"
								element={localStorage.getItem("@jwt") ? <Navigate to="/" replace /> : <Login />}
							/>
							<Route path="/forgot-password" element={<Login />} />
							<Route path="/forgot-user-id" element={<Login />} />
							<Route path="/forget-password/verify-token/:token" element={<Login />} />
							<Route path="/sign-up" element={<SignUp />} />
						</Routes>
					</BrowserRouter>
				</UIContextProvider>
			</AuthContextProvider>
		</div>
	);
};

export default App;
