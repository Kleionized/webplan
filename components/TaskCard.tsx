'use client';

import { Task } from '@/lib/types';
import { Check, Clock, Trash2, Edit } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onToggleComplete: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function TaskCard({ task, onToggleComplete, onEdit, onDelete }: TaskCardProps) {
  return (
    <div
      className={`bg-white rounded-lg p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow ${
        task.isCompleted ? 'opacity-60' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2 flex-1 min-w-0">
          <button
            onClick={onToggleComplete}
            className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
              task.isCompleted
                ? 'bg-pastel-mint border-pastel-mint'
                : 'border-gray-300 hover:border-pastel-mint'
            }`}
          >
            {task.isCompleted && <Check className="w-3 h-3 text-gray-700" />}
          </button>
          <div className="flex-1 min-w-0">
            <h4 className={`font-medium text-sm ${task.isCompleted ? 'line-through text-gray-500' : 'text-gray-800'}`}>
              {task.title}
            </h4>
            {task.description && (
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">{task.description}</p>
            )}
            {task.startTime && (
              <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                <span>
                  {task.startTime}
                  {task.endTime && ` - ${task.endTime}`}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={onEdit}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            title="Edit task"
          >
            <Edit className="w-4 h-4 text-gray-500" />
          </button>
          <button
            onClick={onDelete}
            className="p-1 hover:bg-red-50 rounded transition-colors"
            title="Delete task"
          >
            <Trash2 className="w-4 h-4 text-red-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
