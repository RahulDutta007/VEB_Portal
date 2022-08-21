import express from "express";
import { PlanCreation, GetAllPlan, GetPlanByNameOrCode, GetPlanCode } from "../../controllers/plan/plan.controller";
import validator from "../../../../middlewares/validator/validator.middleware";
import verifyToken from "../../../../middlewares/auth/verifyToken.middleware";
import { validators } from "../../validators";

const router = express.Router();

router.route("/").post(validator(validators.planCreationValidator, null), verifyToken, PlanCreation);
router.route("/get-all-plan").get(verifyToken, GetAllPlan);
router.route("/get-plan/:code").get(verifyToken, GetPlanByNameOrCode);
router.route("/check-plan-code").get(verifyToken, GetPlanCode);

module.exports = router;
