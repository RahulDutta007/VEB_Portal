import express from "express";
import validator from "../../../../middlewares/validator/validator.middleware";
import { addTest } from "../../controllers/test/test.controller";
import { validators } from "../../validators";

const router = express.Router();

router.route("/").post(validator(validators.testValidator, null), addTest);

module.exports = router;
