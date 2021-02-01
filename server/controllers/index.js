class Controller {
  static main (req, res) {
    const data = {
      title: 'test',
      status: 'success'
    };

    res.status(200).json({ data });
  };
};

module.exports = Controller;