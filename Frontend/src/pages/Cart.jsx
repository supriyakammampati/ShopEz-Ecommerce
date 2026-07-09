import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    if (!token) { setLoading(false); return; }
    try {
      const res = await axios.get('/api/cart', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCartItems(res.data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await axios.put(`/api/cart/${id}`, { quantity: newQuantity }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCart();
    } catch (err) {
      console.log(err);
    }
  };

  const removeItem = async (id) => {
    try {
      await axios.delete(`/api/cart/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCart();
    } catch (err) {
      console.log(err);
    }
  };

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (loading) return <div style={{ padding: '80px', textAlign: 'center' }}>Loading...</div>;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 40px' }}>
      <h1 style={{ fontSize: '36px', marginBottom: '40px', letterSpacing: '-1px' }}>Your Cart</h1>
      
      {!token ? (
        <div style={{ textAlign: 'center', padding: '60px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-lg)' }}>
          <h2 style={{ margin: '0 0 16px' }}>Please login to view your cart</h2>
          <Link to="/login" className="btn-primary">Login</Link>
        </div>
      ) : cartItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>🛒</div>
          <h2 style={{ margin: '0 0 20px', color: 'var(--text-light)' }}>Your cart is empty</h2>
          <Link to="/products" className="btn-primary">Continue Shopping</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>
          <div>
            {cartItems.map(item => (
              <div key={item._id} style={{ display: 'flex', gap: '20px', padding: '24px', background: '#fff', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', marginBottom: '20px' }}>
                <img src={item.mainImg} alt={item.title} style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: 'var(--radius)' }} />
                
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '500' }}>{item.title}</h3>
                    <span style={{ fontSize: '18px', fontWeight: '600' }}>₹{item.price * item.quantity}</span>
                  </div>
                  {item.size && <p style={{ margin: '0 0 16px', color: 'var(--text-light)', fontSize: '14px' }}>Size: {item.size}</p>}
                  
                  <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-color)', borderRadius: 'var(--radius)' }}>
                      <button onClick={() => updateQuantity(item._id, item.quantity - 1)} style={{ background: 'none', border: 'none', padding: '8px 12px', fontSize: '16px' }}>-</button>
                      <span style={{ width: '30px', textAlign: 'center', fontSize: '14px', fontWeight: '500' }}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item._id, item.quantity + 1)} style={{ background: 'none', border: 'none', padding: '8px 12px', fontSize: '16px' }}>+</button>
                    </div>
                    <button onClick={() => removeItem(item._id)} style={{ background: 'none', border: 'none', color: '#ff6b6b', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="card" style={{ position: 'sticky', top: '100px' }}>
              <h3 style={{ margin: '0 0 20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>Summary</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: 'var(--text-light)' }}>
                <span>Subtotal</span>
                <span>₹{total}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', color: 'var(--text-light)' }}>
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', fontWeight: '600', fontSize: '20px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                <span>Total</span>
                <span>₹{total}</span>
              </div>
              <Link to="/checkout" style={{ display: 'block' }}>
                <button className="btn-primary" style={{ width: '100%', fontSize: '16px' }}>
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
