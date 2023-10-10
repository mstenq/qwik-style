import { CustomEvent } from "@/consts/CustomEvents";
import {
  useAddEventListener,
  useFloatingUI,
  useKeydown,
  useOrCreateSignal,
  useSlotChild,
} from "@/hooks";
import { useClickAway } from "@/hooks/useClickAway";
import { getValue, isMouseInBounds } from "@/utils";
import {
  $,
  Slot,
  component$,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import { SyncSignal } from "../SyncSignal";
import { FocusTrap } from "../focus-trap/FocusTrap";
import { PopoverProps } from "./Popover.type";

export const Popover = component$(
  ({
    open: openProp,
    triggerType = "click",
    onOpenChange$,
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
    const dialogRef = useSignal<HTMLDivElement>();
    const dialogDisplay = useSignal("none");
    const timerId = useSignal<number | null>(null);
    const arrowRef = useSignal<HTMLDivElement>();
    const open = useOrCreateSignal(openProp, false);
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

    const debounceOutOfBounds = $((isOutOfBounds: boolean) => {
      // Timer hasn't run yet, but we are in bounds, clear timer
      if (!isOutOfBounds && timerId.value) {
        clearTimeout(timerId.value);
        timerId.value = null;
      }

      if (isOutOfBounds && !timerId.value) {
        timerId.value = Number(
          setTimeout(
            $(() => {
              open.value = false;
            }),
            1000
          )
        );
      }
    });

    // Track mouse movements to determine if popover should be closed
    const handleMouseOver = $(async (e: MouseEvent) => {
      if (!triggerRef.value) return;
      if (!dialogRef.value) return;
      const isOutOfBounds =
        !isMouseInBounds(e, triggerRef.value) &&
        !isMouseInBounds(e, dialogRef.value);
      debounceOutOfBounds(isOutOfBounds);
    });

    // Don't init mouseover listener unless opened
    const setOpenViaHover = $(async () => {
      open.value = true;
      window.addEventListener("mouseover", handleMouseOver);
    });

    // Have to use a task here to remove listener to prevent circular refs
    useVisibleTask$(({ track }) => {
      const isOpen = track(() => open.value);
      if (!isOpen && triggerType === "hover") {
        window.removeEventListener("mouseover", handleMouseOver);
      }
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

      if (triggerType === "click") {
        triggerEl.addEventListener("click", toggleOpen);
        cleanup(() => {
          triggerEl.removeEventListener("click", toggleOpen);
        });
      }

      if (triggerType === "hover") {
        triggerEl.addEventListener("mouseenter", setOpenViaHover);
        cleanup(() => {
          triggerEl.removeEventListener("mouseenter", setOpenViaHover);
        });
      }
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

    const handleAnimationChange = $(() => {
      if (!dialogRef.value) return;
      // Delay hiding popover, giving time to animate
      if (!open.value) {
        // dumb hack to prevent flickering
        dialogRef.value.style.display = "none";
        dialogDisplay.value = "none";
      }
    });

    useAddEventListener(dialogRef, "animationend", handleAnimationChange);

    useVisibleTask$(({ track }) => {
      const isOpen = track(() => open.value);
      if (isOpen) {
        dialogDisplay.value = "block";
      }
      if (!isOpen && triggerType === "hover") {
        window.removeEventListener("mouseover", handleMouseOver);
      }
    });

    useAddEventListener(
      dialogRef,
      CustomEvent.Close,
      $(() => {
        open.value = false;
      })
    );

    return (
      <div style={{ position: "relative" }}>
        <SyncSignal from={openProp} to={open} />
        <span ref={triggerParentRef}>
          <Slot name="trigger" />
        </span>

        <FocusTrap>
          <div
            ref={dialogRef}
            data-state={open.value ? "open" : "closed"}
            onAnimationEnd$={handleAnimationChange}
            style={{
              position: "absolute",
              display: dialogDisplay.value,
              left: `${position.value.x}px`,
              top: `${position.value.y}px`,
            }}
            class={["Popover", getValue(props.class)]}
          >
            <Slot />
            {arrowOptions !== false && (
              <div
                ref={arrowRef}
                style={{
                  position: "absolute",
                }}
                class="PopoverArrow"
              ></div>
            )}
          </div>
        </FocusTrap>
      </div>
    );
  }
);
