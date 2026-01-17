import styles from './StarBadge.module.css';

interface StarBadgeProps {
  count: number;
  size?: 'small' | 'medium' | 'large';
  animated?: boolean;
}

export function StarBadge({ count, size = 'medium', animated = false }: StarBadgeProps) {
  return (
    <div className={`${styles.badge} ${styles[size]} ${animated ? styles.animated : ''}`}>
      <span className={styles.star}>⭐</span>
      <span className={styles.count}>{count}</span>
    </div>
  );
}

interface StarRatingProps {
  earned: number;
  total: number;
  size?: 'small' | 'medium' | 'large';
}

export function StarRating({ earned, total, size = 'medium' }: StarRatingProps) {
  return (
    <div className={`${styles.rating} ${styles[size]}`}>
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`${styles.ratingStar} ${i < earned ? styles.earned : styles.empty}`}
        >
          {i < earned ? '⭐' : '☆'}
        </span>
      ))}
    </div>
  );
}
