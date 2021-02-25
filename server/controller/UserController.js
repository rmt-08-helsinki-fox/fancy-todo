const { User } = require("../models");
const { compare } = require("../helper/bcrypt");
const { generateToken } = require("../helper/jwt");
const axios = require("axios");
const {OAuth2Client} = require('google-auth-library');
const API_KEY = process.env.API_KEY;

class UserController {
  static postRegister(req, res, next) {
    const { email, password, location } = req.body;
    let Users
    User.create({ email, password, location })

      .then((user) => {
        // console.log(user.location);
        Users = user
        console.log(User, 'di user')
      return axios
          .get(
            `http://api.quotable.io/random?tags=love`
          )     
      })

      .then((quotes) => {
        // console.log(Users)
        res.status(201).json({
          msg: "registrasi berhasil",
          LoveQuotesForYou: quotes.data.content,
        });
      })

      .catch((err) => {
        next(err);
      });
  }

  static postLogin(req, res, next) {
    const { email, password } = req.body;

    User.findOne({ where: { email } })

      .then((data) => {
        // console.log(data)
        if(!data){
          next({name:"invalid"})
        }
        let matchPassword = compare(password,data.password)
        console.log(matchPassword)
        if(!matchPassword) {
          next({name: "invalid"})
      }
        if (data && matchPassword) {
          // console.log('ok')
          let payload = {
            id: data.id,
            email: data.email,
          };
          const access_token = generateToken(payload);
          console.log(access_token)
          res.status(200).json({
            access_token,
          });
        } else {
          next({ name: "invalid" });
        }
      })

      .catch((err) => {
        next(err);
      });
  }


  static googleloginhandler(req,res,next){
    let { id_token } = req.body
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
    let payload = null
        //console.log(`masukkk====>`)

        client.verifyIdToken({
            idToken: id_token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        .then(ticket =>{
          console.log(ticket)
          payload = ticket.getPayload()
          return User.findOne({where: {email: payload.email}})
      })
      .then(user =>{
        //console.log(user)
        if(!user){
            //console.log(`masukkk====>`)
            return User.create({
                email: payload.email,
                fullName: payload.name,
                password: Math.floor(Math.random()*1000) + 'iniDariGoogle'
            })
        } else{
            return user
        }
    })
    .then(user =>{
        let googleSign = {
            id: user.id,
            email: user.email
        }
        let accessToken = generateToken(googleSign)
        return res.status(200).json({
            access_token: accessToken
        })
    })
    .catch(err =>{
        //console.log(err)
        next(err)
    })
  }
}

module.exports = UserController;
