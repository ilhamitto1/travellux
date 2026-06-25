export interface Experience {
  id: string;
  title: string;
  category: 'yacht' | 'helicopter' | 'diving' | 'adventure' | 'dining' | 'spa';
  image: string;
  videoPreview: string;
  destination: string;
  duration: string;
  price: number;
  rating: number;
  description: string;
  highlights: string[];
}

export const experiences: Experience[] = [
  {
    id: 'e1', title: 'Maldives Private Yacht Charter', category: 'yacht',
    image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80',
    videoPreview: 'https://videos.pexels.com/video-files/3163534/3163534-uhd_2560_1440_25fps.mp4',
    destination: 'Maldives', duration: '3 Gün / 2 Gece', price: 18900, rating: 4.98,
    description: '60 metrelik süper yat ile mercan adaları arasında özel seyir.',
    highlights: ['Şefli yemekler', 'Dalış ekipmanı', 'Jet ski', 'Gün batımı şampanyası'],
  },
  {
    id: 'e2', title: 'Dubai Skyline Helicopter Tour', category: 'helicopter',
    image: 'https://images.unsplash.com/photo-1517177645369-24406f2f1d3c?w=800&q=80',
    videoPreview: 'https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_25fps.mp4',
    destination: 'Dubai', duration: '45 Dakika', price: 2890, rating: 4.95,
    description: 'Burj Khalifa, Palm Jumeirah ve World Islands üzerinde özel helikopter turu.',
    highlights: ['VIP lounge', 'Profesyonel pilot', 'Fotoğraf paketi', 'Şampanya'],
  },
  {
    id: 'e3', title: 'Great Barrier Deep Dive Expedition', category: 'diving',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
    videoPreview: 'https://videos.pexels.com/video-files/854084/854084-uhd_2560_1440_25fps.mp4',
    destination: 'Maldives', duration: 'Tam Gün', price: 1490, rating: 4.92,
    description: 'PADI sertifikalı rehberler eşliğinde 30 metre derinlikte mercan resifi keşfi.',
    highlights: ['3 dalış noktası', 'Ekipman dahil', 'Su altı fotoğraf', 'Öğle yemeği'],
  },
  {
    id: 'e4', title: 'Iceland Super Jeep Glacier Adventure', category: 'adventure',
    image: 'https://images.unsplash.com/photo-1529963183133-0a4b1fad9785?w=800&q=80',
    videoPreview: 'https://videos.pexels.com/video-files/857251/857251-uhd_2560_1440_25fps.mp4',
    destination: 'Iceland', duration: '8 Saat', price: 890, rating: 4.89,
    description: 'Vatnajökul buzulunda super jeep ile buz mağarası ve şelale turu.',
    highlights: ['Buz mağarası', 'Jökulsárlón lagün', 'Profesyonel rehber', 'Termal battaniye'],
  },
  {
    id: 'e5', title: 'Michelin Star Omakase Experience', category: 'dining',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    videoPreview: 'https://videos.pexels.com/video-files/3209828/3209828-uhd_2560_1440_25fps.mp4',
    destination: 'Tokyo', duration: '3 Saat', price: 650, rating: 4.97,
    description: 'Ginza\'da 3 Michelin yıldızlı şefin 18 course özel omakase menüsü.',
    highlights: ['Sake eşleştirme', 'Şef masası', 'Premium malzemeler', 'Souvenir'],
  },
  {
    id: 'e6', title: 'Balinese Royal Spa Ritual', category: 'spa',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
    videoPreview: 'https://videos.pexels.com/video-files/3209828/3209828-uhd_2560_1440_25fps.mp4',
    destination: 'Bali', duration: '4 Saat', price: 420, rating: 4.94,
    description: 'Ubud\'da geleneksel Balinese healing, çiçek banyosu ve refleksoloji.',
    highlights: ['4 saat ritüel', 'Organik ürünler', 'Özel pavilion', 'Herbal çay'],
  },
  {
    id: 'e7', title: 'Santorini Sunset Catamaran Cruise', category: 'yacht',
    image: 'https://images.unsplash.com/photo-1570077186670-a7be2b4d0861?w=800&q=80',
    videoPreview: 'https://videos.pexels.com/video-files/3163534/3163534-uhd_2560_1440_25fps.mp4',
    destination: 'Santorini', duration: '5 Saat', price: 380, rating: 4.91,
    description: 'Kaldera üzerinde lüks katamaran ile gün batımı ve volkanik plajlar.',
    highlights: ['BBQ yemek', 'Şnorkel', 'Şarap', 'Canlı müzik'],
  },
  {
    id: 'e8', title: 'Cappadocia Balloon & Valley Flight', category: 'helicopter',
    image: 'https://images.unsplash.com/photo-1504194104404-433180773661?w=800&q=80',
    videoPreview: 'https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_25fps.mp4',
    destination: 'Cappadocia', duration: '90 Dakika', price: 320, rating: 4.96,
    description: 'Şafak vakti sıcak hava balonu ve ardından özel helikopter vadisi turu.',
    highlights: ['İlk uçuş', 'Şampanya kutlaması', 'Sertifika', 'Transfer'],
  },
  {
    id: 'e9', title: 'Bora Bora Shark & Ray Encounter', category: 'diving',
    image: 'https://images.unsplash.com/photo-1559127320-259aa02505da?w=800&q=80',
    videoPreview: 'https://videos.pexels.com/video-files/854084/854084-uhd_2560_1440_25fps.mp4',
    destination: 'Bora Bora', duration: 'Yarım Gün', price: 890, rating: 4.93,
    description: 'Lagünün berrak sularında köpekbalığı ve vatozlarla güvenli yüzme.',
    highlights: ['Marine biolog', 'Su altı kamera', 'Tropik meyve', 'Özel tekne'],
  },
  {
    id: 'e10', title: 'Swiss Alps Heliski Adventure', category: 'adventure',
    image: 'https://images.unsplash.com/photo-1483728642387-6c3bddc4e98c?w=800&q=80',
    videoPreview: 'https://videos.pexels.com/video-files/857251/857251-uhd_2560_1440_25fps.mp4',
    destination: 'Swiss Alps', duration: 'Tam Gün', price: 3200, rating: 4.95,
    description: 'Zermatt\'tan helikopter ile erişilemeyen pristine kayak pistlerine iniş.',
    highlights: ['6 iniş', 'Profesyonel rehber', 'Avalanche güvenlik', 'Alpine lunch'],
  },
  {
    id: 'e11', title: 'Amalfi Coast Truffle Hunting Dinner', category: 'dining',
    image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80',
    videoPreview: 'https://videos.pexels.com/video-files/3209828/3209828-uhd_2560_1440_25fps.mp4',
    destination: 'Amalfi Coast', duration: '6 Saat', price: 520, rating: 4.90,
    description: 'Ormanlarda trüf avı ve ardından şefin hazırladığı 7 course akşam yemeği.',
    highlights: ['Trüf köpeği', 'Şarap eşleştirme', 'Açık hava yemek', 'Reçel hediye'],
  },
  {
    id: 'e12', title: 'Seychelles Island Hopping Yacht', category: 'yacht',
    image: 'https://images.unsplash.com/photo-1589770235683-93b36b6ab00b?w=800&q=80',
    videoPreview: 'https://videos.pexels.com/video-files/3163534/3163534-uhd_2560_1440_25fps.mp4',
    destination: 'Seychelles', duration: '2 Gün', price: 8900, rating: 4.97,
    description: 'La Digue, Praslin ve Curieuse adaları arasında lüks yat gezisi.',
    highlights: ['Şnorkel', 'BBQ', 'Gün batımı', 'Ada rehberi'],
  },
];
