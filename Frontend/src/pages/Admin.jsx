import { useState, useEffect } from 'react';
import axios from 'axios';

function Admin() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('products'); // 'products', 'orders', 'categories'
  
  // Product Form
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [mainImg, setMainImg] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('/api/products').then(res => setProducts(res.data)).catch(console.log);
    axios.get('/api/orders', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setOrders(res.data)).catch(console.log);
  };

  const addProduct = async (e) => {
    e.preventDefault();
    if (!title || !price || !mainImg || !category) { alert('Please fill required fields!'); return; }
    try {
      await axios.post('/api/products', { 
        title, name: title, description, price, mainImg, image: mainImg, category, stock 
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Product added! ✅');
      fetchData();
      // Reset form
      setTitle(''); setDescription(''); setPrice(''); setMainImg(''); setCategory(''); setStock('');
    } catch (err) {
      alert('Failed! Make sure you are admin.');
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    await axios.delete(`/api/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchData();
  };

  const updateOrderStatus = async (id, status) => {
    try {
      await axios.put(`/api/orders/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 40px' }}>
      <h1 style={{ fontSize: '36px', marginBottom: '40px', letterSpacing: '-1px' }}>Admin Dashboard</h1>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '40px', borderBottom: '1px solid var(--border-color)', paddingBottom: '20px' }}>
        <button 
          onClick={() => setActiveTab('products')}
          style={{ background: 'none', border: 'none', fontSize: '18px', fontWeight: activeTab === 'products' ? '600' : '400', color: activeTab === 'products' ? 'var(--text-main)' : 'var(--text-light)', borderBottom: activeTab === 'products' ? '2px solid var(--text-main)' : 'none', paddingBottom: '4px' }}
        >
          Products
        </button>
        <button 
          onClick={() => setActiveTab('orders')}
          style={{ background: 'none', border: 'none', fontSize: '18px', fontWeight: activeTab === 'orders' ? '600' : '400', color: activeTab === 'orders' ? 'var(--text-main)' : 'var(--text-light)', borderBottom: activeTab === 'orders' ? '2px solid var(--text-main)' : 'none', paddingBottom: '4px' }}
        >
          Orders
        </button>
      </div>

      {activeTab === 'products' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '40px' }}>
          {/* Add Product */}
          <div className="card" style={{ height: 'fit-content' }}>
            <h2 style={{ fontSize: '20px', marginBottom: '24px' }}>Add New Product</h2>
            <form onSubmit={addProduct} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input placeholder="Product Title *" required value={title} onChange={e => setTitle(e.target.value)} />
              <input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
              <input placeholder="Price (₹) *" required type="number" value={price} onChange={e => setPrice(e.target.value)} />
              <input placeholder="Main Image URL *" required value={mainImg} onChange={e => setMainImg(e.target.value)} />
              <input placeholder="Category *" required value={category} onChange={e => setCategory(e.target.value)} />
              <input placeholder="Stock Quantity" type="number" value={stock} onChange={e => setStock(e.target.value)} />
              <button type="submit" className="btn-primary" style={{ marginTop: '10px' }}>Save Product</button>
            </form>
          </div>

          {/* Products List */}
          <div>
            <h2 style={{ fontSize: '20px', marginBottom: '24px' }}>Manage Products ({products.length})</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
              {products.map(product => (
                <div key={product._id} className="card" style={{ padding: '0', overflow: 'hidden' }}>
                  <img src={product.mainImg || product.image} alt={product.title || product.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                  <div style={{ padding: '20px' }}>
                    <h3 style={{ margin: '0 0 8px', fontSize: '16px' }}>{product.title || product.name}</h3>
                    <p style={{ margin: '0 0 16px', fontWeight: '600' }}>₹{product.price}</p>
                    <button onClick={() => deleteProduct(product._id)} style={{ width: '100%', padding: '8px', background: 'none', border: '1px solid #ff6b6b', color: '#ff6b6b', borderRadius: 'var(--radius)', cursor: 'pointer' }}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div>
          <h2 style={{ fontSize: '20px', marginBottom: '24px' }}>Manage Orders ({orders.length})</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {orders.map(order => (
              <div key={order._id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ margin: '0 0 4px', fontSize: '14px', color: 'var(--text-light)' }}>Order #{order._id.slice(-8).toUpperCase()}</p>
                  <p style={{ margin: '0 0 4px', fontWeight: '500' }}>{order.userId?.username || order.name}</p>
                  <p style={{ margin: '0', fontSize: '14px' }}>₹{order.totalAmount} • {order.products.length} items</p>
                </div>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                  <select 
                    value={order.status} 
                    onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                    style={{ padding: '8px 12px', background: 'var(--bg-surface)' }}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

export default Admin;
