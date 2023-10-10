import {
  $,
  Slot,
  component$,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";

export const FocusTrap = component$(() => {
  const trapRef = useSignal<HTMLElement>();
  const firstFocusableRef = useSignal<HTMLElement>();
  const lastFocusableRef = useSignal<HTMLElement>();

  const keyDownHandler = $((e: KeyboardEvent) => {
    if (!firstFocusableRef.value || !lastFocusableRef.value) return;
    if (e.key !== "Tab") return;

    if (e.shiftKey && document.activeElement === firstFocusableRef.value) {
      lastFocusableRef.value.focus();
      e.preventDefault();
    }
    if (!e.shiftKey && document.activeElement === lastFocusableRef.value) {
      firstFocusableRef.value.focus();
      e.preventDefault();
    }
  });

  useVisibleTask$(({ track, cleanup }) => {
    const el = track(() => trapRef.value!);
    const focusableEls = el.querySelectorAll(
      'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled]), input:not([disabled])'
    );
    firstFocusableRef.value = focusableEls[0] as HTMLElement;
    lastFocusableRef.value = focusableEls[
      focusableEls.length - 1
    ] as HTMLElement;

    el.addEventListener("keydown", keyDownHandler);
    cleanup(() => {
      el.removeEventListener("keydown", keyDownHandler);
    });
  });

  return (
    <div ref={trapRef}>
      <Slot />
    </div>
  );
});
