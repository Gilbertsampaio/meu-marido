import React from 'react';
import { Link } from 'react-router-dom';
import './Confirmation.css';

const Confirmation = () => {
  return (
    <div className="confirmation">
      <div className="confirmation-message">
        <h2>? Serviço solicitado com sucesso!</h2>
        <p>Seu pedido foi enviado ao profissional. Você será notificado quando ele aceitar.</p>
        <Link to="/client-dashboard" className="back-btn">Voltar ao Dashboard</Link>
      </div>
    </div>
  );
};

export default Confirmation;
