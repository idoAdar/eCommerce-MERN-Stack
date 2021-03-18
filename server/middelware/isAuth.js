const User = require('../models/user');
const jwt = require('jsonwebtoken');
const jwtSecret = 'secret_my_token';

module.exports = async (req, res, next) => {
    const token = req.header('authentication');

    if (!token) {
        return res.status(400).json({ message: 'Token not found' });
    }

    try {
        // { id: 'user id...', iat: weird number}
        const decoded = jwt.verify(token, jwtSecret);
        req.user = await User.findById({_id: decoded.id}).select('-password'); 
        next();
    } catch (error) {
        return res.status(400).json({ message: 'Token is not vaild' });
    }
}