import {
  useAddEventListener,
  useFloatingUI,
  useOrCreateSignal,
  useSlotChild,
} from "@/hooks";
import { getValue, isMouseInBounds } from "@/utils";
import {
  $,
  Slot,
  component$,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import { SyncSignal } from "../SyncSignal";
import { TooltipProps } from "./Tooltip.type";

export const Tooltip = component$(
  ({
    tip: TooltipContent,
    open: openProp,
    onOpenChange$,

    placement,
    offSetOptions,
    flipOptions,
    shiftOptions,
    sizeOptions,
    autoPlacementOptions,
    // unintiutavely, setting this to undefined will enable it...
    // should probably rethink middleware a bit, but works for now
    inlineOptions = undefined,
    arrowOptions,
    hideOptions,
    ...props
  }: TooltipProps) => {
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
      if (!isOpen) {
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
    useAddEventListener(triggerRef, "mouseenter", setOpenViaHover);

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
    });

    return (
      <span style={{ position: "relative" }}>
        <SyncSignal from={openProp} to={open} />
        <span ref={triggerParentRef} {...props}>
          <Slot />
        </span>
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
          class={["Tooltip", getValue(props.tipClass)]}
        >
          {TooltipContent}
          {arrowOptions !== false && (
            <div
              ref={arrowRef}
              style={{
                position: "absolute",
              }}
              class="TooltipArrow"
            ></div>
          )}
        </div>
      </span>
    );
  }
);
