import { destinations } from '../../data/destinations';
import './MarqueeSection.css';

export function MarqueeSection() {
  const items = destinations.map((d) => `${d.name} · €${d.startingPrice.toLocaleString()} · ★${d.rating}`);

  return (
    <div className="marquee-section">
      <div className="marquee-row">
        <div className="marquee-content">
          {[...items, ...items].map((item, i) => (
            <span key={i} className="marquee-text">{item} ✦</span>
          ))}
        </div>
      </div>
      <div className="marquee-row reverse">
        <div className="marquee-content">
          {[...items].reverse().concat([...items].reverse()).map((item, i) => (
            <span key={i} className="marquee-text alt">{item} ◆</span>
          ))}
        </div>
      </div>
    </div>
  );
}
