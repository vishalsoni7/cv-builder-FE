import { useContext, createContext, ReactNode } from "react";

export function createStoreContext<T>(StoreProvider: () => T) {
  const context = createContext<T | null>(null);

  interface StoreContextProviderProps {
    children: ReactNode;
  }

  function StoreContextProvider({ children }: StoreContextProviderProps) {
    const store = StoreProvider();

    return <context.Provider value={store}>{children}</context.Provider>;
  }

  function useStoreContext(): T {
    const store = useContext(context);

    if (!store) {
      throw new ReferenceError(
        `Store is not initialized. Make sure your component is wrapped in the Provider of the store.`
      );
    }

    return store;
  }

  return [StoreContextProvider, useStoreContext, context] as const;
}
