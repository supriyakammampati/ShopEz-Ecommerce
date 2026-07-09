import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function OrderConfirmation() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`/api/orders/order/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setOrder(res.data)).catch(err => console.log(err));
  }, [id]);

  if (!order) return <div style={{ padding: '80px', textAlign: 'center' }}>Loading...</div>;

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
      <div className="card" style={{ maxWidth: '600px', width: '100%', textAlign: 'center', padding: '60px 40px' }}>
        <div style={{ width: '80px', height: '80px', background: '#E8F5E9', color: '#4CAF50', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', margin: '0 auto 24px' }}>
          ✓
        </div>
        <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>Order Confirmed!</h1>
        <p style={{ color: 'var(--text-light)', marginBottom: '30px', fontSize: '16px' }}>
          Thank you for shopping with us. Your order #{order._id.slice(-6).toUpperCase()} has been placed successfully.
        </p>
        
        <div style={{ background: 'var(--bg-primary)', padding: '24px', borderRadius: 'var(--radius)', textAlign: 'left', marginBottom: '40px' }}>
          <h3 style={{ margin: '0 0 16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>Order Summary</h3>
          {order.products.map(item => (
            <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span>{item.title} (x{item.quantity}) {item.size ? `- ${item.size}` : ''}</span>
              <span style={{ fontWeight: '500' }}>₹{item.price * item.quantity}</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-color)', fontWeight: '600', fontSize: '18px' }}>
            <span>Total Amount</span>
            <span>₹{order.totalAmount}</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <Link to="/products" className="btn-secondary">Continue Shopping</Link>
          <Link to="/profile" className="btn-primary">View Order History</Link>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation;
