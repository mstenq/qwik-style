import { Slot, component$ } from "@builder.io/qwik";
import { SelectGroupProps } from "./Select.types";

export const SelectGroup = component$(({ label }: SelectGroupProps) => {
  return (
    <div>
      <div class="font-bold">{label}</div>
      <Slot />
    </div>
  );
});
