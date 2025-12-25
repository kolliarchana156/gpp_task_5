// frontend/src/pages/Dashboard.jsx
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div style={{ padding: '20px' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                <h1>SaaS Dashboard</h1>
                <div>
                    <span>Welcome, {user.fullName} ({user.role})</span>
                    <button onClick={handleLogout} style={{ marginLeft: '15px', padding: '5px 10px' }}>Logout</button>
                </div>
            </header>

            <main style={{ marginTop: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                    {/* Projects Card */}
                    <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
                        <h3>Projects</h3>
                        <p>Manage your team projects</p>
                        <Link to="/projects" style={{ color: '#007bff' }}>View Projects →</Link>
                    </div>

                    {/* Placeholder for Tasks */}
                    <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
                        <h3>My Tasks</h3>
                        <p>View tasks assigned to you</p>
                        <span style={{ color: '#666' }}>Coming Soon</span>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;