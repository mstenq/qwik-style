import { useSx } from "@/hooks";
import { QwikIntrinsicElements, Slot, component$ } from "@builder.io/qwik";

type Props = {
  label: string;
  classKey: any;
} & QwikIntrinsicElements["div"];

export const SxDiv = component$(({ label, classKey, ...props }: Props) => {
  const classes = useSx(props, classKey);
  const clonedProps = props;
  delete clonedProps[classKey];
  return (
    <div {...clonedProps} class={[label, classes.value]}>
      <Slot />
    </div>
  );
});
