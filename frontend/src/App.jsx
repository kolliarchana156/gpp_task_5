// frontend/src/App.jsx
// Application Routes
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import RegisterTenant from './pages/RegisterTenant';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects'; // We will create this later

// Helper Component: Protects routes
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

function App() {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<RegisterTenant />} />
                
                {/* Protected Routes */}
                <Route 
                    path="/dashboard" 
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/projects" 
                    element={
                        <ProtectedRoute>
                            <Projects />
                        </ProtectedRoute>
                    } 
                />

                {/* Default Redirect */}
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
        </Router>
    );
}

export default App;