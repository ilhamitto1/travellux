const firstNames = ['Ayşe', 'Mehmet', 'Zeynep', 'Can', 'Elif', 'James', 'Sophie', 'Marco', 'Yuki', 'Olivia', 'Hans', 'Isabella', 'Raj', 'Emma', 'Pierre', 'Nina', 'Ahmet', 'Laura', 'David', 'Maria', 'Kenji', 'Anna', 'Carlos', 'Fatma', 'Thomas', 'Elena', 'Michael', 'Sofia', 'Robert', 'Lily', 'Ali', 'Charlotte', 'Daniel', 'Amira', 'Lucas', 'Victoria', 'Omar', 'Grace', 'Felix', 'Hannah', 'Serkan', 'Julia', 'Andreas', 'Priya', 'William', 'Deniz', 'Claire', 'Stefan', 'Maya', 'Jonathan'];
const lastNames = ['Yılmaz', 'Kaya', 'Demir', 'Şahin', 'Çelik', 'Anderson', 'Martin', 'Rossi', 'Tanaka', 'Williams', 'Mueller', 'Garcia', 'Patel', 'Johnson', 'Dubois', 'Schmidt', 'Öztürk', 'Brown', 'Chen', 'Silva', 'Nakamura', 'Taylor', 'Rodriguez', 'Aydın', 'Wilson', 'Popov', 'Thompson', 'Kowalski', 'Lee', 'Fischer', 'Arslan', 'Moore', 'Becker', 'Hassan', 'Weber', 'Novak', 'Bakır', 'Davis', 'Hoffman', 'Clark', 'Koç', 'White', 'Schneider', 'Sharma', 'Miller', 'Acar', 'Hall', 'Braun', 'Singh', 'Green'];
const destinations = ['Maldives', 'Bali', 'Santorini', 'Dubai', 'Bora Bora', 'Seychelles', 'Swiss Alps', 'Tokyo', 'Cappadocia', 'Iceland', 'Phuket', 'Amalfi Coast'];
const reviewTexts = [
  'Hayatımızın en muhteşem tatiliydi. Her detay mükemmeldi, özellikle özel transfer ve butler hizmeti.',
  'TravelLux ekibi beklentilerimizin çok ötesinde bir deneyim sundu. Kesinlikle tekrar rezervasyon yapacağız.',
  'Overwater villa, dalış turu ve spa ritüeli — her anı büyülüydü. 5 yıldız yetmez!',
  'Profesyonellik ve lüksün mükemmel birleşimi. Çocuklarımız bile kendilerini prens/prenses gibi hissetti.',
  'Balon turu şafak vaktinde gerçekten nefes kesiciydi. Rehberimiz Ali her şeyi kusursuz organize etti.',
  'Dubai helikopter turu ve çöl kampı kombinasyonu inanılmazdı. Her kuruşuna değdi.',
  'Santorini\'deki cave suite ve gün batımı yat turu balayımızın en güzel anıları oldu.',
  'İzlanda aurora turunda 3 gece üst üste kuzey ışıklarını gördük. TravelLux\'un önerdiği otel mükemmeldi.',
  'Tokyo omakase deneyimi gastronomi hayatımın zirvesiydi. Her adım özenle planlanmıştı.',
  'Amalfi kıyısında özel tekne turu ve limoncello atölyesi unutulmazdı. Teşekkürler TravelLux!',
  'Seychelles\'teki özel ada deneyimi gerçek bir kaçış gibiydi. Hiçbir detay atlanmamış.',
  'İsviçre Alpleri\'nde heliski deneyimi adrenalin tutkunları için mutlaka yapılmalı.',
  'Bora Bora lagününde vatozlarla yüzmek rüya gibi bir deneyimdi. Fotoğraflar muhteşem çıktı.',
  'Phuket\'teki Six Senses villası huzur ve lüksün tanımını yeniden yazdı.',
  'Museum Hotel\'deki mağara süit ve sabah balon manzarası eşsizdi.',
  'Burj Al Arab\'daki suite ve Rolls-Royce transferi Dubai\'nin gerçek lüksünü gösterdi.',
  'Bali wellness retreat\'i hem bedenime hem ruhuma iyi geldi. COMO Shambhala harika.',
  'Soneva Jani\'deki su kaydırağı çocuklarımızın favorisiydi, biz de spa\'da dinlendik.',
  'Four Seasons Bora Bora\'nın lagün bungalovu balayımız için mükemmel seçimdi.',
  'Aman Tokyo\'nun minimalist zarafeti ve şehir manzarası büyüleyiciydi.',
  'Glacier Express ve Zermatt chalet kombinasyonu kış tatilimizin highlight\'ıydı.',
  'Phi Phi özel speedboat turu kalabalıktan uzak, sakin bir deneyim sundu.',
  'Capri tekne turu ve Blue Grotto ziyareti Amalfi tatilimizin en güzel günüydü.',
  'Organik bahçe turu ve sunset yelken Maldives\'te doğayla bağlantı kurmamızı sağladı.',
  'Geisha tea ceremony Tokyo\'da kültürel bir derinlik kattı. Çok öğreticiydi.',
  'ATV safari ve mağara spa Kapadokya\'da macera ve dinlenmeyi bir arada sundu.',
  'Blue Lagoon ve buzul mağarası turu İzlanda\'nın dramatik güzelliğini gözler önüne serdi.',
  'Yacht charter ile mercan adaları arasında 3 gün geçirdik — tam bir rüya.',
  'Michelin yıldızlı akşam yemeği ve şarap eşleştirmesi gastronomi cennetiydi.',
  'Spa ritüeli 4 saat sürdü ve her anı saf lüks hissettirdi.',
  'Rezervasyon sürecinden dönüşe kadar her şey kusursuzdu. VIP lounge harikaydı.',
  'Uçuş bağlantıları, otel transferleri, aktiviteler — hiçbir aksaklık yaşamadık.',
  'TravelLux concierge 7/24 ulaşılabilir ve her isteğimizi anında yerine getirdi.',
  'Fiyat/performans açısından premium segmentte en iyi deneyimdi.',
  'İlk kez bu kadar sorunsuz bir lüks tatil yaşadık. Herkese tavsiye ederim.',
  'Çocuklu aileler için özel aktiviteler ve menüler düşünülmüş, çok memnun kaldık.',
  'Fotoğraf çekimi için özel rehber ayarlanması Instagram\'ımızı şenlendirdi.',
  'Özel jet transferi zaman kazandırdı ve yolculuğu keyfe dönüştürdü.',
  'Otel odası upgrade\'i sürpriz bir jest olarak geldi, çok mutlu olduk.',
  'Dalış eğitmeni profesyoneldi, ilk kez dalış yapmama rağmen kendimi güvende hissettim.',
  'Gün batımı şampanyası yatta romantik bir dokunuştu.',
  'Yerel rehber bilgisi ve önerileri sayesinde turistik yerlerin ötesini keşfettik.',
  'Havaalanı karşılama tabelası ve özel transfer çok profesyoneldi.',
  'Rezervasyon kodumuz anında geldi, tüm belgeler eksiksizdi.',
  'İkinci kez TravelLux ile seyahat ediyoruz ve yine hayal kırıklığına uğramadık.',
  'Arkadaşlarımıza önerdik, onlar da aynı memnuniyeti yaşadı.',
  'Bütçe slider ile kendi paketimizi oluşturmak çok pratikti.',
  'Mobil uygulama üzerinden tüm detaylara erişmek kolaydı.',
  'Success ekranındaki dijital bilet ve itinerary indirme özelliği harikaydı.',
  'Bu deneyim bizi TravelLux müşterisi olmaya ikna etti. Ömür boyu tercih edeceğiz.',
];

export interface Review {
  id: string;
  name: string;
  avatar: string;
  destination: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
}

export const reviews: Review[] = Array.from({ length: 50 }, (_, i) => {
  const first = firstNames[i % firstNames.length];
  const last = lastNames[i % lastNames.length];
  const dest = destinations[i % destinations.length];
  const month = (i % 12) + 1;
  const year = 2024 + (i % 2);
  return {
    id: `r${i + 1}`,
    name: `${first} ${last.charAt(0)}.`,
    avatar: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
    destination: dest,
    rating: 4.5 + (i % 5) * 0.1,
    text: reviewTexts[i % reviewTexts.length],
    date: `${month.toString().padStart(2, '0')}.${year}`,
    verified: true,
  };
});
