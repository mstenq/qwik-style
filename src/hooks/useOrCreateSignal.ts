import { MaybeSignal } from "@/types";
import { getValue, isSignal } from "@/utils";
import { Signal, useSignal } from "@builder.io/qwik";

export function useOrCreateSignal<T>(
  valOrSignal: MaybeSignal<T> | undefined,
  defaultValue: T
): Signal<T> {
  const isSig = isSignal(valOrSignal);
  // internalSignal is thrown away if given a signal,
  // but has to always be created due to rules of hooks
  const startingValue = getValue(valOrSignal) ?? defaultValue;
  const internalSignal = useSignal<T>(startingValue);

  // If given a signal, just return it
  if (isSig) {
    return valOrSignal;
  }

  // Otherwise return newly created signal
  return internalSignal;
}
