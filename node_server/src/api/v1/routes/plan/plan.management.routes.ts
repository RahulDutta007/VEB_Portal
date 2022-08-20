import express from "express";
import { PlanCreation, GetAllPlan } from "../../controllers/plan/plan.controller";
import validator from "../../../../middlewares/validator/validator.middleware";
import { ChangePassword } from "../../controllers/admin/change.password.controller";
import { GetToken, VerifyToken } from "../../controllers/admin/forget.password.controller";
import { FindUsername, FindEmail, FindUserDetails, SendOTP, VerifyOTP } from "../../controllers/admin/get.user.controller";
import verifyToken from "../../../../middlewares/auth/verifyToken.middleware";
import { validators } from "../../validators";
import { ForgetUserId } from "../../controllers/admin/forget.username.controller";

const router = express.Router();

router.route("/").post(validator(validators.planCreationValidator, null), verifyToken, PlanCreation);
router.route("/").get(verifyToken, GetAllPlan);
router.route("/:code").get(verifyToken, GetAllPlan);
router.route("/find-plan-code").get(verifyToken, GetAllPlan);

module.exports = router;
