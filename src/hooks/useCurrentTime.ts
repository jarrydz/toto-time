import { useState, useEffect } from 'react';

interface CurrentTime {
  hours: number;
  minutes: number;
  seconds: number;
  period: 'AM' | 'PM';
  displayHours: number;
  formatted: string;
  formattedWithSeconds: string;
}

export function useCurrentTime(updateInterval: number = 1000): CurrentTime {
  const [time, setTime] = useState<CurrentTime>(() => getTimeObject(new Date()));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getTimeObject(new Date()));
    }, updateInterval);

    return () => clearInterval(timer);
  }, [updateInterval]);

  return time;
}

function getTimeObject(date: Date): CurrentTime {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  
  const formatted = `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  const formattedWithSeconds = `${displayHours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${period}`;

  return {
    hours,
    minutes,
    seconds,
    period,
    displayHours,
    formatted,
    formattedWithSeconds,
  };
}
