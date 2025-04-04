require("dotenv").config()
const User = require('../models/usermodel');
const bcrypt = require('bcryptjs');
const jwt=require("jsonwebtoken")

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Ensure request body is received
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new admin
        const newAdmin = new User({
            name,
            email,
            password: hashedPassword,
            role: "admin",
            createdBy: null
        });

        await newAdmin.save();
        res.status(201).json({ message: "Admin registered successfully" });

    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user)
            return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)  // Fix: If passwords don't match
            return res.status(400).json({ message: "Invalid Password" });

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_Secret,  // Fix: "JWT_Secret" should be "JWT_SECRET"
            { expiresIn: "30d" }
        );

        return res.status(200).json({ message: "Login successful", token, user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
exports.logout = async (req, res) => {
    try {
        // Check if Authorization header exists
        const authHeader = req.header("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(400).json({ message: "Authorization token missing or invalid format" });
        }

        const token = authHeader.split(" ")[1]; // Extract token

        // Here, you can store the token in a database or Redis if implementing blacklist
        res.json({ message: "Logged out successfully" });
        
    } catch (error) {
        res.status(500).json({ message: "Error logging out", error: error.message });
    }
};

// **User Signup**
exports.signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create User
        user = await User.create({ name, email, password: hashedPassword, role });

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// **User Signin**
exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid email or password" });

        // Check Password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

        // Generate JWT Token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_Secret, { expiresIn: "1h" });

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
const signup = async (req, res) => {
  const { name, email, password, role = "customer" } = req.body; // Default role is 'user'

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = new User({
      name,
      email,
      password: bcrypt.hashSync(password, 10),
      role, // Assigning the correct role
    });

    await newUser.save();

    // Generate token
    const token = jwt.sign({ userId: newUser._id, role: newUser.role }, process.env.JWT_Secret, {
      expiresIn: '1h',
    });

    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role, // Ensure the role is returned here
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
