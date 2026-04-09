import React from 'react';
import { Link } from 'react-router-dom';
import './Confirmation.css';

const Confirmation = () => {
  return (
    <div className="confirmation">
      <div className="hero">
        <p className="eyebrow">Meu Marido</p>
        <h1>Confirmação</h1>
        <p>Seu pedido foi enviado com sucesso ao profissional. Você será notificado quando ele aceitar.</p>
      </div>

      <div className="confirmation-container">
        <div className="confirmation-card">
          <div className="confirmation-icon">🎉</div>
          <h2>Serviço solicitado com sucesso!</h2>
          <p>Seu pedido foi enviado ao profissional. Você será notificado quando ele aceitar.</p>
          <Link to="/client-dashboard" className="primary-btn">Voltar ao Dashboard</Link>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
