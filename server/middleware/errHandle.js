function errHandle(err, req, res, next) {
	if (err) {
		if (err.name === "SequelizeValidationError") {
			const errors = err.errors.map((el) => {
				return {
					msg: el.msg,
				};
			});
			res.status(400).json(errors);
		} else if (err.name === "invalid") {
			res.status(401).json({ msg: "Invalid Email/Password" });
		} else if (err.name === "Not Authenticated") {
			res.status(401).json({ msg: "You Should Login Firsr" });
		} else if (err.name === "Not Authorized") {
			res.status(403).json({ msg: "No Authorization" });
		} else if (err.name === "notFound") {
			res.status(404).json({ msg: "Error: Not Found" });
		} else {
			res.status(500).json({ msg: "Internal Server Error" });
		}
	}
}

module.exports = errHandle;
