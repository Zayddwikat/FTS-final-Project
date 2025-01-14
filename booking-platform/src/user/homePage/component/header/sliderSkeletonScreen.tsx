export default function SliderSkeletonLoader() {
  return (
    <div className="w-full h-full animate-pulse">
      <div className="w-full h-[50%] bg-gray-300 rounded-lg mb-4"></div>
      <div className="w-full h-[40%] flex gap-4">
        <div className="flex-1 bg-gray-300 rounded-lg"></div>
        <div className="flex-1 bg-gray-300 rounded-lg"></div>
        <div className="flex-1 bg-gray-300 rounded-lg"></div>
      </div>
    </div>
  );
}
