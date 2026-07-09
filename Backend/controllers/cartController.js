const Cart = require('../models/Cart');

exports.getCart = async (req, res) => {
  try {
    const cartItems = await Cart.find({ userId: req.params.userId || req.user.id }).populate('productId');
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { productId, title, description, mainImg, quantity, size, price, discount } = req.body;
    
    // Check if same item with same size exists
    let cartItem = await Cart.findOne({ userId: req.user.id, productId, size });
    
    if (cartItem) {
      cartItem.quantity += (quantity || 1);
      await cartItem.save();
    } else {
      cartItem = await Cart.create({
        userId: req.user.id,
        productId,
        title,
        description,
        mainImg,
        quantity: quantity || 1,
        size,
        price,
        discount
      });
    }
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const { quantity, size } = req.body;
    const cartItem = await Cart.findByIdAndUpdate(req.params.id, { quantity, size }, { new: true });
    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ message: 'Cart item removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
