const User = require('../models/User.js');
const jwt = require('jsonwebtoken');

const createToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;
    if (!strongPasswordRegex.test(password)) {
      return res.status(400).json({
        message: 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character',
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const user = await User.create({ name, email, password });
    const token = createToken(user);

    res.status(201).json({ token, user });

  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid email or Password...' });
  }

  const token = createToken(user);
  res.json({ token, user });
};

module.exports = {
  register,
  login
};
