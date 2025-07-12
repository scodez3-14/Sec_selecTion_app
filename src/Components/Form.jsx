import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import './Form.css'; // Optional: if you want to style separately

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    roll: '',
    driveLink: ''
  });

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, roll, driveLink } = formData;

    if (!name || !roll || !driveLink.startsWith("https://")) {
      setError("Please fill all fields correctly.");
      setSuccess('');
      return;
    }

    try {
      await addDoc(collection(db, "applications"), {
        ...formData,
        submittedAt: Timestamp.now()
      });

      setSuccess("Submitted successfully!");
      setError('');
      setFormData({ name: '', roll: '', driveLink: '' });

    } catch (err) {
  console.error("❌ Firestore Submission Error:", err.code, err.message);
  setError("Something went wrong. Check console.");
  setSuccess('');
}

  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Secretary Selection Form</h2>

      <label>Name:</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <label>Roll Number:</label>
      <input
        type="text"
        name="roll"
        value={formData.roll}
        onChange={handleChange}
        required
      />

      <label>Google Drive Link:</label>
      <input
        type="url"
        name="driveLink"
        value={formData.driveLink}
        onChange={handleChange}
        required
      />

      <button type="submit">Submit</button>

      {success && <p className="success">{success}</p>}
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default Form;
