import type { Meta, StoryObj } from "storybook-framework-qwik";
import { AccordionRootProps } from "./Accordion.type";
import { AccordionRoot } from "./AccordionRoot";
import { $, component$, useSignal } from "@builder.io/qwik";

const meta: Meta<AccordionRootProps> = {
  component: AccordionRoot,
};

type Story = StoryObj<AccordionRootProps>;

export default meta;

const TestComponent = component$(() => {
  const value = useSignal("1");

  return (
    <>
      <button onClick$={$(() => (value.value += value.value))}>
        Change {value.value}
      </button>
      <AccordionRoot
        value={value.value}
        // bind:value={value}
        onValueChange$={(v) => console.log({ v })}
      >
        Some Accordion
      </AccordionRoot>
    </>
  );
});

export const Primary: Story = {
  args: {},
  render: (props) => <TestComponent />,
};
