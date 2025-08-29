# Task Management (TASK.md)

## Current Sprint: Foundation Setup

**Status**: Ready to start
**Target**: Basic application structure with core dependencies

## Active Tasks

### 🟡 In Progress

- [x] Verify Next.js setup is working (✅ localhost:3000)

### ⭐ Next Up

- [ ] Configure TanStack Query provider
- [ ] Set up basic project structure and folders
- [ ] Create TypeScript type definitions
- [ ] Implement basic API client

## Backlog

### Phase 1: Foundation (Week 1)

- [x] **Setup & Configuration**

  - [x] Initialize Next.js project with latest version
  - [x] Install and configure TanStack Query v5
  - [x] Set up TypeScript with strict configuration
  - [x] Create basic folder structure
  - [x] Configure ESLint and Prettier

- [x] **Core Types & API**
  - [x] Define TypeScript interfaces for Post, User, PostDetail
  - [x] Create API client with fetch wrapper
  - [x] Set up JSONPlaceholder integration
  - [x] Implement error handling patterns
  - [x] Create mock data fallbacks

### Phase 2: Basic Features (Week 2)

- [x] **Initial Components**

  - [x] Create LiveBlog container component
  - [x] Implement basic Post component
  - [x] Add PostSkeleton loading component
  - [x] Set up QueryProvider wrapper

- [x] **Data Fetching**
  - [x] Implement useInfiniteQuery for posts
  - [x] Add basic polling functionality
  - [x] Create simple infinite scroll
  - [x] Handle loading and error states

### Phase 3: Performance Optimization (Week 3)

- [ ] **Virtual Scrolling**

  - [ ] Integrate React Window or TanStack Virtual
  - [ ] Implement viewport detection with Intersection Observer
  - [ ] Create skeleton replacement for off-screen items
  - [ ] Optimize re-render patterns

- [ ] **Lazy Loading**
  - [ ] Implement viewport-based detail loading
  - [ ] Add preload margin configuration
  - [ ] Create PostDetails lazy component
  - [ ] Optimize data fetching patterns

### Phase 4: Advanced Features (Week 4)

- [ ] **React 19 Features**

  - [ ] Implement useTransition for non-urgent updates
  - [ ] Add useDeferredValue for scroll optimization
  - [ ] Enhance Suspense boundaries
  - [ ] Add concurrent rendering optimizations

- [ ] **Configuration & Polish**
  - [ ] Make polling interval configurable
  - [ ] Add error retry mechanisms
  - [ ] Implement proper cleanup patterns
  - [ ] Add performance monitoring hooks

## Completed Tasks

- [x] Initialize Next.js 15 project with TypeScript, Tailwind, ESLint
- [x] Install @tanstack/react-query for data fetching
- [x] Install @tanstack/react-query-devtools for development
- [x] Install @tanstack/react-virtual for virtual scrolling
- [x] Verify development server works (✅ Next.js 15.5.2 + Turbopack + React 19)

## Discovered Issues

- None yet

## Technical Decisions Made

- **API Choice**: JSONPlaceholder for main posts, ReqRes for user details
- **Virtual Scrolling**: @tanstack/react-virtual (successfully installed with React 19)
- **State Management**: TanStack Query only (no additional state management)
- **Styling**: CSS modules for component-scoped styles

## Blockers & Dependencies

- None currently

## Notes & Insights

- Consider adding React DevTools Profiler integration for development
- Monitor bundle size impact of TanStack Query and virtual scrolling libraries
- Keep eye on React 19 features that might benefit the POC

## Metrics to Track

- [ ] Bundle size (target: < 1MB total)
- [ ] Time to first post render
- [ ] Memory usage pattern during long sessions
- [ ] API call frequency and caching effectiveness
- [ ] Component re-render frequency during scroll

## Next Review Date

TBD - After Phase 1 completion
