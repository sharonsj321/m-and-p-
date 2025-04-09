const express=require('express')
const router=express.Router()
const {
  register,
  login,
  logout,
  signup,
  signin,
} = require("../controllers/authcontroller");

router.post('/register',register)         //register cheyunnath controller vechanu, so auth controller create cheyuka
router.post('/login',login)
router.post("/logout",logout);
router.post("/signup", signup);
router.post("/signin", signin);

const generateAuthToken = (user) => {
    const payload = { id: user._id, email: user.email, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_Secret, { expiresIn: '1h' });
    return token;
  };
router.post('/signup', async (req, res) => {
    const { name, email, password, role } = req.body;
  
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }
  
      const hashedPassword = bcrypt.hashSync(password, 10);
  
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role: role || "customer", 
      });
  
      await newUser.save();
  
      // Generate JWT token
      const token = generateAuthToken(newUser);
  
      res.status(201).json({
        success: true,
        message: "User created successfully",
        token,
        user: newUser,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
  });

  router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      // Generate JWT
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      res.status(200).json({
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      console.error('Login error:', error.message);
      res.status(500).json({ message: 'Server error' });
    }
  });
module.exports=router;