import { WaveParallax } from '../effects/WaveParallax';
import './Footer.css';

export function Footer() {
  return (
    <footer id="iletisim" className="footer">
      <WaveParallax />
      <div className="footer-inner section-padding">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <span>T</span> TravelLux
            </div>
            <p>Ultra premium lüks seyahat deneyimleri. 12 destinasyon, 20 butik otel, sınırsız macera.</p>
          </div>
          <div className="footer-col">
            <h4>Destinasyonlar</h4>
            <a href="#destinasyonlar">Maldives</a>
            <a href="#destinasyonlar">Santorini</a>
            <a href="#destinasyonlar">Dubai</a>
            <a href="#destinasyonlar">Tokyo</a>
          </div>
          <div className="footer-col">
            <h4>Hizmetler</h4>
            <a href="#">Özel Jet Kiralama</a>
            <a href="#">Concierge</a>
            <a href="#">Yat Turları</a>
            <a href="#">Helikopter</a>
          </div>
          <div className="footer-col">
            <h4>İletişim</h4>
            <span>+90 212 555 0100</span>
            <span>concierge@travellux.com</span>
            <span>İstanbul, Türkiye</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 TravelLux. Tüm hakları saklıdır.</span>
          <span>Ultra Premium Luxury Travel Experience</span>
        </div>
      </div>
    </footer>
  );
}
