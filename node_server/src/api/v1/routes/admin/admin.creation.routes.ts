import express from "express";
import groupOwnerAuth from "../../../../middlewares/auth/groupOwnerAuth.middleware";
import { adminCreation } from "../../controllers/admin/admin.creation.controller";
import validator from "../../../../middlewares/validator/validator.middleware";
import { validators } from "../../validators";

const router = express.Router();

router
	.route("/creation")
	.post(validator(validators.adminCreationValidator, null), groupOwnerAuth, adminCreation);

module.exports = router;
