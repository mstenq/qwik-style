import { MaybeSignal } from "@/types";

export type DialogProps = {
  open?: MaybeSignal<boolean>;
  onOpenChange$?: (open: boolean) => unknown;
};
