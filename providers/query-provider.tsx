"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState, type ReactNode } from "react";

interface QueryProviderProps {
  children: ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  // Create a client with optimized defaults for our use case
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Stale time for posts - they change frequently
            staleTime: 1000 * 30, // 30 seconds
            // Cache time - keep in memory longer for smooth UX
            gcTime: 1000 * 60 * 5, // 5 minutes
            // Retry logic for failed requests
            retry: (failureCount, error) => {
              // Don't retry on 4xx errors (client errors)
              if (error instanceof Error && "status" in error) {
                const status = (error as Error & { status: number }).status;
                if (status >= 400 && status < 500) return false;
              }
              // Retry up to 3 times with exponential backoff
              return failureCount < 3;
            },
            // Refetch on window focus for live data
            refetchOnWindowFocus: true,
            // Don't refetch on reconnect immediately to avoid spam
            refetchOnReconnect: false,
          },
          mutations: {
            // Retry mutations once
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Only show devtools in development */}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
