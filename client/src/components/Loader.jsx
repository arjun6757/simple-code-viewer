export const Loader = ({ size }) => {

    const sizeClasses = {
      sm: "w-4 h-4 border-2",
      md: "w-6 h-6 border-[2.5px]",
      lg: "w-9 h-9 border-[3px]",
    }
  
    return (
      <div className="flex items-center" role="status" aria-label="Loading">
          <div
            className={`${sizeClasses[size]} rounded-full animate-spin border-gray-400 border-r-transparent`}
          />
      </div>
    )
  }