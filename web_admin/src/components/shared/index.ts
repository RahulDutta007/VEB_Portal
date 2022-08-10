import { lazy } from "react";

export { default as Sidebar } from "./sidebar/Sidebar";

export { default as CustomDialog } from "./dialogs/customDialog/CustomDialog";
export const LazyCustomDialog = lazy(() => import("./dialogs/customDialog/CustomDialog"));

export { default as GroupOwnerSidebar } from "./sidebar/Sidebar";

export { default as SnackbarAPI } from "./snackbar/SnackbarAPI";
export const LazySnackbarAPI = lazy(() => import("./snackbar/SnackbarAPI"));

export { default as VideoPlayerDialog } from "./dialogs/videoPlayerDialog/VideoPlayerDialog";
export const LazyVideoPlayerDialog = lazy(() => import("./dialogs/videoPlayerDialog/VideoPlayerDialog"));
