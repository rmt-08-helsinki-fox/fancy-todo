const { checkToken } = require("./jwt");
const { User, Todo } = require("../models");

async function authentication(req, res, next) {
	try {
		console.log(req.headers);
		const decoded = checkToken(req.headers.accesstoken);
		const data = await User.findOne({
			where: {
				email: decoded.email,
			},
		});

		if (!data) {
			res.status(401).json({ msg: "Login First" });
		} else {
			req.user = data.dataValues;
			// console.log(data.dataValues, "<<< Ini data");
		}
		next();
	} catch (err) {
		console.log(err);
	}
}

function authorization(req, res, next) {
	// console.log(req, "<<<<< REQUEST");
	// const id = req.url.split("").slice(1).join("");

	Todo.findOne({
		where: {
			id: +req.params.id,
		},
	})
		.then((data) => {
			// console.log(data);
			if (!data) {
				res.status(404).json("Not Found");
				// next({ msg: "Not Found" });
			} else if (data.UserId === req.user.id) {
				next();
			} else {
				res.status(401).json("Not Authorized");
				// next({ msg: "Not Authorized" });
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
