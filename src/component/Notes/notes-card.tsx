import axios from 'axios';
import { Trash2 } from 'lucide-react';

interface BookReviewProps {
  id: string;
  text: string;
  timestamp: string;
  colorClass: string;
  onDelete: (id: string) => void;
}

const randomColor = () => {
  const colors = ["#8174A0", "#A888B5", "#EFB6C8", "#FFD2A0", "#FF8A65", "#FFAB91"];
  return colors[Math.floor(Math.random() * colors.length)];
}

export function BookReviewCard({ id, text, timestamp, colorClass, onDelete }: BookReviewProps) {

  return (
    <div style={{ backgroundColor: randomColor() }} className={`relative  group ${colorClass} rounded-lg p-4 shadow-sm overflow-hidden`}>
      <div className="space-y-2">
        <h2 className="font-medium text-gray-900">Notes :</h2>
        <p className="text-sm text-gray-700">{text}</p>
        <time className="block text-xs text-gray-600">{timestamp}</time>
      </div>

      {/* Delete Icon (Visible on Hover) */}
      <div className="absolute top-2 right-2">
        <button
          className="flex items-center justify-center p-2 text-red-500 transition rounded-full hover:text-red-600"
          aria-label="Delete review"
          onClick={() => onDelete(id)}
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
}
