import { MaybeSignal } from "@/types";
import { getValue } from "@/utils";
import { Signal, useSignal, useVisibleTask$ } from "@builder.io/qwik";

export const useSlotChild = (
  parentRef: MaybeSignal<HTMLElement | undefined> | undefined
): Signal<HTMLElement | undefined> => {
  const slotChildRef = useSignal<HTMLElement>();

  useVisibleTask$(({ track }) => {
    const parentEl = track(() => getValue(parentRef));
    if (!parentEl) return;

    const slotChildren = parentEl?.children;
    // IF NO CHILDREN, TREAT PARENT AS SLOT CHILD (Happens when only text is passed to slot)
    if (slotChildren?.length === 0) {
      slotChildRef.value = parentEl;
      return;
    }
    if (slotChildren?.length !== 1) return;
    slotChildRef.value = slotChildren[0] as HTMLElement;
  });

  return slotChildRef;
};
