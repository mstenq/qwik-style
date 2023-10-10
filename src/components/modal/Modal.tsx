import { CustomEvent } from "@/consts/CustomEvents";
import { useAddEventListener, useKeydown, useOrCreateSignal } from "@/hooks";
import {
  $,
  Slot,
  component$,
  useSignal,
  useTask$,
  useVisibleTask$,
} from "@builder.io/qwik";
import { SxDialog } from "../base-component/SxDialog";
import { SyncSignal } from "../sync-signal";
import { ModalProps } from "./Modal.types";
import { FocusTrap } from "../focus-trap/FocusTrap";

export const Modal = component$(
  ({
    open: openProp,
    closeOnClickOutside = true,
    closeOnEscape = true,
    onClose$,
    ...props
  }: ModalProps) => {
    const dialogRef = useSignal<HTMLDialogElement>();
    const open = useOrCreateSignal(openProp, false);

    const closeOnOutsideClick = $((e: Event) => {
      e.preventDefault();
      if (e.target === dialogRef.value) {
        // dialogRef.value?.close();
        open.value = false;
      }
    });

    useAddEventListener(
      dialogRef,
      CustomEvent.Close,
      $(() => {
        // dialogRef.value?.close();
        open.value = false;
      })
    );

    useKeydown(
      $(() => {
        if (closeOnEscape) {
          //   dialogRef.value?.close();
          open.value = false;
        }
      }),
      { enabled: open, triggerKeys: ["Escape"] }
    );

    const handleClose = $((e: Event) => {
      e.preventDefault();
      open.value = false;
    });

    useVisibleTask$(
      ({ track, cleanup }) => {
        const isOpen = track(() => open.value);

        // Show Modal
        if (isOpen) {
          const scrollbarWidth = window.innerWidth - document.body.clientWidth;
          document.body.style.paddingRight = `${scrollbarWidth}px`;
          document.body.style.overflow = "hidden";
          dialogRef.value?.showModal();
        }

        if (isOpen) {
          dialogRef.value?.addEventListener("close", handleClose);
          cleanup(
            () => dialogRef.value?.removeEventListener("close", handleClose)
          );
        }

        // Close on outside click
        if (isOpen && closeOnClickOutside) {
          dialogRef.value?.addEventListener("click", closeOnOutsideClick);
          cleanup(
            () =>
              dialogRef.value?.removeEventListener("click", closeOnOutsideClick)
          );
        }
      },
      { strategy: "document-ready" }
    );

    useVisibleTask$(({ track }) => {
      const isOpen = track(() => open.value);
      if (isOpen) return;

      setTimeout(() => {
        dialogRef.value?.close();
        document.body.style.paddingRight = "unset";
        document.body.style.overflow = "unset";
      }, 100);
    });

    return (
      <>
        <SyncSignal from={openProp} to={open} />
        <SxDialog
          data-state={open.value ? "open" : "closed"}
          ref={dialogRef}
          {...props}
          label="Modal"
          classKey="class"
        >
          <div>
            <FocusTrap>
              <Slot />
            </FocusTrap>
          </div>
        </SxDialog>
      </>
    );
  }
);
