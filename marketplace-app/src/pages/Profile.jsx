import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../App';
import './Profile.css';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="profile">
      <header className="profile-header">
        <h1>Perfil</h1>
      </header>

      <div className="profile-info">
        <h2>{user?.name}</h2>
        <p>{user?.email}</p>
        <p>Tipo: {user?.type}</p>
      </div>

      <div className="profile-actions">
        <button onClick={logout} className="logout-btn">Logout</button>
        <Link to={user?.type === 'cliente' ? '/client-dashboard' : '/professional-dashboard'}>
          Voltar ao Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Profile;
