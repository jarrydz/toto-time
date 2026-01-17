// Time formatting utilities

export function formatHour(hour: number, use12Hour: boolean = true): string {
  if (use12Hour) {
    const displayHour = hour % 12 || 12;
    return displayHour.toString();
  }
  return hour.toString().padStart(2, '0');
}

export function formatMinute(minute: number): string {
  return minute.toString().padStart(2, '0');
}

export function formatTime(hours: number, minutes: number, includeSeconds: boolean = false, seconds: number = 0): string {
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  const displayMinutes = formatMinute(minutes);
  
  if (includeSeconds) {
    const displaySeconds = seconds.toString().padStart(2, '0');
    return `${displayHours}:${displayMinutes}:${displaySeconds} ${period}`;
  }
  
  return `${displayHours}:${displayMinutes} ${period}`;
}

export function speakTime(hours: number, minutes: number): string {
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  
  if (minutes === 0) {
    return `${displayHours} o'clock ${period}`;
  } else if (minutes === 15) {
    return `Quarter past ${displayHours} ${period}`;
  } else if (minutes === 30) {
    return `Half past ${displayHours} ${period}`;
  } else if (minutes === 45) {
    const nextHour = (displayHours % 12) + 1;
    return `Quarter to ${nextHour} ${period}`;
  } else if (minutes < 10) {
    return `${displayHours} oh ${minutes} ${period}`;
  } else {
    return `${displayHours} ${minutes} ${period}`;
  }
}

export function getHourWord(hour: number): string {
  const words = [
    'twelve', 'one', 'two', 'three', 'four', 'five',
    'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'
  ];
  const displayHour = hour % 12;
  return words[displayHour];
}

export function getMinuteWord(minute: number): string {
  if (minute === 0) return "o'clock";
  if (minute === 15) return 'fifteen';
  if (minute === 30) return 'thirty';
  if (minute === 45) return 'forty-five';
  
  const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty'];
  
  if (minute < 10) return `oh ${ones[minute]}`;
  if (minute < 20) return teens[minute - 10];
  
  const ten = Math.floor(minute / 10);
  const one = minute % 10;
  
  if (one === 0) return tens[ten];
  return `${tens[ten]}-${ones[one]}`;
}

export function parseTimeString(timeStr: string): { hours: number; minutes: number } | null {
  const match = timeStr.match(/^(\d{1,2}):(\d{2})(?:\s*(AM|PM))?$/i);
  if (!match) return null;
  
  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const period = match[3]?.toUpperCase();
  
  if (period === 'PM' && hours !== 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;
  
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return null;
  
  return { hours, minutes };
}

export function addMinutes(hours: number, minutes: number, addMins: number): { hours: number; minutes: number } {
  const totalMinutes = hours * 60 + minutes + addMins;
  const newHours = Math.floor(totalMinutes / 60) % 24;
  const newMinutes = totalMinutes % 60;
  return { hours: newHours, minutes: newMinutes };
}

export function minutesBetween(
  hours1: number, minutes1: number,
  hours2: number, minutes2: number
): number {
  const total1 = hours1 * 60 + minutes1;
  const total2 = hours2 * 60 + minutes2;
  return Math.abs(total2 - total1);
}
