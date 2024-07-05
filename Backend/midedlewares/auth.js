const jwt = require('jsonwebtoken');
const { UserModel } = require('../schema/user');

const auth = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    
    try {
        const decoded = jwt.verify(token, "masai");
        req.user = decoded;
        
        console.log("Decoded _id:", decoded._id);  // Log the _id from the token

        const user = await UserModel.findOne({_id: decoded._id});
        console.log("User from database:", user);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        req.user = user;  // Attach the full user object to the request
        next();
    } catch (error) {
        console.error("Auth middleware error:", error);
        res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = auth;