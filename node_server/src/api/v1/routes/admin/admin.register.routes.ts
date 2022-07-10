import express from "express";
import validator from "../../../../middlewares/validator/validator.middleware";
import { GroupOwnerRegister } from "../../controllers/admin/group.owner.register.controller";
import { AdminRegister } from "../../controllers/admin/admin.register.controller";
import { validators } from "../../validators";

const router = express.Router();

router.route("/admin/signup").post(validator(validators.adminRegisterValidator, null), GroupOwnerRegister);
router.route("/enroller/signup").post(validator(validators.adminRegisterValidator, null), AdminRegister);

module.exports = router;