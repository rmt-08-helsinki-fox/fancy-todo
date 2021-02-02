const { checkToken } = require("../helper/jwt");
const { User, Todo } = require("../models");

async function authentication(req, res, next) {
  try {
    let decoded = checkToken(req.headers.access_token);
    // console.log(decoded)

    let data = await User.findOne({
      where: { email: decoded.email },
    });

    if (!data) {
      res
        .status(401)
        .json({ msg: "login dlu kalii main mau masuk masuk aja lo" });
    } else {
      req.user = data;
      //console.log(data,"data bro")
    }
    next();
  } catch (err) {
    console.log(err);
  }
}

function authorization(req, res, next) {

  Todo.findOne({ where: { id: req.params.id } })

    .then((data) => {
      console.log(data)
      
      if (!data) {
        next({ name: "notFound" });
      } else if (data.UserId === req.user.id) {
        next();
      } else  { 
        next({ name: "Not Authorized" });
      }
    })
    .catch((err) => {
      next(err);
      //console.log(err)
    });
}

module.exports = {
  authentication,
  authorization,
};
