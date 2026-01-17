import { useUser } from '../../context/UserContext';
import { useCurrentTime } from '../../hooks/useCurrentTime';
import { getTimeContext, getTimeOfDayEmoji, getActivitySuggestions } from '../../data/timeContexts';
import { speakTime } from '../../utils/timeHelpers';
import { CharacterSpeech } from '../Character';
import { TimeBackground } from './TimeBackground';
import styles from './Clock.module.css';

export function DigitalClock() {
  const { userData, setScreen } = useUser();
  const time = useCurrentTime();
  const timeContext = getTimeContext(time.hours);
  const activities = getActivitySuggestions(time.hours);

  if (!userData) return null;

  const spokenTime = speakTime(time.hours, time.minutes);

  return (
    <TimeBackground timeOfDay={timeContext.timeOfDay}>
      <div className={styles.container}>
        <button className={styles.backButton} onClick={() => setScreen('home')}>
          ← Back Home
        </button>

        <div className={styles.clockCard}>
          <div className={styles.timeWrapper}>
            <span className={styles.timeEmoji}>{getTimeOfDayEmoji(timeContext.timeOfDay)}</span>
            <div className={styles.digitalTime}>
              <span className={styles.hours}>{time.displayHours}</span>
              <span className={styles.colon}>:</span>
              <span className={styles.minutes}>{time.minutes.toString().padStart(2, '0')}</span>
              <span className={styles.seconds}>{time.seconds.toString().padStart(2, '0')}</span>
              <span className={styles.period}>{time.period}</span>
            </div>
            <p className={styles.spokenTime}>"{spokenTime}"</p>
          </div>
        </div>

        <div className={styles.contextCard}>
          <h2 className={styles.contextTitle}>{timeContext.greeting}</h2>
          <p className={styles.contextDescription}>{timeContext.activity}</p>
          
          <div className={styles.natureSection}>
            <span className={styles.natureIcon}>🌍</span>
            <p className={styles.natureText}>{timeContext.nature}</p>
          </div>

          <div className={styles.activitiesSection}>
            <h3 className={styles.activitiesTitle}>Things people do now:</h3>
            <ul className={styles.activitiesList}>
              {activities.map((activity, index) => (
                <li key={index} className={styles.activityItem}>
                  <span className={styles.activityDot}>•</span>
                  {activity}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.characterSection}>
          <CharacterSpeech
            characterId={userData.character}
            type="greeting"
            customMessage={getTimeMessage(time.hours, time.minutes)}
            size="medium"
          />
        </div>
      </div>
    </TimeBackground>
  );
}

function getTimeMessage(hours: number, _minutes: number): string {
  if (hours >= 6 && hours < 9) {
    return "Good morning! The day is just starting. What will you learn today?";
  } else if (hours >= 9 && hours < 12) {
    return "It's a great time to learn! Your brain is wide awake and ready!";
  } else if (hours >= 12 && hours < 13) {
    return "Lunchtime! After you eat, you'll have energy to learn more!";
  } else if (hours >= 13 && hours < 17) {
    return "The afternoon is perfect for practicing what you've learned!";
  } else if (hours >= 17 && hours < 20) {
    return "Evening time! Maybe practice telling time during dinner?";
  } else if (hours >= 20 && hours < 22) {
    return "Getting late! One quick lesson before bedtime?";
  } else {
    return "It's very late or very early! You should be resting!";
  }
}
