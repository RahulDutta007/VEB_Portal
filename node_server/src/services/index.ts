
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
	}
};

export default service;
