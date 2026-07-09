const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  title: { type: String },
  description: { type: String },
  mainImg: { type: String },
  quantity: { type: Number, default: 1 },
  size: { type: String },
  price: { type: Number },
  discount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);
