import testValidator from "./test/test.validator";
import adminRegisterValidator, { enrollerRegisterValidator } from "./admin/admin.register.validators";
import { loginValidator } from "./admin/login.validator";
import { adminCreationValidator } from "./admin/admin.creation.validator";
import { changePasswordValidator } from "./admin/change.password.validator";
import { forgetPasswordValidator, verifyPasswordValidator } from "./admin/forgot.password.validator";

export const validators = {
	testValidator,
	adminRegisterValidator,
	enrollerRegisterValidator,
	loginValidator,
	adminCreationValidator,
	changePasswordValidator,
	forgetPasswordValidator,
	verifyPasswordValidator
};
