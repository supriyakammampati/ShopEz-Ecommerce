import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/users/register', formData);
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
      <div className="card" style={{ maxWidth: '400px', width: '100%', padding: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ width: '48px', height: '48px', background: 'var(--bg-surface-alt)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-main)', fontSize: '24px', margin: '0 auto 16px' }}>
            ✨
          </div>
          <h1 style={{ fontSize: '28px', margin: '0 0 8px', letterSpacing: '-0.5px' }}>Create an account</h1>
          <p style={{ color: 'var(--text-light)', margin: 0, fontSize: '15px' }}>Join us to elevate your everyday living.</p>
        </div>

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Username</label>
            <input 
              name="username"
              placeholder="Enter your name"
              value={formData.username} 
              onChange={handleChange} 
              required 
              style={{ width: '100%', boxSizing: 'border-box' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Email</label>
            <input 
              name="email"
              type="email" 
              placeholder="hello@example.com"
              value={formData.email} 
              onChange={handleChange} 
              required 
              style={{ width: '100%', boxSizing: 'border-box' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Password</label>
            <input 
              name="password"
              type="password" 
              placeholder="Create a strong password"
              value={formData.password} 
              onChange={handleChange} 
              required 
              style={{ width: '100%', boxSizing: 'border-box' }}
            />
          </div>
          <button type="submit" className="btn-primary" style={{ marginTop: '8px' }}>Sign Up</button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: 'var(--text-light)' }}>
          Already have an account? <Link to="/login" style={{ fontWeight: '500' }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
