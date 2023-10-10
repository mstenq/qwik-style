import { MaybeSignal } from "@/types";
import { getValue } from "@/utils";
import { $, NoSerialize, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import {
  ArrowOptions,
  AutoPlacementOptions,
  FlipOptions,
  HideOptions,
  InlineOptions,
  Middleware,
  OffsetOptions,
  Placement,
  ShiftOptions,
  SizeOptions,
  arrow,
  autoPlacement,
  autoUpdate,
  computePosition,
  flip,
  hide,
  inline,
  offset,
  shift,
  size,
} from "@floating-ui/dom";

export type FloatingUIOptions = {
  placement?: MaybeSignal<Placement>;
  offSetOptions?: NoSerialize<OffsetOptions> | false;
  flipOptions?: NoSerialize<FlipOptions> | false;
  shiftOptions?: NoSerialize<ShiftOptions> | false;
  sizeOptions?: NoSerialize<SizeOptions> | false;
  autoPlacementOptions?: NoSerialize<AutoPlacementOptions> | false;
  inlineOptions?: NoSerialize<InlineOptions> | false;
  arrowOptions?: Omit<NoSerialize<ArrowOptions>, "element"> | false;
  hideOptions?: NoSerialize<HideOptions> | false;
};

export type UseFloatingUIProps = {
  triggerRef: MaybeSignal<HTMLElement | undefined>;
  dialogRef: MaybeSignal<HTMLElement | undefined>;
  arrowRef?: MaybeSignal<HTMLElement | undefined>;
  enabled: MaybeSignal<boolean>;
} & FloatingUIOptions;

export const useFloatingUI = ({
  enabled,
  triggerRef,
  dialogRef,
  arrowRef,

  placement = "bottom",
  flipOptions,
  shiftOptions,
  offSetOptions,
  sizeOptions = false,
  autoPlacementOptions = false,
  inlineOptions = false,
  arrowOptions,
  hideOptions = false,
}: UseFloatingUIProps) => {
  const position = useSignal({ x: 0, y: 0 });

  // Set up floating UI with middleware
  const updatePosition = $(() => {
    const dialogEl = getValue(dialogRef);
    const triggerEl = getValue(triggerRef);
    const arrowEl = getValue(arrowRef);
    if (!dialogEl || !triggerEl) return;

    const middleware: Middleware[] = [];
    if (flipOptions !== false) {
      middleware.push(flip(flipOptions));
    }
    if (shiftOptions !== false) {
      middleware.push(shift(shiftOptions ?? { padding: 10 }));
    }
    if (offSetOptions !== false) {
      middleware.push(offset(offSetOptions ?? 10));
    }
    if (sizeOptions !== false) {
      middleware.push(size(sizeOptions));
    }
    if (autoPlacementOptions !== false) {
      middleware.push(autoPlacement(autoPlacementOptions));
    }
    if (inlineOptions !== false) {
      middleware.push(inline(inlineOptions));
    }
    if (arrowOptions !== false && arrowEl) {
      middleware.push(
        arrow({ element: arrowEl, padding: 10, ...arrowOptions })
      );
    }
    if (hideOptions !== false) {
      middleware.push(hide(hideOptions));
    }

    computePosition(triggerEl, dialogEl, {
      placement: getValue(placement),
      middleware,
    }).then(({ x, y, placement, middlewareData }) => {
      position.value = { x, y };

      if (!arrowEl) return;
      const arrow = middlewareData.arrow;
      const staticSide = {
        top: "bottom",
        right: "left",
        bottom: "top",
        left: "right",
      }[placement.split("-")[0]];

      Object.assign(arrowEl.style, {
        left: arrow!.x != null ? `${arrow!.x}px` : "",
        top: arrow!.y != null ? `${arrow!.y}px` : "",
        right: "",
        bottom: "",
        [staticSide!]: "-4px",
      });
    });
  });

  useVisibleTask$(({ track, cleanup }) => {
    const triggerEl = track(() => getValue(triggerRef));
    const dialogEl = track(() => getValue(dialogRef));
    const isEnabled = track(() => getValue(enabled));
    if (!dialogEl || !triggerEl) return;

    //only auto update position when enabled
    if (!isEnabled) return;
    const cleanupFloating = autoUpdate(triggerEl, dialogEl, updatePosition);

    cleanup(() => {
      cleanupFloating();
    });
  });

  return position;
};
