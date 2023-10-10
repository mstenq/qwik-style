import { MaybeSignal } from "@/types";
import { isSignal } from "./isSignal";

export const getValue = <T>(value: MaybeSignal<T>): T => {
  if (isSignal(value)) {
    return value.value;
  }
  return value;
};
