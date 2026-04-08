import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import { mockUsers } from '../data/mockData';
import './Auth.css';

const serviceOptions = ['Eletricista', 'Encanador', 'Diarista', 'Pintor', 'Outros'];

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'cliente',
    service: '',
    description: '',
    averagePrice: ''
  });
  const [errors, setErrors] = useState({});
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Nome obrigatório';
    if (!formData.email) newErrors.email = 'Email obrigatório';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email inválido';
    if (!formData.password) newErrors.password = 'Senha obrigatória';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'As senhas não coincidem';
    if (formData.userType === 'profissional') {
      if (!formData.service) newErrors.service = 'Serviço obrigatório';
      if (!formData.averagePrice || isNaN(formData.averagePrice) || formData.averagePrice <= 0) newErrors.averagePrice = 'Preço deve ser um número positivo';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const firstName = formData.name.split(' ')[0];
      const photoUrl = `https://api.dicebear.com/9.x/thumbs/svg?seed=${firstName}`;
      
      const newUser = {
        id: mockUsers.length + 1,
        name: formData.name,
        email: formData.email,
        password: formData.password,
        type: formData.userType,
        photo: photoUrl
      };

      if (formData.userType === 'profissional') {
        newUser.service = formData.service;
        newUser.description = formData.description;
        newUser.averagePrice = parseFloat(formData.averagePrice);
      }

      mockUsers.push(newUser);
      login(newUser);
      navigate(formData.userType === 'cliente' ? '/client-dashboard' : '/professional-dashboard');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="back-action">
            <Link to="/" className="back-link">← Voltar</Link>
          </div>
          <div className="title-panel">
            <h2>Criar conta</h2>
            <p>Registre-se como cliente ou profissional.</p>
          </div>
        </div>

        <div className="switch-group">
          <button
            type="button"
            className={formData.userType === 'cliente' ? 'switch active' : 'switch'}
            onClick={() => setFormData({ ...formData, userType: 'cliente' })}
          >
            Cliente
          </button>
          <button
            type="button"
            className={formData.userType === 'profissional' ? 'switch active' : 'switch'}
            onClick={() => setFormData({ ...formData, userType: 'profissional' })}
          >
            Profissional
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome</label>
            <input
              placeholder="Seu nome completo"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              placeholder="seu@email.com"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Senha</label>
            <input
              placeholder="••••••••"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label>Confirmar senha</label>
            <input
              placeholder="••••••••"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? 'error' : ''}
            />
            {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
          </div>

          {formData.userType === 'profissional' && (
            <>
              <div className="form-group">
                <label>Serviço</label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className={errors.service ? 'error' : ''}
                >
                  <option value="">Selecione...</option>
                  {serviceOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                {errors.service && <span className="error-text">{errors.service}</span>}
              </div>

              <div className="form-group">
                <label>Descrição</label>
                <textarea
                  name="description"
                  placeholder="Descreva seus serviços..."
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Preço médio (R$)</label>
                <input
                  placeholder="100"
                  type="number"
                  name="averagePrice"
                  value={formData.averagePrice}
                  onChange={handleChange}
                  className={errors.averagePrice ? 'error' : ''}
                />
                {errors.averagePrice && <span className="error-text">{errors.averagePrice}</span>}
              </div>
            </>
          )}

          <button type="submit" className="auth-btn">Criar conta</button>
        </form>

        <p className="auth-note">
          Já tem conta? <Link to="/login">Entrar</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
