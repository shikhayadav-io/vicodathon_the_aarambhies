"use client";

import { useEffect, useState } from "react";

interface QuestionTimerProps {
  durationInSeconds?: number;
  onTimeUp?: () => void;
}

export default function QuestionTimer({
  durationInSeconds = 120,
  onTimeUp,
}: QuestionTimerProps) {
  const [timeLeft, setTimeLeft] = useState(durationInSeconds);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (onTimeUp) onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const percentage = (timeLeft / durationInSeconds) * 100;

  return (
    <div className="flex items-center gap-3 bg-slate-900/90 border border-white/10 px-4 py-2 rounded-xl">
      <div className="relative w-8 h-8 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
          <path
            className="text-slate-800"
            strokeWidth="3"
            stroke="currentColor"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className={timeLeft < 20 ? "text-red-500" : "text-indigo-500"}
            strokeDasharray={`${percentage}, 100`}
            strokeWidth="3"
            strokeLinecap="round"
            stroke="currentColor"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
        <span className="absolute text-[10px] font-bold">
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </span>
      </div>
      <div className="text-xs font-medium text-gray-300">
        Time Remaining
      </div>
    </div>
  );
}