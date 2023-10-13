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
import { FocusTrapProps } from "../focus-trap/FocusTrap.types";

export type PopoverProps = {
  // ref?: MaybeSignal<HTMLDivElement>;
  open?: MaybeSignal<boolean>;
  onOpenChange$?: PropFunction<(open: boolean) => unknown>;
  componentName?: string;
} & FloatingUIOptions &
  FocusTrapProps &
  QwikIntrinsicElements["div"];
