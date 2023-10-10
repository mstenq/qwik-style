import { MaybeSignal } from "@/types";
import { getValue } from "@/utils";
import { PropFunction, Signal, useVisibleTask$ } from "@builder.io/qwik";

export const useKeydown = (
  callback: PropFunction<(e: KeyboardEvent) => unknown>,
  options: {
    enabled?: MaybeSignal<boolean>;
    triggerKeys?: MaybeSignal<string[]>;
  }
) => {
  useVisibleTask$(({ track, cleanup }) => {
    const isEnabled = track(() => getValue(options.enabled) ?? true);
    const triggerKeys = track(() => getValue(options.triggerKeys));
    if (!isEnabled) return;

    const handleKeydown = (e: KeyboardEvent) => {
      if (triggerKeys?.includes(e.key) || !triggerKeys) {
        callback(e);
      }
    };

    document.addEventListener("keydown", handleKeydown);
    cleanup(() => {
      document.removeEventListener("keydown", handleKeydown);
    });
  });
};
