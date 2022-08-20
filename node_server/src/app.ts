export { };
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

const app = express();
app.use(
	cors({
		origin: "*",
		methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],

		allowedHeaders: ["Content-Type", "Authorization"],
		optionsSuccessStatus: 200 // For legacy browser support
	})
);

app.use((req: Request, res: Response, next: NextFunction) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, token");
	if (req.method === "OPTIONS") {
		res.header("Access-Control-Allow-Methods", "PUT, POST, GET, PATCH, DELETE");
		return res.status(200).json({});
	}
	next();
});

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/v1/test", require("./api/v1/routes/test/test.routes"));
app.use("/api/v1/auth/group-owner/enroller/creation", require("./api/v1/routes/admin/admin.creation.routes"));
app.use("/api/v1/auth/group-owner", require("./api/v1/routes/admin/admin.register.routes"));
app.use("/api/v1/auth", require("./api/v1/routes/admin/user.management.routes"));
app.use("/api/v1/OTP", require("./api/v1/routes/otp/otp.routes"));
app.use("/api/v1/plan", require("./api/v1/routes/plan/plan.management.routes"));

export default app;
