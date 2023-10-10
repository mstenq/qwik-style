import { component$, useTask$ } from "@builder.io/qwik";

export const TestComponent = component$(({ value }: { value: number }) => {
  useTask$(({ track }) => {
    const val = track(() => value);
    console.log({ testComponent: val });
  });

  return <div>value: {value}</div>;
});
