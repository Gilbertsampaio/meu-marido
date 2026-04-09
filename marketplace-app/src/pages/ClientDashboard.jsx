import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import './Dashboard.css';

const getInitials = (name) => {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
};

const renderStars = (rating) => {
  const filledStars = Math.round(rating);
  return Array.from({ length: 5 }, (_, index) => (
    <span key={index} className={index < filledStars ? 'star filled' : 'star'}>
      ★
    </span>
  ));
};

const ClientDashboard = () => {
  const [filter, setFilter] = useState({ service: '', price: '', rating: '' });
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/professionals');
        const data = await response.json();
        setProfessionals(data);
      } catch (error) {
        console.error('Erro ao buscar profissionais:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfessionals();
  }, []);

  const filteredProfessionals = professionals.filter(prof => {
    return (
      (filter.service === '' || prof.service.toLowerCase().includes(filter.service.toLowerCase())) &&
      (filter.price === '' || prof.averagePrice <= parseFloat(filter.price)) &&
      (filter.rating === '' || prof.rating >= parseFloat(filter.rating))
    );
  });

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <div className="loading-text">Carregando profissionais...</div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header className="hero">
        <div className="hero-copy">
          <span className="eyebrow">Meu Marido</span>
          <h1>Dashboard do Cliente</h1>
          <p>Área destinada aos clientes cadastrados.</p>

          <div className="hero-actions">
            <button className="primary-btn perfil-btn" onClick={() => navigate('/profile')}>
              <img className="initials" src={user?.photo} alt={user?.name} />
              <span>Perfil</span>
            </button>
          </div>
        </div>
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
          <div key={prof.userId} className="professional-card">
            <div className="card-top">
              <img className="initials" src={prof.photo} alt={prof.name} />
              <div>
                <h3>{prof.name}</h3>
                <span className="service-tag">{prof.service}</span>
              </div>
            </div>

            <div className="card-rating">
              <div className="stars">{renderStars(prof.rating)}</div>
              <small>{Number(prof.rating || 0).toFixed(1)} ({prof.reviews || 0})</small>
            </div>

            <div className="card-footer">
              <strong>R$ {prof.averagePrice}</strong>
              <Link to={`/professional/${prof.userId}`} className="hire-btn">Contratar</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientDashboard;