export const PulsingDots = ({ size }) => {

  const sizeClasses = {
    small: "w-1 h-1 mx-0.5",
    medium: "w-2 h-2 mx-1",
    large: "w-3 h-3 mx-1.5",
  }

  return (
    <div className="flex items-center" role="status" aria-label="Loading">
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className={`${sizeClasses[size]} bg-gray-400 rounded-full animate-pulse`}
          style={{ animationDelay: `${index * 0.15}s` }}
        />
      ))}
    </div>
  )
}