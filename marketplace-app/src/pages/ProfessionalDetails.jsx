import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { mockProfessionals } from '../data/mockData';
import './Details.css';

const ProfessionalDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const professional = mockProfessionals.find(p => p.id === parseInt(id));

  if (!professional) return <div>Profissional não encontrado</div>;

  return (
    <div className="details">
      <div className="hero">
        <p className="eyebrow">Detalhes</p>
        <h1>{professional.name}</h1>
        <p>{professional.service}</p>
        <div className="hero-actions">
          <button className="primary-btn" onClick={() => navigate('/client-dashboard')}>
            ← Voltar
          </button>
        </div>
      </div>

      <div className="details-container">
        <div className="professional-card">
          <img src={professional.photo} alt={professional.name} />
          <p className="description">{professional.description}</p>
          <div className="professional-info">
            <div className="rating-section">
              <span className="rating">⭐ {professional.rating}</span>
            </div>
            <p className="price">R$ {professional.averagePrice}/hora</p>
          </div>
          <Link to={`/booking/${professional.id}`} className="primary-btn">Contratar serviço</Link>
        </div>

        <div className="reviews-card">
          <h3>Avaliações</h3>
          <div className="review">
            <div className="review-rating">⭐ 5</div>
            <p>Excelente trabalho!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalDetails;
