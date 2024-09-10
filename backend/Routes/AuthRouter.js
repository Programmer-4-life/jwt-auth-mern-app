const router = require('express').Router()

router.post('/login', (req, res) => {
  res.send('login Successful')
})

router.post('/signup', (req, res) => {
  res.send('signup Successful')
})

module.exports = router