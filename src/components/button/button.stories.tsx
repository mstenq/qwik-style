import type { Meta, StoryObj } from "storybook-framework-qwik";
import { Button } from "./Button";
import { ButtonProps } from "./Button.types";

const meta: Meta<ButtonProps> = {
  component: Button,
};

type Story = StoryObj<ButtonProps>;

export default meta;

export const Primary: Story = {
  args: {},
  render: (props) => <Button {...props}>Some button</Button>,
};
