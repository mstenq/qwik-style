import { CustomEventType } from "@/consts/CustomEvents";
import { MaybeSignal } from "@/types";
import { getValue } from "@/utils";
import { PropFunction, useVisibleTask$ } from "@builder.io/qwik";

export const useAddEventListener = (
  elementRef: MaybeSignal<HTMLElement | undefined> | undefined,
  eventName: keyof HTMLElementEventMap | CustomEventType,
  handler: PropFunction
) => {
  useVisibleTask$(({ track, cleanup }) => {
    const element = track(() => getValue(elementRef));
    if (!element) return;

    element.addEventListener(eventName, handler);

    cleanup(() => {
      element.removeEventListener(eventName, handler);
    });
  });
};
