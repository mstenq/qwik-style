import { component$, useStylesScoped$, Slot } from "@builder.io/qwik";
import { ButtonProps } from "./Button.types";
import { getValue } from "@/utils";

export const Button = component$(({ ...props }: ButtonProps) => {
  return (
    <button {...props} class={["Button", getValue(props.class)]}>
      <Slot />
    </button>
  );
});
