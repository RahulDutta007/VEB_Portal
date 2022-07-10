export { };
import express, { Request, Response, NextFunction } from "express";

const app = express();

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
app.use("/api/v1/auth/group-owner/admin", require("./api/v1/routes/admin/admin.register.routes"));
app.use("/api/v1/auth", require("./api/v1/routes/login.routes"));
app.use("/api/v1/auth/group-owner/enroller/creation", require("./api/v1/routes/admin/admin.creation.routes"));
app.use("/api/v1/auth/group-owner/enroller/signup", require("./api/v1/routes/admin/admin.register.routes"));

export default app;
