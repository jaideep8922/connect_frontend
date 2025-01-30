import axios from 'axios';
import { Trash2 } from 'lucide-react';

interface BookReviewProps {
  id: string; 
  text: string;
  timestamp: string;
  colorClass: string;
  onDelete: (id: string) => void;
}

export function BookReviewCard({ id, text, timestamp, colorClass, onDelete }: BookReviewProps) {

  return (
    <div className={`relative bg-white group ${colorClass} rounded-lg p-4 shadow-sm overflow-hidden`}>
      <div className="space-y-2">
        <h2 className="font-medium text-gray-900">Notes :</h2>
        <p className="text-sm text-gray-700">{text}</p>
        <time className="block text-xs text-gray-600">{timestamp}</time>
      </div>

      {/* Delete Icon (Visible on Hover) */}
      <div className="absolute top-2 right-2">
        <button
          className="flex items-center justify-center rounded-full p-2 text-red-500 hover:text-red-600 transition"
          aria-label="Delete review"
          onClick={() => onDelete(id)}
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>

    </div>
  );
}
