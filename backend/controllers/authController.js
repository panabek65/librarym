const User = require('../models/User');
const Counter = require('../models/Counter');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.registerUser = async (req, res) => {
  const { firstName, lastName, password } = req.body;

  if (!firstName || !lastName || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  try {
    // 1. Create the base ID (e.g., 'fatimapanabek')
    const baseId = (firstName + lastName).toLowerCase().replace(/[^a-z0-9]/g, '');

    // 2. Find and update the counter for this specific baseId
    //    'upsert: true' creates a new document if one doesn't exist
    //    'new: true' returns the updated document
    const counter = await Counter.findOneAndUpdate(
      { _id: baseId },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    // 3. Format the sequence number (e.g., 1 -> '01', 12 -> '12')
    const seqPadded = String(counter.seq).padStart(2, '0');
    const finalUserId = `${baseId}_${seqPadded}`;

    // 4. Check if a user with this *exact* final ID already exists (just in case)
    const userExists = await User.findOne({ userId: finalUserId });
    if (userExists) {
      // This should be rare, but it's good to handle
      return res.status(400).json({ message: 'User ID generation conflict, please try again' });
    }

    // 5. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 6. Create user
    const user = await User.create({
      firstName,
      lastName,
      userId: finalUserId,
      password: hashedPassword,
      // 'role' will default to 'user' as per the schema
    });

    if (user) {
      res.status(201).json({
        message: 'Registration successful! Please log in.',
        userId: user.userId,
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
exports.loginUser = async (req, res) => {
  const { userId, password } = req.body;

  try {
    // Check for user by userId
    const user = await User.findOne({ userId });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        userId: user.userId,
        firstName: user.firstName,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid User ID or Password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get user profile (for checking session)
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  // req.user is set by the 'protect' middleware
  res.status(200).json(req.user);
};