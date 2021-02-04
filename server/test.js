const { User, Todo } = require("./models");

Todo.findOne({
  where: { id: 8 },
  include: [User],
})
  .then((data) => {
    console.log(data.User);
  })
  .catch((err) => {
    console.log(err);
  });
