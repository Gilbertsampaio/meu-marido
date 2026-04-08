import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockProfessionals, mockServices } from '../data/mockData';
import './Booking.css';

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: '',
    description: ''
  });
  const [errors, setErrors] = useState({});

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Mock booking
      const newService = {
        id: mockServices.length + 1,
        clientId: 1, // Mock client
        professionalId: parseInt(id),
        date: formData.date,
        description: formData.description,
        status: 'pendente'
      };
      mockServices.push(newService);
      navigate('/confirmation');
    }
  };

  const professional = mockProfessionals.find(p => p.id === parseInt(id));

  return (
    <div className="booking">
      <header className="booking-header">
        <h1>Contratar {professional?.name}</h1>
      </header>

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
            className={errors.description ? 'error' : ''}
          />
          {errors.description && <span className="error-text">{errors.description}</span>}
        </div>
        <button type="submit" className="confirm-btn">Confirmar contratação</button>
      </form>
    </div>
  );
};

export default Booking;
