import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Profile() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    axios.get('/api/orders/user', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setOrders(res.data);
      setLoading(false);
    }).catch(err => {
      console.log(err);
      setLoading(false);
    });
  }, [token, navigate]);

  const logout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  const getStatusColor = (status) => {
    if (status.toLowerCase() === 'delivered') return '#388e3c';
    if (status.toLowerCase() === 'shipped') return '#1976d2';
    if (status.toLowerCase() === 'confirmed') return '#f57c00';
    return 'var(--text-light)';
  };

  if (loading) return <div style={{ padding: '80px', textAlign: 'center' }}>Loading...</div>;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 40px' }}>
      <h1 style={{ fontSize: '36px', marginBottom: '40px', letterSpacing: '-1px' }}>My Account</h1>

      {/* Profile Card */}
      <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', background: 'var(--bg-surface)' }}>
        <div>
          <p style={{ margin: '0 0 8px', color: 'var(--text-light)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Profile Details</p>
          <h2 style={{ margin: '0 0 8px', fontSize: '24px' }}>{user?.username || user?.name}</h2>
          <p style={{ margin: 0, color: 'var(--text-light)' }}>{user?.email}</p>
        </div>
        <button onClick={logout} className="btn-secondary" style={{ color: '#ff6b6b' }}>
          Logout
        </button>
      </div>

      {/* Orders */}
      <h2 style={{ fontSize: '24px', marginBottom: '24px' }}>Order History</h2>
      {orders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-lg)' }}>
          <p style={{ margin: '0 0 16px', color: 'var(--text-light)' }}>You haven't placed any orders yet.</p>
          <Link to="/products" className="btn-primary">Start Shopping</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {orders.map(order => (
            <div key={order._id} className="card" style={{ padding: '30px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-color)', paddingBottom: '20px', marginBottom: '20px' }}>
                <div>
                  <p style={{ margin: '0 0 4px', fontSize: '14px', color: 'var(--text-light)' }}>Order #{order._id.slice(-8).toUpperCase()}</p>
                  <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-light)' }}>
                    Placed on {new Date(order.orderDate).toLocaleDateString()}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ margin: '0 0 8px', fontSize: '20px', fontWeight: '600' }}>₹{order.totalAmount}</p>
                  <span style={{ 
                    display: 'inline-block',
                    padding: '4px 12px', 
                    borderRadius: '20px', 
                    fontSize: '12px', 
                    fontWeight: '600',
                    color: getStatusColor(order.status),
                    background: `${getStatusColor(order.status)}15`
                  }}>
                    {order.status}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {order.products.map(item => (
                  <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                      {item.image && (
                        <img src={item.image} alt={item.title} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                      )}
                      <div>
                        <p style={{ margin: '0 0 4px', fontWeight: '500' }}>{item.title}</p>
                        <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-light)' }}>Qty: {item.quantity} {item.size ? `| Size: ${item.size}` : ''}</p>
                      </div>
                    </div>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                <Link to={`/order-confirmation/${order._id}`} style={{ fontSize: '14px', fontWeight: '500' }}>View Details →</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Profile;
