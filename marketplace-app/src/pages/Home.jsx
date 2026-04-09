import React, { useContext, useMemo, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import { mockProfessionals } from '../data/mockData';
import './Home.css';

const getInitials = (name) => {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
};

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (user) {
      navigate(user.type === 'cliente' ? '/client-dashboard' : '/professional-dashboard');
    }
  }, [user, navigate]);

  const colorOptions = [
    'linear-gradient(135deg, #38bdf8 0%, #7c3aed 100%)',
    'linear-gradient(135deg, #34d399 0%, #0ea5e9 100%)',
    'linear-gradient(135deg, #f97316 0%, #f59e0b 100%)',
    'linear-gradient(135deg, #ec4899 0%, #6366f1 100%)',
    'linear-gradient(135deg, #22c55e 0%, #14b8a6 100%)',
    'linear-gradient(135deg, #38bdf8 0%, #0f172a 100%)',
    'linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)',
  ];

  const cardOptions = [
    'linear-gradient(180deg, rgba(31, 41, 55, 0.94) 0%, rgba(15, 23, 42, 0.92) 100%)',
    'linear-gradient(180deg, rgba(30, 41, 59, 0.92) 0%, rgba(15, 23, 42, 0.9) 100%)',
    'linear-gradient(180deg, rgba(17, 24, 39, 0.92) 0%, rgba(15, 23, 42, 0.9) 100%)',
    'linear-gradient(180deg, rgba(31, 41, 55, 0.92) 0%, rgba(22, 28, 45, 0.94) 100%)',
  ];

  const randomize = (list) => list[Math.floor(Math.random() * list.length)];

  const avatarStyles = useMemo(
    () => mockProfessionals.map(() => ({ background: randomize(colorOptions) })),
    []
  );

  const cardStyles = useMemo(
    () => mockProfessionals.map(() => ({ background: randomize(cardOptions) })),
    []
  );

  const handleHire = (id) => {
    if (!user) {
      navigate('/login?type=cliente', { state: { message: 'Por favor, faça login primeiro' } });
    } else {
      navigate(`/booking/${id}`);
    }
  };

  const renderStars = (rating) => {
    const filledStars = Math.round(rating);
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={index < filledStars ? 'star filled' : 'star'}>
        ★
      </span>
    ));
  };

  return (
    <div className="home">
      <main className="hero">
        <div className="hero-copy">
          <span className="eyebrow">Meu Marido</span>
          <h1>Encontre os melhores profissionais perto de você</h1>
          <p>Contrate eletricistas, diaristas, encanadores e outros especialistas com segurança e rapidez.</p>

          <div className="hero-actions">
            <button className="primary-btn" onClick={() => navigate('/login?type=cliente')}>
              Entrar como Cliente
            </button>
            <button className="secondary-btn" onClick={() => navigate('/login?type=profissional')}>
              Entrar como Profissional
            </button>
          </div>

          <button className="ghost-link" onClick={() => navigate('/register')}>
            Criar conta →
          </button>
        </div>

        {mockProfessionals.length > 0 && isTop && (
          <div
            className="scroll-indicator"
            onClick={() =>
              window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
            }
          >
            ↓
          </div>
        )}
      </main>

      {mockProfessionals.length > 0 && (
        <section className="featured-section">
          <div className="section-header">
            <h2>Profissionais em destaque</h2>
          </div>

          <div className="professional-grid">
            {mockProfessionals.map((prof, index) => (
              <div key={prof.id} className="professional-card" style={cardStyles[index]}>
                <div className="card-top">
                  {/* <div className="initials" style={avatarStyles[index]}>{getInitials(prof.name)}</div> */}
                  <img className="initials" src={prof.photo} alt={prof.name} />
                  <div>
                    <h3>{prof.name}</h3>
                    <span className="service-tag">{prof.service}</span>
                  </div>
                </div>

                <div className="card-rating">
                  <div className="stars">{renderStars(prof.rating)}</div>
                  <small>{prof.rating.toFixed(1)} ({prof.reviews || 32})</small>
                </div>

                <div className="card-footer">
                  <strong>R$ {prof.averagePrice}</strong>
                  <button onClick={() => handleHire(prof.id)} className="hire-btn">
                    Contratar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
