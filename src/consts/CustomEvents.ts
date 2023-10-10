export const CustomEvent = {
  Close: "qwik:close",
} as const;

export type CustomEventType = (typeof CustomEvent)[keyof typeof CustomEvent];
