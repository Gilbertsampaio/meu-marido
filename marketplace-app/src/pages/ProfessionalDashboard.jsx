import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import './Dashboard.css';

const ProfessionalDashboard = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:3001/api/services/professional/${user.id}`)
        .then(res => res.json())
        .then(data => setServices(data))
        .catch(err => {
          console.error('Erro ao buscar serviços:', err);
          setServices([]);
        });
    }
  }, [user]);

  const handleAccept = async (id) => {
    try {
      await fetch(`http://localhost:3001/api/services/${id}`, {
        method: 'PATCH', // ou PUT, dependendo da API
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'aceito' }),
      });
      setServices(services.map(s => s.id === id ? { ...s, status: 'aceito' } : s));
    } catch (error) {
      console.error('Erro ao aceitar serviço:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      await fetch(`http://localhost:3001/api/services/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'cancelado' }),
      });
      setServices(services.map(s => s.id === id ? { ...s, status: 'cancelado' } : s));
    } catch (error) {
      console.error('Erro ao recusar serviço:', error);
    }
  };

  return (
    <div className="dashboard">
      <header className="hero">
        <div className="hero-copy">
          <span className="eyebrow">Meu Marido</span>
          <h1>Dashboard do Profissional</h1>
          <p>Gerencie suas solicitações e serviços.</p>

          <div className="hero-actions">
            <button className="primary-btn perfil-btn" onClick={() => navigate('/profile')}>
              <img className="initials" src={user?.photo} alt={user?.name} />
              <span>Perfil</span>
            </button>
          </div>
        </div>
      </header>

      <div className="services-list">
        <h2>Solicitações recebidas</h2>
        {services.length === 0 && <p>Nenhuma solicitação encontrada.</p>}
        {services.map(service => (
          <div key={service.id} className="service-card">
            <p><strong>Data:</strong> {new Date(service.date).toLocaleDateString()}</p>
            <p><strong>Descrição:</strong> {service.description}</p>
            <p><strong>Status:</strong> {service.status}</p>
            {service.status === 'pendente' && (
              <div className="actions">
                <button onClick={() => handleAccept(service.id)} className="accept-btn">Aceitar</button>
                <button onClick={() => handleReject(service.id)} className="reject-btn">Recusar</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfessionalDashboard;