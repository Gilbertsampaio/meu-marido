import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import './Booking.css';

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [professional, setProfessional] = useState(null);
  const [formData, setFormData] = useState({ date: '', description: '' });
  const [errors, setErrors] = useState({});

  // Busca o profissional do banco ao carregar a página
  useEffect(() => {
    const fetchProfessional = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/professionals/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Erro ao buscar profissional');
        setProfessional(data);
      } catch (error) {
        console.error(error);
        alert(error.message);
        navigate('/client-dashboard');
      }
    };

    fetchProfessional();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.date) newErrors.date = 'Data obrigatória';
    if (!formData.description) newErrors.description = 'Descrição obrigatória';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!professional) return;

    if (validate()) {
      try {
        const response = await fetch('http://localhost:3001/api/services', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            clientId: user.id,
            professionalId: professional.userId, // agora vem do banco
            serviceDate: formData.date,
            description: formData.description
          }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Erro ao agendar serviço');
        navigate('/confirmation');
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    }
  };

  if (!professional) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <div className="loading-text">Carregando profissional...</div>
      </div>
    );
  }

  return (
    <div className="booking">
      <div className="hero">
        <p className="eyebrow">Contratação</p>
        <h1>Contratar {professional.name}</h1>
        <p>Agende seu serviço com este profissional</p>
        <div className="hero-actions">
          <button className="primary-btn" onClick={() => navigate('/client-dashboard')}>
            ← Voltar
          </button>
        </div>
      </div>

      <div className="booking-container">
        <div className="booking-card">
          <h3>Detalhes do Serviço</h3>
          <form onSubmit={handleSubmit} className="booking-form">
            <div className="form-group">
              <label>Data do serviço</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={errors.date ? 'error' : ''}
              />
              {errors.date && <span className="error-text">{errors.date}</span>}
            </div>
            <div className="form-group">
              <label>Descrição do problema</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Descreva detalhadamente o serviço que você precisa..."
                className={errors.description ? 'error' : ''}
              />
              {errors.description && <span className="error-text">{errors.description}</span>}
            </div>
            <button type="submit" className="confirm-btn">Confirmar contratação</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Booking;