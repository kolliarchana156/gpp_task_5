// frontend/src/pages/Projects.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState({ name: '', description: '' });
    const [loading, setLoading] = useState(true);

    // Fetch Projects on Load
    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await api.get('/projects');
            setProjects(res.data.data);
        } catch (err) {
            console.error('Failed to fetch projects', err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await api.post('/projects', newProject);
            setNewProject({ name: '', description: '' }); // Reset form
            fetchProjects(); // Refresh list
        } catch (err) {
            alert('Error creating project');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <Link to="/dashboard">← Back to Dashboard</Link>
            <h2>Projects</h2>

            {/* Create Project Form */}
            <div style={{ marginBottom: '30px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '5px' }}>
                <h3>Create New Project</h3>
                <form onSubmit={handleCreate} style={{ display: 'flex', gap: '10px' }}>
                    <input 
                        placeholder="Project Name" 
                        value={newProject.name}
                        onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                        required
                        style={{ padding: '8px' }}
                    />
                    <input 
                        placeholder="Description" 
                        value={newProject.description}
                        onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                        style={{ padding: '8px', flexGrow: 1 }}
                    />
                    <button type="submit" style={{ padding: '8px 15px', backgroundColor: '#007bff', color: 'white', border: 'none' }}>
                        Create
                    </button>
                </form>
            </div>

            {/* Projects List */}
            {loading ? <p>Loading...</p> : (
                <div style={{ display: 'grid', gap: '15px' }}>
                    {projects.map((proj) => (
                        <div key={proj.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px' }}>
                            <h4 style={{ margin: '0 0 5px 0' }}>{proj.name}</h4>
                            <p style={{ margin: 0, color: '#666' }}>{proj.description}</p>
                            <small>Status: {proj.status} | Created by: {proj.creator_name}</small>
                        </div>
                    ))}
                    {projects.length === 0 && <p>No projects found. Create one above!</p>}
                </div>
            )}
        </div>
    );
};

export default Projects;