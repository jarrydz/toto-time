import React from 'react';
import { useUser } from '../../context/UserContext';
import { lessons, isLessonUnlocked } from '../../data/lessons';
import { ProgressBar } from '../common';
import styles from './Learning.module.css';

export function LearningHub() {
  const { userData, setScreen, setCurrentLesson } = useUser();

  if (!userData) return null;

  const completedLessons = userData.progress.lessonsCompleted;

  const handleLessonClick = (lessonId: number) => {
    if (isLessonUnlocked(lessonId, completedLessons)) {
      setCurrentLesson(lessonId);
      setScreen('lesson');
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button className={styles.backButton} onClick={() => setScreen('home')}>
          ← Back
        </button>
        <h1 className={styles.title}>📚 Learning Pathways</h1>
        <p className={styles.subtitle}>Master time step by step!</p>
      </header>

      <div className={styles.lessonList}>
        {lessons.map((lesson) => {
          const isUnlocked = isLessonUnlocked(lesson.id, completedLessons);
          const isCompleted = completedLessons.includes(lesson.id);

          return (
            <button
              key={lesson.id}
              className={`${styles.lessonCard} ${!isUnlocked ? styles.locked : ''} ${isCompleted ? styles.completed : ''}`}
              onClick={() => handleLessonClick(lesson.id)}
              disabled={!isUnlocked}
              style={{
                '--lesson-color': lesson.color,
              } as React.CSSProperties}
            >
              <div className={styles.lessonHeader}>
                <span className={styles.lessonIcon}>{lesson.icon}</span>
                <div className={styles.lessonInfo}>
                  <span className={styles.lessonNumber}>Lesson {lesson.id}</span>
                  <h3 className={styles.lessonTitle}>{lesson.title}</h3>
                </div>
                {isCompleted && <span className={styles.checkMark}>✓</span>}
                {!isUnlocked && <span className={styles.lockIcon}>🔒</span>}
              </div>
              
              <p className={styles.lessonDescription}>{lesson.description}</p>
              
              <div className={styles.lessonFooter}>
                <span className={`${styles.difficulty} ${styles[lesson.difficulty]}`}>
                  {lesson.difficulty}
                </span>
                <span className={styles.stepCount}>{lesson.steps.length} steps</span>
              </div>

              {isCompleted && (
                <div className={styles.completedOverlay}>
                  <ProgressBar progress={100} color={lesson.color} height={4} animated={false} />
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <span className={styles.legendIcon}>✓</span>
          <span>Completed</span>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.legendIcon}>🔒</span>
          <span>Locked</span>
        </div>
      </div>
    </div>
  );
}
