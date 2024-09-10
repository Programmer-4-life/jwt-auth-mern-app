const bcrypt = require("bcrypt")
const Jwt = require("jsonwebtoken")
const UserModel = require("../Models/User")

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body
    const user = await UserModel.findOne({ email })
    if (user) {
      return res.status(400).json({ message: 'User already exists', success: false })
    }

    const newUser = new UserModel({
      username,
      email,
      password
    })
    // Before saving the user to the database, we need to hash the password
    // We will use bcrypt to hash the password
    newUser.password = await bcrypt.hash(password, 10)
    await newUser.save()

    res.status(201).json({ message: 'Signup successfully', success: true })

  } catch (err) {
    res.status(500).json({ error: err.message, success: false })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await UserModel.findOne({ email })
    const errorMessage = 'Invalid email or password'

    if (!user) {
      return res.status(403).json({ message: errorMessage, success: false })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return res.status(403).json({ message: errorMessage, success: false })
    }

    const jwtToken = Jwt.sign(
      {
        email: user.email,
        _id: user._id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '24h'
      }
    )

    res.status(200).json({
      message: 'Login successfully',
      success: true,
      token: jwtToken,
      email,
      username: user.username
    })

  } catch (err) {
    res.status(500).json({ message: "Internal server error", success: false })
  }
}

module.exports = {
  signup,
  login
}