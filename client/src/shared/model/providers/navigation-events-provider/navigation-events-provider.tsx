"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { usePathname, useSearchParams } from "next/navigation";

type NavigationEvent = {
  pathname: string;
  searchParams: URLSearchParams;
  url: string;
};

type NavigationEventsContextType = {
  subscribe: (callback: (event: NavigationEvent) => void) => () => void;
} | null;

const NavigationEventsContext =
  createContext<NavigationEventsContextType>(null);

export function NavigationEventsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [subscribers, setSubscribers] = useState<
    Set<(event: NavigationEvent) => void>
  >(new Set());

  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
    subscribers.forEach((callback) =>
      callback({ pathname, searchParams, url }),
    );
  }, [pathname, searchParams]);

  const subscribe = useCallback(
    (callback: (event: NavigationEvent) => void) => {
      setSubscribers((prev) => new Set([...prev, callback]));
      return () =>
        setSubscribers((prev) => {
          const newSubscribers = new Set(prev);
          newSubscribers.delete(callback);
          return newSubscribers;
        });
    },
    [],
  );

  const value = useMemo(() => ({ subscribe }), [subscribe]);

  return (
    <NavigationEventsContext.Provider value={value}>
      {children}
    </NavigationEventsContext.Provider>
  );
}

export function useNavigationEvents(
  callback: (event: NavigationEvent) => void,
) {
  const context = useContext(NavigationEventsContext);

  if (!context) {
    throw new Error(
      "useNavigationEvents must be used within a NavigationEventsProvider",
    );
  }

  useEffect(() => {
    return context.subscribe(callback);
  }, [callback, context]);
}
