import React, { useState, useEffect } from 'react';
import { taskAPI } from '../services/api';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await taskAPI.getTasks();
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await taskAPI.createTask(formData);
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: ''
      });
      fetchTasks();
    } catch (error) {
      console.error('Error creating task:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateTaskStatus = async (id, status) => {
    try {
      await taskAPI.updateTask(id, { status });
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await taskAPI.deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="dashboard">
      <div className="devops-banner">
        🚀 CI/CD Pipeline: Jenkins → Docker Hub → ArgoCD → Kubernetes
      </div>
      
      <h2>Task Dashboard</h2>
      
      <div className="task-form">
        <h3>Add New Task</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Priority:</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Description:</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Due Date:</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
            />
          </div>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Task'}
          </button>
        </form>
      </div>

      <div className="task-list">
        {tasks.map(task => (
          <div 
            key={task._id} 
            className={`task-item status-${task.status} priority-${task.priority}`}
          >
            <div className="task-info">
              <h4>{task.title}</h4>
              <p>{task.description}</p>
              <p><strong>Priority:</strong> {task.priority}</p>
              <p><strong>Status:</strong> {task.status}</p>
              {task.dueDate && (
                <p><strong>Due:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
              )}
            </div>
            <div className="task-actions">
              {task.status !== 'completed' && (
                <button
                  className="btn btn-primary btn-small"
                  onClick={() => updateTaskStatus(task._id, 
                    task.status === 'pending' ? 'in-progress' : 'completed'
                  )}
                >
                  {task.status === 'pending' ? 'Start' : 'Complete'}
                </button>
              )}
              <button
                className="btn btn-danger btn-small"
                onClick={() => deleteTask(task._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {tasks.length === 0 && (
        <div style={{textAlign: 'center', padding: '2rem', color: '#666'}}>
          No tasks yet. Create your first task above!
        </div>
      )}
    </div>
  );
};

export default Dashboard;