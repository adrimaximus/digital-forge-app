
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import App from './App.tsx'
import './index.css'

const FallbackComponent = ({ error }: { error: Error }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-4">
      <div className="max-w-md w-full bg-slate-800 p-6 rounded-lg border border-slate-700 shadow-lg">
        <h2 className="text-xl text-yellow-400 font-bold mb-4">Something went wrong:</h2>
        <div className="bg-slate-900 p-4 rounded overflow-auto max-h-[60vh] mb-4">
          <pre className="text-sm text-slate-300">{error.message}</pre>
        </div>
        <button 
          onClick={() => window.location.reload()} 
          className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded-md transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
};

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary FallbackComponent={FallbackComponent}>
    <App />
  </ErrorBoundary>
);
