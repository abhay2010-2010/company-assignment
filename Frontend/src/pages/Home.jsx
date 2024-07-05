import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const axiosInstance = axios.create({
    baseURL: 'https://company-assignment-h9vq.onrender.com',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  const fetchData = async () => {
    if (!token) {
      setError('No token found. Please login.');
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.get("/records/");
      setData(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching data: ' + err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    if (token) {
      const interval = setInterval(fetchData, 5000);
      return () => clearInterval(interval);
    }
  }, [token]);

  const handleCreate = () => {
    setShowCreateModal(true);
  };

  const createRecord = async (newRecord) => {
    if (!token) return;
    try {
      await axiosInstance.post("/records/", newRecord);
      fetchData();
      setShowCreateModal(false);
    } catch (err) {
      setError('Error creating record: ' + err.message);
    }
  };

  const handleUpdate = async (updatedRecord) => {
    if (!token || !selectedRecord) return;
    try {
      await axiosInstance.put(`/records/${selectedRecord._id}`, updatedRecord);
      fetchData();
      setShowModal(false);
    } catch (err) {
      setError('Error updating record: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!token) return;
    try {
      await axiosInstance.delete(`/records/${id}`);
      fetchData();
    } catch (err) {
      setError('Error deleting record: ' + err.message);
    }
  };

  const openUpdateModal = (record) => {
    setSelectedRecord(record);
    setShowModal(true);
  };

  if (!token) return <div>Please login to view this page.</div>;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Records</h1>

      <table>
        <thead>
          <tr>
            <th>Quantity</th>
            <th>Amount</th>
            <th>Posting Year</th>
            <th>Posting Month</th>
            <th>Action Type</th>
            <th>Action Number</th>
            <th>Action Name</th>
            <th>Status</th>
            <th>Impact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(record => (
            <tr key={record._id}>
              <td>{record.quantity}</td>
              <td>{record.amount}</td>
              <td>{record.postingYear}</td>
              <td>{record.postingMonth}</td>
              <td>{record.actionType}</td>
              <td>{record.actionNumber}</td>
              <td>{record.actionName}</td>
              <td>{record.status}</td>
              <td>{record.impact}</td>
              <td>
                <button onClick={() => openUpdateModal(record)}>Update</button>
                <button onClick={() => handleDelete(record._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleCreate}>Create New Record</button>

      {showModal && selectedRecord && (
        <UpdateModal
          record={selectedRecord}
          onUpdate={handleUpdate}
          onClose={() => setShowModal(false)}
          role={role}
        />
      )}

      {showCreateModal && (
        <CreateModal
          onCreate={createRecord}
          onClose={() => setShowCreateModal(false)}
        />
      )}
    </div>
  );
}

function UpdateModal({ record, onUpdate, onClose, role }) {
  const [updatedRecord, setUpdatedRecord] = useState(record);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedRecord(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(role === 'admin' ? { status: updatedRecord.status } : updatedRecord);
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        {role === 'user' && (
          <>
            <input name="quantity" value={updatedRecord.quantity} onChange={handleChange} />
            <input name="amount" value={updatedRecord.amount} onChange={handleChange} />
            <input name="postingYear" value={updatedRecord.postingYear} onChange={handleChange} />
            <input name="postingMonth" value={updatedRecord.postingMonth} onChange={handleChange} />
            <input name="actionType" value={updatedRecord.actionType} onChange={handleChange} />
            <input name="actionNumber" value={updatedRecord.actionNumber} onChange={handleChange} />
            <input name="actionName" value={updatedRecord.actionName} onChange={handleChange} />
            <select name="impact" value={updatedRecord.impact} onChange={handleChange}>
              <option value="Low">Low</option>
              <option value="Mid">Mid</option>
              <option value="High">High</option>
            </select>
          </>
        )}
        <select name="status" value={updatedRecord.status} onChange={handleChange}>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Approved">Approved</option>
        </select>
        <button type="submit">Update</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}

function CreateModal({ onCreate, onClose }) {
  const [newRecord, setNewRecord] = useState({
    quantity: 0,
    amount: 0,
    postingYear: new Date().getFullYear(),
    postingMonth: new Date().toLocaleString('default', { month: 'long' }),
    actionType: '',
    actionNumber: '',
    actionName: '',
    status: 'Pending',
    impact: 'Low'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRecord(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(newRecord);
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <input name="quantity" type="number" value={newRecord.quantity} onChange={handleChange} placeholder="Quantity" />
        <input name="amount" type="number" value={newRecord.amount} onChange={handleChange} placeholder="Amount" />
        <input name="postingYear" type="number" value={newRecord.postingYear} onChange={handleChange} placeholder="Posting Year" />
        <input name="postingMonth" value={newRecord.postingMonth} onChange={handleChange} placeholder="Posting Month" />
        <input name="actionType" value={newRecord.actionType} onChange={handleChange} placeholder="Action Type" />
        <input name="actionNumber" value={newRecord.actionNumber} onChange={handleChange} placeholder="Action Number" />
        <input name="actionName" value={newRecord.actionName} onChange={handleChange} placeholder="Action Name" />
        <select name="status" value={newRecord.status} onChange={handleChange}>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Approved">Approved</option>
        </select>
        <select name="impact" value={newRecord.impact} onChange={handleChange}>
          <option value="Low">Low</option>
          <option value="Mid">Mid</option>
          <option value="High">High</option>
        </select>
        <button type="submit">Create</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}

export default Home;