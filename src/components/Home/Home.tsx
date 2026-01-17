import React, { useState, useRef, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import { useCurrentTime } from '../../hooks/useCurrentTime';
import { getTimeContext, getTimeOfDayEmoji } from '../../data/timeContexts';
import { CharacterAvatar } from '../Character';
import { StarBadge, ProgressBar } from '../common';
import { lessons } from '../../data/lessons';
import styles from './Home.module.css';

export function Home() {
  const { userData, setScreen, updateStreak, deleteUser } = useUser();
  const time = useCurrentTime();
  const timeContext = getTimeContext(time.hours);
  const [showMenu, setShowMenu] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    updateStreak();
  }, [updateStreak]);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRestartClick = () => {
    setShowMenu(false);
    setShowConfirm(true);
  };

  const handleConfirmRestart = () => {
    deleteUser();
  };

  if (!userData) return null;

  const completedCount = userData.progress.lessonsCompleted.length;
  const totalLessons = lessons.length;
  const progressPercent = (completedCount / totalLessons) * 100;

  return (
    <div 
      className={styles.container}
      style={{
        background: `linear-gradient(135deg, ${timeContext.gradientColors[0]} 0%, ${timeContext.gradientColors[1]} 100%)`,
      }}
    >
      <header className={styles.header}>
        <div className={styles.userInfoWrapper} ref={menuRef}>
          <button 
            className={styles.userInfo}
            onClick={() => setShowMenu(!showMenu)}
            aria-expanded={showMenu}
            aria-haspopup="true"
          >
            <CharacterAvatar characterId={userData.character} size="small" animated />
            <div className={styles.userDetails}>
              <span className={styles.greeting}>
                Hi, {userData.name}! {getTimeOfDayEmoji(timeContext.timeOfDay)}
                <span className={styles.menuArrow}>{showMenu ? '▲' : '▼'}</span>
              </span>
              <span className={styles.timeGreeting}>{timeContext.greeting}</span>
            </div>
          </button>
          
          {showMenu && (
            <div className={styles.dropdownMenu}>
              <button 
                className={styles.menuItem}
                onClick={handleRestartClick}
              >
                <span className={styles.menuItemIcon}>🔄</span>
                Start Fresh
              </button>
            </div>
          )}
        </div>
        <StarBadge count={userData.progress.totalStars} size="medium" />
      </header>

      {showConfirm && (
        <div className={styles.modalOverlay} onClick={() => setShowConfirm(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <span className={styles.modalIcon}>🔄</span>
            <h2 className={styles.modalTitle}>Start Fresh?</h2>
            <p className={styles.modalText}>
              This will reset all your progress, stars, and lessons. You'll pick a new name and character!
            </p>
            <div className={styles.modalButtons}>
              <button 
                className={styles.cancelButton}
                onClick={() => setShowConfirm(false)}
              >
                Keep Playing
              </button>
              <button 
                className={styles.confirmButton}
                onClick={handleConfirmRestart}
              >
                Start Fresh
              </button>
            </div>
          </div>
        </div>
      )}

      <main className={styles.main}>
        <div className={styles.currentTime} onClick={() => setScreen('clock')}>
          <span className={styles.timeLabel}>Current Time</span>
          <span className={styles.timeDisplay}>{time.formatted}</span>
          <span className={styles.tapHint}>Tap to explore!</span>
        </div>

        <div className={styles.progressCard}>
          <h3 className={styles.progressTitle}>Your Progress</h3>
          <ProgressBar progress={progressPercent} color="#667eea" height={16} />
          <span className={styles.progressText}>
            {completedCount} of {totalLessons} lessons completed
          </span>
          {userData.progress.currentStreak > 0 && (
            <div className={styles.streak}>
              🔥 {userData.progress.currentStreak} day streak!
            </div>
          )}
        </div>

        <div className={styles.menuGrid}>
          <button className={styles.menuCard} onClick={() => setScreen('clock')}>
            <span className={styles.menuIcon}>🕐</span>
            <span className={styles.menuTitle}>Live Clock</span>
            <span className={styles.menuDesc}>See what time it is now</span>
          </button>

          <button className={styles.menuCard} onClick={() => setScreen('learning')}>
            <span className={styles.menuIcon}>📚</span>
            <span className={styles.menuTitle}>Learn</span>
            <span className={styles.menuDesc}>Start your lessons</span>
          </button>

          <button className={styles.menuCard} onClick={() => setScreen('quiz')}>
            <span className={styles.menuIcon}>✨</span>
            <span className={styles.menuTitle}>Quiz</span>
            <span className={styles.menuDesc}>Test your skills</span>
          </button>
        </div>
      </main>

      <footer className={styles.footer}>
        <p className={styles.footerText}>Keep learning and have fun! 🌟</p>
      </footer>
    </div>
  );
}
