const { User } = require('../models/index')
const { comparePass } = require('../helper/bcrypt')
const { generateToken } = require('../helper/jwt')

class userController {
	static register(req, res, next) {
		let newUser = {
			email: req.body.email,
			password: req.body.password
		}
		User.create(newUser)
		.then(user => {
			res.status(201).json(user)
		})
		.catch( err=> {
			next(err)
			//console.log(err.constructor.name);
			//const error = err.errors[0].message || 'Internal server error'
			//res.status(400).json({ error })
		})
	}

	static login (req, res, next) {
		User.findOne({
			where: {
				email: req.body.email
			}
		})
		.then(user => {
			if(!user) throw {msg: "invalid email or password!" }
			const comparedpassword = comparePass(req.body.password, user.password)
			if (!comparedpassword) throw {msg: "invalid email or password!" }
			const acces_token = generateToken({
				id: user.id,
				email: user.email
			})
			res.status(200).json({ acces_token })
		})
		.catch(err => {
			//console.log(err);
			next(err)
			// const error = err.msg || 'Internal server error'
			// res.status(400).json({error})
		})
	}
}

module.exports = userController