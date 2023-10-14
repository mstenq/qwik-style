import { useOrCreateSignal } from "@/hooks";
import { getValue } from "@/utils";
import {
  $,
  Slot,
  component$,
  useContextProvider,
  useSignal,
  useTask$,
  useVisibleTask$,
} from "@builder.io/qwik";
import { Popover } from "../popover/Popover";
import { SyncSignal } from "../sync-signal";
import { SelectProps } from "./Select.types";
import { selectContextId } from "./SelectContext";

export const Select = component$((props: SelectProps) => {
  const popoverRef = useSignal<HTMLDivElement>();
  const buttonRef = useSignal<HTMLButtonElement>();
  const open = useOrCreateSignal(props.open, false);
  const value = useOrCreateSignal(props.value, "");
  const renderValue = useSignal<string | undefined>();
  const shouldFocusFirst = useSignal(true);

  useContextProvider(selectContextId, {
    open,
    value,
    renderValue,
  });

  useTask$(({ track }) => {
    const val = track(() => value.value);
    props?.onChange$?.(val);
  });

  useVisibleTask$(({ track }) => {
    const val = track(() => value.value);
    shouldFocusFirst.value = val === "" || val === undefined;
  });

  const handleChange = $((isOpen: boolean) => {
    // On open focus on selected value if available
    if (isOpen && popoverRef.value) {
      const el = window.document.querySelector(
        `[data-value="${value.value}"]`
      ) as HTMLElement | null;
      el?.focus();
    }

    // On close, focus on trigger button
    if (!isOpen) {
      buttonRef.value?.focus();
    }
  });

  return (
    <>
      <SyncSignal from={props.value} to={value} />
      <SyncSignal from={props.open} to={open} />
      <Popover
        ref={popoverRef}
        open={open}
        componentName="SelectPopover"
        placement="bottom"
        arrowOptions={false}
        offSetOptions={5}
        arrowNavigation="vertical"
        focusFirst={shouldFocusFirst.value}
        class={getValue(props.classDropdown)}
        onOpenChange$={handleChange}
      >
        <button
          ref={buttonRef}
          dangerouslySetInnerHTML={renderValue.value ?? props.placeholder}
          class={["SelectInput", getValue(props.classInput)]}
          q:slot="trigger"
        ></button>
        <Slot />
      </Popover>
    </>
  );
});
