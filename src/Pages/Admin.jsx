import React, { useState } from 'react';
import Login from '../Components/Login';
import AdminPanel from '../Components/AdminPanel';
import { getAuth, signOut } from 'firebase/auth';

export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => setLoggedIn(false));
  };

  return (
    <div>
      {loggedIn ? (
        <AdminPanel onLogout={handleLogout} />
      ) : (
        <Login onLogin={() => setLoggedIn(true)} />
      )}
    </div>
  );
}
