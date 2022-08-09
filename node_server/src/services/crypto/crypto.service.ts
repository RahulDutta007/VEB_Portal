import { BinaryLike, createHash, createCipheriv, createDecipheriv } from "crypto";
const password = process.env["CRYPT_PASSWORD"];
//console.log("password", process.env.IV);
// var iv = 'kiamdksndn';
const iv = Buffer.from(process.env["IV"] as unknown as Buffer | ArrayBuffer);
const ivstring = iv.toString("hex");

const sha1 = (input: Buffer | BinaryLike) => createHash("sha1").update(input).digest();

export const password_derive_bytes = (password: string | undefined, salt: string, iterations: number, len: number) => {
	let key = Buffer.from(password + salt);
	for (let i = 0; i < iterations; i++) {
		key = sha1(key);
	}
	if (key.length < len) {
		const hx = password_derive_bytes(password, salt, iterations - 1, 20);
		for (let counter = 1; key.length < len; ++counter) {
			key = Buffer.concat([key, sha1(Buffer.concat([Buffer.from(counter.toString()), hx]))]);
		}
	}
	return Buffer.alloc(len, key);
};

export const encode = async (string: string) => {
	const key = password_derive_bytes(password, "", 100, 32);
	const cipher = createCipheriv("aes-256-cbc", key, ivstring);
	const part1 = cipher.update(string, "utf8");
	const part2 = cipher.final();
	const encrypted = Buffer.concat([part1, part2]).toString("base64");
	return encrypted;
};

export const decode = async (string: string) => {
	const key = password_derive_bytes(password, "", 100, 32);
	const decipher = createDecipheriv("aes-256-cbc", key, ivstring);
	let decrypted = decipher.update(string, "base64", "utf8");
	decrypted += decipher.final();
	return decrypted;
};
