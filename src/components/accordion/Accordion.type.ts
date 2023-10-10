import { MaybeSignal } from "@/types";
import { PropFunction, QwikIntrinsicElements, Signal } from "@builder.io/qwik";

/* ROOT */
type AccordionType = "single" | "multiple";

export type AccordionRootContext = {
  id: string;
  type: AccordionType;
  value: Signal<string | string[]>;
  collapsible?: boolean;
  disabled: Signal<boolean>;
  allValues: Signal<string[]>;
  focusManager: PropFunction<(currentFocusValue: string, key: string) => void>;
};

type AccordionRootCommonProps = {
  collapsible?: boolean;
  disabled?: MaybeSignal<boolean>;
};

export type AccordionRootSingleProps = {
  type?: "single";
  value?: MaybeSignal<string>;
  defaultValue?: string;
  onValueChange$?: PropFunction<(newValue: string) => unknown>;
} & AccordionRootCommonProps &
  QwikIntrinsicElements["div"];

export type AccordionRootMultipleProps = {
  type: "multiple";
  value?: MaybeSignal<string[]>;
  defaultValue?: string[];
  onValueChange$?: PropFunction<(newValue: string[]) => unknown>;
} & AccordionRootCommonProps &
  QwikIntrinsicElements["div"];

export type AccordionRootProps =
  | AccordionRootSingleProps
  | AccordionRootMultipleProps;

/* ITEM */
export type AccordionItemContext = {
  state: Readonly<Signal<"open" | "closed">>;
  value: string;
  disabled: Readonly<Signal<boolean>>;
};

export type AccordionItemProps = {
  value?: string;
  disabled?: MaybeSignal<boolean>;
} & QwikIntrinsicElements["div"];

/* CONTENT */
export type AccordionContentProps = {
  innerProps?: QwikIntrinsicElements["div"];
} & QwikIntrinsicElements["div"];
