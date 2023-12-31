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

module.exports = { authenticateToken }