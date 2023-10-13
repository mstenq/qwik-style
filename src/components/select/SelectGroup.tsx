import { Slot, component$ } from "@builder.io/qwik";
import { SelectGroupProps } from "./Select.types";

export const SelectGroup = component$(({ label }: SelectGroupProps) => {
  return (
    <div class={["SelectGroup"]}>
      <div class={["SelectGroupLabel", "font-bold"]}>{label}</div>
      <Slot />
    </div>
  );
});
