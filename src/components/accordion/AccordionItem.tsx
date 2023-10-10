import { getValue } from "@/utils";
import {
  Slot,
  component$,
  useComputed$,
  useContext,
  useContextProvider,
  useId,
} from "@builder.io/qwik";
import { SxDiv } from "../base-component/SxDiv";
import { AccordionItemContext, AccordionItemProps } from "./Accordion.type";
import {
  accordionItemContextId,
  accordionRootContextId,
} from "./AccordionContext";

export const AccordionItem = component$(
  ({
    value: propValue,
    disabled: propDisabled,
    ...props
  }: AccordionItemProps) => {
    const id = useId();
    const value = propValue ?? id;
    // const itemClass = useSx(props, "class", "AccordionItem");

    const accordionRootCtx = useContext(accordionRootContextId);

    // Register new values to root context
    if (!accordionRootCtx.allValues.value.includes(value)) {
      accordionRootCtx.allValues.value = [
        ...accordionRootCtx.allValues.value,
        value,
      ];
    }

    const state = useComputed$(() => {
      const activeValue = accordionRootCtx.value.value;
      let isOpen = false;
      if (Array.isArray(activeValue)) {
        if (activeValue.includes(value)) {
          isOpen = true;
        }
      } else {
        if (activeValue === value) {
          isOpen = true;
        }
      }
      return isOpen ? "open" : "closed";
    });

    const disabled = useComputed$(
      () => getValue(propDisabled) || accordionRootCtx.disabled.value
    );

    const contextService: AccordionItemContext = {
      state,
      value,
      disabled,
    };

    useContextProvider(accordionItemContextId, contextService);
    return (
      <SxDiv {...props} label="AccordionItem" classKey="class">
        <Slot />
      </SxDiv>
    );
  }
);
