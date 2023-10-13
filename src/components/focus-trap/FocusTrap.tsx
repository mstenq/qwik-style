import {
  $,
  Slot,
  component$,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import { FocusTrapProps } from "./FocusTrap.types";
import { getValue } from "@/utils";

export const FocusTrap = component$((props: FocusTrapProps) => {
  const trapRef = useSignal<HTMLElement>();
  const focusableRefs = useSignal<HTMLElement[]>([]);
  const firstFocusableRef = useSignal<HTMLElement>();
  const lastFocusableRef = useSignal<HTMLElement>();

  const next = $(() => {
    const currentEl = document.activeElement as HTMLElement;
    if (!currentEl) return;

    if (currentEl === lastFocusableRef.value) {
      firstFocusableRef.value?.focus();
      return;
    }

    const currentIndex = focusableRefs.value?.indexOf(currentEl) ?? -1;
    const nextIndex = currentIndex + 1;
    const nextEl = focusableRefs.value?.[nextIndex];
    nextEl?.focus();
  });

  const prev = $(() => {
    const currentEl = document.activeElement as HTMLElement;
    if (!currentEl) return;

    if (currentEl === firstFocusableRef.value) {
      lastFocusableRef.value?.focus();
      return;
    }

    const currentIndex = focusableRefs.value?.indexOf(currentEl) ?? -1;
    const prevIndex = currentIndex - 1;
    const prevEl = focusableRefs.value?.[prevIndex];
    prevEl?.focus();
  });

  const keyDownHandler = $((e: KeyboardEvent) => {
    if (!firstFocusableRef.value || !lastFocusableRef.value) return;

    // replicate browser tab behaviour
    if (e.shiftKey && e.key === "Tab") {
      prev();
      e.preventDefault();
      return;
    }

    if (!e.shiftKey && e.key === "Tab") {
      next();
      e.preventDefault();
      return;
    }

    // has arrow navigation (Either type) handle end/home keys
    if (props.arrowNavigation) {
      if (e.key === "End") {
        lastFocusableRef.value.focus();
        e.preventDefault();
        return;
      }

      if (e.key === "Home") {
        firstFocusableRef.value.focus();
        e.preventDefault();
        return;
      }
    }

    // has vertical arrow navigation
    if (props.arrowNavigation === "vertical") {
      if (e.key === "ArrowDown") {
        next();
        e.preventDefault();
        return;
      }
      if (e.key === "ArrowUp") {
        prev();
        e.preventDefault();
        return;
      }
    }

    // has horizontal arrow navigation
    if (props.arrowNavigation === "horizontal") {
      if (e.key === "ArrowRight") {
        next();
        e.preventDefault();
        return;
      }
      if (e.key === "ArrowLeft") {
        prev();
        e.preventDefault();
        return;
      }
    }
  });

  useVisibleTask$(({ track, cleanup }) => {
    const isEnabled = track(() => getValue(props.enabled));
    const el = track(() => trapRef.value!);

    if (isEnabled === false) return;

    const focusableEls = el.querySelectorAll(
      'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled]), input:not([disabled])'
    );
    focusableRefs.value = Array.from(focusableEls) as HTMLElement[];
    firstFocusableRef.value = focusableEls[0] as HTMLElement;
    lastFocusableRef.value = focusableEls[
      focusableEls.length - 1
    ] as HTMLElement;

    el.addEventListener("keydown", keyDownHandler);
    cleanup(() => {
      el.removeEventListener("keydown", keyDownHandler);
    });

    if (props.focusFirst) {
      console.log("focusFirst");
      firstFocusableRef.value?.focus();
    }
  });

  return (
    <div ref={trapRef}>
      <Slot />
    </div>
  );
});
