module.exports = (err,req,res,next) => {
  console.log(err);
  if (err.message === 'invalid date') res.status(400).json(err)
  else if (err.msg){
    res.status(404).json(err)
  } else {
    res.status(500).json(err)
  }
}