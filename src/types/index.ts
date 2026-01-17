// Character types
export type CharacterType = 'bunny' | 'panda' | 'bear' | 'monkey' | 'horse' | 'octopus';

export interface Character {
  id: CharacterType;
  name: string;
  emoji: string;
  color: string;
  personality: string;
  greetings: string[];
  encouragements: string[];
  celebrations: string[];
}

// User data types
export interface QuizScore {
  lessonId: number;
  score: number;
  totalQuestions: number;
  date: string;
}

export interface UserProgress {
  lessonsCompleted: number[];
  quizScores: QuizScore[];
  totalStars: number;
  currentStreak: number;
  lastPlayedDate: string | null;
}

export interface UserData {
  name: string;
  character: CharacterType;
  progress: UserProgress;
  createdAt: string;
}

// Lesson types
export type LessonDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface LessonStep {
  id: number;
  type: 'explanation' | 'practice' | 'interactive';
  title: string;
  content: string;
  characterMessage?: string;
  funFact?: string;
  timeExample?: string;
  hint?: string;
  animation?: 'bounce' | 'wiggle' | 'pulse' | 'spin';
}

export interface Lesson {
  id: number;
  title: string;
  description: string;
  difficulty: LessonDifficulty;
  icon: string;
  color: string;
  steps: LessonStep[];
  requiredLessons: number[];
}

// Quiz types
export type QuestionType = 'multiple-choice' | 'time-match' | 'fill-blank';

export interface QuizQuestion {
  id: number;
  lessonId: number;
  type: QuestionType;
  question: string;
  timeShown?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

// Time context types
export type TimeOfDay = 'early-morning' | 'morning' | 'late-morning' | 'noon' | 'afternoon' | 'evening' | 'night' | 'late-night';

export interface TimeContext {
  timeOfDay: TimeOfDay;
  hourRange: [number, number];
  greeting: string;
  activity: string;
  nature: string;
  backgroundColor: string;
  gradientColors: [string, string];
}

// App state types
export type AppScreen = 'welcome' | 'character-select' | 'home' | 'clock' | 'learning' | 'lesson' | 'quiz' | 'results';

export interface AppState {
  currentScreen: AppScreen;
  currentLessonId: number | null;
  quizResults: {
    correct: number;
    total: number;
    lessonId: number;
  } | null;
}
