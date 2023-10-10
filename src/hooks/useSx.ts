import { getValue } from "@/utils";
import { ClassList, useSignal, useTask$ } from "@builder.io/qwik";

type AllowedClasses = ClassList | string | undefined;

export const useSx = <T, K extends keyof T>(
  props: T,
  key: K,
  debugLabel?: string
) => {
  const classes = useSignal<AllowedClasses>("");

  useTask$(async ({ track }) => {
    const params = track(() => getValue(props?.[key]));
    // props don't natively have sxObj, unless they've been
    // stylized, so we need to cast to any
    const styleFunction = await (props as any)?.sxObj?.[key];
    if (styleFunction) {
      classes.value = await styleFunction(params);
    } else {
      classes.value = params as AllowedClasses;
    }
    if (debugLabel) {
      console.log("################################");
      console.log(debugLabel, classes.value, { params });
      console.log("################################");
    }
  });

  return classes;
};
