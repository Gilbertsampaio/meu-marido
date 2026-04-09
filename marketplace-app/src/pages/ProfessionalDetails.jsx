import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './Details.css';

const renderStars = (rating) => {
  const filledStars = Math.round(rating);
  return Array.from({ length: 5 }, (_, index) => (
    <span key={index} className={index < filledStars ? 'star filled' : 'star'}>
      ★
    </span>
  ));
};

const ProfessionalDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [professional, setProfessional] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfessional = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/professionals/${id}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar profissional');
        }
        const data = await response.json();
        setProfessional(data);
      } catch (err) {
        setError(err.message || 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchProfessional();
  }, [id]);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;
  if (!professional) return <div>Profissional não encontrado</div>;

  return (
    <div className="details">
      <div className="hero">
        <p className="eyebrow">Detalhes</p>
        <h1>{professional.name}</h1>
        <p>{professional.service}</p>
        <div className="hero-actions">
          <button className="primary-btn" onClick={() => navigate('/client-dashboard')}>
            Voltar
          </button>
        </div>
      </div>

      <div className="details-container">
        <div className="professional-card">
          <img src={professional.photo} alt={professional.name} />
          <p className="description">{professional.description}</p>
          <div className="professional-info">
            <div className="rating-section">
              <div className="stars">{renderStars(professional.rating)}</div>
              <small>{Number(professional.rating || 0).toFixed(1)} ({professional.reviews || 0})</small>
            </div>
            <p className="price">R$ {professional.average_price || professional.averagePrice}/hora</p>
          </div>
          <Link to={`/booking/${professional.userId}`} className="primary-btn">
            Contratar serviço
          </Link>
        </div>

        <div className="reviews-card">
          <h3>Avaliações</h3>
          <div className="review">
            <div className="review-rating">{renderStars(5)}</div>
            <p>Maria da Silva - Excelente trabalho!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalDetails;