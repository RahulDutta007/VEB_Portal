import { lazy } from "react";

// Auth
export { default as CreateAdmin } from "./createAdmin/CreateAdmin";
export { default as Login } from "./auth/login/Login";
export { default as SignUp } from "./auth/signUp/SignUp";
export { default as MyProfile } from "./auth/myProfile/MyProfile";

//Members
export { default as Members } from "./members/Members";

// Admin

//plan
export { default as PlanManagement } from "./plan/planManagement/PlanManagement";
export const LazyPlanManagementGrid = lazy(() => import("./plan/planManagement/PlanManagementGrid"));
//user-management
export { default as AdminManagement } from "./userManagement/admin/AdminManagement";
export { default as AgentManagement } from "./userManagement/agents/AgentManagement";
export { default as EnrollersGrid } from "./enrollers/enrollersGrid/EnrollersGrid";
export { default as Enrollers } from "./enrollers/Enrollers";
