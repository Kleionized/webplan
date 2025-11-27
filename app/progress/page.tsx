'use client';

import { useState, useMemo } from 'react';
import { useApp } from '@/lib/context';
import { formatDate, getRatingColor, calculateGrowthScore, formatDisplayDate, parseDate } from '@/lib/utils';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { subDays } from 'date-fns';
import { X } from 'lucide-react';

export default function ProgressPage() {
  const { ratings, getTasksForDate } = useApp();
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [showGraph, setShowGraph] = useState(true);

  const last100Days = useMemo(() => {
    const days = [];
    const today = new Date();
    for (let i = 99; i >= 0; i--) {
      const date = subDays(today, i);
      days.push({
        date: formatDate(date),
        dayNumber: 100 - i,
      });
    }
    return days;
  }, []);

  const dayRatings = useMemo(() => {
    return last100Days.map(day => {
      const rating = ratings.find(r => r.date === day.date);
      return {
        ...day,
        rating: rating?.rating,
        note: rating?.note,
      };
    });
  }, [last100Days, ratings]);

  const chartData = useMemo(() => {
    const ratingsForCalc = ratings
      .filter(r => {
        const ratingDate = parseDate(r.date);
        const earliestDate = parseDate(last100Days[0].date);
        return ratingDate >= earliestDate;
      })
      .sort((a, b) => a.date.localeCompare(b.date));

    const scores = calculateGrowthScore(ratingsForCalc);

    return last100Days.map((day, index) => {
      const rating = ratings.find(r => r.date === day.date);
      const scoreIndex = ratingsForCalc.findIndex(r => r.date === day.date);

      return {
        day: day.dayNumber,
        score: scoreIndex >= 0 ? scores[scoreIndex] : null,
        rating: rating?.rating || null,
      };
    });
  }, [last100Days, ratings]);

  const handleDayClick = (dayNumber: number) => {
    setSelectedDay(dayNumber);
  };

  const selectedDayData = useMemo(() => {
    if (selectedDay === null) return null;
    const dayData = dayRatings[selectedDay - 1];
    const tasks = getTasksForDate(dayData.date);
    return { ...dayData, tasks };
  }, [selectedDay, dayRatings, getTasksForDate]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-light text-gray-800">100-Day Progress</h2>
        <p className="text-gray-500 mt-1">Visualize your journey and growth</p>
      </div>

      {showGraph && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Growth Mountain</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E6E6FA" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#E6E6FA" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="day"
                stroke="#9ca3af"
                label={{ value: 'Day', position: 'insideBottom', offset: -5 }}
              />
              <YAxis
                stroke="#9ca3af"
                label={{ value: 'Growth Score', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Area
                type="monotone"
                dataKey="score"
                stroke="#D4C5F9"
                strokeWidth={2}
                fill="url(#colorScore)"
                connectNulls
              />
            </AreaChart>
          </ResponsiveContainer>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Growth accelerates exponentially with consistent high ratings
          </p>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">100-Day Grid</h3>
        <div className="grid grid-cols-10 gap-2">
          {dayRatings.map((day) => (
            <button
              key={day.dayNumber}
              onClick={() => handleDayClick(day.dayNumber)}
              className={`aspect-square rounded-lg transition-all hover:scale-110 ${
                day.rating
                  ? getRatingColor(day.rating)
                  : 'bg-gray-100 hover:bg-gray-200'
              } ${selectedDay === day.dayNumber ? 'ring-2 ring-gray-800 scale-110' : ''}`}
              title={`Day ${day.dayNumber}${day.rating ? ` - Rating: ${day.rating}/10` : ''}`}
            />
          ))}
        </div>

        <div className="mt-4 flex items-center justify-center gap-6 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gray-100" />
            <span>No rating</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-to-br from-gray-200 to-pastel-blue" />
            <span>Low (1-3)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-to-br from-pastel-lavender to-pastel-blue" />
            <span>Medium (4-7)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-to-br from-pastel-peach to-pastel-yellow" />
            <span>High (8-10)</span>
          </div>
        </div>
      </div>

      {selectedDayData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-30">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Day {selectedDay}
              </h3>
              <button
                onClick={() => setSelectedDay(null)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-500">Date</div>
                <div className="text-lg text-gray-800">
                  {formatDisplayDate(parseDate(selectedDayData.date))}
                </div>
              </div>

              {selectedDayData.rating && (
                <>
                  <div>
                    <div className="text-sm text-gray-500">Rating</div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className={`w-12 h-12 rounded-lg ${getRatingColor(selectedDayData.rating)}`} />
                      <span className="text-2xl font-semibold text-gray-800">
                        {selectedDayData.rating}/10
                      </span>
                    </div>
                  </div>

                  {selectedDayData.note && (
                    <div>
                      <div className="text-sm text-gray-500">Reflection</div>
                      <p className="text-gray-700 mt-1">{selectedDayData.note}</p>
                    </div>
                  )}
                </>
              )}

              {selectedDayData.tasks && selectedDayData.tasks.length > 0 && (
                <div>
                  <div className="text-sm text-gray-500 mb-2">Tasks</div>
                  <div className="space-y-2">
                    {selectedDayData.tasks.map((task) => (
                      <div
                        key={task.id}
                        className={`flex items-start gap-2 text-sm ${
                          task.isCompleted ? 'text-gray-500' : 'text-gray-700'
                        }`}
                      >
                        <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
                          task.isCompleted ? 'bg-pastel-mint' : 'bg-gray-300'
                        }`} />
                        <span className={task.isCompleted ? 'line-through' : ''}>
                          {task.title}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    {selectedDayData.tasks.filter(t => t.isCompleted).length} of {selectedDayData.tasks.length} completed
                  </div>
                </div>
              )}

              {!selectedDayData.rating && (!selectedDayData.tasks || selectedDayData.tasks.length === 0) && (
                <div className="text-center text-gray-500 py-4">
                  No data for this day yet
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
