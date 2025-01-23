export default function ClockSpin(props) {
    return (
      <div
        className={`flex flex-col gap-3 text-gray-200 items-center justify-center h-full ${props.sx1}`}
      >
        <div
          className={`animate-spin rounded-full border-r-[5px] border-t-[5px] border-l-[5px] h-[20px] w-[20px] border-gray-400 ${props.sx2}`}
        ></div>
      </div>
    );
  }
  