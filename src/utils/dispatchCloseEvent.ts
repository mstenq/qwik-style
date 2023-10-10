import { CustomEvent } from "@/consts/CustomEvents";
import { $, QwikMouseEvent } from "@builder.io/qwik";

const closeEvent = new Event(CustomEvent.Close, {
  bubbles: true,
  cancelable: true,
});

export const dispatchCloseEvent = $((e: QwikMouseEvent<HTMLElement>) => {
  e.target.dispatchEvent(closeEvent);
});
