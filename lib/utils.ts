import { format, startOfWeek, addDays, parseISO } from 'date-fns';

export function getWeekDays(date: Date = new Date()): Date[] {
  const start = startOfWeek(date, { weekStartsOn: 0 }); // Sunday
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
}

export function formatDate(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

export function formatDisplayDate(date: Date): string {
  return format(date, 'MMM d, yyyy');
}

export function formatDayOfWeek(date: Date): string {
  return format(date, 'EEEE');
}

export function formatShortDayOfWeek(date: Date): string {
  return format(date, 'EEE');
}

export function parseDate(dateStr: string): Date {
  return parseISO(dateStr);
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function getRatingColor(rating: number): string {
  if (rating >= 8) {
    // High: warm/bright colors
    return 'bg-gradient-to-br from-pastel-peach to-pastel-yellow';
  } else if (rating >= 4) {
    // Medium: neutral/mid-tone colors
    return 'bg-gradient-to-br from-pastel-lavender to-pastel-blue';
  } else {
    // Low: cooler/desaturated colors
    return 'bg-gradient-to-br from-gray-200 to-pastel-blue';
  }
}

export function calculateGrowthScore(ratings: { date: string; rating: number }[]): number[] {
  // Exponential growth calculation
  // growthScore = sum of (normalized_rating^2)
  const scores: number[] = [];
  let cumulativeScore = 0;

  const sortedRatings = [...ratings].sort((a, b) => a.date.localeCompare(b.date));

  for (const rating of sortedRatings) {
    const normalized = rating.rating / 10; // Normalize to 0-1
    const contribution = Math.pow(normalized, 2) * 10; // Exponential with k=2
    cumulativeScore += contribution;
    scores.push(cumulativeScore);
  }

  return scores;
}
