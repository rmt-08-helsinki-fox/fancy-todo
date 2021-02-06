const { checkToken } = require("../helpers/jwt");
const { User, Todo } = require("../models");

async function authentication(req, res, next) {
	try {
		console.log(req.headers);
		const decoded = checkToken(req.headers.access_token);
		const data = await User.findOne({
			where: {
				email: decoded.email,
			},
		});

		if (!data) {
			res.status(401).json({ msg: "Login First" });
		} else {
			req.user = data.dataValues;
		}
		next();
	} catch (err) {
		console.log(err);
	}
}

function authorization(req, res, next) {
	Todo.findOne({
		where: {
			id: +req.params.id,
		},
	})
		.then((data) => {
			if (!data) {
				res.status(404).json("Not Found");
			} else if (data.UserId === req.user.id) {
				next();
			} else {
				res.status(401).json("Not Authorized");
			}
		})
		.catch((err) => {
			next(err);
		});
}

module.exports = {
	authentication,
	authorization,
};
