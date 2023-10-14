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

  useVisibleTask$(
    ({ track }) => {
      const buttonEl = track(() => buttonRef.value);
      if (value.value === props.value) {
        renderValue.value = buttonEl?.innerHTML;
      }
    },
    { strategy: "document-ready" }
  );

  return (
    <button
      ref={buttonRef}
      class={["SelectOption"]}
      onClick$={handleClick}
      data-value={props.value}
    >
      <Slot />
    </button>
  );
});
