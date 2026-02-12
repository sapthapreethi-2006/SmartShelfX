import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { findUserByUsername } from '../../Services/LoginService';

const ShowUserDetails = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        
        // Get user details from localStorage (stored during login)
        const userDetails = JSON.parse(window.localStorage.getItem('userDetails') || '{}');
        const username = window.localStorage.getItem('username');
        const userId = window.localStorage.getItem('userId');
        const userRole = window.localStorage.getItem('userRole');
        const personalName = window.localStorage.getItem('personalName');
        const email = window.localStorage.getItem('email');
        
        console.log('Retrieved from localStorage:', { userDetails, username, userId, userRole, personalName, email });
        
        if (!username && !userId) {
          setError('No user found. Please log in again.');
          return;
        }

        // Helper to pick email from any key in an object
        const pickEmail = (obj) => {
          if (!obj || typeof obj !== 'object') return '';
          const keys = Object.keys(obj);
          for (const k of keys) {
            if (/email|mail/i.test(k)) {
              const val = obj[k];
              if (val && String(val).trim()) return String(val).trim();
            }
          }
          return '';
        };

        // Helper to pick a display name
        const pickName = (obj) => {
          if (!obj || typeof obj !== 'object') return '';
          const nameKeys = ['personalName', 'fullName', 'name', 'displayName'];
          for (const k of nameKeys) {
            if (obj[k] && String(obj[k]).trim()) return String(obj[k]).trim();
          }
          return '';
        };

        // Build user object from localStorage
        let user = {
          userId: userId || userDetails.userId || username,
          username: username || userDetails.username,
          personalName: personalName || pickName(userDetails) || username,
          email: email || userDetails.email || pickEmail(userDetails) || '',
          role: userRole || userDetails.role || 'USER',
          ...userDetails
        };
        
        // If email is missing, try fetching from registered users list as fallback
        if (!user.email || !String(user.email).trim()) {
          try {
            const fetched = await findUserByUsername(user.username || username);
            if (fetched) {
              user = {
                ...user,
                email: pickEmail(fetched) || fetched.email || fetched.emailId || fetched.mail || user.email,
                personalName: user.personalName || pickName(fetched) || fetched.name || user.username,
              };
            }
          } catch (e) {
            console.warn('Fallback user fetch failed:', e);
          }
        }

        console.log('User object:', user);
        setUser(user);
      } catch (err) {
        console.error('Error loading user details:', err);
        setError('Failed to load user details');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem('role');
    window.localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div style={{ padding: '40px 20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: 'white', borderRadius: '8px', padding: '40px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '40px', color: '#333', fontSize: '32px' }}>
          {user?.personalName || user?.username}'s Details
        </h1>

        {loading && (
          <p style={{ textAlign: 'center', color: '#666', fontSize: '16px' }}>Loading user details...</p>
        )}

        {error && (
          <p style={{ textAlign: 'center', color: 'red', fontSize: '16px', padding: '15px', backgroundColor: '#ffebee', borderRadius: '5px' }}>
            {error}
          </p>
        )}

        {!loading && !error && user && (
          <div>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '30px',
              marginBottom: '40px'
            }}>
              <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', border: '1px solid #ddd' }}>
                <p style={{ margin: '0 0 10px 0', color: '#666', fontSize: '14px', fontWeight: 'bold' }}>User ID:</p>
                <p style={{ margin: '0', color: '#333', fontSize: '18px' }}>{user.userId || user.username}</p>
              </div>

              <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', border: '1px solid #ddd' }}>
                <p style={{ margin: '0 0 10px 0', color: '#666', fontSize: '14px', fontWeight: 'bold' }}>Personal Name:</p>
                <p style={{ margin: '0', color: '#333', fontSize: '18px' }}>{user.personalName || 'N/A'}</p>
              </div>

              <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', border: '1px solid #ddd' }}>
                <p style={{ margin: '0 0 10px 0', color: '#666', fontSize: '14px', fontWeight: 'bold' }}>Email:</p>
                <p style={{ margin: '0', color: '#333', fontSize: '18px' }}>
                  {user.email && user.email.trim() ? user.email : 'Not Provided'}
                </p>
              </div>

              <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', border: '1px solid #ddd' }}>
                <p style={{ margin: '0 0 10px 0', color: '#666', fontSize: '14px', fontWeight: 'bold' }}>Role:</p>
                <p style={{ 
                  margin: '0', 
                  color: '#333', 
                  fontSize: '18px',
                  fontWeight: 'bold',
                  padding: '8px 12px',
                  backgroundColor: user.role === 'ADMIN' ? '#e8f5e9' : '#e3f2fd',
                  color: user.role === 'ADMIN' ? '#2e7d32' : '#1565c0',
                  borderRadius: '4px',
                  display: 'inline-block'
                }}>
                  {user.role || 'N/A'}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => navigate(-1)}
                style={{
                  padding: '12px 30px',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}
              >
                Return
              </button>
              <button
                onClick={handleLogout}
                style={{
                  padding: '12px 30px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowUserDetails;
