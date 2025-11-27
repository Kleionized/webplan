export interface Task {
  id: string;
  title: string;
  description?: string;
  date: string; // ISO date string (YYYY-MM-DD)
  startTime?: string; // HH:mm format
  endTime?: string; // HH:mm format
  isCompleted: boolean;
}

export interface DayRating {
  date: string; // ISO date string (YYYY-MM-DD)
  rating: number; // 1-10
  note?: string;
}

export interface User {
  id: string;
  name?: string;
}

export interface AppData {
  tasks: Task[];
  ratings: DayRating[];
  user?: User;
}
