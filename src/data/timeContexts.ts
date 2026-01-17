import type { TimeContext, TimeOfDay } from '../types';

export const timeContexts: TimeContext[] = [
  {
    timeOfDay: 'early-morning',
    hourRange: [5, 7],
    greeting: 'Very Early Morning',
    activity: "It's super early! Most people are still sleeping, but the sun is starting to wake up.",
    nature: 'The sky is getting lighter as the sun begins to rise.',
    backgroundColor: '#2C3E50',
    gradientColors: ['#2C3E50', '#FD746C'],
  },
  {
    timeOfDay: 'morning',
    hourRange: [7, 9],
    greeting: 'Good Morning!',
    activity: "It's breakfast time! Time to eat yummy food and get ready for the day ahead.",
    nature: 'The sun is rising and the birds are singing their morning songs.',
    backgroundColor: '#FF9A56',
    gradientColors: ['#FF9A56', '#FFD194'],
  },
  {
    timeOfDay: 'late-morning',
    hourRange: [9, 12],
    greeting: 'Late Morning',
    activity: "School time or playtime! It's a great time to learn new things or play with friends.",
    nature: 'The sun is climbing higher in the sky. It\'s getting brighter outside!',
    backgroundColor: '#87CEEB',
    gradientColors: ['#87CEEB', '#E0F7FA'],
  },
  {
    timeOfDay: 'noon',
    hourRange: [12, 13],
    greeting: 'Noon - Lunchtime!',
    activity: "It's the middle of the day! Time for lunch and a little break.",
    nature: 'The sun is at its highest point in the sky. Shadows are at their shortest!',
    backgroundColor: '#4FC3F7',
    gradientColors: ['#4FC3F7', '#81D4FA'],
  },
  {
    timeOfDay: 'afternoon',
    hourRange: [13, 17],
    greeting: 'Good Afternoon!',
    activity: 'Afternoon activities! Maybe homework, sports, or playing with friends.',
    nature: 'The sun is slowly moving across the sky towards the horizon.',
    backgroundColor: '#64B5F6',
    gradientColors: ['#64B5F6', '#90CAF9'],
  },
  {
    timeOfDay: 'evening',
    hourRange: [17, 20],
    greeting: 'Good Evening!',
    activity: "Dinner time is near! It's time to wind down and enjoy family time.",
    nature: 'The sun is setting, painting the sky with beautiful orange and pink colors.',
    backgroundColor: '#FF7043',
    gradientColors: ['#FF7043', '#FFB74D'],
  },
  {
    timeOfDay: 'night',
    hourRange: [20, 22],
    greeting: 'Nighttime',
    activity: "It's getting late! Time for a bath, story time, and getting ready for bed.",
    nature: 'The moon and stars are coming out. The sky is turning dark blue and purple.',
    backgroundColor: '#5C6BC0',
    gradientColors: ['#5C6BC0', '#3949AB'],
  },
  {
    timeOfDay: 'late-night',
    hourRange: [22, 5],
    greeting: 'Late Night',
    activity: "Shhh... It's bedtime! Time to sleep and dream wonderful dreams.",
    nature: 'The moon is bright and the stars are twinkling. Everything is peaceful and quiet.',
    backgroundColor: '#1A237E',
    gradientColors: ['#1A237E', '#311B92'],
  },
];

export const getTimeContext = (hour: number): TimeContext => {
  // Handle the special case for late-night which wraps around midnight
  if (hour >= 22 || hour < 5) {
    return timeContexts.find(ctx => ctx.timeOfDay === 'late-night')!;
  }
  
  const context = timeContexts.find(ctx => {
    const [start, end] = ctx.hourRange;
    return hour >= start && hour < end;
  });
  
  return context || timeContexts[0];
};

export const getTimeOfDayEmoji = (timeOfDay: TimeOfDay): string => {
  const emojis: Record<TimeOfDay, string> = {
    'early-morning': '🌅',
    'morning': '🌞',
    'late-morning': '☀️',
    'noon': '🌤️',
    'afternoon': '⛅',
    'evening': '🌆',
    'night': '🌙',
    'late-night': '🌛',
  };
  return emojis[timeOfDay];
};

export const getActivitySuggestions = (hour: number): string[] => {
  if (hour >= 5 && hour < 7) {
    return ['Getting up early', 'Watching the sunrise', 'Morning stretch'];
  } else if (hour >= 7 && hour < 9) {
    return ['Eating breakfast', 'Brushing teeth', 'Getting dressed for school'];
  } else if (hour >= 9 && hour < 12) {
    return ['Learning at school', 'Reading books', 'Playing outside'];
  } else if (hour >= 12 && hour < 13) {
    return ['Eating lunch', 'Taking a break', 'Talking with friends'];
  } else if (hour >= 13 && hour < 17) {
    return ['Afternoon classes', 'Doing homework', 'Playing sports'];
  } else if (hour >= 17 && hour < 20) {
    return ['Eating dinner', 'Family time', 'Playing games'];
  } else if (hour >= 20 && hour < 22) {
    return ['Bath time', 'Reading stories', 'Getting ready for bed'];
  } else {
    return ['Sleeping', 'Having sweet dreams', 'Resting'];
  }
};

export const formatTimeWithPeriod = (hours: number, minutes: number): string => {
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  const displayMinutes = minutes.toString().padStart(2, '0');
  return `${displayHours}:${displayMinutes} ${period}`;
};

export const getRelativeTimeMessage = (hours: number, minutes: number): string => {
  const totalMinutes = hours * 60 + minutes;
  
  // Morning messages
  if (totalMinutes >= 7 * 60 && totalMinutes < 8 * 60) {
    return "Almost time for breakfast!";
  } else if (totalMinutes >= 8 * 60 && totalMinutes < 9 * 60) {
    return "School is starting soon!";
  } else if (totalMinutes >= 12 * 60 && totalMinutes < 13 * 60) {
    return "Lunchtime! Yummy!";
  } else if (totalMinutes >= 15 * 60 && totalMinutes < 16 * 60) {
    return "Afternoon snack time!";
  } else if (totalMinutes >= 18 * 60 && totalMinutes < 19 * 60) {
    return "Dinner time is here!";
  } else if (totalMinutes >= 20 * 60 && totalMinutes < 21 * 60) {
    return "Getting close to bedtime!";
  }
  
  return "";
};
