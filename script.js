/**
 * ===================================================================
 * MYTRIP - Gerenciador de Estado e Funcionalidades do Diário de Viagens
 * Armazenamento Local via LocalStorage e Manipulação de Dados
 * ===================================================================
 */

// Chaves de armazenamento LocalStorage
const STORAGE_KEYS = {
  TRIPS: 'mytrip_trips_data_v1',
  MEMORIES: 'mytrip_memories_data_v1',
  PROFILE: 'mytrip_profile_data_v1'
};

// Imagens predefinidas em alta qualidade para viagens e memórias
const PRESET_IMAGES = [
  {
    name: 'Paris',
    url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80',
    thumb: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=250&q=80'
  },
  {
    name: 'Montanhas & Lagos',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80',
    thumb: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=250&q=80'
  },
  {
    name: 'Praia & Costa',
    url: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=900&q=80',
    thumb: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=250&q=80'
  },
  {
    name: 'Templos & Cultura',
    url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80',
    thumb: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=250&q=80'
  },
  {
    name: 'Cidade Moderna',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80',
    thumb: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=250&q=80'
  },
  {
    name: 'Pôr do Sol Mágico',
    url: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=900&q=80',
    thumb: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=250&q=80'
  }
];

// Dados iniciais de demonstração (caso o LocalStorage esteja vazio)
// Presets extras para um álbum de fotografia de viagem (pessoas, retratos e momentos).
const MEMORY_PHOTO_PRESETS = [
  { name: 'Retrato de viagem', url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=85', thumb: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80' },
  { name: 'Amigos na viagem', url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=85', thumb: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=300&q=80' },
  { name: 'Família', url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=900&q=85', thumb: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=300&q=80' },
  { name: 'Pessoa & cidade', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85', thumb: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80' },
  { name: 'Momento espontâneo', url: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=900&q=85', thumb: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=300&q=80' },
  { name: 'Retrato ao ar livre', url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=85', thumb: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80' }
];

const DEFAULT_TRIPS = [
  {
    id: 'trip-1',
    destination: 'Paris',
    country: 'França',
    flag: '🇫🇷',
    startDate: '2026-06-10',
    endDate: '2026-06-20',
    status: 'concluida', // 'concluida' ou 'proxima'
    description: 'Dez dias caminhando pelas margens do Sena, admirando os museus de arte e saboreando os melhores croissants da cidade.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80',
    mapCoords: { lat: 48.8566, lng: 2.3522 }
  },
  {
    id: 'trip-2',
    destination: 'Rio de Janeiro',
    country: 'Brasil',
    flag: '🇧🇷',
    startDate: '2026-03-15',
    endDate: '2026-03-22',
    status: 'concluida',
    description: 'Energia contagiante, pôr do sol inesquecível no Arpoador e uma vista deslumbrante de toda a cidade maravilhosa.',
    image: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=900&q=80',
    mapCoords: { lat: -22.9068, lng: -43.1729 }
  },
  {
    id: 'trip-3',
    destination: 'Banff',
    country: 'Canadá',
    flag: '🇨🇦',
    startDate: '2026-12-10',
    endDate: '2026-12-20',
    status: 'proxima',
    description: 'Roteiro de inverno com lagos cristalinos congelados, montanhas rochosas com neve fofa e cabanas aconchegantes.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80',
    mapCoords: { lat: 51.1784, lng: -115.5708 }
  },
  {
    id: 'trip-4',
    destination: 'Quioto',
    country: 'Japão',
    flag: '🇯🇵',
    startDate: '2025-10-05',
    endDate: '2025-10-15',
    status: 'concluida',
    description: 'Templos milenares, jardins zen tranquilos e as folhas de outono pintando as colinas em tons dourados e vermelhos.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80',
    mapCoords: { lat: 35.0116, lng: 135.7681 }
  }
];

const DEFAULT_MEMORIES = [
  {
    id: 'mem-1',
    tripId: 'trip-1',
    title: 'Pôr do sol na Torre Eiffel',
    date: '2026-06-14',
    tag: 'Pôr do Sol',
    text: 'Assistimos às luzes piscando enquanto fazíamos um piquenique com queijos franceses e vinho leve.',
    image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'mem-2',
    tripId: 'trip-2',
    title: 'Trilha do Morro Dois Irmãos',
    date: '2026-03-18',
    tag: 'Aventura',
    text: 'A subida foi desafiadora, mas a vista panorâmica de Ipanema e da Lagoa compensou cada passo!',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'mem-3',
    tripId: 'trip-1',
    title: 'Café da manhã em Saint-Germain',
    date: '2026-06-12',
    tag: 'Gastronomia',
    text: 'O melhor croissant de amêndoas da vida, acompanhado de um espresso perfeito e observando a rotina parisiense.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'mem-4',
    tripId: 'trip-4',
    title: 'Bosque de Bambu de Arashiyama',
    date: '2025-10-09',
    tag: 'Cultura',
    text: 'O som suave do vento passando pelos troncos gigantescos de bambu transmite uma paz difícil de explicar.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80'
  }
];

const DEFAULT_PROFILE = {
  name: 'Fernanda Ribeiro',
  bio: 'Apaixonada por colecionar momentos, carimbos no passaporte e pores do sol ao redor do mundo.',
  avatarInitial: 'F',
  homeCity: 'São Paulo, Brasil',
  travelStyle: 'Exploradora Cultural & Natureza',
  memberSince: '2024'
};


function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ===================================================================
// AUTENTICAÇÃO LOCAL DO MYTRIP
// ===================================================================
const AUTH_KEYS = { USERS: 'mytrip_auth_users_v1', SESSION: 'mytrip_auth_session_v1' };

function getAuthUsers() {
  try { return JSON.parse(localStorage.getItem(AUTH_KEYS.USERS)) || []; } catch { return []; }
}
function saveAuthUsers(users) { localStorage.setItem(AUTH_KEYS.USERS, JSON.stringify(users)); }
function getAuthSession() {
  try { return JSON.parse(localStorage.getItem(AUTH_KEYS.SESSION)); } catch { return null; }
}
function requireAuth() {
  if (!getAuthSession()) { window.location.href = 'login.html'; return false; }
  return true;
}
function setupAuthPage() {
  const loginForm=document.getElementById('login-form');
  const registerForm=document.getElementById('register-form');
  const loginSection=document.getElementById('login-section');
  const registerSection=document.getElementById('register-section');
  if(!loginForm || !registerForm) return;
  document.getElementById('show-register')?.addEventListener('click',()=>{loginSection.hidden=true;registerSection.hidden=false;});
  document.getElementById('show-login')?.addEventListener('click',()=>{registerSection.hidden=true;loginSection.hidden=false;});
  loginForm.addEventListener('submit',e=>{
    e.preventDefault();
    const email=document.getElementById('login-email').value.trim().toLowerCase();
    const password=document.getElementById('login-password').value;
    const user=getAuthUsers().find(u=>u.email===email&&u.password===password);
    const msg=document.getElementById('login-message');
    if(!user){msg.textContent='E-mail ou senha incorretos.';return;}
    localStorage.setItem(AUTH_KEYS.SESSION,JSON.stringify({id:user.id,name:user.name,email:user.email}));
    window.location.href='index.html';
  });
  registerForm.addEventListener('submit',e=>{
    e.preventDefault();
    const name=document.getElementById('register-name').value.trim();
    const email=document.getElementById('register-email').value.trim().toLowerCase();
    const password=document.getElementById('register-password').value;
    const confirm=document.getElementById('register-confirm').value;
    const msg=document.getElementById('register-message');
    if(password!==confirm){msg.textContent='As senhas não coincidem.';return;}
    const users=getAuthUsers();
    if(users.some(u=>u.email===email)){msg.textContent='Este e-mail já está cadastrado.';return;}
    const user={id:Date.now(),name,email,password}; users.push(user); saveAuthUsers(users);
    localStorage.setItem(AUTH_KEYS.SESSION,JSON.stringify({id:user.id,name:user.name,email:user.email}));
    window.location.href='index.html';
  });
}

function setupAuthLogout() {
  const actions=document.querySelector('.header-actions');
  if(!actions || actions.querySelector('#mytrip-logout')) return;
  const btn=document.createElement('button'); btn.id='mytrip-logout'; btn.className='btn btn-outline btn-sm'; btn.type='button'; btn.textContent='Sair';
  btn.addEventListener('click',()=>{localStorage.removeItem(AUTH_KEYS.SESSION);window.location.href='login.html';});
  actions.appendChild(btn);
}

// ===================================================================
// GERENCIADOR DE DADOS (LOCALSTORAGE)
// ===================================================================

const DataManager = {
  init() {
    if (!localStorage.getItem(STORAGE_KEYS.TRIPS)) {
      localStorage.setItem(STORAGE_KEYS.TRIPS, JSON.stringify(DEFAULT_TRIPS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.MEMORIES)) {
      localStorage.setItem(STORAGE_KEYS.MEMORIES, JSON.stringify(DEFAULT_MEMORIES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.PROFILE)) {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(DEFAULT_PROFILE));
    }
  },

  getTrips() {
    this.init();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.TRIPS)) || [];
    } catch (e) {
      console.error('Erro ao ler viagens:', e);
      return [];
    }
  },

  saveTrips(trips) {
    localStorage.setItem(STORAGE_KEYS.TRIPS, JSON.stringify(trips));
  },

  getTripById(id) {
    const trips = this.getTrips();
    return trips.find(t => t.id === id) || null;
  },

  addTrip(tripData) {
    const trips = this.getTrips();
    const newTrip = {
      id: 'trip-' + Date.now(),
      destination: tripData.destination.trim(),
      country: tripData.country.trim(),
      flag: tripData.flag || getCountryFlag(tripData.country),
      startDate: tripData.startDate,
      endDate: tripData.endDate || tripData.startDate,
      status: tripData.status || 'proxima',
      description: tripData.description.trim(),
      image: tripData.image || PRESET_IMAGES[0].url,
      mapCoords: tripData.mapCoords || estimateCountryCoordinates(tripData.country)
    };
    trips.unshift(newTrip);
    this.saveTrips(trips);
    return newTrip;
  },

  updateTrip(id, updatedFields) {
    const trips = this.getTrips();
    const index = trips.findIndex(t => t.id === id);
    if (index !== -1) {
      trips[index] = { ...trips[index], ...updatedFields };
      this.saveTrips(trips);
      return trips[index];
    }
    return null;
  },

  deleteTrip(id) {
    let trips = this.getTrips();
    trips = trips.filter(t => t.id !== id);
    this.saveTrips(trips);

    // Também remover memórias vinculadas a esta viagem
    let memories = this.getMemories();
    memories = memories.filter(m => m.tripId !== id);
    this.saveMemories(memories);
  },

  getMemories() {
    this.init();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.MEMORIES)) || [];
    } catch (e) {
      console.error('Erro ao ler memórias:', e);
      return [];
    }
  },

  saveMemories(memories) {
    localStorage.setItem(STORAGE_KEYS.MEMORIES, JSON.stringify(memories));
  },

  addMemory(memoryData) {
    const memories = this.getMemories();
    const newMemory = {
      id: 'mem-' + Date.now(),
      tripId: memoryData.tripId,
      title: memoryData.title.trim(),
      date: memoryData.date || new Date().toISOString().split('T')[0],
      tag: memoryData.tag || 'Momento',
      text: memoryData.text.trim(),
      image: memoryData.image || PRESET_IMAGES[1].url
    };
    memories.unshift(newMemory);
    this.saveMemories(memories);
    return newMemory;
  },

  deleteMemory(id) {
    let memories = this.getMemories();
    memories = memories.filter(m => m.id !== id);
    this.saveMemories(memories);
  },

  getProfile() {
    this.init();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.PROFILE)) || DEFAULT_PROFILE;
    } catch (e) {
      return DEFAULT_PROFILE;
    }
  },

  saveProfile(profileData) {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profileData));
  },

  resetAllData() {
    localStorage.setItem(STORAGE_KEYS.TRIPS, JSON.stringify(DEFAULT_TRIPS));
    localStorage.setItem(STORAGE_KEYS.MEMORIES, JSON.stringify(DEFAULT_MEMORIES));
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(DEFAULT_PROFILE));
  },

  calculateStats() {
    const trips = this.getTrips();
    const memories = this.getMemories();

    const tripsCount = trips.length;
    
    // Contagem de países únicos (case insensitive)
    const countriesSet = new Set(trips.map(t => t.country.trim().toLowerCase()));
    const countriesCount = countriesSet.size;

    // Contagem de destinos/cidades únicos
    const citiesSet = new Set(trips.map(t => t.destination.trim().toLowerCase()));
    const citiesCount = citiesSet.size;

    const memoriesCount = memories.length;

    const completedTrips = trips.filter(t => t.status === 'concluida');
    const upcomingTrips = trips.filter(t => t.status === 'proxima');

    // Lista de países únicos com nome formatado
    const countriesList = [];
    const seen = new Set();
    trips.forEach(t => {
      const lower = t.country.trim().toLowerCase();
      if (!seen.has(lower)) {
        seen.add(lower);
        countriesList.push({
          name: t.country.trim(),
          flag: t.flag || '📍'
        });
      }
    });

    return {
      tripsCount,
      countriesCount,
      citiesCount,
      memoriesCount,
      completedCount: completedTrips.length,
      upcomingCount: upcomingTrips.length,
      countriesList
    };
  }
};

// ===================================================================
// UTILITÁRIOS & HELPERS
// ===================================================================

function formatDate(dateStr) {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const year = parts[0];
    const monthIndex = parseInt(parts[1], 10) - 1;
    const day = parts[2];
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    return `${day} ${months[monthIndex]} ${year}`;
  }
  return dateStr;
}

function formatDateRange(startDate, endDate) {
  if (!startDate) return '';
  if (!endDate || startDate === endDate) {
    return formatDate(startDate);
  }
  const sParts = startDate.split('-');
  const eParts = endDate.split('-');
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

  if (sParts[0] === eParts[0] && sParts[1] === eParts[1]) {
    // Mesmo mês e ano
    const m = months[parseInt(sParts[1], 10) - 1];
    return `${sParts[2]} — ${eParts[2]} ${m} ${sParts[0]}`;
  } else if (sParts[0] === eParts[0]) {
    // Mesmo ano, meses diferentes
    const m1 = months[parseInt(sParts[1], 10) - 1];
    const m2 = months[parseInt(eParts[1], 10) - 1];
    return `${sParts[2]} ${m1} — ${eParts[2]} ${m2} ${sParts[0]}`;
  } else {
    return `${formatDate(startDate)} — ${formatDate(endDate)}`;
  }
}

function getCountryFlag(countryName) {
  if (!countryName) return '✈️';
  const c = countryName.toLowerCase();
  if (c.includes('brasil')) return '🇧🇷';
  if (c.includes('frança') || c.includes('franca') || c.includes('france')) return '🇫🇷';
  if (c.includes('canadá') || c.includes('canada')) return '🇨🇦';
  if (c.includes('japão') || c.includes('japao') || c.includes('japan')) return '🇯🇵';
  if (c.includes('estados unidos') || c.includes('eua') || c.includes('usa')) return '🇺🇸';
  if (c.includes('itália') || c.includes('italia') || c.includes('italy')) return '🇮🇹';
  if (c.includes('espanha') || c.includes('spain')) return '🇪🇸';
  if (c.includes('portugal')) return '🇵🇹';
  if (c.includes('alemanha') || c.includes('germany')) return '🇩🇪';
  if (c.includes('reino unido') || c.includes('inglaterra') || c.includes('uk')) return '🇬🇧';
  if (c.includes('argentina')) return '🇦🇷';
  if (c.includes('chile')) return '🇨🇱';
  if (c.includes('grécia') || c.includes('grecia')) return '🇬🇷';
  if (c.includes('tailândia') || c.includes('tailandia')) return '🇹🇭';
  if (c.includes('australia') || c.includes('austrália')) return '🇦🇺';
  if (c.includes('méxico') || c.includes('mexico')) return '🇲🇽';
  return '📍';
}

const KNOWN_CITY_COORDINATES = {
  'são paulo': { lat: -23.5505, lng: -46.6333 },
  'rio de janeiro': { lat: -22.9068, lng: -43.1729 },
  'paris': { lat: 48.8566, lng: 2.3522 },
  'banff': { lat: 51.1784, lng: -115.5708 },
  'quioto': { lat: 35.0116, lng: 135.7681 },
  'kyoto': { lat: 35.0116, lng: 135.7681 },
  'londres': { lat: 51.5074, lng: -0.1278 },
  'roma': { lat: 41.9028, lng: 12.4964 },
  'lisboa': { lat: 38.7223, lng: -9.1393 },
  'nova york': { lat: 40.7128, lng: -74.0060 },
  'new york': { lat: 40.7128, lng: -74.0060 },
  'barcelona': { lat: 41.3874, lng: 2.1686 },
  'madrid': { lat: 40.4168, lng: -3.7038 },
  'buenos aires': { lat: -34.6037, lng: -58.3816 },
  'santiago': { lat: -33.4489, lng: -70.6693 },
  'miami': { lat: 25.7617, lng: -80.1918 },
  'orlando': { lat: 28.5383, lng: -81.3792 },
  'marrakech': { lat: 31.6295, lng: -7.9811 },
  'dubai': { lat: 25.2048, lng: 55.2708 },
  'tóquio': { lat: 35.6762, lng: 139.6503 },
  'toquio': { lat: 35.6762, lng: 139.6503 }
};

const COUNTRY_COORDINATES = {
  'brasil': { lat: -14.2350, lng: -51.9253 },
  'frança': { lat: 46.2276, lng: 2.2137 }, 'franca': { lat: 46.2276, lng: 2.2137 },
  'canadá': { lat: 56.1304, lng: -106.3468 }, 'canada': { lat: 56.1304, lng: -106.3468 },
  'japão': { lat: 36.2048, lng: 138.2529 }, 'japao': { lat: 36.2048, lng: 138.2529 },
  'itália': { lat: 41.8719, lng: 12.5674 }, 'italia': { lat: 41.8719, lng: 12.5674 },
  'espanha': { lat: 40.4637, lng: -3.7492 },
  'portugal': { lat: 39.3999, lng: -8.2245 },
  'alemanha': { lat: 51.1657, lng: 10.4515 },
  'argentina': { lat: -38.4161, lng: -63.6167 },
  'chile': { lat: -35.6751, lng: -71.5430 },
  'grécia': { lat: 39.0742, lng: 21.8243 }, 'grecia': { lat: 39.0742, lng: 21.8243 },
  'méxico': { lat: 23.6345, lng: -102.5528 }, 'mexico': { lat: 23.6345, lng: -102.5528 },
  'reino unido': { lat: 55.3781, lng: -3.4360 },
  'inglaterra': { lat: 52.3555, lng: -1.1743 }
};

function normalizePlace(value='') {
  return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
}

function getKnownLatLng(destination='', country='') {
  const city = normalizePlace(destination);
  const countryKey = normalizePlace(country);
  return KNOWN_CITY_COORDINATES[city] || COUNTRY_COORDINATES[countryKey] || null;
}

function getTripLatLng(trip) {
  if (trip?.mapCoords && Number.isFinite(Number(trip.mapCoords.lat)) && Number.isFinite(Number(trip.mapCoords.lng))) {
    return { lat: Number(trip.mapCoords.lat), lng: Number(trip.mapCoords.lng) };
  }
  const known = getKnownLatLng(trip?.destination, trip?.country);
  if (known) return known;
  return COUNTRY_COORDINATES[normalizePlace(trip?.country)] || { lat: 0, lng: 0 };
}

async function geocodeDestination(destination, country) {
  const known = getKnownLatLng(destination, country);
  if (known) return known;
  try {
    const query = encodeURIComponent(`${destination}, ${country}`);
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${query}`, {
      headers: { 'Accept': 'application/json' }
    });
    if (!response.ok) throw new Error('Geocodificação indisponível');
    const results = await response.json();
    if (results?.[0]) return { lat: Number(results[0].lat), lng: Number(results[0].lon) };
  } catch (error) {
    console.warn('Não foi possível localizar o destino automaticamente.', error);
  }
  return null;
}

function estimateCountryCoordinates(countryName) {
  if (!countryName) return { x: 50, y: 50 };
  const c = countryName.toLowerCase();
  if (c.includes('brasil')) return { x: 33.5, y: 70.0 };
  if (c.includes('frança') || c.includes('franca')) return { x: 49.5, y: 28.0 };
  if (c.includes('canadá') || c.includes('canada')) return { x: 20.0, y: 25.5 };
  if (c.includes('japão') || c.includes('japao')) return { x: 82.5, y: 35.0 };
  if (c.includes('estados unidos') || c.includes('eua')) return { x: 23.0, y: 36.0 };
  if (c.includes('itália') || c.includes('italia')) return { x: 52.0, y: 32.0 };
  if (c.includes('espanha')) return { x: 47.0, y: 33.0 };
  if (c.includes('portugal')) return { x: 45.0, y: 33.0 };
  if (c.includes('alemanha')) return { x: 51.0, y: 26.0 };
  if (c.includes('inglaterra') || c.includes('reino unido')) return { x: 48.0, y: 24.0 };
  if (c.includes('argentina')) return { x: 32.0, y: 80.0 };
  if (c.includes('chile')) return { x: 28.5, y: 78.0 };
  if (c.includes('austrália') || c.includes('australia')) return { x: 84.0, y: 75.0 };
  if (c.includes('méxico') || c.includes('mexico')) return { x: 21.0, y: 44.0 };
  if (c.includes('áfrica do sul') || c.includes('africa do sul')) return { x: 55.0, y: 78.0 };
  if (c.includes('tailândia') || c.includes('tailandia')) return { x: 74.0, y: 48.0 };
  
  // Coordenada pseudo-aleatória consistente baseada no hash do nome
  let hash = 0;
  for (let i = 0; i < countryName.length; i++) {
    hash = countryName.charCodeAt(i) + ((hash << 5) - hash);
  }
  const x = 20 + (Math.abs(hash) % 65);
  const y = 20 + (Math.abs(hash >> 3) % 60);
  return { x, y };
}

// Toaster Notification
function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  const icon = type === 'success' ? '✓' : 'ℹ';
  toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'toastSlideOut 0.3s forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Mobile Menu Toggle
function setupMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      toggleBtn.textContent = mobileMenu.classList.contains('open') ? '✕' : '☰';
    });
  }
}

// Animação de entrada suave no Scroll (Reveal)
function setupScrollObserver() {
  const elements = document.querySelectorAll('.fade-in');
  if (!elements.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
  } else {
    elements.forEach(el => el.classList.add('visible'));
  }
}

// ===================================================================
// CONTROLADOR DA HOME (index.html)
// ===================================================================

function initHomePage() {
  const stats = DataManager.calculateStats();
  const trips = DataManager.getTrips();
  const memories = DataManager.getMemories();

  // Atualizar contadores
  const statTripsEl = document.getElementById('stat-trips');
  const statCountriesEl = document.getElementById('stat-countries');
  const statCitiesEl = document.getElementById('stat-cities');
  const statMemoriesEl = document.getElementById('stat-memories');

  if (statTripsEl) statTripsEl.textContent = stats.tripsCount;
  if (statCountriesEl) statCountriesEl.textContent = stats.countriesCount;
  if (statCitiesEl) statCitiesEl.textContent = stats.citiesCount;
  if (statMemoriesEl) statMemoriesEl.textContent = stats.memoriesCount;

  // Atualizar Destaque do Próximo Destino no Hero
  const nextTrip = trips.find(t => t.status === 'proxima') || trips[0];
  const heroArtCard = document.getElementById('hero-art-card');
  if (heroArtCard && nextTrip) {
    const memCount = memories.filter(m => m.tripId === nextTrip.id).length;
    heroArtCard.innerHTML = `
      <img class="hero-art-img" src="${nextTrip.image}" alt="${nextTrip.destination}">
      <div class="hero-art-overlay"></div>
      <div class="hero-art-content">
        <div class="hero-badge-float">
          <span>${nextTrip.status === 'proxima' ? '✈️ PRÓXIMA VIAGEM' : '★ DESTAQUE'}</span>
        </div>
        <h3 class="hero-art-title">${nextTrip.destination}, ${nextTrip.country} ${nextTrip.flag || ''}</h3>
        <p class="hero-art-subtitle">📅 ${formatDateRange(nextTrip.startDate, nextTrip.endDate)} • 📸 ${memCount} memórias</p>
      </div>
    `;
  }

  // Renderizar Viagens Recentes (máximo 3)
  const recentGrid = document.getElementById('recent-trips-grid');
  if (recentGrid) {
    const recent = trips.slice(0, 3);
    if (recent.length === 0) {
      recentGrid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-icon">🎒</div>
          <h3>Nenhuma viagem cadastrada ainda</h3>
          <p>Comece a planejar ou registrar suas aventuras agora mesmo.</p>
          <a href="nova-viagem.html" class="btn btn-primary">+ Criar primeira viagem</a>
        </div>
      `;
    } else {
      recentGrid.innerHTML = recent.map(trip => renderTripCardHTML(trip, memories)).join('');
    }
  }

  // Renderizar Últimas Memórias (máximo 4)
  const recentMemoriesGrid = document.getElementById('recent-memories-grid');
  if (recentMemoriesGrid) {
    const latestMem = memories.slice(0, 4);
    if (latestMem.length === 0) {
      recentMemoriesGrid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-icon">📸</div>
          <h3>Nenhuma memória registrada ainda</h3>
          <p>Adicione momentos inesquecíveis das suas viagens.</p>
          <a href="memorias.html" class="btn btn-secondary">Ir para memórias</a>
        </div>
      `;
    } else {
      recentMemoriesGrid.innerHTML = latestMem.map(mem => renderMemoryCardHTML(mem, trips)).join('');
    }
  }

  // Atualizar Callout do Mapa
  const mapBadgesEl = document.getElementById('home-map-badges');
  if (mapBadgesEl && stats.countriesList.length > 0) {
    mapBadgesEl.innerHTML = stats.countriesList.slice(0, 6).map(c => `
      <span class="tag-pill" style="background: rgba(255,255,255,0.15); color: #FFF; border: none;">
        ${c.flag} ${c.name}
      </span>
    `).join('');
  }
}

// ===================================================================
// CONTROLADOR DA PÁGINA VIAGENS (viagens.html)
// ===================================================================

let currentTripFilter = 'todas';
let currentTripSearch = '';

function initViagensPage() {
  renderTripsList();

  // Configuração dos botões de filtro
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentTripFilter = btn.dataset.filter || 'todas';
      renderTripsList();
    });
  });

  // Configuração da barra de busca
  const searchInput = document.getElementById('trips-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentTripSearch = e.target.value.toLowerCase().trim();
      renderTripsList();
    });
  }

  // Configuração do Modal de Edição
  setupTripEditModal();
}

function renderTripsList() {
  const container = document.getElementById('trips-container');
  if (!container) return;

  const trips = DataManager.getTrips();
  const memories = DataManager.getMemories();

  // Aplicar filtros de status e busca
  let filtered = trips.filter(trip => {
    const matchesFilter = 
      currentTripFilter === 'todas' ||
      (currentTripFilter === 'proximas' && trip.status === 'proxima') ||
      (currentTripFilter === 'concluidas' && trip.status === 'concluida');

    const matchesSearch = 
      !currentTripSearch ||
      trip.destination.toLowerCase().includes(currentTripSearch) ||
      trip.country.toLowerCase().includes(currentTripSearch) ||
      trip.description.toLowerCase().includes(currentTripSearch);

    return matchesFilter && matchesSearch;
  });

  // Atualizar contador do cabeçalho se existir
  const countBadge = document.getElementById('trips-count-badge');
  if (countBadge) {
    countBadge.textContent = `${filtered.length} ${filtered.length === 1 ? 'viagem' : 'viagens'}`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <div class="empty-icon">🌍</div>
        <h3>Nenhuma viagem encontrada</h3>
        <p>Não encontramos viagens correspondentes a este filtro ou termo de busca.</p>
        <a href="nova-viagem.html" class="btn btn-primary">+ Criar nova viagem</a>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(trip => renderTripCardHTML(trip, memories, true)).join('');

  // Atrelar eventos dos botões dos cards
  container.querySelectorAll('.btn-delete-trip').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      const trip = DataManager.getTripById(id);
      if (confirm(`Tem certeza que deseja excluir a viagem para ${trip ? trip.destination : 'este destino'}? Todas as memórias vinculadas também serão excluídas.`)) {
        DataManager.deleteTrip(id);
        showToast('Viagem excluída com sucesso.', 'success');
        renderTripsList();
      }
    });
  });

  container.querySelectorAll('.btn-edit-trip').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      openTripEditModal(id);
    });
  });
}

function renderTripCardHTML(trip, memories = [], showControls = false) {
  const tripMemories = memories.filter(m => m.tripId === trip.id);
  const isCompleted = trip.status === 'concluida';
  const statusBadge = isCompleted
    ? `<span class="badge badge-concluida">✓ Concluída</span>`
    : `<span class="badge badge-proxima">✈️ Próxima</span>`;

  return `
    <article class="trip-card fade-in visible" data-id="${trip.id}">
      <div class="trip-card-image">
        <img src="${trip.image}" alt="${trip.destination}" loading="lazy" onerror="this.src='${PRESET_IMAGES[0].url}'">
        <div class="trip-card-image-overlay"></div>
        <div class="trip-card-badges">
          <span class="trip-card-country-tag">${trip.flag || '📍'} ${trip.country}</span>
          ${statusBadge}
        </div>
      </div>
      <div class="trip-card-body">
        <h3 class="trip-card-title">${trip.destination}</h3>
        <div class="trip-card-date">
          <span>📅</span>
          <span>${formatDateRange(trip.startDate, trip.endDate)}</span>
        </div>
        <p class="trip-card-desc">${trip.description || 'Sem descrição cadastrada.'}</p>
        
        <div class="trip-card-footer">
          <span class="trip-card-memories-count">
            📸 ${tripMemories.length} ${tripMemories.length === 1 ? 'memória' : 'memórias'}
          </span>
          
          <div class="trip-card-actions">
            ${showControls ? `
              <button class="btn btn-outline btn-sm btn-edit-trip" data-id="${trip.id}" title="Editar viagem">
                ✏️ Editar
              </button>
              <button class="btn btn-danger-outline btn-sm btn-delete-trip" data-id="${trip.id}" title="Excluir viagem">
                🗑️
              </button>
            ` : `
              <a href="viagens.html" class="btn btn-outline btn-sm">Ver viagem →</a>
            `}
          </div>
        </div>
      </div>
    </article>
  `;
}

// Modal de Edição de Viagem
function setupTripEditModal() {
  const backdrop = document.getElementById('edit-trip-modal');
  const closeBtn = document.getElementById('close-edit-modal-btn');
  const form = document.getElementById('edit-trip-form');

  if (closeBtn && backdrop) {
    closeBtn.addEventListener('click', () => {
      backdrop.classList.remove('active');
    });
  }

  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) backdrop.classList.remove('active');
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('edit-trip-id').value;
      const updated = {
        destination: document.getElementById('edit-destination').value.trim(),
        country: document.getElementById('edit-country').value.trim(),
        flag: getCountryFlag(document.getElementById('edit-country').value.trim()),
        startDate: document.getElementById('edit-start-date').value,
        endDate: document.getElementById('edit-end-date').value,
        status: document.getElementById('edit-status').value,
        description: document.getElementById('edit-description').value.trim(),
        image: document.getElementById('edit-image').value.trim()
      };

      DataManager.updateTrip(id, updated);
      backdrop.classList.remove('active');
      showToast('Viagem atualizada com sucesso!', 'success');
      renderTripsList();
    });
  }
}

function openTripEditModal(tripId) {
  const trip = DataManager.getTripById(tripId);
  if (!trip) return;

  const backdrop = document.getElementById('edit-trip-modal');
  if (!backdrop) return;

  document.getElementById('edit-trip-id').value = trip.id;
  document.getElementById('edit-destination').value = trip.destination;
  document.getElementById('edit-country').value = trip.country;
  document.getElementById('edit-start-date').value = trip.startDate || '';
  document.getElementById('edit-end-date').value = trip.endDate || '';
  document.getElementById('edit-status').value = trip.status || 'proxima';
  document.getElementById('edit-description').value = trip.description || '';
  document.getElementById('edit-image').value = trip.image || '';

  backdrop.classList.add('active');
}

// ===================================================================
// CONTROLADOR DA PÁGINA NOVA VIAGEM (nova-viagem.html)
// ===================================================================

function initNovaViagemPage() {
  const form = document.getElementById('new-trip-form');
  const presetsContainer = document.getElementById('cover-presets-container');
  const imageInput = document.getElementById('trip-image-input');
  const imagePreview = document.getElementById('cover-preview-img');
  const imageFile = document.getElementById('trip-image-file');
  const randomImageBtn = document.getElementById('trip-random-image');
  const cameraOpen = document.getElementById('trip-camera-open');
  const cameraModal = document.getElementById('trip-camera-modal');
  const cameraVideo = document.getElementById('trip-camera-video');
  const cameraCanvas = document.getElementById('trip-camera-canvas');
  const cameraCapture = document.getElementById('trip-camera-capture');
  const cameraClose = document.getElementById('trip-camera-close');
  const cameraCancel = document.getElementById('trip-camera-cancel');
  let cameraStream = null;

  const setTripImage = (src) => {
    if (imageInput) imageInput.value = src.startsWith('data:') ? '' : src;
    if (imagePreview) imagePreview.src = src;
    if (presetsContainer) presetsContainer.querySelectorAll('.preset-item').forEach(i=>i.classList.toggle('selected', i.dataset.url===src));
  };

  imageFile?.addEventListener('change', e => {
    const file=e.target.files?.[0]; if(!file) return;
    const reader=new FileReader(); reader.onload=()=>setTripImage(reader.result); reader.readAsDataURL(file);
  });
  randomImageBtn?.addEventListener('click',()=>{
    const preset=PRESET_IMAGES[Math.floor(Math.random()*PRESET_IMAGES.length)]; setTripImage(preset.url);
  });
  const closeCamera=()=>{ if(cameraStream){cameraStream.getTracks().forEach(t=>t.stop());cameraStream=null;} cameraVideo && (cameraVideo.srcObject=null); cameraModal?.classList.remove('active'); };
  cameraOpen?.addEventListener('click',async()=>{
    if(!navigator.mediaDevices?.getUserMedia){ showToast('A câmera não está disponível neste navegador.', 'error'); return; }
    cameraModal?.classList.add('active');
    try { cameraStream=await navigator.mediaDevices.getUserMedia({video:true}); cameraVideo.srcObject=cameraStream; }
    catch { showToast('Não foi possível acessar a câmera. Verifique a permissão do navegador.', 'error'); closeCamera(); }
  });
  cameraCapture?.addEventListener('click',()=>{
    if(!cameraVideo?.videoWidth) return;
    cameraCanvas.width=cameraVideo.videoWidth; cameraCanvas.height=cameraVideo.videoHeight;
    cameraCanvas.getContext('2d').drawImage(cameraVideo,0,0); setTripImage(cameraCanvas.toDataURL('image/jpeg',0.88)); closeCamera();
  });
  cameraClose?.addEventListener('click',closeCamera); cameraCancel?.addEventListener('click',closeCamera);

  // Renderizar presets de fotos
  if (presetsContainer) {
    presetsContainer.innerHTML = PRESET_IMAGES.map((preset, index) => `
      <div class="preset-item ${index === 0 ? 'selected' : ''}" data-url="${preset.url}">
        <img src="${preset.thumb}" alt="${preset.name}" title="${preset.name}">
      </div>
    `).join('');

    // Definir o primeiro preset por padrão
    if (imageInput && !imageInput.value) {
      imageInput.value = PRESET_IMAGES[0].url;
      if (imagePreview) imagePreview.src = PRESET_IMAGES[0].url;
    }

    presetsContainer.querySelectorAll('.preset-item').forEach(item => {
      item.addEventListener('click', () => {
        presetsContainer.querySelectorAll('.preset-item').forEach(i => i.classList.remove('selected'));
        item.classList.add('selected');
        const url = item.dataset.url;
        if (imageInput) imageInput.value = url;
        if (imagePreview) imagePreview.src = url;
      });
    });
  }

  // Atualização em tempo real quando o usuário digita uma URL personalizada
  if (imageInput) {
    imageInput.addEventListener('input', (e) => {
      const url = e.target.value.trim();
      if (url && imagePreview) {
        imagePreview.src = url;
      }
      // Desmarcar seletores de preset se for uma url diferente
      if (presetsContainer) {
        presetsContainer.querySelectorAll('.preset-item').forEach(i => {
          if (i.dataset.url === url) {
            i.classList.add('selected');
          } else {
            i.classList.remove('selected');
          }
        });
      }
    });
  }

  // Submissão do Formulário
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const destination = document.getElementById('trip-destination').value.trim();
      const country = document.getElementById('trip-country').value.trim();
      const startDate = document.getElementById('trip-start-date').value;
      const endDate = document.getElementById('trip-end-date').value || startDate;
      const status = document.getElementById('trip-status').value;
      const description = document.getElementById('trip-description').value.trim();
      const image = (imageInput && imageInput.value.trim()) || (imagePreview ? imagePreview.src : PRESET_IMAGES[0].url);

      if (!destination || !country || !startDate) {
        showToast('Por favor preencha todos os campos obrigatórios.', 'error');
        return;
      }

      const mapCoords = await geocodeDestination(destination, country);

      DataManager.addTrip({
        destination,
        country,
        startDate,
        endDate,
        status,
        description,
        image,
        mapCoords
      });

      showToast('Viagem criada com sucesso! Redirecionando...', 'success');
      setTimeout(() => {
        window.location.href = 'viagens.html';
      }, 700);
    });
  }
}

// ===================================================================
// CONTROLADOR DA PÁGINA MAPA (mapa.html)
// ===================================================================

function initMapaPage() {
  const mapElement = document.getElementById('real-map');
  const destinationsList = document.getElementById('map-destinations-list');
  if (!mapElement || typeof L === 'undefined') return;

  const trips = DataManager.getTrips();
  const memories = DataManager.getMemories();
  const map = L.map(mapElement, { zoomControl: true, worldCopyJump: true, minZoom: 2 }).setView([12, -20], 2);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  const visitedIcon = L.divIcon({ className: 'mytrip-map-marker visited', html: '<span>✈</span>', iconSize: [42, 42], iconAnchor: [21, 21] });
  const plannedIcon = L.divIcon({ className: 'mytrip-map-marker planned', html: '<span>♡</span>', iconSize: [42, 42], iconAnchor: [21, 21] });
  const bounds = [];

  trips.forEach(trip => {
    const position = getTripLatLng(trip);
    if (!Number.isFinite(position.lat) || !Number.isFinite(position.lng)) return;
    const isPlanned = trip.status === 'proxima';
    const memCount = memories.filter(m => m.tripId === trip.id).length;
    const marker = L.marker([position.lat, position.lng], { icon: isPlanned ? plannedIcon : visitedIcon }).addTo(map);
    marker.bindPopup(`
      <div class="mytrip-map-popup">
        <strong>${trip.flag || '📍'} ${escapeHtml(trip.destination)}</strong>
        <span>${escapeHtml(trip.country)}</span>
        <small>${isPlanned ? '♡ Quero conhecer' : '✓ Já visitei'} · ${memCount} ${memCount === 1 ? 'foto/memória' : 'fotos/memórias'}</small>
        <a href="viagens.html">Ver viagem →</a>
      </div>
    `);
    bounds.push([position.lat, position.lng]);

    // Salva coordenadas reais quando o destino é conhecido, migrando o mapa antigo.
    if (!trip.mapCoords || !Number.isFinite(Number(trip.mapCoords.lat))) {
      DataManager.updateTrip(trip.id, { mapCoords: position });
    }
  });

  if (bounds.length === 1) map.setView(bounds[0], 5);
  else if (bounds.length > 1) map.fitBounds(bounds, { padding: [40, 40], maxZoom: 5 });

  if (destinationsList) {
    if (!trips.length) {
      destinationsList.innerHTML = `<div class="empty-state" style="padding:24px 10px;"><p>Nenhum destino cadastrado ainda.</p></div>`;
    } else {
      destinationsList.innerHTML = trips.map(trip => {
        const isNext = trip.status === 'proxima';
        const memCount = memories.filter(m => m.tripId === trip.id).length;
        return `
          <button type="button" class="map-dest-item" data-id="${trip.id}">
            <div class="map-dest-info">
              <h4>${trip.flag || '📍'} ${escapeHtml(trip.destination)}, ${escapeHtml(trip.country)}</h4>
              <p>${formatDateRange(trip.startDate, trip.endDate)} · ${memCount} ${memCount === 1 ? 'memória' : 'memórias'}</p>
            </div>
            <span class="badge ${isNext ? 'badge-proxima' : 'badge-concluida'}">${isNext ? 'Quero ir' : 'Já fui'}</span>
          </button>`;
      }).join('');

      destinationsList.querySelectorAll('.map-dest-item').forEach(item => {
        item.addEventListener('click', () => {
          const trip = trips.find(t => t.id === item.dataset.id);
          if (!trip) return;
          const position = getTripLatLng(trip);
          map.flyTo([position.lat, position.lng], 7, { duration: 0.8 });
        });
      });
    }
  }

  setTimeout(() => map.invalidateSize(), 150);
}

// ===================================================================
// CONTROLADOR DA PÁGINA MEMÓRIAS (memorias.html)
// ===================================================================

let currentMemoryTripFilter = 'todas';

function initMemoriasPage() {
  const trips = DataManager.getTrips();
  const filterSelect = document.getElementById('memory-trip-filter');

  // Preencher seletor de filtro por viagem
  if (filterSelect) {
    filterSelect.innerHTML = `
      <option value="todas">Todas as viagens</option>
      ${trips.map(t => `<option value="${t.id}">${t.destination} (${t.country})</option>`).join('')}
    `;

    filterSelect.addEventListener('change', (e) => {
      currentMemoryTripFilter = e.target.value;
      renderMemoriesList();
    });
  }

  renderMemoriesList();
  setupNewMemoryModal();
}

function renderMemoriesList() {
  const container = document.getElementById('memories-container');
  if (!container) return;

  const memories = DataManager.getMemories();
  const trips = DataManager.getTrips();

  const filtered = memories.filter(m => {
    return currentMemoryTripFilter === 'todas' || m.tripId === currentMemoryTripFilter;
  });

  const countEl = document.getElementById('memories-count-badge');
  if (countEl) {
    countEl.textContent = `${filtered.length} ${filtered.length === 1 ? 'memória' : 'memórias'}`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <div class="empty-icon">📷</div>
        <h3>Nenhuma memória encontrada</h3>
        <p>Grave suas lembranças, fotos especiais e momentos únicos das suas viagens.</p>
        <button class="btn btn-primary" onclick="openNewMemoryModal()">+ Adicionar memória</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(mem => renderMemoryCardHTML(mem, trips, true)).join('');

  // Atrelar exclusão de memórias
  container.querySelectorAll('.btn-delete-memory').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      if (confirm('Deseja excluir esta foto da sua viagem?')) {
        DataManager.deleteMemory(id);
        showToast('Foto removida do álbum.', 'success');
        renderMemoriesList();
      }
    });
  });

  container.querySelectorAll('.memory-photo-button').forEach(button => {
    button.addEventListener('click', () => openMemoryLightbox(button.dataset.image, button.dataset.title));
  });
}

function openMemoryLightbox(image, title) {
  let lightbox = document.getElementById('memory-lightbox');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.id = 'memory-lightbox';
    lightbox.className = 'memory-lightbox';
    lightbox.innerHTML = `<button type="button" class="memory-lightbox-close" aria-label="Fechar">&times;</button><img class="memory-lightbox-image" alt=""><p class="memory-lightbox-title"></p>`;
    document.body.appendChild(lightbox);
    lightbox.addEventListener('click', e => { if (e.target === lightbox || e.target.closest('.memory-lightbox-close')) lightbox.classList.remove('active'); });
  }
  lightbox.querySelector('.memory-lightbox-image').src = image;
  lightbox.querySelector('.memory-lightbox-image').alt = title;
  lightbox.querySelector('.memory-lightbox-title').textContent = title;
  lightbox.classList.add('active');
}

function renderMemoryCardHTML(memory, trips = [], showControls = false) {
  const trip = trips.find(t => t.id === memory.tripId);
  const tripLabel = trip ? `${trip.destination}, ${trip.country} ${trip.flag || ''}` : 'Viagem';
  return `
    <article class="memory-card photography-card fade-in visible" data-id="${memory.id}">
      <button type="button" class="memory-photo-button" data-image="${memory.image}" data-title="${memory.title}" aria-label="Abrir foto ${escapeHtml(memory.title)}">
        <img class="memory-photo" src="${memory.image}" alt="${escapeHtml(memory.title)}" loading="lazy" onerror="this.src='${PRESET_IMAGES[1].url}'">
        <span class="memory-photo-shade"></span>
        ${memory.tag ? `<span class="memory-tag">${escapeHtml(memory.tag)}</span>` : ''}
        <span class="memory-photo-open">⌕</span>
      </button>
      <div class="memory-card-body">
        <span class="memory-trip-ref">📍 ${escapeHtml(tripLabel)}</span>
        <h4 class="memory-title">${escapeHtml(memory.title)}</h4>
        <span class="memory-date">📅 ${formatDate(memory.date)}</span>
        <p class="memory-text">${escapeHtml(memory.text)}</p>
        ${showControls ? `<div class="memory-card-footer"><button class="btn btn-danger-outline btn-sm btn-delete-memory" data-id="${memory.id}" title="Excluir foto">🗑️ Excluir</button></div>` : ''}
      </div>
    </article>`;
}

// Modal de Criação de Memória
let memoryCameraStream = null;

function setupNewMemoryModal() {
  const backdrop = document.getElementById('new-memory-modal');
  const openBtn = document.getElementById('btn-open-memory-modal');
  const closeBtn = document.getElementById('close-memory-modal-btn');
  const form = document.getElementById('new-memory-form');
  const tripSelect = document.getElementById('memory-trip-select');
  const presetsContainer = document.getElementById('memory-presets-container');
  const imageInput = document.getElementById('memory-image-input');
  const imageFile = document.getElementById('memory-image-file');
  const imagePreview = document.getElementById('memory-preview-img');
  const cameraOpen = document.getElementById('memory-camera-open');
  const cameraModal = document.getElementById('memory-camera-modal');
  const cameraVideo = document.getElementById('memory-camera-video');
  const cameraCanvas = document.getElementById('memory-camera-canvas');
  const cameraCapture = document.getElementById('memory-camera-capture');
  const cameraClose = document.getElementById('memory-camera-close');
  const cameraCancel = document.getElementById('memory-camera-cancel');
  const cameraMessage = document.getElementById('memory-camera-message');

  openBtn?.addEventListener('click', openNewMemoryModal);
  closeBtn?.addEventListener('click', () => { backdrop?.classList.remove('active'); stopMemoryCamera(); });
  backdrop?.addEventListener('click', e => { if (e.target === backdrop) { backdrop.classList.remove('active'); stopMemoryCamera(); } });

  const allPresets = [...PRESET_IMAGES, ...MEMORY_PHOTO_PRESETS];
  if (presetsContainer) {
    presetsContainer.innerHTML = allPresets.map((preset, i) => `
      <button type="button" class="preset-item ${i === 0 ? 'selected' : ''}" data-url="${preset.url}" title="${preset.name}">
        <img src="${preset.thumb}" alt="${preset.name}">
      </button>`).join('');
    presetsContainer.querySelectorAll('.preset-item').forEach(item => {
      item.addEventListener('click', () => {
        presetsContainer.querySelectorAll('.preset-item').forEach(i => i.classList.remove('selected'));
        item.classList.add('selected');
        if (imageInput) imageInput.value = item.dataset.url;
        if (imagePreview) imagePreview.src = item.dataset.url;
      });
    });
  }

  imageFile?.addEventListener('change', e => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (imageInput) imageInput.value = reader.result;
      if (imagePreview) imagePreview.src = reader.result;
      presetsContainer?.querySelectorAll('.preset-item').forEach(i => i.classList.remove('selected'));
    };
    reader.readAsDataURL(file);
  });

  cameraOpen?.addEventListener('click', async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      if (cameraMessage) cameraMessage.textContent = 'A câmera não está disponível neste navegador.';
      return;
    }
    cameraModal?.classList.add('active');
    try {
      memoryCameraStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false });
      if (cameraVideo) cameraVideo.srcObject = memoryCameraStream;
    } catch (error) {
      if (cameraMessage) cameraMessage.textContent = 'Não foi possível acessar a câmera. Verifique a permissão do navegador.';
    }
  });

  const closeCamera = () => { cameraModal?.classList.remove('active'); stopMemoryCamera(); };
  cameraClose?.addEventListener('click', closeCamera);
  cameraCancel?.addEventListener('click', closeCamera);
  cameraCapture?.addEventListener('click', () => {
    if (!cameraVideo || !cameraCanvas) return;
    cameraCanvas.width = cameraVideo.videoWidth || 1280;
    cameraCanvas.height = cameraVideo.videoHeight || 720;
    cameraCanvas.getContext('2d').drawImage(cameraVideo, 0, 0, cameraCanvas.width, cameraCanvas.height);
    const dataUrl = cameraCanvas.toDataURL('image/jpeg', 0.9);
    if (imageInput) imageInput.value = dataUrl;
    if (imagePreview) imagePreview.src = dataUrl;
    presetsContainer?.querySelectorAll('.preset-item').forEach(i => i.classList.remove('selected'));
    closeCamera();
  });

  form?.addEventListener('submit', e => {
    e.preventDefault();
    const tripId = tripSelect.value;
    const title = document.getElementById('memory-title').value.trim();
    const date = document.getElementById('memory-date').value;
    const tag = document.getElementById('memory-tag').value;
    const text = document.getElementById('memory-text').value.trim();
    const image = imageInput?.value.trim() || PRESET_IMAGES[0].url;

    if (!tripId || !title || !text) {
      showToast('Preencha os campos obrigatórios para guardar a foto.', 'error');
      return;
    }
    DataManager.addMemory({ tripId, title, date, tag, text, image });
    backdrop?.classList.remove('active');
    stopMemoryCamera();
    form.reset();
    if (imagePreview) imagePreview.src = PRESET_IMAGES[0].url;
    showToast('Foto adicionada ao seu álbum de viagem!', 'success');
    renderMemoriesList();
  });
}

function stopMemoryCamera() {
  if (memoryCameraStream) {
    memoryCameraStream.getTracks().forEach(track => track.stop());
    memoryCameraStream = null;
  }
  const video = document.getElementById('memory-camera-video');
  if (video) video.srcObject = null;
}

function openNewMemoryModal() {
  const backdrop = document.getElementById('new-memory-modal');
  const tripSelect = document.getElementById('memory-trip-select');
  const trips = DataManager.getTrips();

  if (!backdrop || !tripSelect) return;

  if (trips.length === 0) {
    alert('Você precisa ter pelo menos uma viagem cadastrada antes de adicionar memórias.');
    window.location.href = 'nova-viagem.html';
    return;
  }

  tripSelect.innerHTML = trips.map(t => `
    <option value="${t.id}">${t.destination}, ${t.country} (${formatDate(t.startDate)})</option>
  `).join('');

  const dateInput = document.getElementById('memory-date');
  if (dateInput && !dateInput.value) {
    dateInput.value = new Date().toISOString().split('T')[0];
  }

  backdrop.classList.add('active');
}

// ===================================================================
// CONTROLADOR DA PÁGINA PERFIL (perfil.html)
// ===================================================================

function initPerfilPage() {
  renderProfileData();
  setupProfileEditModal();
  setupDataManagementActions();
}

function renderProfileData() {
  const profile = DataManager.getProfile();
  const stats = DataManager.calculateStats();

  // Informações do viajante
  const nameEl = document.getElementById('profile-name');
  const bioEl = document.getElementById('profile-bio');
  const avatarEl = document.getElementById('profile-avatar');
  const styleEl = document.getElementById('profile-travel-style');
  const cityEl = document.getElementById('profile-home-city');

  if (nameEl) nameEl.textContent = profile.name;
  if (bioEl) bioEl.textContent = profile.bio;
  if (avatarEl) avatarEl.textContent = profile.avatarInitial || profile.name.charAt(0).toUpperCase();
  if (styleEl) styleEl.textContent = profile.travelStyle || 'Explorador';
  if (cityEl) cityEl.textContent = profile.homeCity || 'Mundo';

  // Estatísticas no perfil
  const statTrips = document.getElementById('prof-stat-trips');
  const statCountries = document.getElementById('prof-stat-countries');
  const statCities = document.getElementById('prof-stat-cities');
  const statMemories = document.getElementById('prof-stat-memories');
  const statUpcoming = document.getElementById('prof-stat-upcoming');
  const statCompleted = document.getElementById('prof-stat-completed');

  if (statTrips) statTrips.textContent = stats.tripsCount;
  if (statCountries) statCountries.textContent = stats.countriesCount;
  if (statCities) statCities.textContent = stats.citiesCount;
  if (statMemories) statMemories.textContent = stats.memoriesCount;
  if (statUpcoming) statUpcoming.textContent = stats.upcomingCount;
  if (statCompleted) statCompleted.textContent = stats.completedCount;

  // Coleção de países visitados (chips)
  const countriesWrapper = document.getElementById('profile-countries-list');
  if (countriesWrapper) {
    if (stats.countriesList.length === 0) {
      countriesWrapper.innerHTML = `<p style="color: var(--text-muted);">Nenhum país registrado ainda.</p>`;
    } else {
      countriesWrapper.innerHTML = stats.countriesList.map(c => `
        <span class="country-chip">
          <span>${c.flag}</span>
          <span>${c.name}</span>
        </span>
      `).join('');
    }
  }
}

function setupProfileEditModal() {
  const backdrop = document.getElementById('edit-profile-modal');
  const openBtn = document.getElementById('btn-open-edit-profile');
  const closeBtn = document.getElementById('close-profile-modal-btn');
  const form = document.getElementById('edit-profile-form');

  if (openBtn && backdrop) {
    openBtn.addEventListener('click', () => {
      const profile = DataManager.getProfile();
      document.getElementById('profile-input-name').value = profile.name;
      document.getElementById('profile-input-bio').value = profile.bio;
      document.getElementById('profile-input-city').value = profile.homeCity || '';
      document.getElementById('profile-input-style').value = profile.travelStyle || '';
      backdrop.classList.add('active');
    });
  }

  if (closeBtn && backdrop) {
    closeBtn.addEventListener('click', () => backdrop.classList.remove('active'));
  }

  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) backdrop.classList.remove('active');
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('profile-input-name').value.trim();
      const bio = document.getElementById('profile-input-bio').value.trim();
      const homeCity = document.getElementById('profile-input-city').value.trim();
      const travelStyle = document.getElementById('profile-input-style').value.trim();

      const profile = {
        name: name || 'Viajante',
        bio: bio,
        avatarInitial: (name || 'V').charAt(0).toUpperCase(),
        homeCity,
        travelStyle,
        memberSince: '2024'
      };

      DataManager.saveProfile(profile);
      backdrop.classList.remove('active');
      showToast('Perfil atualizado com sucesso!', 'success');
      renderProfileData();
    });
  }
}

function setupDataManagementActions() {
  const resetBtn = document.getElementById('btn-reset-demo-data');
  const exportBtn = document.getElementById('btn-export-data');

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Deseja restaurar os dados de demonstração originais? Suas viagens atuais serão substituídas.')) {
        DataManager.resetAllData();
        showToast('Dados de demonstração restaurados.', 'success');
        setTimeout(() => location.reload(), 600);
      }
    });
  }

  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const exportObject = {
        trips: DataManager.getTrips(),
        memories: DataManager.getMemories(),
        profile: DataManager.getProfile(),
        exportedAt: new Date().toISOString()
      };
      const jsonStr = JSON.stringify(exportObject, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `mytrip-backup-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('Arquivo de backup gerado com sucesso!', 'success');
    });
  }
}

// ===================================================================
// INICIALIZADOR GLOBAL POR PÁGINA
// ===================================================================

document.addEventListener('DOMContentLoaded', () => {
  if (document.body.dataset.page === 'login') { setupAuthPage(); return; }
  if (!requireAuth()) return;

  // Inicializar banco de dados LocalStorage se necessário
  DataManager.init();

  // Configurar menu mobile e observadores visuais
  setupMobileMenu();
  setupScrollObserver();
  setupAuthLogout();

  // Identificar página atual
  const path = window.location.pathname.toLowerCase();
  const pageType = document.body.dataset.page;

  if (pageType === 'home' || path.endsWith('index.html') || path.endsWith('/') || path === '') {
    initHomePage();
  } else if (pageType === 'viagens' || path.endsWith('viagens.html')) {
    initViagensPage();
  } else if (pageType === 'nova-viagem' || path.endsWith('nova-viagem.html')) {
    initNovaViagemPage();
  } else if (pageType === 'mapa' || path.endsWith('mapa.html')) {
    initMapaPage();
  } else if (pageType === 'memorias' || path.endsWith('memorias.html')) {
    initMemoriasPage();
  } else if (pageType === 'perfil' || path.endsWith('perfil.html')) {
    initPerfilPage();
  }
});