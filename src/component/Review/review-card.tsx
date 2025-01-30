import { Star } from "lucide-react";
import { format } from "date-fns";

interface ReviewCardProps {
  data?: Array<{
    review: string;
    createdAt: string;
    ratingStars: number;
  }>;
}

export function ReviewCard({ data }: ReviewCardProps) {
  const reviewData = data?.[0]; 

  const formattedDate = reviewData?.createdAt
    ? format(new Date(reviewData.createdAt), "MMM dd, yyyy")
    : "Unknown date";

  return (
    <div className="flex gap-3 bg-white border border-gray-100 p-4 shadow-md rounded-md m-2">
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-900">{reviewData?.review || "No review provided"}</h3>
          <span className="text-sm text-gray-500">{formattedDate}</span>
        </div>
        <div className="mt-1 flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < (reviewData?.ratingStars || 0)
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-gray-200 text-gray-200"
              }`}
              aria-label={i < (reviewData?.ratingStars || 0) ? "Star filled" : "Star unfilled"}
            />
          ))}
          <span className="ml-2 text-sm font-medium text-gray-700">
            {reviewData?.ratingStars || 0} / 5
          </span>
        </div>
      </div>
    </div>
  );
}