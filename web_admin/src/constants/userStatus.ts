const userStatus = {
	roleFilters: [
		{
			name: "super_admin",
			caption: "Super Admin"
		},
		{
			name: "Admin",
			caption: "Admin"
		},
		{
			name: "Employer",
			caption: "Employer"
		},
		{
			name: "employee",
			caption: "Employee"
		}
	],
	userFilters: [
		{
			name: "is_active",
			caption: "Active Users"
		},
		{
			name: "is_not_approved",
			caption: "User Waiting for Approval"
		},
		{
			name: "is_approved",
			caption: "Approved Users"
		},
		{
			name: "is_inactive",
			caption: "Inactivated Users"
		},
		{
			name: "is_online",
			caption: "Online Users"
		}
	],
	tableHeaders: [
		"User Name",
		"Email",
		"Is Approved",
		"Approved By",
		"Role",
		"Date",
		"Member Support",
		"Employer Support"
	]
};

export const USER_STATUS = userStatus;
