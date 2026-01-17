import { createContext, useContext, useCallback, useMemo, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { UserData, CharacterType, QuizScore, AppScreen, AppState } from '../types';

const STORAGE_KEY = 'tototime-user-data';

interface UserContextType {
  // User data
  userData: UserData | null;
  isNewUser: boolean;
  
  // App state
  appState: AppState;
  setScreen: (screen: AppScreen) => void;
  setCurrentLesson: (lessonId: number | null) => void;
  setQuizResults: (results: { correct: number; total: number; lessonId: number } | null) => void;
  
  // User actions
  createUser: (name: string, character: CharacterType) => void;
  completeLesson: (lessonId: number) => void;
  addQuizScore: (score: QuizScore) => void;
  addStars: (stars: number) => void;
  updateStreak: () => void;
  resetProgress: () => void;
  deleteUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const initialAppState: AppState = {
  currentScreen: 'welcome',
  currentLessonId: null,
  quizResults: null,
};

const createInitialUserData = (name: string, character: CharacterType): UserData => ({
  name,
  character,
  progress: {
    lessonsCompleted: [],
    quizScores: [],
    totalStars: 0,
    currentStreak: 0,
    lastPlayedDate: null,
  },
  createdAt: new Date().toISOString(),
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userData, setUserData, removeUserData] = useLocalStorage<UserData | null>(STORAGE_KEY, null);
  const [appState, setAppState] = useState<AppState>(() => ({
    ...initialAppState,
    currentScreen: userData ? 'home' : 'welcome',
  }));

  const isNewUser = userData === null;

  const setScreen = useCallback((screen: AppScreen) => {
    setAppState(prev => ({ ...prev, currentScreen: screen }));
  }, []);

  const setCurrentLesson = useCallback((lessonId: number | null) => {
    setAppState(prev => ({ ...prev, currentLessonId: lessonId }));
  }, []);

  const setQuizResults = useCallback((results: { correct: number; total: number; lessonId: number } | null) => {
    setAppState(prev => ({ ...prev, quizResults: results }));
  }, []);

  const createUser = useCallback((name: string, character: CharacterType) => {
    const newUser = createInitialUserData(name, character);
    setUserData(newUser);
    setScreen('home');
  }, [setUserData, setScreen]);

  const completeLesson = useCallback((lessonId: number) => {
    setUserData(prev => {
      if (!prev) return prev;
      const lessonsCompleted = prev.progress.lessonsCompleted.includes(lessonId)
        ? prev.progress.lessonsCompleted
        : [...prev.progress.lessonsCompleted, lessonId];
      return {
        ...prev,
        progress: {
          ...prev.progress,
          lessonsCompleted,
        },
      };
    });
  }, [setUserData]);

  const addQuizScore = useCallback((score: QuizScore) => {
    setUserData(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        progress: {
          ...prev.progress,
          quizScores: [...prev.progress.quizScores, score],
        },
      };
    });
  }, [setUserData]);

  const addStars = useCallback((stars: number) => {
    setUserData(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        progress: {
          ...prev.progress,
          totalStars: prev.progress.totalStars + stars,
        },
      };
    });
  }, [setUserData]);

  const updateStreak = useCallback(() => {
    setUserData(prev => {
      if (!prev) return prev;
      
      const today = new Date().toDateString();
      const lastPlayed = prev.progress.lastPlayedDate;
      
      let newStreak = prev.progress.currentStreak;
      
      if (!lastPlayed) {
        newStreak = 1;
      } else {
        const lastDate = new Date(lastPlayed);
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (lastDate.toDateString() === today) {
          // Already played today, keep streak
        } else if (lastDate.toDateString() === yesterday.toDateString()) {
          // Played yesterday, increment streak
          newStreak += 1;
        } else {
          // Missed a day, reset streak
          newStreak = 1;
        }
      }
      
      return {
        ...prev,
        progress: {
          ...prev.progress,
          currentStreak: newStreak,
          lastPlayedDate: today,
        },
      };
    });
  }, [setUserData]);

  const resetProgress = useCallback(() => {
    setUserData(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        progress: {
          lessonsCompleted: [],
          quizScores: [],
          totalStars: 0,
          currentStreak: 0,
          lastPlayedDate: null,
        },
      };
    });
  }, [setUserData]);

  const deleteUser = useCallback(() => {
    removeUserData();
    setAppState({ ...initialAppState, currentScreen: 'welcome' });
  }, [removeUserData]);

  const value = useMemo(() => ({
    userData,
    isNewUser,
    appState,
    setScreen,
    setCurrentLesson,
    setQuizResults,
    createUser,
    completeLesson,
    addQuizScore,
    addStars,
    updateStreak,
    resetProgress,
    deleteUser,
  }), [
    userData,
    isNewUser,
    appState,
    setScreen,
    setCurrentLesson,
    setQuizResults,
    createUser,
    completeLesson,
    addQuizScore,
    addStars,
    updateStreak,
    resetProgress,
    deleteUser,
  ]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser(): UserContextType {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
