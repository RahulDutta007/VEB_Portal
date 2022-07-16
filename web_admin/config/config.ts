// eslint-disable-next-line no-unused-vars
const dev_url = "http://localhost";
// eslint-disable-next-line no-unused-vars
const dev_port = "4000";

const prod_url = "https";

const prod_port = "//dev-portal-backend.enrollment.nexcaliber.com";

const DO_url = "http";

const DO_port = "//142.93.222.151";

const ngrok_url = "http";
const ngrok_port = "//7c23-115-187-41-169.ngrok.io";

export const version = "v1";

export const headers = {
	Accept: "application/json",
	"Content-Type": "application/json"
};

export const url = dev_url;
export const port = dev_port;
export const LINK = `${url}:${port}/api/v1`;
