const { User } = require('../models');
const { hashPassword, comparePassword } = require('../utils/passwordHelper');
const { generateToken } = require('../utils/jwtHelper');

const register = async (req, res) => {
    const { name, email, password } = req.body;
    const hashed = await hashPassword(password);
    const user = await User.create({ name, email, password: hashed });
    res.status(201).json({ token: generateToken(user) });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await comparePassword(password, user.password))) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    res.json({ token: generateToken(user) });
};

module.exports = {
    register,
    login
}
