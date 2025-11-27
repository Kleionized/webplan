'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Task, DayRating, AppData } from './types';
import { loadData, saveData } from './storage';

interface AppContextType {
  tasks: Task[];
  ratings: DayRating[];
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  addOrUpdateRating: (rating: DayRating) => void;
  getRatingForDate: (date: string) => DayRating | undefined;
  getTasksForDate: (date: string) => Task[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<AppData>({ tasks: [], ratings: [] });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadedData = loadData();
    setData(loadedData);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      saveData(data);
    }
  }, [data, isLoaded]);

  const addTask = (task: Task) => {
    setData(prev => ({ ...prev, tasks: [...prev.tasks, task] }));
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setData(prev => ({
      ...prev,
      tasks: prev.tasks.map(task =>
        task.id === id ? { ...task, ...updates } : task
      ),
    }));
  };

  const deleteTask = (id: string) => {
    setData(prev => ({
      ...prev,
      tasks: prev.tasks.filter(task => task.id !== id),
    }));
  };

  const addOrUpdateRating = (rating: DayRating) => {
    setData(prev => {
      const existingIndex = prev.ratings.findIndex(r => r.date === rating.date);
      if (existingIndex >= 0) {
        const newRatings = [...prev.ratings];
        newRatings[existingIndex] = rating;
        return { ...prev, ratings: newRatings };
      }
      return { ...prev, ratings: [...prev.ratings, rating] };
    });
  };

  const getRatingForDate = (date: string): DayRating | undefined => {
    return data.ratings.find(r => r.date === date);
  };

  const getTasksForDate = (date: string): Task[] => {
    return data.tasks.filter(t => t.date === date);
  };

  return (
    <AppContext.Provider
      value={{
        tasks: data.tasks,
        ratings: data.ratings,
        addTask,
        updateTask,
        deleteTask,
        addOrUpdateRating,
        getRatingForDate,
        getTasksForDate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
