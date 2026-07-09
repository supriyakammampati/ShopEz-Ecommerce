import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products').then(res => {
      // Just take top 4 for featured
      setFeaturedProducts(res.data.slice(0, 4));
    });
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div style={{ background: 'var(--bg-surface)', padding: '100px 40px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '64px', margin: '0 0 20px', letterSpacing: '-2px', color: 'var(--text-main)' }}>
          Elevate your space.<br/>Simplify your life.
        </h1>
        <p style={{ color: 'var(--text-light)', fontSize: '20px', margin: '0 auto 40px', maxWidth: '600px', lineHeight: 1.5 }}>
          Discover our curated collection of minimal, thoughtfully designed goods for everyday living.
        </p>
        <Link to="/products" className="btn-primary" style={{ fontSize: '18px', padding: '16px 36px', letterSpacing: '0.5px' }}>
          Shop Collection
        </Link>
      </div>

      {/* Featured Products */}
      <div style={{ padding: '80px 40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '32px', margin: 0, letterSpacing: '-1px' }}>New Arrivals</h2>
          <Link to="/products" style={{ fontWeight: '500', fontSize: '16px', letterSpacing: '0.5px' }}>View all →</Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
          {featuredProducts.map(product => (
            <Link to={`/product/${product._id}`} key={product._id} className="card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', height: '360px', background: 'var(--bg-surface-alt)', overflow: 'hidden' }}>
                <img 
                  src={product.mainImg || product.image} 
                  alt={product.title || product.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              
              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <p style={{ margin: '0 0 8px', fontSize: '12px', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '1px' }}>{product.category}</p>
                <h3 style={{ margin: '0 0 12px', fontSize: '18px', fontWeight: '500' }}>{product.title || product.name}</h3>
                <span style={{ fontSize: '18px', fontWeight: '600', marginTop: 'auto' }}>₹{product.price}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Value Proposition */}
      <div style={{ background: 'var(--bg-surface)', padding: '100px 40px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '40px', textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: '40px', marginBottom: '20px' }}>🌿</div>
            <h3 style={{ margin: '0 0 12px', fontSize: '20px' }}>Sustainable</h3>
            <p style={{ color: 'var(--text-light)', lineHeight: 1.6 }}>Ethically sourced materials designed to last a lifetime.</p>
          </div>
          <div>
            <div style={{ fontSize: '40px', marginBottom: '20px' }}>✺</div>
            <h3 style={{ margin: '0 0 12px', fontSize: '20px' }}>Minimal</h3>
            <p style={{ color: 'var(--text-light)', lineHeight: 1.6 }}>Clean lines and simple forms that blend seamlessly into any space.</p>
          </div>
          <div>
            <div style={{ fontSize: '40px', marginBottom: '20px' }}>✨</div>
            <h3 style={{ margin: '0 0 12px', fontSize: '20px' }}>Quality</h3>
            <p style={{ color: 'var(--text-light)', lineHeight: 1.6 }}>Exceptional craftsmanship and attention to every detail.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
