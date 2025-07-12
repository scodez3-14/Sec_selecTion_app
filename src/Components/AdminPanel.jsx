import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import './AdminPanel.css';
import Papa from 'papaparse';


const AdminPanel = ({onLogout}) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSubmissions = async () => {
    try {
      const q = query(collection(db, 'applications'), orderBy('submittedAt', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setApplications(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching submissions:", err);
      setLoading(false);
    }
  };

  const handleExportCSV = () => {
    if (applications.length === 0) return;

    const csv = Papa.unparse(
      applications.map(({ name, roll, driveLink, submittedAt }) => ({
        Name: name,
        Roll: roll,
        DriveLink: driveLink,
        SubmittedAt: submittedAt?.toDate().toLocaleString() || '',
      }))
    );

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'submissions.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);


return (
  <div className="admin">
    <h2>Admin Panel – Submissions</h2>

    {loading ? (
      <p>Loading...</p>
    ) : applications.length === 0 ? (
      <p>No submissions yet.</p>
    ) : (
      <>
        {}
        <button className="export-btn" onClick={handleExportCSV}>
          Export as CSV
        </button>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll Number</th>
              <th>Drive Link</th>
              <th>Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(app => (
              <tr key={app.id}>
                <td>{app.name}</td>
                <td>{app.roll}</td>
                <td>
                  <a href={app.driveLink} target="_blank" rel="noopener noreferrer">
                    View
                  </a>
                </td>
                <td>{app.submittedAt?.toDate().toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    )}
    <button onClick={onLogout} className="logout-btn">Logout</button>
  </div>
);

};

export default AdminPanel;
