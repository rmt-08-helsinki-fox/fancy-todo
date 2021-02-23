const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { OAuth2Client } = require('google-auth-library')

class UserController {
	static postUserRegister(req, res, next) {
		const { email, password } = req.body;
		const dataInput = {
			email,
			password,
		};

		User.create(dataInput)
			.then((data) => {
				res.status(201).json({ msg: "Register Success" });
			})
			.catch((err) => {
				next(err);
			});
	}

	static postUserLogin(req, res, next) {
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

				const access_token = createToken({
					id: data.id,
					email: data.email,
				});

				res.status(200).json({ access_token });
			})
			.catch((err) => {
				console.log(err);
				next(err);
			});
	}

static googlelogin(req, res, next) {
    const client = new OAuth2Client(process.env.CLIENT_ID);
    const googleToken = req.body.googleToken;
    let email = ''
    const password = process.env.GOOGLE_PASS

    client.verifyIdToken({
      idToken: googleToken,
      audience: process.env.CLIENT_ID
    })
      .then(ticket => {
        const payload = ticket.getPayload()
        email = payload.email

        return User.findOne({
          where: {
            email
          }
        })
      })
      .then(data => {
        if (data) {
          let access_token = createToken({
            id: data.id,
            email: data.email
          })
          res.status(200).json({ access_token })
        } else {
          return User.create({ email, password })
        }
      })
      .then(user => {
        let access_token = createToken({
          id: user.id,
          email: user.email
        })
        res.status(201).json({ access_token })
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = UserController;
