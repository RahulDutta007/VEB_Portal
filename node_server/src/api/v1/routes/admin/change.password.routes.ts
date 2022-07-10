import express from "express";
import groupOwnerAuth from "../../../../middlewares/auth/groupOwnerAuth.middleware";
import validator from "../../../../middlewares/validator/validator.middleware";
import { ChangePassword } from "../../controllers/admin/change.password.controller";
import { validators } from "../../validators";

const router = express.Router();
router.route("/").patch(validator(validators.changePasswordValidator, null), groupOwnerAuth, ChangePassword);

module.exports = router;