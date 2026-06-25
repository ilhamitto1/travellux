export interface Flight {
  id: string;
  airline: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  duration: string;
  class: 'economy' | 'business' | 'first' | 'private';
  price: number;
  aircraft: string;
}

export const departures = [
  'İstanbul (IST)', 'Ankara (ESB)', 'İzmir (ADB)', 'Antalya (AYT)',
  'Londra (LHR)', 'Paris (CDG)', 'New York (JFK)', 'Dubai (DXB)',
];

export const flightClasses = [
  { id: 'economy', label: 'Economy', multiplier: 1 },
  { id: 'business', label: 'Business Class', multiplier: 2.8 },
  { id: 'first', label: 'First Class', multiplier: 5.2 },
  { id: 'private', label: 'Private Jet', multiplier: 12 },
];

export const hotelCategories = [
  { id: 'boutique', label: 'Butik Otel', multiplier: 1 },
  { id: 'resort', label: 'Lüks Resort', multiplier: 1.6 },
  { id: 'ultra-luxury', label: 'Ultra Lüks', multiplier: 2.5 },
  { id: 'palace', label: 'Saray & Palace', multiplier: 3.2 },
];

export const activityPreferences = [
  'Dalış & Su Sporları', 'Helikopter & Hava Turları', 'Yat & Tekne',
  'Spa & Wellness', 'Gastronomi', 'Macera & Doğa', 'Kültür & Tarih', 'Alışveriş',
];

export const flights: Flight[] = [
  { id: 'f1', airline: 'Turkish Airlines', from: 'IST', to: 'MLE', departure: '23:45', arrival: '09:30+1', duration: '9s 45dk', class: 'business', price: 4890, aircraft: 'Boeing 787-9' },
  { id: 'f2', airline: 'Emirates', from: 'IST', to: 'DXB', departure: '08:15', arrival: '13:35', duration: '4s 20dk', class: 'first', price: 8900, aircraft: 'Airbus A380' },
  { id: 'f3', airline: 'Singapore Airlines', from: 'IST', to: 'DPS', departure: '01:30', arrival: '18:45', duration: '12s 15dk', class: 'business', price: 6200, aircraft: 'Airbus A350' },
  { id: 'f4', airline: 'Aegean Airlines', from: 'IST', to: 'JTR', departure: '06:00', arrival: '08:15', duration: '2s 15dk', class: 'business', price: 1890, aircraft: 'Airbus A320neo' },
  { id: 'f5', airline: 'Air Tahiti Nui', from: 'IST', to: 'BOB', departure: '14:00', arrival: '14:30+1', duration: '22s 30dk', class: 'business', price: 12400, aircraft: 'Boeing 787-9' },
  { id: 'f6', airline: 'Swiss International', from: 'IST', to: 'ZRH', departure: '07:30', arrival: '09:45', duration: '3s 15dk', class: 'first', price: 5600, aircraft: 'Airbus A330' },
  { id: 'f7', airline: 'ANA', from: 'IST', to: 'NRT', departure: '11:00', arrival: '06:30+1', duration: '11s 30dk', class: 'business', price: 7800, aircraft: 'Boeing 777-300ER' },
  { id: 'f8', airline: 'Pegasus', from: 'IST', to: 'NAV', departure: '05:45', arrival: '07:00', duration: '1s 15dk', class: 'economy', price: 890, aircraft: 'Airbus A321neo' },
  { id: 'f9', airline: 'Icelandair', from: 'IST', to: 'KEF', departure: '16:20', arrival: '20:50', duration: '4s 30dk', class: 'business', price: 3400, aircraft: 'Boeing 757' },
  { id: 'f10', airline: 'NetJets', from: 'IST', to: 'Custom', departure: 'Flexible', arrival: 'Flexible', duration: 'Değişken', class: 'private', price: 45000, aircraft: 'Gulfstream G650' },
];

export const stats = [
  { label: 'Mutlu Gezgin', value: 12847, suffix: '+' },
  { label: 'Premium Destinasyon', value: 12, suffix: '' },
  { label: 'Lüks Otel Partneri', value: 20, suffix: '+' },
  { label: 'Memnuniyet Oranı', value: 99, suffix: '%' },
];
