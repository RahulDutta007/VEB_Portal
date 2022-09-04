import React from "react";
import { AuthContextProvider, UIContextProvider } from "./contexts";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { GroupOwnerSidebar } from "./components/shared";
import {
	CreateAdmin,
	SignUp,
	Login,
	MyProfile,
	PlanManagement,
	AdminManagement,
	AgentManagement,
	Members
} from "./components/pages";
import { Sidebar } from "./components/shared";
import CreatePlan from "./components/pages/createPlan/CreatePlan";

import "./globalStyles/paperFormStyles.css";
import "./globalStyles/theme.css";
import "./App.css";

const App = (): JSX.Element => {
	return (
		<div className="App">
			<AuthContextProvider>
				<UIContextProvider>
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<Sidebar WrappedComponent={CreateAdmin} />} />
							<Route
								path="/login"
								element={localStorage.getItem("@jwt") ? <Navigate to="/" replace /> : <Login />}
							/>
							<Route path="/forgot-password" element={<Login />} />
							<Route path="/forgot-user-id" element={<Login />} />
							<Route path="/forget-password/verify-token/:token" element={<Login />} />
							<Route path="/sign-up" element={<SignUp />} />
							<Route path="/enroller" element={<Sidebar WrappedComponent={CreateAdmin} />} />
							<Route path="/my-profile" element={<Sidebar WrappedComponent={MyProfile} />} />
							<Route path="/create-plan" element={<Sidebar WrappedComponent={CreatePlan} />} />
							<Route path="/plans" element={<Sidebar WrappedComponent={PlanManagement} />} />
							<Route path="/admin-management" element={<Sidebar WrappedComponent={AdminManagement} />} />
							<Route path="/members" element={<Sidebar WrappedComponent={Members} />} />
							<Route path="/agent-management" element={<Sidebar WrappedComponent={AgentManagement} />} />
						</Routes>
					</BrowserRouter>
				</UIContextProvider>
			</AuthContextProvider>
		</div>
	);
};

export default App;
