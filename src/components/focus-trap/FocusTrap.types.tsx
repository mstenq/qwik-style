import { MaybeSignal } from "@/types";

export type FocusTrapProps = {
  arrowNavigation?: "vertical" | "horizontal";
  focusFirst?: boolean;
  enabled?: MaybeSignal<boolean>;
};
