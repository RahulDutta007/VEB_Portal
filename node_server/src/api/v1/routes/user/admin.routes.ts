import express from "express";
import validator from "../../../../middlewares/validator/validator.middleware";
import { AdminRegister } from "../../controllers/user/admin.register.controller";
import { validators } from "../../validators";

const router = express.Router();

router.route("/signup").post(validator(validators.adminRegisterValidator, null), AdminRegister);

module.exports = router;