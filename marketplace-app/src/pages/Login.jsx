import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../App';
import { mockUsers } from '../data/mockData';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('cliente');
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const type = query.get('type');
    if (type === 'cliente' || type === 'profissional') {
      setUserType(type);
    }
  }, [location.search]);

  const validate = () => {
    const newErrors = {};
    setGeneralError('');
    if (!email) newErrors.email = 'Email obrigatório';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email inválido';
    if (!password) newErrors.password = 'Senha obrigatória';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const user = mockUsers.find(
        (u) => u.email === email && u.password === password && u.type === userType
      );
      if (user) {
        login(user);
        navigate(user.type === 'cliente' ? '/client-dashboard' : '/professional-dashboard');
      } else {
        setGeneralError('Credenciais inválidas');
      }
    }
  };

  const message = location.state?.message;

  return (
    <div className="auth-container">
        {message && <div className="alert-banner">{message}</div>}
      <div className="auth-card">
        <div className="auth-header">
          <div className="back-action">
            <Link to="/" className="back-link">← Voltar</Link>
          </div>
          <div className="title-panel">
            <h2>Bem-vindo de volta</h2>
            <p>Entre na sua conta Meu Marido</p>
          </div>
        </div>

        <div className="switch-group">
          <button
            type="button"
            className={userType === 'cliente' ? 'switch active' : 'switch'}
            onClick={() => setUserType('cliente')}
          >
            Cliente
          </button>
          <button
            type="button"
            className={userType === 'profissional' ? 'switch active' : 'switch'}
            onClick={() => setUserType('profissional')}
          >
            Profissional
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              placeholder="seu@email.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Senha</label>
            <input
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          {generalError && <div className="error-text general">{generalError}</div>}

          <button type="submit" className="auth-btn">Entrar</button>
        </form>

        <p className="auth-note">
          Não tem conta? <Link to="/register">Criar conta</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
