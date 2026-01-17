import { UserProvider, useUser } from './context/UserContext';
import { Welcome, CharacterSelect } from './components/Welcome';
import { Home } from './components/Home';
import { DigitalClock } from './components/Clock';
import { LearningHub, Lesson } from './components/Learning';
import { QuizMode } from './components/Quiz';

function AppContent() {
  const { appState } = useUser();

  switch (appState.currentScreen) {
    case 'welcome':
      return <Welcome />;
    case 'character-select':
      return <CharacterSelect />;
    case 'home':
      return <Home />;
    case 'clock':
      return <DigitalClock />;
    case 'learning':
      return <LearningHub />;
    case 'lesson':
      return <Lesson />;
    case 'quiz':
    case 'results':
      return <QuizMode />;
    default:
      return <Welcome />;
  }
}

function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

export default App;
