import express from "express";
import verifyToken from "../../../../middlewares/auth/verifyToken.middleware";
import {
	getMemberCount,
	getMembersByAssignedGroups
} from "../../controllers/user/get.user.member.controller";

const router = express.Router();

router
	.route("/members/assinged/paginated")
	.get(verifyToken, getMembersByAssignedGroups);
router.route("/members/count").get(verifyToken, getMemberCount);

module.exports = router;
