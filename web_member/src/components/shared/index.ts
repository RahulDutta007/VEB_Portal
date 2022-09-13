import { lazy } from "react";

export { default as VEBPlanCard } from "./VEBPlanCard/VEBPlanCard";

export { default as PlanHeader } from "./enrollment/planHeader/PlanHeader";
export const LazyPlanHeader = import("./enrollment/planHeader/PlanHeader");

export const LazyPlanDisclaimer = lazy(() => import("./planDisclaimer/PlanDisclaimer"));
export const LazyPlanActions = lazy(() => import("./enrollment/planActions/PlanActions"));
export const LazyBrandingActions = lazy(() => import("./enrollment/planActions/BrandingActions"));

export const LazyCustomInput = lazy(() => import("./customInput/CustomInput"));
export const LazyCustomSelectInput = lazy(() => import("./customInput/CustomSelectInput"));
export const LazyCustomFilledInput = lazy(() => import("./customInput/CustomFilledInput"));

export { default as PlanBranding } from "./planBranding/PlanBranding";
