import { Badge } from "../ui/badge";
import { cn } from "../../lib/utils";

export default function ItemBadge({ type, status }) {
  return (
    <div className="flex gap-2">
      <Badge
        className={cn(
          type === "LOST"
            ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
            : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
        )}
      >
        {type}
      </Badge>
      {status && (
        <Badge
          variant="outline"
          className={cn(
            status === "resolved"
              ? "border-green-400 text-green-600"
              : "border-sky-400 text-sky-600"
          )}
        >
          {status}
        </Badge>
      )}
    </div>
  );
}