import { FloatingUIOptions } from "@/hooks/useFloatingUI";
import { MaybeSignal } from "@/types";
import {
  ClassList,
  JSXChildren,
  PropFunction,
  QwikIntrinsicElements,
} from "@builder.io/qwik";

export type TooltipProps = {
  tip: JSXChildren;
  tipClass?: MaybeSignal<ClassList>;
  open?: MaybeSignal<boolean>;
  onOpenChange$?: PropFunction<(open: boolean) => unknown>;
} & FloatingUIOptions &
  QwikIntrinsicElements["span"];
