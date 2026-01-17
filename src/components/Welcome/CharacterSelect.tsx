import { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import { characterList, getRandomMessage } from '../../data/characters';
import type { CharacterType } from '../../types';
import styles from './CharacterSelect.module.css';

export function CharacterSelect() {
  const { createUser } = useUser();
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterType | null>(null);
  const [userName, setUserName] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const storedName = sessionStorage.getItem('tototime-temp-name');
    if (storedName) {
      setUserName(storedName);
      sessionStorage.removeItem('tototime-temp-name');
    }
  }, []);

  const handleCharacterSelect = (characterId: CharacterType) => {
    setSelectedCharacter(characterId);
  };

  const handleConfirm = () => {
    if (selectedCharacter && userName) {
      setIsAnimating(true);
      setTimeout(() => {
        createUser(userName, selectedCharacter);
      }, 600);
    }
  };

  const selectedCharacterData = selectedCharacter 
    ? characterList.find(c => c.id === selectedCharacter)
    : null;

  return (
    <div className={`${styles.container} ${isAnimating ? styles.fadeOut : ''}`}>
      <div className={styles.content}>
        <h1 className={styles.title}>Choose Your Friend!</h1>
        <p className={styles.subtitle}>
          Hi <span className={styles.name}>{userName}</span>! Pick an animal friend to learn with you.
        </p>

        <div className={styles.characterGrid}>
          {characterList.map((character) => (
            <button
              key={character.id}
              className={`${styles.characterCard} ${
                selectedCharacter === character.id ? styles.selected : ''
              }`}
              onClick={() => handleCharacterSelect(character.id)}
              style={{
                '--character-color': character.color,
              } as React.CSSProperties}
            >
              <span className={styles.emoji}>{character.emoji}</span>
              <span className={styles.characterName}>{character.name}</span>
              <span className={styles.personality}>{character.personality}</span>
            </button>
          ))}
        </div>

        {selectedCharacterData && (
          <div className={styles.preview}>
            <div className={styles.previewEmoji}>{selectedCharacterData.emoji}</div>
            <p className={styles.previewMessage}>
              "{getRandomMessage(selectedCharacterData.greetings)}"
            </p>
          </div>
        )}

        <button
          className={`${styles.confirmButton} ${selectedCharacter ? styles.confirmActive : ''}`}
          onClick={handleConfirm}
          disabled={!selectedCharacter}
        >
          {selectedCharacter 
            ? `Start with ${selectedCharacterData?.name.split(' ')[0]}! 🎉`
            : 'Pick a friend first!'
          }
        </button>
      </div>
    </div>
  );
}
