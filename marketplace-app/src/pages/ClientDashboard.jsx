import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { mockProfessionals } from '../data/mockData';
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
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const filteredProfessionals = mockProfessionals.filter(prof => {
        return (
            (filter.service === '' || prof.service.toLowerCase().includes(filter.service.toLowerCase())) &&
            (filter.price === '' || prof.averagePrice <= parseInt(filter.price)) &&
            (filter.rating === '' || prof.rating >= parseFloat(filter.rating))
        );
    });

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
                    <div key={prof.id} className="professional-card">
                        <div className="card-top">
                            {/* <div className="initials">{getInitials(prof.name)}</div> */}
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
                            <Link to={`/professional/${prof.id}`} className="hire-btn">Contratar</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClientDashboard;
