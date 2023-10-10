import { MaybeSignal } from "@/types";
import { PropFunction, QwikIntrinsicElements } from "@builder.io/qwik";

export type ModalProps = {
  open?: MaybeSignal<boolean>;
  onClose$?: PropFunction<() => unknown>;
  closeOnEscape?: boolean;
  closeOnClickOutside?: boolean;
} & Omit<QwikIntrinsicElements["dialog"], "open">;
