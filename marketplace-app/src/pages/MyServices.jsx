import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import './MyServices.css';

const MyServices = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');       // filtro por status
  const [serviceFilter, setServiceFilter] = useState('');     // filtro por especialidade
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/services/client/${user.id}`);
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error('Erro ao buscar serviços:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchServices();
  }, [user]);

  const filteredServices = services.filter(service =>
    (statusFilter === '' || service.status === statusFilter) &&
    (serviceFilter === '' || service.service === serviceFilter)
  );

  const formatDate = (dateString) => {
    if (!dateString) return 'Data inválida';
    return dateString.split('T')[0].split('-').reverse().join('/');
  };

  return (
    <div className="dashboard">
      <header className="hero services">
        <div className="hero-copy">
          <span className="eyebrow">Meu Marido</span>
          <h1>Meus Serviços</h1>
          <p>Visualize e filtre seus serviços contratados.</p>
        </div>
      </header>

      <div className="filters">
        <button
          className="primary-btn"
          onClick={() => navigate('/profile')}
        >
          Voltar
        </button>
        {/* Filtro por especialidade */}
        <select
          value={serviceFilter}
          onChange={(e) => setServiceFilter(e.target.value)}
          className="form-control"
        >
          <option value="">Selecione a Especialidade</option>
          <option value="Eletricista">Eletricista</option>
          <option value="Encanador">Encanador</option>
          <option value="Diarista">Diarista</option>
          <option value="Pintor">Pintor</option>
          <option value="Outros">Outros</option>
        </select>

        {/* Filtro por status */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="form-control"
        >
          <option value="">Selecione o Status</option>
          <option value="pendente">Pendente</option>
          <option value="aceito">Aceito</option>
          <option value="concluido">Concluído</option>
          <option value="cancelado">Cancelado</option>
        </select>
      </div>

      {loading ? (
        <div className="loading-screen">Carregando serviços...</div>
      ) : (
        <div className="professionals-list">
          {filteredServices.length === 0 ? (
            <p>Nenhum serviço encontrado.</p>
          ) : (
            filteredServices.map(service => (
              <div key={service.id} className="professional-card">
                <div className="card-top services">
                  <div className="initials">
                    <img className="initials" src={service.professionalPhoto} alt={service.professionalName} />
                  </div>
                  <div>
                    <h3>{service.professionalName}</h3>
                    <span className="service-text">{service.description}</span>
                  </div>
                </div>

                <div className="card-footer">
                  <p><strong>Data:</strong> {formatDate(service.service_date)}</p>
                  <p><strong>Status:</strong> {service.status}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default MyServices;