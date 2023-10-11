import { SyncSignal } from "@/components/sync-signal";
import { useOrCreateSignal, useSx } from "@/hooks";
import {
  $,
  Slot,
  component$,
  useContextProvider,
  useId,
  useSignal,
  useTask$,
} from "@builder.io/qwik";
import { AccordionRootContext, AccordionRootProps } from "./Accordion.type";
import { accordionRootContextId } from "./AccordionContext";

export const AccordionRoot = component$(
  ({
    type = "single",
    value,
    defaultValue,
    onValueChange$,
    collapsible,
    disabled,
    ...props
  }: AccordionRootProps) => {
    const id = useId();
    const rootClass = useSx(props, "class");

    const valueSignal = useOrCreateSignal(value, defaultValue ?? "");
    const disabledSignal = useOrCreateSignal(disabled, false);
    const allValues = useSignal<string[]>([]);

    const focusManager = $((currentFocusValue: string, key: string) => {
      const values = allValues.value;
      const activeIndex = values.findIndex((v) => v === currentFocusValue);
      const length = values.length;
      let nextIndex = activeIndex;
      if (key === "ArrowUp") {
        nextIndex = (activeIndex + length - 1) % length;
      } else if (key === "ArrowDown") {
        nextIndex = (activeIndex + 1) % length;
      } else if (key === "Home") {
        nextIndex = 0;
      } else if (key === "End") {
        nextIndex = length - 1;
      }
      const nextValue = values[nextIndex];
      const el = document.querySelector(
        `[data-id="${nextValue}"]`
      ) as HTMLElement | null;
      el?.focus();
    });

    const contextService: AccordionRootContext = {
      id,
      type,
      value: valueSignal,
      collapsible: collapsible,
      disabled: disabledSignal,
      allValues,
      focusManager,
    };

    useTask$(({ track }) => {
      const val = track(() => valueSignal.value);
      if (onValueChange$) {
        // @ts-ignore - PropFunction<T> doesn't seem to union correctly
        onValueChange$(val);
      }
    });

    useContextProvider(accordionRootContextId, contextService);

    return (
      <>
        <SyncSignal from={value} to={valueSignal} />
        <SyncSignal from={disabled} to={disabledSignal} />
        <div {...props} class={["AccordionRoot", rootClass.value]}>
          <button onClick$={() => focusManager("1", "Home")}>TEST</button>
          <Slot />
        </div>
      </>
    );
  }
);
