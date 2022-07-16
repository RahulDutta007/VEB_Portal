import express from "express";
import { login } from "../../controllers/admin/login.controller";
import validator from "../../../../middlewares/validator/validator.middleware";
import { ChangePassword } from "../../controllers/admin/change.password.controller";
import { GetToken } from "../../controllers/admin/forget.password.controller";
import { FindUsername, FindEmail } from "../../controllers/admin/get.user.controller";
import verifyToken from "../../../../middlewares/auth/verifyToken.middleware";
import { validators } from "../../validators";

const router = express.Router();

router.route("/login").post(validator(validators.loginValidator, null), login);
router
	.route("/change-password")
	.patch(validator(validators.changePasswordValidator, null), verifyToken, ChangePassword);
router.route("/forgot-password").post(validator(validators.forgetPasswordValidator, null), GetToken);
router.route("/find-user-name").get(verifyToken, FindUsername);
router.route("/find-email").get(verifyToken, FindEmail);

module.exports = router;
