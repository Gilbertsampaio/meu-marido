import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockServices } from '../data/mockData';
import './Dashboard.css';

const ProfessionalDashboard = () => {
  const [services, setServices] = useState(mockServices);
  const navigate = useNavigate();

  const handleAccept = (id) => {
    setServices(services.map(s => s.id === id ? { ...s, status: 'aceito' } : s));
  };

  const handleReject = (id) => {
    setServices(services.map(s => s.id === id ? { ...s, status: 'cancelado' } : s));
  };

  return (
    <div className="dashboard">
      <header className="hero">
        <div className="hero-copy">
          <span className="eyebrow">Meu Marido</span>
          <h1>Dashboard do Profissional</h1>
          <p>Gerencie suas solicitações e serviços.</p>

          <div className="hero-actions">
            <button className="primary-btn" onClick={() => navigate('/profile')}>
              Perfil
            </button>
          </div>
        </div>
      </header>

      <div className="services-list">
        <h2>Solicitações recebidas</h2>
        {services.map(service => (
          <div key={service.id} className="service-card">
            <p><strong>Data:</strong> {service.date}</p>
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
