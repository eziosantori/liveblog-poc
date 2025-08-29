'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

// A Map to store all the elements being observed by a single shared observer
const observedElements = new Map<Element, (inView: boolean) => void>()
let sharedObserver: IntersectionObserver | null = null

// Create a shared intersection observer that can be reused across many elements
const getSharedObserver = (): IntersectionObserver => {
  if (sharedObserver) return sharedObserver

  sharedObserver = new IntersectionObserver(
    (entries) => {
      // Process all entries in a single callback
      entries.forEach((entry) => {
        const callback = observedElements.get(entry.target)
        if (callback) {
          callback(entry.isIntersecting)
        }
      })
    },
    {
      rootMargin: '200px 0px', // Preload content 200px before it enters viewport
      threshold: 0, // Trigger as soon as any part of the element is visible
    },
  )

  return sharedObserver
}

/**
 * A custom hook that provides intersection information using a shared observer instance
 * This is more efficient than creating a new observer for each element
 */
export function useSharedInView<T extends HTMLElement = HTMLDivElement>() {
  const [inView, setInView] = useState(false)
  const ref = useRef<T | null>(null)

  // Disconnect the element when the component unmounts
  const unobserve = useCallback((element: Element) => {
    if (!sharedObserver) return

    sharedObserver.unobserve(element)
    observedElements.delete(element)

    // If there are no more elements being observed, disconnect the observer
    if (observedElements.size === 0) {
      sharedObserver.disconnect()
      sharedObserver = null
    }
  }, [])

  // Function to set up the element to be observed
  const observe = useCallback((element: Element) => {
    const observer = getSharedObserver()

    // Store the callback in our Map
    observedElements.set(element, setInView)

    // Start observing the element
    observer.observe(element)
  }, [])

  // Set up the observer when the ref changes
  useEffect(() => {
    const element = ref.current
    if (!element) return

    observe(element)

    // Clean up when the component unmounts
    return () => {
      if (element) {
        unobserve(element)
      }
    }
  }, [observe, unobserve])

  return { ref, inView }
}
