import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import OrderConfirmation from './pages/OrderConfirmation';

function App() {
  const user = JSON.parse(localStorage.getItem('user'));

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <BrowserRouter>
      {/* Top Bar */}
      <div style={{ background: 'var(--text-main)', padding: '8px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: 'var(--bg-surface)', fontSize: '13px', fontWeight: '500' }}>✨ Free delivery on all orders above ₹499</span>
        <div style={{ display: 'flex', gap: '20px' }}>
          {!user ? (
            <>
              <Link to="/login" style={{ color: 'var(--bg-surface)', fontSize: '13px' }}>Login</Link>
              <Link to="/register" style={{ color: 'var(--bg-surface)', fontSize: '13px' }}>Register</Link>
            </>
          ) : (
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              <span style={{ color: 'var(--bg-surface)', fontSize: '13px' }}>👋 Hello, {user.username || user.name}</span>
              <button onClick={logout} style={{ background: 'none', border: 'none', color: '#ff6b6b', cursor: 'pointer', fontSize: '13px', padding: 0 }}>Logout</button>
            </div>
          )}
        </div>
      </div>

      {/* Main Navbar */}
      <nav style={{ background: 'var(--bg-primary)', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', position: 'sticky', top: 0, zIndex: 100 }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <div style={{ width: '40px', height: '40px', background: 'var(--accent-primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '20px' }}>
            ✺
          </div>
          <div>
            <div style={{ color: 'var(--text-main)', fontWeight: '800', fontSize: '26px', letterSpacing: '-0.5px', lineHeight: 1 }}>ShopEZ</div>
            <div style={{ color: 'var(--text-light)', fontSize: '12px', fontWeight: '500', marginTop: '4px', letterSpacing: '1px' }}>MINIMAL GOODS</div>
          </div>
        </Link>

        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <Link to="/" style={{ color: 'var(--text-main)', fontSize: '15px', fontWeight: '500' }}>Home</Link>
          <Link to="/products" style={{ color: 'var(--text-main)', fontSize: '15px', fontWeight: '500' }}>Shop</Link>
          <Link to="/cart" style={{ color: 'var(--text-main)', fontSize: '15px', fontWeight: '500' }}>Cart</Link>
          {user ? (
            <>
              <Link to="/profile" style={{ color: 'var(--text-main)', fontSize: '15px', fontWeight: '500' }}>Profile</Link>
              {user.isAdmin && (
                <Link to="/admin" style={{ color: 'var(--accent-primary)', fontSize: '15px', fontWeight: '600' }}>Admin</Link>
              )}
            </>
          ) : (
            <Link to="/login" className="btn-primary" style={{ padding: '8px 20px' }}>Login</Link>
          )}
        </div>
      </nav>

      <div style={{ minHeight: 'calc(100vh - 160px)' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation/:id" element={<OrderConfirmation />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>

      {/* Footer */}
      <footer style={{ background: 'var(--text-main)', color: 'var(--bg-surface)', padding: '60px 40px', textAlign: 'center' }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '24px', letterSpacing: '-0.5px' }}>✺ ShopEZ</h3>
        <p style={{ margin: '0', color: 'var(--text-light)', fontSize: '15px' }}>Quality goods for a minimal lifestyle.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '30px', color: 'var(--border-color)', fontSize: '14px' }}>
          <span style={{ cursor: 'pointer' }}>About Us</span>
          <span style={{ cursor: 'pointer' }}>Contact</span>
          <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
          <span style={{ cursor: 'pointer' }}>Terms of Service</span>
        </div>
      </footer>
    </BrowserRouter>
  );
}

export default App;
