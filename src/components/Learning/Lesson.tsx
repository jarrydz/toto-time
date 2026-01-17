import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { getLesson } from '../../data/lessons';
import { getCharacter } from '../../data/characters';
import { CharacterSpeech } from '../Character';
import { Button, ProgressBar } from '../common';
import styles from './Learning.module.css';

export function Lesson() {
  const { userData, appState, setScreen, setCurrentLesson, completeLesson, addStars } = useUser();
  const [currentStep, setCurrentStep] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  if (!userData || !appState.currentLessonId) return null;

  const lesson = getLesson(appState.currentLessonId);
  if (!lesson) return null;

  const character = getCharacter(userData.character);
  const step = lesson.steps[currentStep];
  const progress = ((currentStep + 1) / lesson.steps.length) * 100;
  const isLastStep = currentStep === lesson.steps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      // Complete the lesson
      completeLesson(lesson.id);
      addStars(3);
      setShowCelebration(true);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    setCurrentLesson(null);
    setScreen('learning');
  };

  const handleTakeQuiz = () => {
    setScreen('quiz');
  };

  const getAnimationClass = () => {
    if (!step.animation) return '';
    return styles[`animate${step.animation.charAt(0).toUpperCase() + step.animation.slice(1)}`] || '';
  };

  if (showCelebration) {
    return (
      <div className={styles.celebrationContainer}>
        <div className={styles.celebrationContent}>
          <div className={styles.confetti}>🎉</div>
          <h1 className={styles.celebrationTitle}>Amazing!</h1>
          <p className={styles.celebrationText}>
            You completed <strong>{lesson.title}</strong>!
          </p>
          <div className={styles.starsEarned}>
            <span>⭐</span>
            <span>⭐</span>
            <span>⭐</span>
          </div>
          <p className={styles.starsText}>+3 stars earned!</p>
          
          <CharacterSpeech
            characterId={userData.character}
            type="celebration"
            size="medium"
          />
          
          <div className={styles.celebrationButtons}>
            <Button variant="primary" onClick={handleTakeQuiz} icon="✨">
              Take Quiz
            </Button>
            <Button variant="secondary" onClick={handleFinish}>
              Back to Lessons
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.lessonContainer} style={{ '--lesson-color': lesson.color } as React.CSSProperties}>
      <header className={styles.lessonHeader}>
        <button className={styles.closeButton} onClick={handleFinish}>
          ✕
        </button>
        <div className={styles.lessonProgress}>
          <span className={styles.lessonProgressText}>
            Step {currentStep + 1} of {lesson.steps.length}
          </span>
          <ProgressBar progress={progress} color={lesson.color} height={8} />
        </div>
      </header>

      <main className={styles.lessonMain}>
        <div className={styles.stepCard}>
          {/* Character Teaching Section - Always Visible */}
          <div className={styles.characterTeacher}>
            <div className={`${styles.characterEmoji} ${getAnimationClass()}`}>
              {character.emoji}
            </div>
            <div className={styles.speechBubble}>
              <p className={styles.speechText}>
                {step.characterMessage || character.encouragements[0]}
              </p>
              <span className={styles.characterName}>{character.name}</span>
            </div>
          </div>

          {/* Step Content */}
          <div className={styles.stepHeader}>
            <span className={`${styles.stepIcon} ${getAnimationClass()}`}>{lesson.icon}</span>
            <h2 className={styles.stepTitle}>{step.title}</h2>
          </div>

          <div className={styles.stepContent}>
            <p className={styles.stepText}>{step.content}</p>

            {step.timeExample && (
              <div className={styles.timeExample}>
                <span className={styles.timeExampleLabel}>✨ Look at this time ✨</span>
                <span className={styles.timeExampleValue}>{step.timeExample}</span>
              </div>
            )}

            {step.funFact && (
              <div className={styles.funFact}>
                <span className={styles.funFactIcon}>🤓</span>
                <div className={styles.funFactContent}>
                  <span className={styles.funFactLabel}>Fun Fact!</span>
                  <span className={styles.funFactText}>{step.funFact}</span>
                </div>
              </div>
            )}

            {step.hint && (
              <div className={styles.hint}>
                <span className={styles.hintIcon}>💡</span>
                <span className={styles.hintText}>{step.hint}</span>
              </div>
            )}
          </div>

          {step.type === 'practice' && (
            <div className={styles.practiceCallout}>
              <span className={styles.practiceIcon}>🎯</span>
              <span className={styles.practiceText}>Think about your answer, then continue!</span>
            </div>
          )}
        </div>
      </main>

      <footer className={styles.lessonFooter}>
        <Button
          variant="secondary"
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          ← Previous
        </Button>
        <Button
          variant="primary"
          onClick={handleNext}
          icon={isLastStep ? '🎉' : '→'}
        >
          {isLastStep ? 'Complete!' : 'Next'}
        </Button>
      </footer>
    </div>
  );
}
