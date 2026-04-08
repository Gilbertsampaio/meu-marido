import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockProfessionals } from '../data/mockData';
import './Dashboard.css';

const ClientDashboard = () => {
  const [filter, setFilter] = useState({ service: '', price: '', rating: '' });

  const filteredProfessionals = mockProfessionals.filter(prof => {
    return (
      (filter.service === '' || prof.service.toLowerCase().includes(filter.service.toLowerCase())) &&
      (filter.price === '' || prof.averagePrice <= parseInt(filter.price)) &&
      (filter.rating === '' || prof.rating >= parseFloat(filter.rating))
    );
  });

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Dashboard do Cliente</h1>
        <Link to="/profile">Perfil</Link>
      </header>

      <div className="filters">
        <input
          type="text"
          placeholder="Filtrar por serviço"
          value={filter.service}
          onChange={(e) => setFilter({ ...filter, service: e.target.value })}
        />
        <input
          type="number"
          placeholder="Preço máximo"
          value={filter.price}
          onChange={(e) => setFilter({ ...filter, price: e.target.value })}
        />
        <input
          type="number"
          placeholder="Avaliação mínima"
          value={filter.rating}
          onChange={(e) => setFilter({ ...filter, rating: e.target.value })}
          step="0.1"
        />
      </div>

      <div className="professionals-list">
        {filteredProfessionals.map(prof => (
          <div key={prof.id} className="professional-card">
            <img src={prof.photo} alt={prof.name} />
            <h3>{prof.name}</h3>
            <p>{prof.service}</p>
            <div className="rating">? {prof.rating}</div>
            <p>R$ {prof.averagePrice}/hora</p>
            <Link to={`/professional/${prof.id}`} className="details-btn">Ver detalhes</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientDashboard;
