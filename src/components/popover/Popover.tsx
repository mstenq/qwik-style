import { CustomEvent } from "@/consts/CustomEvents";
import {
  useAddEventListener,
  useFloatingUI,
  useKeydown,
  useOrCreateSignal,
  useSlotChild,
} from "@/hooks";
import { useClickAway, useAutoAnimate } from "@/hooks";
import { getValue, isMouseInBounds } from "@/utils";
import {
  $,
  Slot,
  component$,
  noSerialize,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import { SyncSignal } from "../sync-signal";
import { FocusTrap } from "../focus-trap/FocusTrap";
import { PopoverProps } from "./Popover.type";

export const Popover = component$(
  ({
    open: openProp,
    onOpenChange$,
    componentName,
    placement,
    offSetOptions,
    flipOptions,
    shiftOptions,
    sizeOptions,
    autoPlacementOptions,
    inlineOptions,
    arrowOptions,
    hideOptions,
    ...props
  }: PopoverProps) => {
    const triggerParentRef = useSignal<HTMLElement>();
    const triggerRef = useSlotChild(triggerParentRef);
    // const animationParentRef = useSignal<HTMLElement>();
    const dialogRef = useSignal<HTMLDivElement>();
    const arrowRef = useSignal<HTMLDivElement>();
    const open = useOrCreateSignal(openProp, false);
    const [animationParentRef] = useAutoAnimate({
      duration: 180,
      easing: "cubic-bezier(0.1, -0.6, 0.2, 0)",
    });
    const position = useFloatingUI({
      enabled: open,
      triggerRef,
      dialogRef,
      arrowRef,
      placement,
      offSetOptions,
      flipOptions,
      shiftOptions,
      sizeOptions,
      autoPlacementOptions,
      inlineOptions,
      arrowOptions,
      hideOptions,
    });

    const toggleOpen = $(() => {
      open.value = !open.value;
    });

    // Sync open state with consumer if callback provided
    useVisibleTask$(({ track }) => {
      const isOpen = track(() => open.value);
      if (isOpen === undefined) return;
      onOpenChange$?.(isOpen);
    });

    // Wire up trigger to open/close popover
    useVisibleTask$(async ({ track, cleanup }) => {
      const triggerEl = track(() => triggerRef.value);
      if (!triggerEl) return;
      triggerEl.addEventListener("click", toggleOpen);
      cleanup(() => {
        triggerEl.removeEventListener("click", toggleOpen);
      });
    });

    useClickAway(
      $(() => (open.value = false)),
      dialogRef,
      triggerRef
    );

    // Wire up escape key
    useKeydown(
      $(() => (open.value = false)),
      {
        enabled: open,
        triggerKeys: ["Escape"],
      }
    );

    useAddEventListener(
      dialogRef,
      CustomEvent.Close,
      $(() => {
        open.value = false;
      })
    );

    // useVisibleTask$(
    //   ({ track }) => {
    //     const parentEl = track(() => animationParentRef.value);
    //     if (!parentEl) return;
    //     autoAnimate(parentEl, {
    //       duration: 200,
    //       easing: "cubic-bezier(0.1, -0.6, 0.2, 0)",
    //     });
    //   },
    //   { strategy: "document-ready" }
    // );

    return (
      <div style={{ position: "relative" }}>
        <SyncSignal from={openProp} to={open} />
        <span ref={triggerParentRef}>
          <Slot name="trigger" />
        </span>

        <FocusTrap>
          <div ref={animationParentRef}>
            {open.value && (
              <div
                ref={dialogRef}
                data-state={open.value ? "open" : "closed"}
                style={{
                  position: "absolute",
                  left: `${position.value.x}px`,
                  top: `${position.value.y}px`,
                }}
                class={[componentName ?? "Popover", getValue(props.class)]}
              >
                <Slot />
                {arrowOptions !== false && (
                  <div
                    ref={arrowRef}
                    style={{
                      position: "absolute",
                    }}
                    class={
                      componentName ? `${componentName}Arrow` : "PopoverArrow"
                    }
                  ></div>
                )}
              </div>
            )}
          </div>
        </FocusTrap>
      </div>
    );
  }
);
