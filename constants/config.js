const AWS  = require("aws-sdk");
const http = require("http");
const dotenv = require("dotenv");
dotenv.config();

const agent = new http.Agent({
	keepAlive: true,
	maxSockets: Infinity,
});

AWS.config.update({
	region: "ap-south-1",
	accessKeyId: "AKIAQW4MI5TKYUFO4YKO",
	secretAccessKey: "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",
	httpOptions: {
		agent,
	},
});

const dynamoClient = new AWS.DynamoDB.DocumentClient({
	sslEnabled: false,
	paramValidation: false,
	convertResponseTypes: false,
	httpOptions: {
		agent,
	},
});


const SESSIONCHAT = "SessionChat";
module.exports = {
	dynamoClient, SESSIONCHAT
}
