"use client";

import { useEffect, useState } from "react";

import { useAppStore } from "@/store/use-app-store";

export function useStoreReady() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const finish = () => setReady(true);
    const unsub = useAppStore.persist.onFinishHydration(finish);
    void useAppStore.persist.rehydrate();
    return unsub;
  }, []);

  return ready;
}
