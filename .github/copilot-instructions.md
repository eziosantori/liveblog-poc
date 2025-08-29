# Copilot Development Instructions

## Project Context

This is a live blog POC focused on performance optimization using modern React/Next.js features. The goal is to demonstrate efficient handling of large datasets with smooth UX.

## Code Standards & Best Practices

### React & Next.js Patterns

- **Use Server Components by default**, Client Components only when necessary
- **Leverage PPR (Partial Pre-rendering)** for initial page loads
- **Implement proper Suspense boundaries** for loading states
- **Use React 18 concurrent features** (useTransition, useDeferredValue) appropriately
- **Minimize re-renders** through proper dependency management
- **Use React.memo sparingly** and only when performance profiling shows benefit

### Component Architecture

- **Container/Presenter pattern**: Separate data fetching from presentation
- **Custom hooks for reusable logic**: viewport detection, polling, virtualization
- **Compound components** for flexible composition
- **Props drilling minimization**: Use context only when necessary
- **Forward refs** for proper DOM access in virtualized components

### TanStack Query Guidelines

- **Use useInfiniteQuery** for paginated post data
- **Implement proper cache keys** with query key factories
- **Set appropriate staleTime and cacheTime** values
- **Handle optimistic updates** for better UX
- **Use query invalidation** strategically after mutations
- **Implement proper error retry logic** with exponential backoff

### Performance Optimization Rules

- **Virtual scrolling is mandatory** for lists > 100 items
- **Implement viewport-based lazy loading** for post details
- **Use React.startTransition** for non-urgent updates
- **Defer heavy computations** with useDeferredValue
- **Clean up effects properly** to prevent memory leaks
- **Monitor re-render frequency** in development

### TypeScript Guidelines

- **Use strict mode configuration** with no implicit any
- **Define proper interfaces** for all data structures
- **Use generic types** for reusable components and hooks
- **Implement proper error types** for API responses
- **Use discriminated unions** for variant props
- **Avoid type assertions** unless absolutely necessary

## File Organization Patterns

### Component Structure

```typescript
// Component file structure
import { memo } from "react";
import type { ComponentProps } from "./types";

interface Props {
  // Props definition
}

export const Component = memo<Props>(({ prop }) => {
  // Implementation
});

Component.displayName = "Component";
```

### Custom Hook Pattern

```typescript
// Hook file structure
import { useQuery } from "@tanstack/react-query";
import type { HookReturn, HookOptions } from "./types";

export function useCustomHook(options: HookOptions): HookReturn {
  // Implementation with proper cleanup
}
```

### API Integration Pattern

```typescript
// API client structure
import type { ApiResponse, ErrorResponse } from "./types";

export async function fetchData<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  // Proper error handling and response typing
}
```

## Performance Considerations

### Virtual Scrolling Implementation

- Use **TanStack Virtual** for modern virtual scrolling
- Implement **dynamic item sizing** if content varies significantly
- Add **overscan for smooth scrolling** (5-10 items)
- Handle **scroll restoration** properly after data updates

### Intersection Observer Usage

- **Create single observer instance** and reuse across components
- Use **proper cleanup** in useEffect returns
- Implement **throttling/debouncing** for performance
- Add **root margin** for preloading content

### Memory Management

- **Remove event listeners** in cleanup functions
- **Abort fetch requests** when components unmount
- **Clear timers and intervals** properly
- **Use WeakMap/WeakSet** when appropriate for caching

## Error Handling Patterns

### React Error Boundaries

```typescript
// Error boundary for each major feature
class FeatureErrorBoundary extends Component<PropsWithChildren> {
  // Proper error boundary implementation
}
```

### TanStack Query Error Handling

```typescript
// Query error handling pattern
const { data, error, isError, refetch } = useQuery({
  queryKey: ["posts"],
  queryFn: fetchPosts,
  retry: (failureCount, error) => {
    // Intelligent retry logic
  },
  onError: (error) => {
    // Error logging and user notification
  },
});
```

## Testing Guidelines

- **Focus on integration tests** over unit tests
- **Test performance scenarios** with large datasets
- **Mock API responses** consistently
- **Test error states** and edge cases
- **Verify cleanup behavior** in tests

## Development Workflow

### Code Review Checklist

- [ ] Component properly memoized if needed
- [ ] Effects have proper cleanup
- [ ] TypeScript types are accurate and complete
- [ ] Error states are handled gracefully
- [ ] Performance implications considered
- [ ] Accessibility basics implemented

### Performance Monitoring

- Use **React DevTools Profiler** during development
- Monitor **memory usage** with browser dev tools
- Check **Network tab** for API call patterns
- Verify **smooth 60fps scrolling** in performance tab

## Common Pitfalls to Avoid

- **Don't optimize prematurely** - profile first
- **Avoid excessive memo usage** - can hurt performance
- **Don't create objects/functions in render** without proper memoization
- **Avoid deep dependency arrays** in useEffect
- **Don't ignore TypeScript errors** - fix them properly
- **Avoid inline styles** - use CSS modules or styled components

## Debugging Tips

- Use **React DevTools Profiler** for render analysis
- Add **console.time/timeEnd** for performance measurement
- Use **Chrome DevTools Memory** tab for leak detection
- Implement **debug logging** with environment conditionals
- Add **error boundaries** with detailed error information

Remember: This is a performance-focused POC. Every architectural decision should prioritize smooth UX and efficient resource usage over feature completeness.
