import {
  $,
  Slot,
  component$,
  useContext,
  useSignal,
  useTask$,
  useVisibleTask$,
} from "@builder.io/qwik";
import { selectContextId } from "./SelectContext";
import { SelectOptionProps } from "./Select.types";
import { useSlotChild } from "@/hooks";

export const SelectOption = component$((props: SelectOptionProps) => {
  const buttonRef = useSignal<HTMLButtonElement>();
  const { open, value, renderValue } = useContext(selectContextId);

  const handleClick = $(() => {
    value.value = props.value;
    open.value = false;
    renderValue.value = buttonRef.value?.innerHTML;
  });

  useVisibleTask$(({ track }) => {
    const buttonEl = track(() => buttonRef.value);
    if (value.value === props.value) {
      renderValue.value = buttonEl?.innerHTML;
    }
  });

  return (
    <button
      ref={buttonRef}
      class="block w-full focus:bg-green-100"
      onClick$={handleClick}
      data-value={props.value}
    >
      <Slot />
    </button>
  );
});
