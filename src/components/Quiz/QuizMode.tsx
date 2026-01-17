import { useState, useEffect, useMemo } from 'react';
import { useUser } from '../../context/UserContext';
import { quizQuestions, lessons } from '../../data/lessons';
import { Question } from './Question';
import { Results } from './Results';
import { ProgressBar } from '../common';
import styles from './Quiz.module.css';

const MAX_ATTEMPTS = 3;

export function QuizMode() {
  const { userData, setScreen, appState, setQuizResults, addQuizScore, addStars } = useUser();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [wrongAttempts, setWrongAttempts] = useState<number[]>([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  // Get questions based on completed lessons or current lesson
  const questions = useMemo(() => {
    if (!userData) return [];
    
    const lessonId = appState.currentLessonId;
    
    if (lessonId) {
      // Quiz for specific lesson
      return quizQuestions.filter(q => q.lessonId === lessonId);
    }
    
    // General quiz from completed lessons
    const completedIds = userData.progress.lessonsCompleted;
    if (completedIds.length === 0) {
      // If no lessons completed, use first lesson questions
      return quizQuestions.filter(q => q.lessonId === 1).slice(0, 5);
    }
    
    const availableQuestions = quizQuestions.filter(q => 
      completedIds.includes(q.lessonId)
    );
    
    // Shuffle and take 5-7 questions
    return shuffleArray(availableQuestions).slice(0, Math.min(7, availableQuestions.length));
  }, [userData, appState.currentLessonId]);

  useEffect(() => {
    setAnswers(new Array(questions.length).fill(null));
  }, [questions.length]);

  if (!userData) return null;

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleSelectAnswer = (answerIndex: number) => {
    if (isCorrect || showAnswer) return;
    if (wrongAttempts.includes(answerIndex)) return; // Can't select a wrong answer again
    setSelectedAnswer(answerIndex);
  };

  const handleConfirmAnswer = () => {
    if (selectedAnswer === null) return;
    
    const correct = selectedAnswer === currentQuestion.correctAnswer;
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    
    if (correct) {
      // Correct answer!
      setIsCorrect(true);
      const newAnswers = [...answers];
      newAnswers[currentQuestionIndex] = selectedAnswer;
      setAnswers(newAnswers);
    } else {
      // Wrong answer
      setWrongAttempts([...wrongAttempts, selectedAnswer]);
      setSelectedAnswer(null);
      
      // If max attempts reached, show the correct answer
      if (newAttempts >= MAX_ATTEMPTS) {
        setShowAnswer(true);
        // Record as incorrect (null or wrong answer)
        const newAnswers = [...answers];
        newAnswers[currentQuestionIndex] = -1; // Mark as incorrect
        setAnswers(newAnswers);
      }
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setAttempts(0);
      setWrongAttempts([]);
      setIsCorrect(false);
      setShowAnswer(false);
    } else {
      // Calculate results
      let correctCount = 0;
      answers.forEach((answer, index) => {
        if (answer === questions[index]?.correctAnswer) {
          correctCount++;
        }
      });

      // Save score
      const lessonId = appState.currentLessonId || 0;
      addQuizScore({
        lessonId,
        score: correctCount,
        totalQuestions: questions.length,
        date: new Date().toISOString(),
      });

      // Award stars based on performance
      const percentage = (correctCount / questions.length) * 100;
      const starsEarned = percentage >= 80 ? 3 : percentage >= 60 ? 2 : percentage >= 40 ? 1 : 0;
      if (starsEarned > 0) {
        addStars(starsEarned);
      }

      setQuizResults({
        correct: correctCount,
        total: questions.length,
        lessonId,
      });

      setShowResults(true);
    }
  };

  const handleBackToHome = () => {
    setQuizResults(null);
    setScreen('home');
  };

  const handleTryAgain = () => {
    setCurrentQuestionIndex(0);
    setAnswers(new Array(questions.length).fill(null));
    setSelectedAnswer(null);
    setAttempts(0);
    setWrongAttempts([]);
    setIsCorrect(false);
    setShowAnswer(false);
    setShowResults(false);
    setQuizResults(null);
  };

  if (showResults && appState.quizResults) {
    return (
      <Results
        correct={appState.quizResults.correct}
        total={appState.quizResults.total}
        characterId={userData.character}
        onBackToHome={handleBackToHome}
        onTryAgain={handleTryAgain}
      />
    );
  }

  if (!currentQuestion) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyContent}>
          <span className={styles.emptyIcon}>📚</span>
          <h2>Complete some lessons first!</h2>
          <p>Finish at least one lesson to unlock the quiz.</p>
          <button className={styles.backButton} onClick={() => setScreen('learning')}>
            Go to Lessons
          </button>
        </div>
      </div>
    );
  }

  const lessonForQuestion = lessons.find(l => l.id === currentQuestion.lessonId);
  const canProceed = isCorrect || showAnswer;
  const attemptsRemaining = MAX_ATTEMPTS - attempts;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button className={styles.exitButton} onClick={handleBackToHome}>
          ✕
        </button>
        <div className={styles.progressSection}>
          <span className={styles.progressText}>
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          <ProgressBar progress={progress} color="#f093fb" height={8} />
        </div>
      </header>

      <main className={styles.main}>
        <Question
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          wrongAttempts={wrongAttempts}
          isCorrect={isCorrect}
          showAnswer={showAnswer}
          attemptsRemaining={attemptsRemaining}
          onSelectAnswer={handleSelectAnswer}
          lessonColor={lessonForQuestion?.color || '#667eea'}
        />
      </main>

      <footer className={styles.footer}>
        {!canProceed ? (
          <button
            className={`${styles.confirmButton} ${selectedAnswer !== null ? styles.active : ''}`}
            onClick={handleConfirmAnswer}
            disabled={selectedAnswer === null}
          >
            Check Answer
          </button>
        ) : (
          <button className={styles.nextButton} onClick={handleNext}>
            {currentQuestionIndex < questions.length - 1 ? 'Next Question →' : 'See Results 🎉'}
          </button>
        )}
      </footer>
    </div>
  );
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
