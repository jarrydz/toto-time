import type { CharacterType } from '../../types';
import { getCharacter } from '../../data/characters';
import styles from './Character.module.css';

interface CharacterAvatarProps {
  characterId: CharacterType;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  animated?: boolean;
  showName?: boolean;
}

export function CharacterAvatar({
  characterId,
  size = 'medium',
  animated = false,
  showName = false,
}: CharacterAvatarProps) {
  const character = getCharacter(characterId);

  return (
    <div className={`${styles.avatar} ${styles[size]} ${animated ? styles.animated : ''}`}>
      <div
        className={styles.emojiContainer}
        style={{ backgroundColor: `${character.color}30` }}
      >
        <span className={styles.emoji}>{character.emoji}</span>
      </div>
      {showName && <span className={styles.name}>{character.name}</span>}
    </div>
  );
}
