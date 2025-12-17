type Props = {
  title?: string;
  message?: string;
  onRetry?: () => void;
};


export default function ErrorState({
  title = 'Something went wrong',
  message = 'We were unable to load the data. Please try again.',
  onRetry,
}: Props) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <div className="mb-4 rounded-full bg-red-50 p-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01M5.455 19h13.09c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.723 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
  
  
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      <p className="mt-1 text-sm text-gray-500 max-w-sm">{message}</p>
  
  
      {
        onRetry && (
          <button
            onClick={onRetry}
            className="mt-4 rounded-md bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-800 cursor-pointer"
          >
            Retry
          </button>
        )
      }
    </div>
  );
}