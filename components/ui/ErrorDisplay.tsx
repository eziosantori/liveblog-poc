'use client'

import { memo } from 'react'

interface ErrorDisplayProps {
  error: Error | string
  resetAction?: (() => void) | undefined
}

export const ErrorDisplay = memo<ErrorDisplayProps>(
  ({ error, resetAction }) => {
    const errorMessage = error instanceof Error ? error.message : error

    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 my-4">
        <h3 className="text-lg font-semibold text-red-600 mb-2">
          Error Occurred
        </h3>
        <p className="text-red-700 mb-4">{errorMessage}</p>
        {resetAction && (
          <button
            onClick={resetAction}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        )}
      </div>
    )
  },
)

ErrorDisplay.displayName = 'ErrorDisplay'
