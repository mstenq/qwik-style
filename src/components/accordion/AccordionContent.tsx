import { getValue } from "@/utils";
import {
  $,
  Slot,
  component$,
  useContext,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import { AccordionContentProps } from "./Accordion.type";
import {
  accordionItemContextId,
  accordionRootContextId,
} from "./AccordionContext";
import { useSx } from "@/hooks";

export const AccordionContent = component$(
  ({ innerProps, ...props }: AccordionContentProps) => {
    const ref = useSignal<HTMLDivElement>();
    const innerRef = useSignal<HTMLDivElement>();
    const originalStylesRef = useSignal<Record<string, string>>();
    const heightRef = useSignal<number>(0);
    const { state, disabled, value } = useContext(accordionItemContextId);
    const { id } = useContext(accordionRootContextId);
    const contentClasses = useSx(props, "class");
    const innerClasses = useSx(innerProps!, "class");

    useVisibleTask$(
      ({ track }) => {
        const el = track(() => ref.value!);
        const innerEl = track(() => innerRef.value!);
        originalStylesRef.value = {
          transitionDuration: el.style.transitionDuration,
          animationName: el.style.animationName,
          height: el.style.height,
        };

        // block any animations/transitions so the element renders at its full dimensions
        el.style.transitionDuration = "0s";
        el.style.animationName = "none";
        el.style.height = "10px";

        heightRef.value = innerEl.scrollHeight;

        // restore original styles
        el.style.transitionDuration =
          originalStylesRef.value.transitionDuration;
        el.style.animationName = originalStylesRef.value.animationName;
        //el.style.height = originalStylesRef.value.height;
      },
      { strategy: "document-ready" }
    );

    // If state is open, immediately unhide the element
    useVisibleTask$(async ({ track }) => {
      console.log("useVisibleTask$");
      const openState = track(() => state.value);
      if (openState === "open") {
        ref.value!.hidden = false;
      }
    });

    // On animation end, if the state is closed, hide the element
    const checkHiddenState = $(() => {
      if (state.value === "closed" && ref.value!.hidden === false) {
        ref.value!.hidden = true;
      }
    });

    return (
      <div
        role="region"
        aria-labelledby={`Trigger-${id}-${value}`}
        ref={ref}
        {...props}
        data-state={state.value}
        data-disabled={disabled.value}
        style={`max-height: ${
          heightRef.value === 0 ? "0" : "auto"
        }; --radix-collapsible-content-height: ${
          heightRef.value ? `${heightRef.value}px` : undefined
        }; ${props.style}`}
        onAnimationEnd$={[checkHiddenState, props.onAnimationEnd$]}
        class={["AccordionContent", contentClasses.value]}
      >
        <div
          {...innerProps}
          ref={innerRef}
          class={["AccordionContentInner", innerClasses.value]}
        >
          <Slot />
        </div>
      </div>
    );
  }
);
