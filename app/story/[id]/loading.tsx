export default function Loading() {
  return (
    <>
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </>
  );
}
