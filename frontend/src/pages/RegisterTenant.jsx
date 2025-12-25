// frontend/src/pages/RegisterTenant.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

const RegisterTenant = () => {
    const [formData, setFormData] = useState({
        tenantName: '',
        subdomain: '',
        adminFullName: '',
        adminEmail: '',
        adminPassword: ''
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/auth/register-tenant', formData);
            alert('Registration successful! Please login.');
            navigate('/login');
        } catch (err) {
            alert(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc' }}>
            <h2>Register Organization</h2>
            <form onSubmit={handleSubmit}>
                {/* Simple form inputs */}
                <input 
                    placeholder="Organization Name"
                    value={formData.tenantName}
                    onChange={(e) => setFormData({...formData, tenantName: e.target.value})}
                    required
                    style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                />
                <input 
                    placeholder="Subdomain (e.g. acme)"
                    value={formData.subdomain}
                    onChange={(e) => setFormData({...formData, subdomain: e.target.value})}
                    required
                    style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                />
                <input 
                    placeholder="Admin Name"
                    value={formData.adminFullName}
                    onChange={(e) => setFormData({...formData, adminFullName: e.target.value})}
                    required
                    style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                />
                <input 
                    placeholder="Admin Email"
                    type="email"
                    value={formData.adminEmail}
                    onChange={(e) => setFormData({...formData, adminEmail: e.target.value})}
                    required
                    style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                />
                <input 
                    placeholder="Admin Password"
                    type="password"
                    value={formData.adminPassword}
                    onChange={(e) => setFormData({...formData, adminPassword: e.target.value})}
                    required
                    style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                />
                <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#28a745', color: 'white' }}>
                    Register
                </button>
            </form>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    );
};

export default RegisterTenant;