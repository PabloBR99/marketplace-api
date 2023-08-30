const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const { User } = require("../models/user_model");
const auth = require('../utils/authentication.js')

function authenticateToken(req, res, next) {
  
  const token = req.headers.token

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    console.log(err)

    if (err) return res.sendStatus(403)

    req.user = user

    next()
  })
}

/* GET users listing. */
router.get('/', authenticateToken, async (req, res) => {
  try{
    const data = await User.find();
    res.json(data)
}
catch(error){
    res.status(500).json({message: error.message})
}
});

module.exports = router;
