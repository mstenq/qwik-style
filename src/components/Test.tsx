import { useSx } from "@/hooks";
import { MaybeSignal } from "@/types";
import { ClassList, QwikIntrinsicElements, component$ } from "@builder.io/qwik";

type Props = {
  more: string;
  class?: MaybeSignal<ClassList>;
  innerClass?: MaybeSignal<ClassList>;
} & QwikIntrinsicElements["div"];

export const Test = component$((props: Props) => {
  const sxClasses = useSx(props, "class");
  const innerClasses = useSx(props, "innerClass");

  return (
    <div class={["Test", sxClasses.value]}>
      Test
      <div class={["TestInner", innerClasses.value]}>Inner</div>
      {props.more}
    </div>
  );
});
