import { $, PropFunction, Signal, useOnDocument } from "@builder.io/qwik";

export const useClickAway = (
  callback: PropFunction<() => unknown>,
  ...elementRefs: Signal<HTMLElement | undefined>[]
) => {
  const handler = $((e: Event) => {
    if (elementRefs.some((ref) => ref.value?.contains(e.target as Node)))
      return;
    callback();
  });

  useOnDocument("click", handler);
};
