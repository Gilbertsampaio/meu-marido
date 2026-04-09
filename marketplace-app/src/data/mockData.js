// Mock data for the service marketplace

export const mockUsers = [
  {
    id: 1,
    name: 'João Silva',
    photo: 'https://api.dicebear.com/9.x/thumbs/svg?seed=João',
    email: 'joao@gmail.com',
    password: '1611@sampaioGGG',
    type: 'cliente'
  },
  {
    id: 2,
    name: 'Maria Santos',
    photo: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Maria',
    email: 'maria@gmail.com',
    password: '1611@sampaioGGG',
    type: 'profissional'
  }
];

export const mockProfessionals = [
  {
    id: 1,
    userId: 2,
    name: 'Maria Santos',
    service: 'Eletricista',
    description: 'Especialista em instalações elétricas residenciais e comerciais.',
    averagePrice: 80,
    photo: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Maria',
    rating: 4.5,
    reviews: 47
  },
  {
    id: 2,
    userId: 3,
    name: 'Carlos Oliveira',
    service: 'Encanador',
    description: 'Reparo e instalação de encanamentos.',
    averagePrice: 70,
    photo: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Carlos',
    rating: 4.2,
    reviews: 31
  },
  {
    id: 3,
    userId: 4,
    name: 'Ana Costa',
    service: 'Diarista',
    description: 'Serviços de limpeza e organização.',
    averagePrice: 50,
    photo: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Ana',
    rating: 4.8,
    reviews: 83
  }
];

// export const mockProfessionals = [];

export const mockServices = [
  {
    id: 1,
    clientId: 1,
    professionalId: 1,
    date: '2024-04-15',
    description: 'Instalação de tomadas na cozinha',
    status: 'pendente'
  }
];

export const mockReviews = [
  {
    id: 1,
    serviceId: 1,
    rating: 5,
    comment: 'Excelente trabalho!'
  }
];
