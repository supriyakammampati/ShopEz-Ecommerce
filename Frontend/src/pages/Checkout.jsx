import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    pincode: ''
  });
  const [payment, setPayment] = useState('Card');
  const [cartItems, setCartItems] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) { navigate('/login'); return; }
    axios.get('/api/cart', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setCartItems(res.data)).catch(err => console.log(err));
  }, [token, navigate]);

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) { alert('Cart is empty!'); return; }

    try {
      const products = cartItems.map(item => ({
        productId: item.productId,
        title: item.title,
        description: item.description,
        image: item.mainImg,
        size: item.size,
        quantity: item.quantity,
        price: item.price,
        discount: item.discount
      }));

      const res = await axios.post('/api/orders', {
        ...formData,
        shippingAddress: `${formData.address}, ${formData.pincode}`,
        products,
        paymentMethod: payment,
        totalAmount: total
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      navigate(`/order-confirmation/${res.data._id}`);
    } catch (error) {
      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 40px' }}>
      <h1 style={{ fontSize: '36px', marginBottom: '40px', letterSpacing: '-1px' }}>Checkout</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '40px' }}>
        <form onSubmit={placeOrder} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ margin: '0 0 10px' }}>Shipping Details</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <input name="name" placeholder="Full Name" required value={formData.name} onChange={handleChange} />
            <input name="email" type="email" placeholder="Email Address" required value={formData.email} onChange={handleChange} />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <input name="mobile" placeholder="Mobile Number" required value={formData.mobile} onChange={handleChange} />
            <input name="pincode" placeholder="Pincode" required value={formData.pincode} onChange={handleChange} />
          </div>
          
          <textarea name="address" placeholder="Complete Address" required value={formData.address} onChange={handleChange} style={{ height: '100px', resize: 'none' }} />

          <h3 style={{ margin: '20px 0 10px' }}>Payment Method</h3>
          <div style={{ display: 'flex', gap: '15px' }}>
            {['Card', 'UPI', 'COD'].map(method => (
              <button 
                type="button" 
                key={method} 
                onClick={() => setPayment(method)}
                style={{ 
                  flex: 1, padding: '16px', borderRadius: 'var(--radius)', 
                  border: '1px solid', borderColor: payment === method ? 'var(--accent-primary)' : 'var(--border-color)',
                  background: payment === method ? '#F9F1ED' : '#fff',
                  color: payment === method ? 'var(--accent-primary)' : 'var(--text-main)',
                  fontWeight: payment === method ? '600' : '400'
                }}
              >
                {method === 'COD' ? 'Cash on Delivery' : method}
              </button>
            ))}
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: '20px', padding: '16px', fontSize: '16px' }}>
            Place Order • ₹{total}
          </button>
        </form>

        <div className="card" style={{ height: 'fit-content' }}>
          <h3 style={{ margin: '0 0 20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>Order Summary</h3>
          <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '20px' }}>
            {cartItems.map(item => (
              <div key={item._id} style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                <img src={item.mainImg} alt={item.title} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: 'var(--radius)' }} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 4px', fontSize: '14px', fontWeight: '500' }}>{item.title}</h4>
                  <p style={{ margin: 0, color: 'var(--text-light)', fontSize: '12px' }}>Qty: {item.quantity} {item.size ? `| Size: ${item.size}` : ''}</p>
                </div>
                <div style={{ fontWeight: '500', fontSize: '14px' }}>₹{item.price * item.quantity}</div>
              </div>
            ))}
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: 'var(--text-light)' }}>
            <span>Subtotal</span>
            <span>₹{total}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', color: 'var(--text-light)' }}>
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '600', fontSize: '18px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
