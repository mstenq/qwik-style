import { UseFloatingUIProps } from "@/hooks";
import { MaybeSignal } from "@/types";
import { ClassList, PropFunction, Signal } from "@builder.io/qwik";

export type SelectContext = {
  value: Signal<string>;
  renderValue: Signal<string | undefined>;
  open: Signal<boolean>;
};

export type SelectProps = {
  placeholder?: string;
  floatingConfig?: UseFloatingUIProps;
  value?: MaybeSignal<string>;
  open?: MaybeSignal<boolean>;
  classInput?: MaybeSignal<ClassList>;
  classDropdown?: MaybeSignal<ClassList>;
  onChange$?: PropFunction<(value: string) => unknown>;
};

export type SelectGroupProps = {
  label: string;
};

export type SelectOptionProps = {
  value: string;
};
