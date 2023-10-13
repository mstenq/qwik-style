import { MaybeSignal } from "@/types";
import { getValue, isMouseInBounds } from "@/utils";
import {
  $,
  PropFunction,
  Signal,
  useOnDocument,
  useOnWindow,
  useVisibleTask$,
} from "@builder.io/qwik";

type UseClickAwayOptions = {
  elementRefs: Signal<HTMLElement | undefined>[];
  enabled?: MaybeSignal<boolean>;
};

export const useClickAway = (
  callback: PropFunction<() => unknown>,
  { elementRefs, enabled }: UseClickAwayOptions
) => {
  const handler = $((e: Event) => {
    if (
      elementRefs.some((ref) => {
        const r = ref.value?.contains(e.target as Node);
        return r;
      })
    )
      return;
    callback();
  });

  useVisibleTask$(({ track, cleanup }) => {
    track(() => elementRefs);
    const isEnabled = track(() => getValue(enabled));
    if (isEnabled) {
      window.addEventListener("click", handler);
      cleanup(() => window.removeEventListener("click", handler));
    }
  });
};
