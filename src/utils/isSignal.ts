import { MaybeSignal } from "@/types";
import { Signal } from "@builder.io/qwik";

export const isSignal = <T>(val: MaybeSignal<T>): val is Signal<T> => {
  return (
    // typeof val === "object" && (val as object).hasOwnProperty("untrackedValue")
    typeof val === "object" &&
    Object.prototype.hasOwnProperty.call(val, "untrackedValue")
  );
};
