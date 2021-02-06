const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET;

function createToken(payload) {
	console.log(process.env.SECRET, payload);
	return jwt.sign(payload, secretKey);
}

function checkToken(payload) {
	console.log(process.env.SECRET, payload);
	return jwt.verify(payload, secretKey);
}

module.exports = {
	createToken,
	checkToken,
};
