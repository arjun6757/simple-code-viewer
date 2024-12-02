export default function LoadingAnimation(props) {
  return (
    <div
      className={`flex flex-col gap-3 text-gray-200 items-center justify-center h-full ${props.sx1}`}
    >
      <div
        className={`animate-spin rounded-full h-8 w-8 border-t-0 border-r-2 border-gray-400 ${props.sx2}`}
      ></div>
    </div>
  );
}
