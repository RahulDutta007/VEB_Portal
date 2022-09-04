
import { isValidEmailService } from "./common/validEmail.service";
import { isValidUserNameService } from "./common/validUserName.service";
import { formateMongoDateService } from "./date/date.service";
import {
	isDuplicateGroupOwnerEmailService,
	isRegisteredEmailService,
	isDuplicateSSNService,
	isRegisteredSSNService,
	isDuplicateUserNameService,
	isRegisteredUsernameService,
	hashPassword,
	comparePassword,
	generateJWT,
	generateDependentNumber
} from "./auth/auth.service";
import { insert, fetchAll, fetchOne, findOneAndUpdate } from "./query/query.service";

import { isDuplicateActivePlanNameService, isDuplicateActivePlanCodeService, GetPlans, GetPlan, isDuplicatePlanCodeService } from "./plan/plan.service";
import { getPaginatedDocuments } from "./pagination/pagination.service";

const service = {
	auth: {
		isDuplicateGroupOwnerEmailService,
		isRegisteredEmailService,
		isDuplicateSSNService,
		isRegisteredSSNService,
		isDuplicateUserNameService,
		isRegisteredUsernameService,
		hashPassword,
		comparePassword,
		generateJWT,
		generateDependentNumber
	},
	query: {
		insert,
		fetchAll,
		fetchOne,
		findOneAndUpdate
	},
	common: {
		isValidEmailService,
		isValidUserNameService
	},
	date: {
		formateMongoDateService
	},
	plan: {
		isDuplicateActivePlanNameService,
		isDuplicateActivePlanCodeService,
		GetPlans,
		GetPlan,
		isDuplicatePlanCodeService
	},
	pagination: {
		getPaginatedDocuments
	}
};

export default service;
