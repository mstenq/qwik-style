import { FloatingUIOptions } from "@/hooks/useFloatingUI";
import { MaybeSignal } from "@/types";
import { PropsOf } from "@/types/PropsOf";
import {
  FunctionComponent,
  PropFunction,
  PublicProps,
  QwikIntrinsicElements,
  Signal,
} from "@builder.io/qwik";

export type PopoverProps = {
  triggerType?: "click" | "hover";
  open?: MaybeSignal<boolean>;
  onOpenChange$?: PropFunction<(open: boolean) => unknown>;
} & FloatingUIOptions &
  QwikIntrinsicElements["div"];
