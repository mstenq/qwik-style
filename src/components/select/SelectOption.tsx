import { Slot, component$ } from "@builder.io/qwik";

export const SelectOption = component$(() => {
  return (
    <div>
      <Slot />
    </div>
  );
});
