"use client";

import { useRef } from "react";

export function useHoverIntent() {
  const closeTimer = useRef<number | null>(null);

  const cancelClose = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = (fn: () => void, delay = 120) => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => {
      fn();
      closeTimer.current = null;
    }, delay);
  };

  return { cancelClose, scheduleClose };
}
