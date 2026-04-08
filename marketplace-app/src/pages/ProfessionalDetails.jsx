import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockProfessionals } from '../data/mockData';
import './Details.css';

const ProfessionalDetails = () => {
  const { id } = useParams();
  const professional = mockProfessionals.find(p => p.id === parseInt(id));

  if (!professional) return <div>Profissional não encontrado</div>;

  return (
    <div className="details">
      <header className="details-header">
        <Link to="/client-dashboard">? Voltar</Link>
      </header>

      <div className="professional-details">
        <img src={professional.photo} alt={professional.name} />
        <h2>{professional.name}</h2>
        <p>{professional.service}</p>
        <p>{professional.description}</p>
        <div className="rating">? {professional.rating}</div>
        <p>R$ {professional.averagePrice}/hora</p>
        <Link to={`/booking/${professional.id}`} className="hire-btn">Contratar serviço</Link>
      </div>

      <div className="reviews">
        <h3>Avaliações</h3>
        {/* Mock reviews */}
        <div className="review">
          <div>? 5</div>
          <p>Excelente trabalho!</p>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalDetails;
