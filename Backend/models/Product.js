const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  mainImg: { type: String, required: true },
  carousel: [{ type: String }],
  category: { type: String, required: true },
  sizes: [{ type: String }],
  gender: { type: String },
  stock: { type: Number, default: 0 },
  discount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
