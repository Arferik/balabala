import { useCallback, useState } from "react";

export const useMerge = <T extends object>(initialState: T) => {
  const [state, setState] = useState(initialState);
  const merge = useCallback((partial: Partial<T>) => {
    setState((state) => ({ ...state, ...partial }));
  }, []);
  return [state, merge] as const;
};
