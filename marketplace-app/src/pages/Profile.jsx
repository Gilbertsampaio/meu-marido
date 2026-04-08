import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import './Profile.css';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    logout();
    navigate('/', { replace: true });
    setShowLogoutModal(false);
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <div className="profile">
      <header className="hero">
        <div className="hero-copy">
          <span className="eyebrow">Meu Marido</span>
          <h1>Meu Perfil</h1>
          <p>Gerencie suas informações pessoais.</p>

          <div className="hero-actions">
            <button 
              className="primary-btn" 
              onClick={() => navigate(user?.type === 'cliente' ? '/client-dashboard' : '/professional-dashboard')}
            >
              Voltar
            </button>
            <button onClick={handleLogoutClick} className="secondary-btn">
              Sair
            </button>
          </div>
        </div>
      </header>

      <div className="profile-info">
        <div className="info-card">
          <img className="initials" src={user?.photo} alt={user?.name} />
          <h2>{user?.name}</h2>
          <p className="user-email">{user?.email}</p>
          <p className="user-type">Tipo: <strong>{user?.type === 'cliente' ? 'Cliente' : 'Profissional'}</strong></p>
        </div>
      </div>

      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirmar saída</h3>
            <p>Tem certeza que deseja sair?</p>
            <div className="modal-actions">
              <button className="modal-btn cancel-btn" onClick={handleCancelLogout}>
                Cancelar
              </button>
              <button className="modal-btn logout-btn" onClick={handleConfirmLogout}>
                Sair
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
