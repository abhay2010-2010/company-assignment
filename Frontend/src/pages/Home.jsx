import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');

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
  const handleCreate = async () => {
    if (!token) return;
    try {
      const newRecord = {
        quantity: 0,
        amount: 0,
        postingYear: new Date().getFullYear(),
        postingMonth: new Date().toLocaleString('default', { month: 'long' }),
        actionType: '',
        actionNumber: '',
        actionName: '',
        status: 'Pending',
        impact: 'Low'
      };
      await axiosInstance.post("/records/", newRecord);
      fetchData();
    } catch (err) {
      setError('Error creating record: ' + err.message);
    }
  };
  
  const handleUpdate = async (id, updatedRecord) => {
    if (!token) return;
    try {
      await axiosInstance.put(`/records/${id}`, updatedRecord);
      fetchData();
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
  if (!token) return <div>Please login to view this page.</div>;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h4>Records</h4>

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
                <button onClick={() => handleUpdate(record._id, { /* updated data */ })}>Update</button>
                <button onClick={() => handleDelete(record._id)}>Delete</button>
              </td>
            </tr>
           
          ))}
           <hr />
        </tbody>
      </table>
      <button onClick={() => handleCreate({ /* new record data */ })}>Create New Record</button>
    </div>
  );
}

export default Home;