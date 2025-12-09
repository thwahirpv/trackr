'use client';

import { useEffect } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application Error:', error);
  }, [error]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background p-4 text-center">
      <div className="rounded-2xl border border-red-200 bg-red-50/50 p-8 shadow-sm dark:border-red-900/30 dark:bg-red-900/10">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
          <FaExclamationTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
        </div>
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-foreground">
          Something went wrong!
        </h2>
        <p className="mb-6 max-w-md text-sm text-muted-foreground">
          {error.message || "We couldn't connect to the server. Please check your internet connection and try again."}
        </p>
        <button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
          className="rounded-lg bg-primary px-6 py-2.5 cursor-pointer text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
