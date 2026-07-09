import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('/api/products').then(res => {
      setProducts(res.data);
      const cats = ['All', ...new Set(res.data.map(p => p.category))];
      setCategories(cats);
    });
  }, []);

  const filtered = products.filter(p =>
    (category === 'All' || p.category === category) &&
    (p.title || p.name).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '40px' }}>
      
      {/* Header & Search */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontSize: '42px', margin: '0 0 10px', letterSpacing: '-1px' }}>Shop Collection</h1>
          <p style={{ color: 'var(--text-light)', margin: 0 }}>Curated essentials for your everyday life.</p>
        </div>
        <input 
          placeholder="Search products..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: '300px', padding: '14px 20px', borderRadius: '30px', background: 'var(--bg-surface)' }}
        />
      </div>

      {/* Categories */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '40px', overflowX: 'auto', paddingBottom: '10px' }}>
        {categories.map(cat => (
          <button 
            key={cat} 
            onClick={() => setCategory(cat)}
            style={{
              padding: '10px 24px', 
              borderRadius: '30px', 
              border: '1px solid',
              borderColor: category === cat ? 'var(--text-main)' : 'var(--border-color)',
              background: category === cat ? 'var(--text-main)' : '#fff',
              color: category === cat ? '#fff' : 'var(--text-main)',
              fontWeight: category === cat ? '500' : '400',
              whiteSpace: 'nowrap'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
        {filtered.map(product => (
          <Link to={`/product/${product._id}`} key={product._id} className="card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'relative', height: '320px', background: 'var(--bg-surface-alt)', overflow: 'hidden' }}>
              <img 
                src={product.mainImg || product.image} 
                alt={product.title || product.name} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {product.discount > 0 && (
                <div style={{ position: 'absolute', top: '16px', left: '16px', background: 'var(--accent-primary)', color: 'white', padding: '4px 10px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>
                  {product.discount}% OFF
                </div>
              )}
            </div>
            
            <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <p style={{ margin: '0 0 8px', fontSize: '12px', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '1px' }}>{product.category}</p>
              <h3 style={{ margin: '0 0 12px', fontSize: '18px', fontWeight: '500' }}>{product.title || product.name}</h3>
              <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '18px', fontWeight: '600' }}>₹{product.price}</span>
                {product.discount > 0 && (
                  <span style={{ fontSize: '14px', color: 'var(--text-light)', textDecoration: 'line-through' }}>
                    ₹{Math.round(product.price / (1 - product.discount/100))}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-light)' }}>
          <h3>No products found.</h3>
          <p>Try adjusting your filters or search terms.</p>
        </div>
      )}

    </div>
  );
}

export default ProductList;
