import { useSx } from "@/hooks";
import { QwikIntrinsicElements, Slot, component$ } from "@builder.io/qwik";

type Props = {
  label: string;
  classKey: any;
} & QwikIntrinsicElements["button"];

export const SxButton = component$(({ label, classKey, ...props }: Props) => {
  const classes = useSx(props, classKey);
  const clonedProps = props;
  delete clonedProps[classKey];
  return (
    <button {...clonedProps} class={[label, classes.value]}>
      <Slot />
    </button>
  );
});
