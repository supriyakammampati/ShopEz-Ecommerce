const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  banner: [{ type: String }],
  categories: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Admin', adminSchema);
