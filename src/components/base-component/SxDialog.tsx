import { useSx } from "@/hooks";
import { QwikIntrinsicElements, Slot, component$ } from "@builder.io/qwik";

type Props = {
  label: string;
  classKey: any;
} & QwikIntrinsicElements["dialog"];

export const SxDialog = component$(({ label, classKey, ...props }: Props) => {
  const classes = useSx(props, classKey);
  const clonedProps = props;
  delete clonedProps[classKey];
  return (
    <dialog
      preventdefault:cancel
      {...clonedProps}
      class={[label, classes.value]}
    >
      <Slot />
    </dialog>
  );
});
