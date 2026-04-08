import React, { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import './Profile.css';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedUser = { ...user, photo: reader.result };
        // Atualiza o contexto global
        localStorage.setItem('user', JSON.stringify(updatedUser));
        // Força re-render atualizando o estado do contexto
        window.location.reload();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditPhotoClick = () => {
    fileInputRef.current.click();
  };

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
          <div className="photo-container">
            <img 
              className="initials clickable" 
              src={user?.photo} 
              alt={user?.name} 
              onClick={handleEditPhotoClick}
              title="Clique para alterar a foto"
            />
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handlePhotoChange}
            accept="image/*"
            style={{ display: 'none' }}
          />
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
