import { CustomEvent } from "@/consts/CustomEvents";
import {
  $,
  QwikIntrinsicElements,
  QwikMouseEvent,
  Slot,
  component$,
} from "@builder.io/qwik";
import { SxButton } from "../base/SxButton";
import { dispatchCloseEvent } from "@/utils/dispatchCloseEvent";

export const CloseButton = component$(
  ({ onClick$, ...props }: QwikIntrinsicElements["button"]) => {
    return (
      <SxButton
        type="button"
        onClick$={[onClick$, dispatchCloseEvent]}
        label="CloseButton"
        classKey="class"
        {...props}
      >
        <Slot />
      </SxButton>
    );
  }
);
