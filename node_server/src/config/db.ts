import mongoose from "mongoose";

const connectDb = async () => {
	console.log("ConnectDb");
	process.env.MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/VEBPortal";
	console.log("uri", process.env.MONGO_URI);
	try {
		if (process.env.MONGO_URI) {
			console.log("uri", process.env.MONGO_URI);
			const conn = await mongoose.connect(process.env.MONGO_URI);
			console.log("con", conn);
			console.log(`\x1b[34m \x1b[1m \x1b[4mMongoDB Connected: ${conn.connection.host}\x1b[0m`);
		}
	} catch (err) {
		console.log("err", err);
	}
};

export default connectDb;
