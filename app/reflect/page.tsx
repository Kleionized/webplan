'use client';

import { useState } from 'react';
import { useApp } from '@/lib/context';
import { formatDate, formatDisplayDate } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';
import { addDays, subDays } from 'date-fns';

export default function ReflectPage() {
  const { addOrUpdateRating, getRatingForDate, getTasksForDate } = useApp();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [rating, setRating] = useState<number>(0);
  const [note, setNote] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const dateStr = formatDate(selectedDate);
  const existingRating = getRatingForDate(dateStr);
  const tasksForDay = getTasksForDate(dateStr);
  const completedTasks = tasksForDay.filter(t => t.isCompleted);

  useState(() => {
    if (existingRating) {
      setRating(existingRating.rating);
      setNote(existingRating.note || '');
    } else {
      setRating(0);
      setNote('');
    }
  });

  const handlePreviousDay = () => {
    setSelectedDate(prev => subDays(prev, 1));
    setIsSaved(false);
    const newDateStr = formatDate(subDays(selectedDate, 1));
    const newRating = getRatingForDate(newDateStr);
    if (newRating) {
      setRating(newRating.rating);
      setNote(newRating.note || '');
    } else {
      setRating(0);
      setNote('');
    }
  };

  const handleNextDay = () => {
    setSelectedDate(prev => addDays(prev, 1));
    setIsSaved(false);
    const newDateStr = formatDate(addDays(selectedDate, 1));
    const newRating = getRatingForDate(newDateStr);
    if (newRating) {
      setRating(newRating.rating);
      setNote(newRating.note || '');
    } else {
      setRating(0);
      setNote('');
    }
  };

  const handleSave = () => {
    if (rating === 0) return;

    addOrUpdateRating({
      date: dateStr,
      rating,
      note: note.trim() || undefined,
    });

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-light text-gray-800">Daily Reflection</h2>
        <p className="text-gray-500 mt-1">How was your day?</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handlePreviousDay}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="text-center">
            <div className="text-2xl font-light text-gray-800">
              {formatDisplayDate(selectedDate)}
            </div>
            {tasksForDay.length > 0 && (
              <div className="text-sm text-gray-500 mt-1">
                {completedTasks.length} of {tasksForDay.length} tasks completed
              </div>
            )}
          </div>
          <button
            onClick={handleNextDay}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Rate your day (1-10)
            </label>
            <div className="flex justify-between gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                <button
                  key={value}
                  onClick={() => setRating(value)}
                  className={`flex-1 aspect-square rounded-xl text-lg font-medium transition-all ${
                    rating === value
                      ? value >= 8
                        ? 'bg-gradient-to-br from-pastel-peach to-pastel-yellow text-gray-800 shadow-md scale-110'
                        : value >= 4
                        ? 'bg-gradient-to-br from-pastel-lavender to-pastel-blue text-gray-800 shadow-md scale-110'
                        : 'bg-gradient-to-br from-gray-300 to-pastel-blue text-gray-800 shadow-md scale-110'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-2">
              Reflection (optional)
            </label>
            <textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pastel-lavender resize-none"
              placeholder="What made today special? What did you learn?"
              rows={4}
            />
          </div>

          {tasksForDay.length > 0 && (
            <div>
              <div className="text-sm font-medium text-gray-700 mb-2">Today's Tasks</div>
              <div className="space-y-2">
                {tasksForDay.map((task) => (
                  <div
                    key={task.id}
                    className={`flex items-center gap-2 text-sm ${
                      task.isCompleted ? 'text-gray-500 line-through' : 'text-gray-700'
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${task.isCompleted ? 'bg-pastel-mint' : 'bg-gray-300'}`} />
                    {task.title}
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleSave}
            disabled={rating === 0}
            className={`w-full py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
              rating === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : isSaved
                ? 'bg-pastel-mint text-gray-800'
                : 'bg-pastel-lavender text-gray-800 hover:bg-opacity-80'
            }`}
          >
            <Save className="w-5 h-5" />
            {isSaved ? 'Saved!' : existingRating ? 'Update Reflection' : 'Save Reflection'}
          </button>
        </div>
      </div>
    </div>
  );
}
