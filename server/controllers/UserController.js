const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");

class UserController {
	static postUserRegister(req, res) {
		const { email, password } = req.body;
		const dataInput = {
			email,
			password,
		};

		User.create(dataInput)
			.then((data) => {
				res.status(201).json(data);
			})
			.catch((err) => {
				res.status(400).json(err);
			});
	}

	static postUserLogin(req, res) {
		const { email, password } = req.body;

		const dataInput = {
			email,
			password,
		};

		User.findOne({
			where: {
				email,
			},
		})
			.then((data) => {
				if (!data) throw { msg: "Invalid email or password" };

				let comparePass = comparePassword(dataInput.password, data.password);

				if (!comparePass) throw { msg: "Invalid email or password" };

				const accessToken = createToken({
					id: data.id,
					email: data.email,
				});

				res.status(200).json({ accessToken });
			})
			.catch((err) => {
				res.status(400).json(err.msg);
			});
	}
}

module.exports = UserController;
