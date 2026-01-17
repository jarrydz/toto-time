import type { CharacterType } from '../../types';
import { CharacterSpeech } from '../Character';
import { StarRating, Button } from '../common';
import styles from './Quiz.module.css';

interface ResultsProps {
  correct: number;
  total: number;
  characterId: CharacterType;
  onBackToHome: () => void;
  onTryAgain: () => void;
}

export function Results({ correct, total, characterId, onBackToHome, onTryAgain }: ResultsProps) {
  const percentage = Math.round((correct / total) * 100);
  const starsEarned = percentage >= 80 ? 3 : percentage >= 60 ? 2 : percentage >= 40 ? 1 : 0;

  const getMessage = () => {
    if (percentage >= 80) {
      return "Incredible! You're a time-telling superstar!";
    } else if (percentage >= 60) {
      return "Great job! You're getting really good at this!";
    } else if (percentage >= 40) {
      return "Good effort! Keep practicing and you'll get even better!";
    } else {
      return "Don't worry! Every expert was once a beginner. Keep trying!";
    }
  };

  const getEmoji = () => {
    if (percentage >= 80) return '🏆';
    if (percentage >= 60) return '🌟';
    if (percentage >= 40) return '👍';
    return '💪';
  };

  return (
    <div className={styles.resultsContainer}>
      <div className={styles.resultsCard}>
        <div className={styles.resultsEmoji}>{getEmoji()}</div>
        
        <h1 className={styles.resultsTitle}>Quiz Complete!</h1>
        
        <div className={styles.scoreCircle}>
          <span className={styles.scoreNumber}>{correct}</span>
          <span className={styles.scoreDivider}>/</span>
          <span className={styles.scoreTotal}>{total}</span>
        </div>
        
        <p className={styles.percentage}>{percentage}% correct</p>

        <div className={styles.starsSection}>
          <StarRating earned={starsEarned} total={3} size="large" />
          {starsEarned > 0 && (
            <p className={styles.starsEarnedText}>+{starsEarned} stars earned!</p>
          )}
        </div>

        <div className={styles.messageSection}>
          <CharacterSpeech
            characterId={characterId}
            type={percentage >= 60 ? 'celebration' : 'encouragement'}
            customMessage={getMessage()}
            size="medium"
          />
        </div>

        <div className={styles.resultsButtons}>
          <Button variant="primary" onClick={onTryAgain} icon="🔄" fullWidth>
            Try Again
          </Button>
          <Button variant="secondary" onClick={onBackToHome} fullWidth>
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
