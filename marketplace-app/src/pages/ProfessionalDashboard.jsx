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
      const response = await fetch(`http://localhost:3001/api/services/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'aceito' }),
      });

      const updatedService = await response.json();

      if (!response.ok) throw new Error(updatedService.error || 'Erro ao aceitar serviço');

      setServices(services.map(s => s.id === id ? updatedService : s));
    } catch (error) {
      console.error('Erro ao aceitar serviço:', error);
      alert(error.message);
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/services/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'cancelado' }),
      });

      const updatedService = await response.json();

      if (!response.ok) throw new Error(updatedService.error || 'Erro ao recusar serviço');

      setServices(services.map(s => s.id === id ? updatedService : s));
    } catch (error) {
      console.error('Erro ao recusar serviço:', error);
      alert(error.message);
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

        {services.map(service => {
          // Formata a data para DD/MM/YYYY
          const formattedDate = service.service_date
            ? service.service_date.split('T')[0].split('-').reverse().join('/')
            : 'Data inválida';

          return (
            <div key={service.id} className="service-card">
              <p><strong>Data:</strong> {formattedDate}</p>
              <p><strong>Descrição:</strong> {service.description}</p>
              <p><strong>Status:</strong> {service.status}</p>
              {service.status === 'pendente' && (
                <div className="actions">
                  <button onClick={() => handleAccept(service.id)} className="accept-btn">Aceitar</button>
                  <button onClick={() => handleReject(service.id)} className="reject-btn">Recusar</button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProfessionalDashboard;