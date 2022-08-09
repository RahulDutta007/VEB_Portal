import express from "express";
import validator from "../../../../middlewares/validator/validator.middleware";
import { sendOTPToEmail, verifyOTP } from "../../controllers/otp/otp.controller";
import { validators } from "../../validators";

const router = express.Router();

router.route("/post-email").post(validator(validators.sendOTPToEmailValidator, null), sendOTPToEmail);
router.route("/verify-otp").post(validator(validators.verifyOTPValidator, null), verifyOTP);

module.exports = router;
