import { Router } from "express";
import verifyToken from "../../../../middlewares/auth/verifyToken.middleware";
import { redirectUser } from "../../controllers/redirection/redirection.controller";
const router = Router();

router.route("/").get(verifyToken, redirectUser);

module.exports = router;
