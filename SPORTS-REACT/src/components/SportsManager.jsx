import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Style.css';
import config from './config.js';

const SportsManager = () => {
  const [sports, setSports] = useState([]);
  const [sport, setSport] = useState({
    name: '',
    type: '',
    category: '',
    coach: ''
  });
  const [idToFetch, setIdToFetch] = useState('');
  const [fetchedSport, setFetchedSport] = useState(null);
  const [message, setMessage] = useState('');
  const [editMode, setEditMode] = useState(false);

  const baseUrl = `${config.url}/sportsapi`;

  useEffect(() => {
    fetchAllSports();
  }, []);

  const fetchAllSports = async () => {
    try {
      const res = await axios.get(`${baseUrl}/all`);
      setSports(res.data);
    } catch (error) {
      setMessage('Failed to fetch sports.');
    }
  };

  const handleChange = (e) => {
    setSport({ ...sport, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!sport.name || !sport.type || !sport.category) {
      setMessage('Please fill out all required fields (Name, Type, Category).');
      return false;
    }
    return true;
  };

  const addSport = async () => {
    if (!validateForm()) return;
    try {
      await axios.post(`${baseUrl}/add`, sport);
      setMessage('Sport added successfully.');
      fetchAllSports();
      resetForm();
    } catch (error) {
      setMessage('Error adding sport.');
    }
  };

  const updateSport = async () => {
    if (!validateForm()) return;
    try {
      await axios.put(`${baseUrl}/update`, sport);
      setMessage('Sport updated successfully.');
      fetchAllSports();
      resetForm();
    } catch (error) {
      setMessage('Error updating sport.');
    }
  };

  const deleteSport = async (id) => {
    try {
      await axios.delete(`${baseUrl}/delete/${id}`);
      setMessage('Sport deleted successfully.');
      fetchAllSports();
    } catch (error) {
      setMessage('Error deleting sport.');
    }
  };

  const getSportById = async () => {
    try {
      const res = await axios.get(`${baseUrl}/get/${idToFetch}`);
      setFetchedSport(res.data);
      setMessage('');
    } catch (error) {
      setFetchedSport(null);
      setMessage('Sport not found.');
    }
  };

  const handleEdit = (sportItem) => {
    setSport(sportItem);
    setEditMode(true);
    setMessage(`Editing sport: ${sportItem.name}`);
  };

  const resetForm = () => {
    setSport({
      name: '',
      type: '',
      category: '',
      coach: ''
    });
    setEditMode(false);
  };

  return (
    <div className="sports-container">
      {message && (
        <div className={`message-banner ${message.toLowerCase().includes('error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <h2>Sports Management System</h2>

      <div className="form-section">
        <h3>{editMode ? 'Edit Sport' : 'Add New Sport'}</h3>
        <div className="form-grid">
          <input 
            type="text" 
            name="name" 
            placeholder="Sport Name *" 
            value={sport.name} 
            onChange={handleChange} 
          />
          <select name="type" value={sport.type} onChange={handleChange}>
            <option value="">Select Type *</option>
            <option value="INDOOR">INDOOR</option>
            <option value="OUTDOOR">OUTDOOR</option>
            <option value="AQUATIC">AQUATIC</option>
          </select>
          <select name="category" value={sport.category} onChange={handleChange}>
            <option value="">Select Category *</option>
            <option value="TEAM">TEAM</option>
            <option value="INDIVIDUAL">INDIVIDUAL</option>
            <option value="DUAL">DUAL</option>
          </select>
          <input 
            type="text" 
            name="coach" 
            placeholder="Coach Name (Optional)" 
            value={sport.coach} 
            onChange={handleChange} 
          />
        </div>

        <div className="btn-group">
          {!editMode ? (
            <button className="btn-blue" onClick={addSport}>Add Sport</button>
          ) : (
            <>
              <button className="btn-green" onClick={updateSport}>Update Sport</button>
              <button className="btn-gray" onClick={resetForm}>Cancel</button>
            </>
          )}
        </div>
      </div>

      <div className="search-section">
        <h3>Get Sport By ID</h3>
        <div className="search-input-group">
          <input
            type="number"
            value={idToFetch}
            onChange={(e) => setIdToFetch(e.target.value)}
            placeholder="Enter Sport ID"
          />
          <button className="btn-blue" onClick={getSportById}>Fetch</button>
        </div>

        {fetchedSport && (
          <div className="results-display">
            <h4>Sport Found:</h4>
            <div className="sport-details">
              <p><strong>ID:</strong> {fetchedSport.id}</p>
              <p><strong>Name:</strong> {fetchedSport.name}</p>
              <p><strong>Type:</strong> {fetchedSport.type}</p>
              <p><strong>Category:</strong> {fetchedSport.category}</p>
              <p><strong>Coach:</strong> {fetchedSport.coach || 'Not specified'}</p>
            </div>
          </div>
        )}
      </div>

      <div className="table-section">
        <h3>All Sports ({sports.length})</h3>
        {sports.length === 0 ? (
          <p className="no-data">No sports found. Add your first sport!</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Category</th>
                  <th>Coach</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sports.map((sportItem) => (
                  <tr key={sportItem.id}>
                    <td>{sportItem.id}</td>
                    <td>{sportItem.name}</td>
                    <td>
                      <span className={`type-badge ${sportItem.type.toLowerCase()}`}>
                        {sportItem.type}
                      </span>
                    </td>
                    <td>{sportItem.category}</td>
                    <td>{sportItem.coach || '-'}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-green" onClick={() => handleEdit(sportItem)}>Edit</button>
                        <button className="btn-red" onClick={() => deleteSport(sportItem.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SportsManager;