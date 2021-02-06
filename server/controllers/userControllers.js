const { User } = require("../models/");
const { checkPassword } = require("../helper/bcrypt");
const { generateToken } = require("../helper/jwt");
const {checkToken} = require("../helper/jwt")
const {OAuth2Client} = require('google-auth-library')

class controllers {
  static register(req, res, next) {
    const { username, email, password } = req.body;
    const data = {
      username,
      email,
      password,
    };

    User.create(data)
      .then((data) => {
        res.status(201).json({
          username,
          email,
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  static login(req, res, next) {
    const { email, password } = req.body;

    User.findOne({
      where: {
        email,
      },
    })
      .then((data) => {
        if (!data) {
          next({ name: "Email/Password Wrong" });
        } else {
          let comparePassword = checkPassword(password, data.password);
          if (!comparePassword) {
            next({ name: "Email/Password Wrong" });
          } else {
            let payload = {
              id: data.id,
              email: data.email,
              username: data.username,
            };
            let access_token = generateToken(payload);
            res.status(200).json({ access_token });
          }
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  static googleLogin(req, res, next) {
    let email;
    let username;
    let id_token = req.body.id_token
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
    client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID
    })
    .then(ticket=>{
      const payload = ticket.getPayload()
      email = payload.email
      username= payload.name
      return User.findOne({
        where: {
          email
        }
      })
    })
    .then(data=>{
      if(!data){
        return User.create({
          email,
          password: '12345678',
          username 
        })
      } else {
        return data
      }
    })
    .then(data=>{
      let payload = {
        id: data.id,
        email: data.email
      }
      let access_token = generateToken(payload)
      return res.status(200).json({access_token})
    })
    .catch(err=>{
      next(err)
    })
  }

  static getUser(req, res, next){
    let decoded = checkToken(req.headers.access_token) 
    User.findOne({
      where:{
        email: decoded.email
      }
    })
    .then(data=>{
        res.status(200).json({data})
    })
    .catch(err=>{
      next(err)
    })
  }
}

module.exports = controllers;
