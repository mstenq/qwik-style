import { Signal, component$, useTask$ } from "@builder.io/qwik";
import { MaybeSignal } from "@/types";
import { getValue, isSignal } from "@/utils";

type SyncSignalProps<T> = {
  from: MaybeSignal<T>;
  to: Signal<T>;
};

export const SyncSignal = component$(<T,>({ from, to }: SyncSignalProps<T>) => {
  useTask$(({ track }) => {
    const val = track(() => getValue(from));
    if (!isSignal(from)) {
      to.value = val;
    }
  });
  return null;
});
