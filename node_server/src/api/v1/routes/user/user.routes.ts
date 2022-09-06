import express from "express";
import verifyToken from "../../../../middlewares/auth/verifyToken.middleware";
import { getGroupOwnerByAuth, getGroupOwnerById, getGroupOwnerCount, getGroupOwners, getPaginatedGroupOwners } from "../../controllers/user/get.user.groupOwner.controller";
import {
	getMemberCount,
	getMembersByAssignedGroups
} from "../../controllers/user/get.user.member.controller";

const router = express.Router();

router.route("/group-owners/count").get(verifyToken, getGroupOwnerCount);
router.route("/group-owners/paginated").get(verifyToken, getPaginatedGroupOwners);
router.route("/group-owner").get(verifyToken, getGroupOwnerByAuth);
router.route("/group-owners").get(verifyToken, getGroupOwners);
router.route("/group-owner/:_id").get(verifyToken, getGroupOwnerById);
router
	.route("/members/assinged/paginated")
	.get(verifyToken, getMembersByAssignedGroups);
router.route("/members/count").get(verifyToken, getMemberCount);

module.exports = router;
