import { useState, useEffect } from 'react';
import type { CharacterType } from '../../types';
import { getCharacter, getRandomMessage } from '../../data/characters';
import styles from './Character.module.css';

interface CharacterSpeechProps {
  characterId: CharacterType;
  type: 'greeting' | 'encouragement' | 'celebration';
  customMessage?: string;
  size?: 'small' | 'medium' | 'large';
}

export function CharacterSpeech({
  characterId,
  type,
  customMessage,
  size = 'medium',
}: CharacterSpeechProps) {
  const character = getCharacter(characterId);
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (customMessage) {
      setMessage(customMessage);
    } else {
      const messages = {
        greeting: character.greetings,
        encouragement: character.encouragements,
        celebration: character.celebrations,
      };
      setMessage(getRandomMessage(messages[type]));
    }
    
    // Trigger animation
    setTimeout(() => setIsVisible(true), 100);
  }, [character, type, customMessage]);

  return (
    <div className={`${styles.speechContainer} ${styles[size]} ${isVisible ? styles.visible : ''}`}>
      <div
        className={styles.emojiBox}
        style={{ backgroundColor: `${character.color}40` }}
      >
        <span className={styles.speechEmoji}>{character.emoji}</span>
      </div>
      <div className={styles.speechBubble}>
        <p className={styles.speechText}>{message}</p>
        <div className={styles.speechTail} />
      </div>
    </div>
  );
}
