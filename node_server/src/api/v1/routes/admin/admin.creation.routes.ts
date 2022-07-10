import express from "express";
import verifyToken from "../../../../middlewares/auth/verifyToken.middleware";
import { adminCreation } from "../../controllers/admin/admin.creation.controller";
import validator from "../../../../middlewares/validator/validator.middleware";
import { validators } from "../../validators";

const router = express.Router();

router
	.route("/")
	.post(validator(validators.adminCreationValidator, null), verifyToken, adminCreation);

module.exports = router;
