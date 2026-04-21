import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchTerm) {
      setUserData(null);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      fetchUser(searchTerm);
    }, 700);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const fetchUser = async (username) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      setUserData(response.data);
    } catch (err) {
      setError("Username not Found!!");
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>GitHub Finder</h1>
        <p className="subtitle">REST API Integration Task</p>
        
        <input
          type="text"
          placeholder="Enter Username....."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {loading && <div className="loader">Retrieving data from server....</div>}
        
        {error && <div className="error-msg">{error}</div>}

        {userData && !loading && (
          <div className="user-card">
            <img src={userData.avatar_url} alt="profile" />
            <h2>{userData.name || userData.login}</h2>
            <p>{userData.bio || "No bio available"}</p>
            <div className="stats">
              <div>
                <strong>{userData.followers}</strong>
                <span>Followers</span>
              </div>
              <div>
                <strong>{userData.public_repos}</strong>
                <span>Repos</span>
              </div>
            </div>
            <a href={userData.html_url} target="_blank" rel="noreferrer" className="profile-btn">
              Visit GitHub Profile
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;