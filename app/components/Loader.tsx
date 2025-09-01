import { cn } from "@/utils/util";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  center?: "x" | "y" | "xy";
  className?: string;
  color?: "grey" | "lightgrey" | "blue";
}

export const Loader = ({
  size='md',
  center='x',
  color="lightgrey",
  className = "",
}: LoaderProps) => {

  const colorClasses = {
    grey: "border-gray-500 border-r-transparent",
    lightgrey: "border-gray-400 border-r-transparent",
    blue: "border-blue-500 border-r-transparent",
  };

  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-[2.5px]",
    lg: "w-9 h-9 border-[3px]",
  };

  const centerClasses = {
    y: "flex items-center",
    x: "flex justify-center",
    xy: "flex justify-center items-center",
  };


  return (
    <div
      className={cn(
        className,
        centerClasses[center],
      )}
      role="status"
      aria-label="Loading"
    >
      <div
        className={cn('rounded-full animate-spin', sizeClasses[size], colorClasses[color])}
      />
    </div>
  );
};
