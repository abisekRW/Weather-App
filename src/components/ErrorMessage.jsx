const ErrorMessage = ({ message, onDismiss }) => {
  return (
    <div className="bg-red-500 bg-opacity-20 backdrop-blur-md border border-red-300 border-opacity-30 text-white px-6 py-4 rounded-2xl flex items-center justify-between animate-fade-in">
      <div className="flex items-center">
        <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
        <span className="text-lg">{message}</span>
      </div>
      <button
        onClick={onDismiss}
        className="ml-4 text-white hover:text-red-200 transition-colors duration-200"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default ErrorMessage;