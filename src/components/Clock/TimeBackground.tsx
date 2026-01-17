import type { TimeOfDay } from '../../types';
import styles from './Clock.module.css';

interface TimeBackgroundProps {
  timeOfDay: TimeOfDay;
  children: React.ReactNode;
}

const backgrounds: Record<TimeOfDay, { gradient: string; particles: string[] }> = {
  'early-morning': {
    gradient: 'linear-gradient(180deg, #2C3E50 0%, #FD746C 50%, #FF9068 100%)',
    particles: ['🌟', '✨', '🌅'],
  },
  'morning': {
    gradient: 'linear-gradient(180deg, #FF9A56 0%, #FFD194 50%, #87CEEB 100%)',
    particles: ['☀️', '🐦', '🌸'],
  },
  'late-morning': {
    gradient: 'linear-gradient(180deg, #87CEEB 0%, #E0F7FA 50%, #B2EBF2 100%)',
    particles: ['☀️', '🦋', '🌻'],
  },
  'noon': {
    gradient: 'linear-gradient(180deg, #4FC3F7 0%, #81D4FA 50%, #B3E5FC 100%)',
    particles: ['☀️', '⛅', '🌤️'],
  },
  'afternoon': {
    gradient: 'linear-gradient(180deg, #64B5F6 0%, #90CAF9 50%, #BBDEFB 100%)',
    particles: ['⛅', '🦋', '🍃'],
  },
  'evening': {
    gradient: 'linear-gradient(180deg, #FF7043 0%, #FFB74D 50%, #5C6BC0 100%)',
    particles: ['🌅', '🌇', '✨'],
  },
  'night': {
    gradient: 'linear-gradient(180deg, #5C6BC0 0%, #3949AB 50%, #1A237E 100%)',
    particles: ['🌙', '⭐', '✨'],
  },
  'late-night': {
    gradient: 'linear-gradient(180deg, #1A237E 0%, #311B92 50%, #0D0D26 100%)',
    particles: ['🌛', '⭐', '💫'],
  },
};

export function TimeBackground({ timeOfDay, children }: TimeBackgroundProps) {
  const bg = backgrounds[timeOfDay];

  return (
    <div className={styles.background} style={{ background: bg.gradient }}>
      <div className={styles.particlesContainer}>
        {bg.particles.map((particle, index) => (
          <span
            key={index}
            className={styles.particle}
            style={{
              left: `${20 + index * 30}%`,
              animationDelay: `${index * 2}s`,
            }}
          >
            {particle}
          </span>
        ))}
      </div>
      {children}
    </div>
  );
}
