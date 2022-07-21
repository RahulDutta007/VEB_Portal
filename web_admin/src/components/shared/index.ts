import { lazy } from "react";

export { default as CustomDialog } from "./dialogs/customDialog/CustomDialog";
export const LazyCustomDialog = lazy(() => import("./dialogs/customDialog/CustomDialog"));

export { default as GroupOwnerSidebar } from "./sidebar/Sidebar";

export { default as SnackbarAPI } from "./snackbar/SnackbarAPI";
export const LazySnackbarAPI = lazy(() => import("./snackbar/SnackbarAPI"));
