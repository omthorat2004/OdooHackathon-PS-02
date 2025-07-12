const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const pool = require('../db/index')

const createToken = id => {
  return jwt.sign({ id }, process.env.JSON_KEY, { expiresIn: '7d' })
}

const Signup = async (req, res) => {
  try {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required.' })
    }

    pool.query(
      'SELECT * FROM users WHERE email = ? OR username = ?',
      [email, username],
      async (err, result) => {
        if (err) return res.status(500).json({ error: 'Database error.' })

        if (result.length > 0) {
          return res
            .status(409)
            .json({ error: 'Username or email already exists.' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        pool.query(
          'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
          [username, email, hashedPassword],
          (err, insertResult) => {
            if (err)
              return res.status(500).json({ error: 'Error saving user.' })

            const token = createToken(insertResult.insertId)

            return res.status(201).json({
              user: {
                id: insertResult.insertId,
                username,
                email
              },
              token
            })
          }
        )
      }
    )
  } catch (err) {
    console.error('Signup Error:', err)
    return res.status(500).json({ error: 'Server error.' })
  }
}

const Login = (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password)
      return res.status(400).json({ error: 'Email and password are required.' })

    pool.query(
      'SELECT * FROM users WHERE email = ?',
      [email],
      async (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error.' })

        const user = results[0]
        if (!user)
          return res.status(401).json({ error: 'User does not exist.' })

        const passwordMatch = await bcrypt.compare(password, user.password_hash)
        if (!passwordMatch)
          return res.status(401).json({ error: 'Invalid email or password.' })

        const token = createToken(user.id)

        return res.status(200).json({
          user: {
            id: user.id,
            email: user.email,
            username: user.username
          },
          token
        })
      }
    )
  } catch (err) {
    console.error('Login Error:', err)
    return res.status(500).json({ error: 'Server error.' })
  }
}

// ---------------------------
// ✅ Token Authentication
// ---------------------------
const authenticateToken = (req, res) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1] // Bearer <token>

  if (!token) return res.status(401).json({ error: 'Token missing' })

  jwt.verify(token, process.env.JSON_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' })

    return res.status(200).json({ message: 'Token is valid' })
  })
}

module.exports = {
  Signup,
  Login,
  authenticateToken
}
