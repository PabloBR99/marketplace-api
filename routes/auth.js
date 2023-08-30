const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const { User } = require("../models/user_model");

/* User Login. */
router.post('/login', async function(req, res) {
  try{
    const data = await User.findOne({email: req.body.email});
    if(data){
      const user_data = await User.findOne({email: req.body.email, password: req.body.password});
      if (user_data){
        console.log('token' + process.env.SECRET_KEY)
        user = {
          'id': user_data._id,
          'email': user_data.email,
          // 'password': user_data.password,
          'first_name': user_data.first_name,
          'last_name': user_data.last_name
        }
        console.log(user)
        const token = jwt.sign(user, process.env.SECRET_KEY);
        res.json({
          user,
          token
        })
      }else{
        res.status(403).json({message: 'Error. Wrong password.'})
      }
    }else{
      res.status(403).json({message: "Error. Email not found."})
    }
}
catch(error){
    res.status(500).json({message: error.message})
}
});

/* User registration */
router.post('/signin', async function(req, res) {
  try{
    const data = await User.findOne({email: req.body.email});
    if(data){
      res.status(409).json({message: 'Sorry, this email address is already in use.'})
    }else{
      created_user = User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        birthday: req.body.birthday,
        sex: req.body.sex,
        password: req.body.password
      })
      res.status(200).json({message: "Your account was succesfully created"})
    }
}
catch(error){
    res.status(500).json({message: error.message})
}
});

module.exports = router;