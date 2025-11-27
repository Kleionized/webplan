import { AppData, Task, DayRating } from './types';

const STORAGE_KEY = 'webplan-data';

export const loadData = (): AppData => {
  if (typeof window === 'undefined') {
    return { tasks: [], ratings: [] };
  }

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading data from localStorage:', error);
  }

  return { tasks: [], ratings: [] };
};

export const saveData = (data: AppData): void => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving data to localStorage:', error);
  }
};

export const saveTasks = (tasks: Task[]): void => {
  const data = loadData();
  saveData({ ...data, tasks });
};

export const saveRatings = (ratings: DayRating[]): void => {
  const data = loadData();
  saveData({ ...data, ratings });
};
