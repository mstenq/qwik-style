import { getValue } from "@/utils";
import {
  $,
  QwikIntrinsicElements,
  Slot,
  component$,
  useContext,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import {
  accordionItemContextId,
  accordionRootContextId,
} from "./AccordionContext";
import { useSx } from "@/hooks";

export const AccordionTrigger = component$(
  ({ onClick$, ...props }: QwikIntrinsicElements["button"]) => {
    const classes = useSx(props, "class");
    const { state, disabled, value } = useContext(accordionItemContextId);
    const {
      value: selectedValue,
      type,
      collapsible,
      focusManager,
      id,
    } = useContext(accordionRootContextId);

    const handleClick = $(() => {
      console.log("Trigger click");
      if (disabled.value) return;
      if (state.value === "open" && type === "single" && !collapsible) return;
      if (state.value === "open") {
        if (Array.isArray(selectedValue.value)) {
          selectedValue.value = selectedValue.value.filter((v) => v !== value);
        } else {
          console.log("close");
          selectedValue.value = "";
        }
      } else {
        if (Array.isArray(selectedValue.value)) {
          selectedValue.value = [...selectedValue.value, value];
        } else {
          console.log("open");
          selectedValue.value = value;
        }
      }
    });

    const buttonRef = useSignal<HTMLButtonElement>();

    useVisibleTask$(({ track, cleanup }) => {
      const buttonEl = track(() => buttonRef.value);
      if (!buttonEl) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (
          e.key === "ArrowDown" ||
          e.key === "ArrowUp" ||
          e.key === "Home" ||
          e.key === "End"
        ) {
          e.preventDefault();
          focusManager(value, e.key);
        }
      };

      buttonEl.addEventListener("keydown", handleKeyDown);
      cleanup(() => {
        buttonEl.removeEventListener("keydown", handleKeyDown);
      });
    });

    return (
      <h3>
        <button
          {...props}
          ref={buttonRef}
          id={`Trigger-${id}-${value}`}
          onClick$={[handleClick, onClick$]}
          disabled={disabled.value}
          class={["AccordionTrigger", classes.value]}
          data-id={value}
          data-state={state.value}
        >
          <Slot />
        </button>
      </h3>
    );
  }
);
