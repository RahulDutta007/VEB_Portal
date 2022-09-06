import express from "express";
import verifyToken from "../../../../middlewares/auth/verifyToken.middleware";
import validator from "../../../../middlewares/validator/validator.middleware";
import { validators } from "../../validators";
import { ChangePassword } from "../../controllers/auth/changePassword/changePassword.controller";
import { editGroupOwner } from "../../controllers/auth/editUser/editGroupOwner.controller";

const router = express.Router();

router
	.route("/change-password")
	.patch(validator(validators.changePasswordValidator, null), verifyToken, ChangePassword);

router
	.route("/edit-group-owner")
	.patch(validator(validators.editGroupOwnerValidator, null), verifyToken, editGroupOwner);

module.exports = router;
