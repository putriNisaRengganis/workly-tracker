"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface TimerContextType {
  isRunning: boolean;
  seconds: number;
  workingOn: string;
  project: string;
  task: string;
  setIsRunning: (running: boolean) => void;
  setWorkingOn: (val: string) => void;
  setProject: (val: string) => void;
  setTask: (val: string) => void;
  toggleTimer: () => void;
  resetTimer: () => void;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export function TimerProvider({ children }: { children: React.ReactNode }) {
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [workingOn, setWorkingOn] = useState("Website Development");
  const [project, setProject] = useState("Website Client A");
  const [task, setTask] = useState("Frontend Development");

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const toggleTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  return (
    <TimerContext.Provider
      value={{
        isRunning,
        seconds,
        workingOn,
        project,
        task,
        setIsRunning,
        setWorkingOn,
        setProject,
        setTask,
        toggleTimer,
        resetTimer,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
}

export function useTimer() {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error("useTimer must be used within a TimerProvider");
  }
  return context;
}