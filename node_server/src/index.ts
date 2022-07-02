import http from "http";
import connectDb from "./config/db";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });
import app from "./app";
import cluster from "cluster";
import { cpus } from "os";
import process from "process";

const numCPUs = cpus().length;

export const getIOInstance = () => io;

const httpServer = http.createServer(app);
const io = require("socket.io")(httpServer, {
	cors: {
		origin: "*",
		methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
	}
});

if (cluster.isPrimary) {
	console.log(`Primary ${process.pid} is running`);

	// Fork workers.
	for (let i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

	cluster.on("exit", (worker, code, signal) => {
		console.log(`worker ${worker.process.pid} died`);
	});
} else {
	connectDb();

	const PORT = process.env.PORT || 4000;

	const server = httpServer.listen(PORT, () => {
		console.log(`\x1b[33m \x1b[1m Server is running in ${process.env.NODE_ENV} mode on port ${PORT} \x1b[0m`);
		io.on("connection", (socket: any) => {
			console.log("info", "new socket user" + socket.id);
			socket.on("approval", (message: any) => {
				socket.broadcast.emit("messageSent", message);
				console.log(message);
			});
		});
	});

	process.on("unhandledRejection", (err: any) => {
		console.log(`Error: ${err.message}`);
		server.close(() => process.exit(1));
	});

	console.log(`Worker ${process.pid} started`);
}
