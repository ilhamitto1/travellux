import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { destinations } from '../../data/destinations';
import './GlobeSection.css';

function Globe() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.15;
  });

  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;
    const grad = ctx.createLinearGradient(0, 0, 512, 256);
    grad.addColorStop(0, '#0c4a6e');
    grad.addColorStop(0.5, '#0ea5e9');
    grad.addColorStop(1, '#10b981');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 256);
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    for (let i = 0; i < 40; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * 512, Math.random() * 256, Math.random() * 8 + 2, 0, Math.PI * 2);
      ctx.fill();
    }
    return new THREE.CanvasTexture(canvas);
  }, []);

  return (
    <Sphere ref={ref} args={[1.8, 64, 64]}>
      <meshStandardMaterial map={texture} roughness={0.6} metalness={0.2} />
    </Sphere>
  );
}

export function GlobeSection() {
  return (
    <section className="globe-section section-padding">
      <div className="globe-content">
        <p className="section-eyebrow">Dünya Turu</p>
        <h2 className="section-title">İnteraktif <span className="gradient-text">Küre</span></h2>
        <p className="section-subtitle">12 premium destinasyonumuzu keşfedin. Her nokta bir macera, her macera bir hikaye.</p>

        <div className="globe-destinations">
          {destinations.slice(0, 6).map((d) => (
            <div key={d.id} className="globe-dest-item">
              <img src={d.image} alt={d.name} loading="lazy" />
              <div>
                <strong>{d.name}</strong>
                <span>{d.weather.temp}°C · {d.weather.condition}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="globe-canvas-wrap">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <pointLight position={[-5, -5, -5]} intensity={0.5} color="#10b981" />
          <Globe />
        </Canvas>
        <div className="globe-glow" />
      </div>
    </section>
  );
}
