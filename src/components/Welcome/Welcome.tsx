import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import styles from './Welcome.module.css';

export function Welcome() {
  const { setScreen } = useUser();
  const [name, setName] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length >= 2) {
      setIsAnimating(true);
      // Store name temporarily and navigate to character select
      sessionStorage.setItem('tototime-temp-name', name.trim());
      setTimeout(() => {
        setScreen('character-select');
      }, 500);
    }
  };

  const isValidName = name.trim().length >= 2;

  return (
    <div className={`${styles.container} ${isAnimating ? styles.fadeOut : ''}`}>
      <div className={styles.content}>
        <div className={styles.clockIcon}>🕐</div>
        <h1 className={styles.title}>
          <span className={styles.toto}>Toto</span>
          <span className={styles.time}>Time</span>
        </h1>
        <p className={styles.subtitle}>Learn to tell time with fun!</p>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>
            What's your name?
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name..."
            className={styles.input}
            maxLength={20}
            autoFocus
          />
          <button 
            type="submit" 
            className={`${styles.button} ${isValidName ? styles.buttonActive : ''}`}
            disabled={!isValidName}
          >
            Let's Go! 🚀
          </button>
        </form>

        <div className={styles.animals}>
          <span className={styles.animal}>🐰</span>
          <span className={styles.animal}>🐼</span>
          <span className={styles.animal}>🐻</span>
          <span className={styles.animal}>🐵</span>
          <span className={styles.animal}>🐴</span>
          <span className={styles.animal}>🐙</span>
        </div>
      </div>
    </div>
  );
}
