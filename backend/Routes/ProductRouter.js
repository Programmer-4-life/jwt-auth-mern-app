const { ensureAuthenticated } = require('../Middlewares/Auth')

const router = require('express').Router()

router.get("/", ensureAuthenticated, (req, res) => {
  console.log("----- logged in user -----", req.user)
  res.status(200).json([
    {
      name: "Mobile Phone",
      price: 9999,
      description: "This is a mobile phone"
    },
    {
      name: "Laptop",
      price: 49999,
      description: "This is a laptop"
    },
    {
      name: "Tablet",
      price: 19999,
      description: "This is a tablet"
    }
  ])
})

module.exports = router