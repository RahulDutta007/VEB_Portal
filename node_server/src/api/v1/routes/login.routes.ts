import express from "express";
import { login } from "../controllers/admin/login.controller";
import validator from "../../../middlewares/validator/validator.middleware";
import { validators } from "../validators";

const router = express.Router();

router.route("/login").post(validator(validators.loginValidator, null), login);

module.exports = router;
