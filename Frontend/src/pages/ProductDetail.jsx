import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
    axios.get(`/api/products/${id}`).then(res => {
      setProduct(res.data);
      setActiveImage(res.data.mainImg || res.data.image);
      if (res.data.sizes && res.data.sizes.length > 0) {
        setSelectedSize(res.data.sizes[0]);
      }
    });
  }, [id]);

  const addToCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) { alert('Please login first!'); navigate('/login'); return; }
    
    if (product.sizes?.length > 0 && !selectedSize) {
      alert('Please select a size');
      return;
    }

    try {
      await axios.post('/api/cart', { 
        productId: product._id, 
        title: product.title || product.name,
        description: product.description,
        mainImg: product.mainImg || product.image,
        quantity, 
        size: selectedSize,
        price: product.price,
        discount: product.discount
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Added to cart!');
      navigate('/cart');
    } catch (err) {
      alert('Failed to add to cart!');
    }
  };

  if (!product) return <div style={{ padding: '80px', textAlign: 'center' }}>Loading...</div>;

  const images = [product.mainImg || product.image, ...(product.carousel || [])].filter(Boolean);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 40px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>
        
        {/* Images */}
        <div>
          <div style={{ height: '600px', background: 'var(--bg-surface-alt)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: '20px' }}>
            <img src={activeImage} alt="Product" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ display: 'flex', gap: '15px', overflowX: 'auto' }}>
            {images.map((img, idx) => (
              <img 
                key={idx} 
                src={img} 
                alt="Thumbnail" 
                onClick={() => setActiveImage(img)}
                style={{ 
                  width: '80px', height: '80px', objectFit: 'cover', borderRadius: 'var(--radius)', cursor: 'pointer',
                  border: activeImage === img ? '2px solid var(--text-main)' : '2px solid transparent'
                }} 
              />
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <p style={{ margin: '0 0 10px', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '13px' }}>{product.category}</p>
          <h1 style={{ fontSize: '42px', margin: '0 0 20px', letterSpacing: '-1px', lineHeight: 1.1 }}>{product.title || product.name}</h1>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
            <span style={{ fontSize: '28px', fontWeight: '500' }}>₹{product.price}</span>
            {product.discount > 0 && (
              <span style={{ fontSize: '18px', color: 'var(--text-light)', textDecoration: 'line-through' }}>
                ₹{Math.round(product.price / (1 - product.discount/100))}
              </span>
            )}
          </div>

          <p style={{ color: 'var(--text-light)', lineHeight: 1.6, fontSize: '16px', marginBottom: '40px' }}>
            {product.description}
          </p>

          {product.sizes && product.sizes.length > 0 && (
            <div style={{ marginBottom: '30px' }}>
              <h4 style={{ margin: '0 0 12px', fontWeight: '500' }}>Size</h4>
              <div style={{ display: 'flex', gap: '10px' }}>
                {product.sizes.map(size => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    style={{
                      width: '45px', height: '45px',
                      borderRadius: '50%',
                      border: '1px solid',
                      borderColor: selectedSize === size ? 'var(--text-main)' : 'var(--border-color)',
                      background: selectedSize === size ? 'var(--text-main)' : '#fff',
                      color: selectedSize === size ? '#fff' : 'var(--text-main)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: '20px', marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-color)', borderRadius: 'var(--radius)', background: '#fff' }}>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ background: 'none', border: 'none', padding: '15px', fontSize: '18px' }}>-</button>
              <span style={{ width: '40px', textAlign: 'center', fontWeight: '500' }}>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} style={{ background: 'none', border: 'none', padding: '15px', fontSize: '18px' }}>+</button>
            </div>
            <button onClick={addToCart} className="btn-primary" style={{ flex: 1, fontSize: '16px', letterSpacing: '0.5px' }}>
              Add to Cart
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
