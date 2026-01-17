import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  progress: number; // 0 to 100
  color?: string;
  height?: number;
  showLabel?: boolean;
  animated?: boolean;
}

export function ProgressBar({
  progress,
  color = '#667eea',
  height = 12,
  showLabel = false,
  animated = true,
}: ProgressBarProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className={styles.container}>
      <div
        className={styles.track}
        style={{ height: `${height}px` }}
      >
        <div
          className={`${styles.fill} ${animated ? styles.animated : ''}`}
          style={{
            width: `${clampedProgress}%`,
            background: `linear-gradient(90deg, ${color} 0%, ${adjustColor(color, 20)} 100%)`,
          }}
        />
      </div>
      {showLabel && (
        <span className={styles.label}>{Math.round(clampedProgress)}%</span>
      )}
    </div>
  );
}

// Helper to lighten a color
function adjustColor(color: string, percent: number): string {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, (num >> 16) + amt);
  const G = Math.min(255, ((num >> 8) & 0x00ff) + amt);
  const B = Math.min(255, (num & 0x0000ff) + amt);
  return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`;
}
