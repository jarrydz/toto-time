import type { QuizQuestion } from '../../types';
import styles from './Quiz.module.css';

interface QuestionProps {
  question: QuizQuestion;
  selectedAnswer: number | null;
  wrongAttempts: number[];
  isCorrect: boolean;
  showAnswer: boolean;
  attemptsRemaining: number;
  onSelectAnswer: (index: number) => void;
  lessonColor: string;
}

const encouragingMessages = [
  "Hmm, not quite! Give it another try! 🤔",
  "Oops! That's not it. You can do this! 💪",
  "Almost! Think again and try once more! 🌟",
  "Not that one! Keep going, you've got this! 🎯",
  "Nope, but don't give up! Try again! ✨",
];

export function Question({
  question,
  selectedAnswer,
  wrongAttempts,
  isCorrect,
  showAnswer,
  attemptsRemaining,
  onSelectAnswer,
  lessonColor,
}: QuestionProps) {
  const getRandomEncouragement = () => {
    return encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)];
  };

  return (
    <div className={styles.questionCard}>
      {question.timeShown && (
        <div 
          className={styles.timeDisplay}
          style={{ background: lessonColor }}
        >
          <span className={styles.timeValue}>{question.timeShown}</span>
        </div>
      )}

      <h2 className={styles.questionText}>{question.question}</h2>

      {/* Attempts indicator */}
      {!isCorrect && !showAnswer && wrongAttempts.length > 0 && (
        <div className={styles.attemptsIndicator}>
          <span className={styles.attemptsText}>
            {attemptsRemaining === 1 
              ? "🎯 Last chance!" 
              : `💫 ${attemptsRemaining} tries left`}
          </span>
        </div>
      )}

      <div className={styles.optionsGrid}>
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isWrongAttempt = wrongAttempts.includes(index);
          const isCorrectAnswer = index === question.correctAnswer;
          
          let optionClass = styles.option;
          
          if (isCorrect && isCorrectAnswer) {
            // User got it right - show green
            optionClass += ` ${styles.correct}`;
          } else if (showAnswer) {
            // Max attempts reached - show correct answer
            if (isCorrectAnswer) {
              optionClass += ` ${styles.correct}`;
            } else if (isWrongAttempt) {
              optionClass += ` ${styles.incorrect} ${styles.disabled}`;
            }
          } else if (isWrongAttempt) {
            // Previous wrong attempt - grey out
            optionClass += ` ${styles.incorrect} ${styles.disabled}`;
          } else if (isSelected) {
            // Currently selected
            optionClass += ` ${styles.selected}`;
          }

          const isDisabled = isCorrect || showAnswer || isWrongAttempt;

          return (
            <button
              key={index}
              className={optionClass}
              onClick={() => onSelectAnswer(index)}
              disabled={isDisabled}
            >
              <span className={styles.optionLetter}>
                {String.fromCharCode(65 + index)}
              </span>
              <span className={styles.optionText}>{option}</span>
              {(isCorrect || showAnswer) && isCorrectAnswer && (
                <span className={styles.checkIcon}>✓</span>
              )}
              {isWrongAttempt && (
                <span className={styles.crossIcon}>✗</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Feedback messages */}
      {isCorrect && (
        <div className={`${styles.feedback} ${styles.feedbackCorrect}`}>
          <span className={styles.feedbackIcon}>🎉</span>
          <div className={styles.feedbackContent}>
            <span className={styles.feedbackTitle}>Correct!</span>
            <p className={styles.feedbackExplanation}>{question.explanation}</p>
          </div>
        </div>
      )}

      {wrongAttempts.length > 0 && !isCorrect && !showAnswer && (
        <div className={`${styles.feedback} ${styles.feedbackTryAgain}`}>
          <span className={styles.feedbackIcon}>💭</span>
          <div className={styles.feedbackContent}>
            <span className={styles.feedbackTitle}>Try Again!</span>
            <p className={styles.feedbackExplanation}>
              {getRandomEncouragement()}
            </p>
          </div>
        </div>
      )}

      {showAnswer && !isCorrect && (
        <div className={`${styles.feedback} ${styles.feedbackIncorrect}`}>
          <span className={styles.feedbackIcon}>💡</span>
          <div className={styles.feedbackContent}>
            <span className={styles.feedbackTitle}>Here's the answer!</span>
            <p className={styles.feedbackExplanation}>{question.explanation}</p>
          </div>
        </div>
      )}
    </div>
  );
}
