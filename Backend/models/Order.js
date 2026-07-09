const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String },
  mobile: { type: String },
  email: { type: String },
  address: { type: String },
  pincode: { type: String },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      title: { type: String },
      description: { type: String },
      image: { type: String },
      size: { type: String },
      quantity: { type: Number, default: 1 },
      price: { type: Number },
      discount: { type: Number, default: 0 }
    }
  ],
  shippingAddress: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'Pending' },
  orderDate: { type: Date, default: Date.now },
  deliveryDate: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
