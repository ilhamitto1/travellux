import { motion } from 'framer-motion';
import { destinations } from '../../data/destinations';
import './WeatherWidget.css';

export function WeatherWidget() {
  return (
    <section className="weather-section section-padding">
      <p className="section-eyebrow">Hava Durumu</p>
      <h2 className="section-title">Canlı <span className="gradient-text">Hava Durumu</span></h2>
      <p className="section-subtitle">Destinasyonlarınızdaki güncel hava koşulları ve en iyi seyahat dönemleri.</p>

      <div className="weather-grid">
        {destinations.map((dest, i) => (
          <motion.div
            key={dest.id}
            className="weather-card glass"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -4 }}
          >
            <img src={dest.image} alt={dest.name} loading="lazy" />
            <div className="weather-info">
              <h3>{dest.name}</h3>
              <div className="weather-temp">
                <span className="temp-value">{dest.weather.temp}°</span>
                <span className="temp-condition">{dest.weather.condition}</span>
              </div>
              <div className="weather-meta">
                <span>Nem: %{dest.weather.humidity}</span>
                <span>En İyi: {dest.bestSeason}</span>
              </div>
              <span className="weather-flight">✈ {dest.flightHours}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
