import testValidator from "./test/test.validator";
import adminRegisterValidator from "./admin/admin.register.validators";
import { loginValidator } from "./admin/login.validator";
import { adminCreationValidator } from "./admin/admin.creation.validator";
import { changePasswordValidator } from "./admin/change.password.validator";

export const validators = {
	testValidator,
	adminRegisterValidator,
	loginValidator,
	adminCreationValidator,
	changePasswordValidator
};
