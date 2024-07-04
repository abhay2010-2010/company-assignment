const { UserModel } = require("../schema/user");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");

const register=async (req, res) => {
    const { username, email, role, password } = req.body;

    try {
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(401).json({ msg: "User is already registered. Please try to login." });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new UserModel({
        username,
        email,
        role: role || 'user',
        password: hashedPassword,
       
      });
  
      await newUser.save();
      return res.status(201).json({ msg: "User registered successfully." });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ msg: "Failed to register user. Please provide correct details." });
    }
};

const login=async (req, res) => {
    try {
        const user = await UserModel.findOne({ username: req.body.username });
        if (!user) {
            return res.status(400).send("Invalid username or password");
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).send("Invalid username or password");
        }
        const token = jwt.sign({ _id: user._id }, "masai", { expiresIn: "1h" });
        res.header("auth-token", token).send(token);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = { register, login };