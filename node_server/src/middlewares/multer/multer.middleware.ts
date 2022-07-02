import express, { Request } from "express";
import mongoose, { ConnectOptions } from "mongoose";
import multer from "multer";
import crypto from "crypto";
import { GridFsStorage } from "multer-gridfs-storage";
import path from "path";
// const { MongoLink } = require('./Link');
export const router = express.Router();

// const {gfs} = require('../../Sheared/Multer')
const mongoURI: string = <string>"mongodb://localhost/NexcalPortal";
const conn = mongoose.createConnection(mongoURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
} as ConnectOptions);

let gfs;
conn.once("open", () => {
	// init stream
	gfs = new mongoose.mongo.GridFSBucket(conn.db, {
		bucketName: "uploads"
	});
});

// create a storage to get or file information from html
// Storage
const storage = new GridFsStorage({
	url: mongoURI,
	file: (req: Request, file: Express.Multer.File) => {
		return new Promise((resolve, reject) => {
			crypto.randomBytes(16, (err: Error | null, buf: Buffer) => {
				if (err) {
					return reject(err);
				}
				const filename = buf.toString("hex") + path.extname(file.originalname);
				const fileInfo = {
					filename: filename,
					bucketName: "uploads"
				};
				resolve(fileInfo);
			});
		});
	}
});

///here is the upload funtion intialized
export const upload: multer.Multer = multer({
	storage
});

const multerGFS = {
	gfs,
	upload,
	router
};

export default multerGFS;
