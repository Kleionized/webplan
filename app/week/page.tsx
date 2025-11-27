'use client';

import { useState } from 'react';
import { useApp } from '@/lib/context';
import { formatDate, formatShortDayOfWeek, getWeekDays, generateId } from '@/lib/utils';
import { Task } from '@/lib/types';
import TaskCard from '@/components/TaskCard';
import TaskModal from '@/components/TaskModal';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { addWeeks, subWeeks } from 'date-fns';

export default function WeekPage() {
  const { tasks, addTask, updateTask, deleteTask, getRatingForDate } = useApp();
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [selectedDate, setSelectedDate] = useState<string>('');

  const weekDays = getWeekDays(currentWeekStart);

  const handlePreviousWeek = () => {
    setCurrentWeekStart(prev => subWeeks(prev, 1));
  };

  const handleNextWeek = () => {
    setCurrentWeekStart(prev => addWeeks(prev, 1));
  };

  const handleAddTask = (date: string) => {
    setSelectedDate(date);
    setEditingTask(undefined);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = (taskData: Partial<Task>) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
    } else {
      const newTask: Task = {
        id: generateId(),
        title: taskData.title!,
        description: taskData.description,
        date: taskData.date!,
        startTime: taskData.startTime,
        endTime: taskData.endTime,
        isCompleted: false,
      };
      addTask(newTask);
    }
  };

  const handleToggleComplete = (task: Task) => {
    updateTask(task.id, { isCompleted: !task.isCompleted });
  };

  const getTasksForDay = (date: string) => {
    return tasks
      .filter(t => t.date === date)
      .sort((a, b) => {
        if (a.startTime && b.startTime) {
          return a.startTime.localeCompare(b.startTime);
        }
        if (a.startTime) return -1;
        if (b.startTime) return 1;
        return 0;
      });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-light text-gray-800">Weekly Planner</h2>
          <p className="text-gray-500 mt-1">Organize your week</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePreviousWeek}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={() => setCurrentWeekStart(new Date())}
            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Today
          </button>
          <button
            onClick={handleNextWeek}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-4">
        {weekDays.map((day) => {
          const dateStr = formatDate(day);
          const dayTasks = getTasksForDay(dateStr);
          const rating = getRatingForDate(dateStr);
          const isToday = formatDate(new Date()) === dateStr;

          return (
            <div
              key={dateStr}
              className={`bg-white rounded-2xl p-4 shadow-sm border-2 transition-all ${
                isToday ? 'border-pastel-lavender' : 'border-transparent'
              }`}
            >
              <div className="mb-3">
                <div className="text-xs font-medium text-gray-500 uppercase">
                  {formatShortDayOfWeek(day)}
                </div>
                <div className="text-2xl font-light text-gray-800">
                  {day.getDate()}
                </div>
                {rating && (
                  <div className="mt-1">
                    <div className="text-xs text-gray-500">Rating</div>
                    <div className="flex items-center gap-1">
                      <div className={`w-6 h-6 rounded ${rating.rating >= 8 ? 'bg-pastel-yellow' : rating.rating >= 4 ? 'bg-pastel-lavender' : 'bg-gray-300'}`} />
                      <span className="text-xs font-medium text-gray-700">{rating.rating}/10</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2 mb-3 min-h-[200px]">
                {dayTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onToggleComplete={() => handleToggleComplete(task)}
                    onEdit={() => handleEditTask(task)}
                    onDelete={() => deleteTask(task.id)}
                  />
                ))}
              </div>

              <button
                onClick={() => handleAddTask(dateStr)}
                className="w-full py-2 border-2 border-dashed border-gray-200 rounded-lg text-gray-400 hover:border-pastel-lavender hover:text-pastel-lavender transition-colors flex items-center justify-center gap-1"
              >
                <Plus className="w-4 h-4" />
                <span className="text-sm">Add task</span>
              </button>
            </div>
          );
        })}
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        task={editingTask}
        defaultDate={selectedDate}
      />
    </div>
  );
}
