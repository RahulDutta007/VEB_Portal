exports.superAdminRegistrationSubject = (first_name, last_name) => `A new Super Admin, ${first_name + " " + last_name} has registered`;

exports.superAdminCreationSubject = (first_name, last_name) => `A new Super Admin, ${first_name + " " + last_name} has been created`;

exports.ownerCreationSubject = (first_name, last_name) => `A new User, ${first_name + " " + last_name} has been created`;

exports.ownerRegistrationSubject = (first_name, last_name, role) => `A new ${role}, ${first_name + " " + last_name} has registered`;

exports.ownerLoginSubject = (first_name, last_name, role) => `${role} - ${first_name + " " + last_name} has logged in`;