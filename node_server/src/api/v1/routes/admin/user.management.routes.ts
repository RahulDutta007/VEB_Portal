import express from "express";
import { login } from "../../controllers/admin/login.controller";
import validator from "../../../../middlewares/validator/validator.middleware";
import { ChangePassword } from "../../controllers/admin/change.password.controller";
import { GetToken, VerifyToken } from "../../controllers/admin/forget.password.controller";
import { FindUsername, FindEmail } from "../../controllers/admin/get.user.controller";
import verifyToken from "../../../../middlewares/auth/verifyToken.middleware";
import { validators } from "../../validators";
import { ForgetUserName } from "../../controllers/admin/forget.username.controller";

const router = express.Router();

router.route("/login").post(validator(validators.loginValidator, null), login);
router
	.route("/change-password")
	.patch(validator(validators.changePasswordValidator, null), verifyToken, ChangePassword);
router.route("/forget-password/get-token").post(validator(validators.forgetPasswordValidator, null), GetToken);
router.route("/forget-password/verify-token/:token").post(validator(validators.verifyPasswordValidator, null), VerifyToken);
router.route("/forget-user-name").post(ForgetUserName);
router.route("/find-user-name").get(verifyToken, FindUsername);
router.route("/find-email").get(verifyToken, FindEmail);

module.exports = router;
