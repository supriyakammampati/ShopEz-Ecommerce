const Admin = require('../models/Admin');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, isAdmin: true });
    if (!user) return res.status(400).json({ message: 'Admin not found or invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, isAdmin: true }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, admin: { id: user._id, username: user.username, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAdminData = async (req, res) => {
  try {
    let adminData = await Admin.findOne();
    if (!adminData) {
      adminData = await Admin.create({ categories: [], banner: [] });
    }
    res.json(adminData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCategories = async (req, res) => {
  try {
    const { categories } = req.body;
    let adminData = await Admin.findOne();
    if (!adminData) adminData = new Admin();
    adminData.categories = categories;
    await adminData.save();
    res.json(adminData.categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateBanner = async (req, res) => {
  try {
    const { banner } = req.body;
    let adminData = await Admin.findOne();
    if (!adminData) adminData = new Admin();
    adminData.banner = banner;
    await adminData.save();
    res.json(adminData.banner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
