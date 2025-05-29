import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditTaskPage = () => {
  const { eventId, taskIndex } = useParams();
  const navigate = useNavigate();

  // Get user info from localStorage
  const storedName = localStorage.getItem('signupName');
  const displayName = storedName ? storedName : 'User';
  const displayInitial = displayName.charAt(0).toUpperCase();

  const [activeNav, setActiveNav] = useState('Events');

  const mainNavItems = [
    { name: 'Home', path: '/SuppliersPage' },
    { name: 'Events', path: '/Events' },
    { name: 'Messages', path: '/MessagesPage' }
  ];
  const userNavItems = [
    { name: 'My Work', path: '/my-work' },
    { name: 'My Team', path: '/my-team' }
  ];

  const [taskData, setTaskData] = useState({
    name: '',
    budget: '',
    liaison: '',
    status: '',
    date: '',
    day: ''
  });
  const statusOptions = ['Stopped', 'In Progress', 'Negotiation', 'Completed'];
  const [liaisonOptions, setLiaisonOptions] = useState([]);

  useEffect(() => {
    // Load liaisons from 'supplierTeamLiaisons' for dropdown
    const liaisonsRaw = JSON.parse(localStorage.getItem('supplierTeamLiaisons')) || [];
    const liaisonNames = liaisonsRaw.filter(l => l && typeof l === 'object' && l.name).map(l => l.name);
    setLiaisonOptions(liaisonNames);
    // Load task data
    const allTasksObj = JSON.parse(localStorage.getItem('tasks')) || {};
    const taskArr = allTasksObj[eventId] || [];
    if (taskArr[taskIndex]) {
      setTaskData(taskArr[taskIndex]);
    }
  }, [eventId, taskIndex]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const allTasksObj = JSON.parse(localStorage.getItem('tasks')) || {};
    const tasksArr = allTasksObj[eventId] || [];
    tasksArr[taskIndex] = { ...taskData };
    allTasksObj[eventId] = tasksArr;
    localStorage.setItem('tasks', JSON.stringify(allTasksObj));
    // Also update event's tasks array
    const eventsArr = JSON.parse(localStorage.getItem('events')) || [];
    const eventIdx = eventsArr.findIndex(ev => ev.id === eventId);
    if (eventIdx !== -1) {
      eventsArr[eventIdx].tasks = tasksArr;
      localStorage.setItem('events', JSON.stringify(eventsArr));
    }
    navigate(`/EventsManagementPage/${eventId}`);
  };

  return (
    <div className="app-container">
      <style jsx>{`
        :root {
          --primary-purple: #441752;
          --secondary-purple: #A888B5;
          --background-light: #A888B5;
          --background-dark: #441752;
          --input-bg: #fff;
          --input-border: #A888B5;
          --card-bg: #441752;
          --divider: #A888B5;
          --text-dark: #1A1F36;
          --text-light: #fff;
          --btn-primary: #A888B5;
          --btn-primary-text: #441752;
          --btn-secondary: #d1b3e0;
          --btn-secondary-text: #441752;
          --btn-danger: #e57373;
        }
        .app-container {
          min-height: 100vh;
          background: var(--background-light);
          font-family: 'Inter', sans-serif;
        }
        .edit-header {
          padding: 32px 0 12px 0;
          font-family: 'Inter', sans-serif;
          margin-left: 330px;
        }
        .edit-title {
          font-size: 2rem;
          font-weight: 700;
          color: var(--primary-purple);
          margin-bottom: 0;
        }
        .form-container {
          background: var(--card-bg);
          border-radius: 10px;
          padding: 32px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          max-width: 700px;
          margin: 0 auto;
        }
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px 40px;
          margin-bottom: 24px;
        }
        .form-column {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .input-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        label {
          font-size: 15px;
          color: var(--secondary-purple);
          font-weight: 500;
        }
        input,
        select {
          padding: 12px 10px;
          border: 1px solid var(--input-border);
          border-radius: 6px;
          font-size: 15px;
          background: var(--input-bg);
          color: var(--primary-purple);
          width: 100%;
        }
        .date-group {
          display: flex;
          flex-direction: row;
          gap: 24px;
        }
        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 16px;
          border-top: 1px solid var(--divider);
          padding-top: 24px;
        }
        .primary-btn {
          padding: 12px 32px;
          background: var(--btn-primary);
          color: var(--btn-primary-text);
          border: none;
          border-radius: 6px;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .primary-btn:disabled {
          background: var(--btn-secondary);
          color: var(--btn-secondary-text);
          cursor: not-allowed;
        }
        .primary-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(44, 125, 250, 0.2);
        }
        .danger-btn {
          background: var(--btn-danger) !important;
          color: #fff !important;
        }
      `}</style>
      <main className="content-area edit-event-root">
        <div className="edit-header">
          <div className="edit-title">Edit Task</div>
        </div>
        <div className="form-container">
          <form onSubmit={e => { e.preventDefault(); handleSave(); }}>
            <div className="form-grid">
              <div className="form-column">
                <div className="input-group">
                  <label>Task Name</label>
                  <input type="text" name="name" value={taskData.name} onChange={handleInputChange} />
                </div>
                <div className="input-group">
                  <label>Budget</label>
                  <input type="number" name="budget" value={taskData.budget} onChange={handleInputChange} />
                </div>
                <div className="input-group">
                  <label>Liaison</label>
                  <select name="liaison" value={taskData.liaison} onChange={handleInputChange}>
                    <option value="">Select Liaison</option>
                    {liaisonOptions.map((liaison, idx) => (
                      <option key={idx} value={liaison}>{liaison}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-column">
                <div className="input-group">
                  <label>Status</label>
                  <select name="status" value={taskData.status} onChange={handleInputChange}>
                    <option value="">Select Status</option>
                    {statusOptions.map((status, idx) => (
                      <option key={idx} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
                <div className="input-group">
                  <label>Date</label>
                  <input type="date" name="date" value={taskData.date} onChange={handleInputChange} />
                </div>
                <div className="input-group">
                  <label>Day</label>
                  <input type="text" name="day" value={taskData.day} onChange={handleInputChange} />
                </div>
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" className="primary-btn">Save</button>
              <button type="button" className="primary-btn danger-btn" onClick={() => navigate(`/EventsManagementPage/${eventId}`)}>Cancel</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EditTaskPage;
