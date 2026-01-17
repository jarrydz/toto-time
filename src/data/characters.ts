import type { Character, CharacterType } from '../types';

export const characters: Record<CharacterType, Character> = {
  bunny: {
    id: 'bunny',
    name: 'Bella Bunny',
    emoji: '🐰',
    color: '#FFB6C1',
    personality: 'Cheerful and bouncy',
    greetings: [
      "Hop hop! Let's learn about time together!",
      "Hello friend! Ready to tell time?",
      "Yay! It's learning time with Bella!",
    ],
    encouragements: [
      "Keep hopping! You're doing great!",
      "Almost there! Try again!",
      "Every bunny makes mistakes. Let's try once more!",
    ],
    celebrations: [
      "Hoppy hooray! You got it right!",
      "Bouncing brilliant! Amazing work!",
      "You're a time-telling superstar!",
    ],
  },
  panda: {
    id: 'panda',
    name: 'Percy Panda',
    emoji: '🐼',
    color: '#98D8C8',
    personality: 'Calm and wise',
    greetings: [
      "Welcome, little one! Let's learn time together.",
      "Hello there! Percy is here to help!",
      "Ready to become a time master?",
    ],
    encouragements: [
      "Take your time. You can do this!",
      "Don't worry, every panda learns step by step.",
      "Close! Let's think about this together.",
    ],
    celebrations: [
      "Wonderful! You're so clever!",
      "Bamboo-tastic! That's correct!",
      "You make Percy so proud!",
    ],
  },
  bear: {
    id: 'bear',
    name: 'Bruno Bear',
    emoji: '🐻',
    color: '#DEB887',
    personality: 'Strong and supportive',
    greetings: [
      "Hey there, champ! Time to learn!",
      "Bruno Bear is ready to help you!",
      "Let's tackle time together!",
    ],
    encouragements: [
      "You're stronger than you think! Try again!",
      "Bears never give up. Neither should you!",
      "Almost! Give it one more big try!",
    ],
    celebrations: [
      "ROAR! You're amazing!",
      "Bear-y impressive work!",
      "That's the spirit! High five!",
    ],
  },
  monkey: {
    id: 'monkey',
    name: 'Max Monkey',
    emoji: '🐵',
    color: '#F4A460',
    personality: 'Playful and energetic',
    greetings: [
      "Ooh ooh! Let's swing into learning!",
      "Hey hey! Max is excited to teach you!",
      "Banana-rama! Time to learn time!",
    ],
    encouragements: [
      "Oops! Monkeys make mistakes too. Try again!",
      "So close! Swing back and try once more!",
      "Don't worry, learning is fun! Keep going!",
    ],
    celebrations: [
      "Ooh ooh ahh ahh! You nailed it!",
      "Monkey awesome! You're so smart!",
      "Bananas! That was perfect!",
    ],
  },
  horse: {
    id: 'horse',
    name: 'Holly Horse',
    emoji: '🐴',
    color: '#C19A6B',
    personality: 'Graceful and patient',
    greetings: [
      "Neigh there! Ready to gallop through time?",
      "Hello friend! Holly is here to guide you!",
      "Let's trot along the path of learning!",
    ],
    encouragements: [
      "Easy does it! You'll get there!",
      "Every great rider falls sometimes. Back in the saddle!",
      "Steady now, try again at your own pace!",
    ],
    celebrations: [
      "Magnificent gallop! You did it!",
      "You're racing ahead! Wonderful!",
      "Champion work! Holly is proud!",
    ],
  },
  octopus: {
    id: 'octopus',
    name: 'Ollie Octopus',
    emoji: '🐙',
    color: '#9370DB',
    personality: 'Creative and clever',
    greetings: [
      "Splash! Eight arms ready to help you learn!",
      "Bubble hello! Ollie is here!",
      "Let's dive deep into learning time!",
    ],
    encouragements: [
      "Bubble trouble? No worries, try again!",
      "Ollie has 8 arms and still makes mistakes. You've got this!",
      "Swim back and try once more!",
    ],
    celebrations: [
      "Ink-redible! You're so smart!",
      "Eight arms up for you! Amazing!",
      "Splash-tastic work! You're a star!",
    ],
  },
};

export const getCharacter = (id: CharacterType): Character => characters[id];

export const getRandomMessage = (messages: string[]): string => {
  return messages[Math.floor(Math.random() * messages.length)];
};

export const characterList = Object.values(characters);
