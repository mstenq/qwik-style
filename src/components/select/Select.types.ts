import { UseFloatingUIProps } from "@/hooks";
import { MaybeSignal } from "@/types";
import {
  Component,
  FunctionComponent,
  JSXChildren,
  JSXNode,
} from "@builder.io/qwik";

export type SelectProps = {
  placeholder?: string;
  floatingConfig?: UseFloatingUIProps;
  open?: MaybeSignal<boolean>;
};

export type SelectGroupProps = {
  label: string;
};

export type SelectOptionProps = {};
