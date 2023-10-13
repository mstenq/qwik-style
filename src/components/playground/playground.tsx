import { $, component$, useSignal, useStore } from "@builder.io/qwik";

import { AccordionContent as _AccordionContent } from "../accordion/AccordionContent";
import { AccordionItem as _AccordionItem } from "../accordion/AccordionItem";
import { AccordionRoot } from "../accordion/AccordionRoot";
import { AccordionTrigger as _AccordionTrigger } from "../accordion/AccordionTrigger";

import { Button } from "../button/Button";
import { Popover } from "../popover/Popover";
import { Tooltip } from "../tooltip/Tooltip";

export const Playground = component$(() => {
  return (
    <div class="container mx-auto py-72 m-0">
      <button>Skip Conten</button>
      <Select placeholder="Select Option...">
        <SelectGroup label="Group">
          <SelectOption value="option 1">Option 1</SelectOption>
          <SelectOption value="option 2">
            <div class="text-red-700">Option 2</div>
          </SelectOption>
          <SelectOption value="option 3">Option 3</SelectOption>
        </SelectGroup>
        <SelectGroup label="Group 2">
          <SelectOption value="option 4">Option 4</SelectOption>
          <SelectOption value="option 5">Option 5</SelectOption>
          <SelectOption value="option 6">Option 6</SelectOption>
        </SelectGroup>
      </Select>

      <Popover placement="bottom">
        <Button q:slot="trigger">Hello</Button>
        <div class="relative">Test</div>
      </Popover>
    </div>
  );
});

export const Playground4 = component$(() => {
  const open = useSignal(false);
  return (
    <div class="mx-auto container py-72">
      <button onClick$={() => (open.value = !open.value)}>Open</button>
      <input name="name" placeholder="name" />
      {open.value ? "Open" : "Closed"}
      <Modal
        open={open}
        onClose$={() => console.log("Closed")}
        closeOnEscape={true}
        closeOnClickOutside={true}
      >
        <form method="dialog" class="flex flex-col">
          Modal Content
          <input name="name" placeholder="name" />
          <input name="last" placeholder="last" />
          <button>Close</button>
        </form>
        <CloseButton>&times;</CloseButton>
        <button onClick$={dispatchCloseEvent}>Native</button>
        <Button onClick$={() => (open.value = false)}>Styled Button</Button>
      </Modal>
      <input name="name" placeholder="name" />
      <div class="h-96 bg-red-50"></div>
      <div class="h-96 bg-blue-50"></div>
      <div class="h-96 bg-purple-50"></div>
    </div>
  );
});

export const Playground2 = component$(() => {
  return (
    <div class="mx-auto container py-[900px]">
      lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
      voluptatem, quibusdam,{" "}
      <Tooltip
        tip={"hello world this is a longer tooltip"}
        placement="bottom"
        tipClass="w-32"
        class="underline"
      >
        voluptatum
      </Tooltip>
      , voluptate, quas voluptates aperiam voluptas quia quae fugiat doloribus.
      Quisquam voluptatem, quibusdam, voluptatum, voluptate, quas voluptates
      aperiam voluptas quia quae fugiat
      <Popover
        placement="right"
        onOpenChange$={(val: boolean) => console.log("trigger", val)}
      >
        <Button q:slot="trigger">Hello</Button>
        <div class="relative">
          <CloseButton
            class="absolute right-0 top-0 text-sm"
            onClick$={() => console.log("TEST")}
          >
            &times;
          </CloseButton>
          <form class="flex flex-col gap-4">
            <h1 class="font-bold text-lg">Popover</h1>
            <input type="text" placeholder="First Name" class="border p-3" />
            <input type="text" placeholder="Last Name" class="border p-3" />
            <div class="flex gap-2">
              <Button type="button" class="w-full">
                Submit
              </Button>
              <CloseButton
                onClick$={() => console.log("TESTING")}
                class="w-full"
              >
                Cancel
              </CloseButton>
            </div>
          </form>
        </div>
      </Popover>
    </div>
  );
});

import type { VariantProps } from "class-variance-authority";
import { cva, cx } from "class-variance-authority";
import { createStyledComponent } from "@/utils/createStyledComponent";
import { Test } from "@/components/Test";
import { Modal } from "../modal/Modal";
import { CloseButton } from "../close-button/CloseButton";
import { dispatchCloseEvent } from "@/utils/dispatchCloseEvent";
import { Select } from "../select/Select";
import { SelectGroup } from "../select/SelectGroup";
import { SelectOption } from "../select/SelectOption";

export type BoxProps = VariantProps<typeof box>;
export const box = cva(["box", "box-border"], {
  variants: {
    margin: { 0: "m-0", 2: "m-2", 4: "m-4", 8: "m-8" },
    padding: { 0: "p-0", 2: "p-2", 4: "p-4", large: "p-8" },
    variant: { success: "bg-green-500", error: "bg-red-500" },
  },
});

const AccordionItem = createStyledComponent(_AccordionItem, {
  class: $(
    cva(["border-b"], {
      variants: {
        variant: {
          success: "bg-green-50 text-green-600",
          error: "bg-red-50 text-red-600",
        },
      },
    })
  ),
});
const AccordionTrigger = createStyledComponent(_AccordionTrigger, {
  class: $(
    cva(
      [
        "focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-600 cursor-pointer flex w-full items-center justify-between py-4 text-sm font-medium transition-all hover:underline",
        "after:content-[url('icons/chevron-right.svg')] after:w-4 after:h-4 after:mr-1 after:transition-all after:data-[state=open]:rotate-90",
      ],
      {
        variants: {
          variant: { success: "bg-green-500", error: "bg-red-500" },
        },
      }
    )
  ),
});

const AccordionContent = createStyledComponent(_AccordionContent, {
  class: $(
    cva(
      [
        "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      ],
      {
        variants: {
          variant: { success: "bg-green-500", error: "bg-red-500" },
        },
      }
    )
  ),
});

box({
  margin: 2,
  class: "bg-red-500",
});

type VariantTest = {
  variant: "Good" | "Bad";
};

/* SHOULD HANDLE WHEN NO VARIANT IS PASSED */
const customVariant = (props: VariantTest) => {
  if (props?.variant === "Good") {
    return "bg-green-500";
  }
  return "bg-red-500";
};

export const Playground3 = component$(() => {
  const store = useStore({ disabled: false });
  const state = useSignal<string[]>(["1"]);
  const disabled = useSignal(false);

  const StyledTest = createStyledComponent(Test, {
    class: $(box),
    innerClass: $(box),
  });
  const CustomTest = createStyledComponent(Test, { sx: $(customVariant) });

  const testVariant = useSignal<"success" | "error">("success");

  return (
    <div class="mx-auto container">
      <Test more="Original" />
      <StyledTest
        more="test"
        class={{ margin: 2, padding: "large", variant: testVariant.value }}
        innerClass={{
          padding: "large",
          class:
            testVariant.value === "success" ? "bg-blue-600" : "bg-yellow-500",
        }}
      ></StyledTest>
      <CustomTest more="test" />
      <button
        onClick$={() =>
          (testVariant.value =
            testVariant.value === "error" ? "success" : "error")
        }
      >
        Toggle
      </button>
      <hr />
      <button onClick$={$(() => (state.value = ["1"]))}>1</button>
      <button onClick$={$(() => (state.value = ["2", "3"]))}>2,3</button>
      <button onClick$={$(() => (disabled.value = !disabled.value))}>
        3 Disabled {disabled.value ? "true" : "false"}
      </button>
      <button onClick$={$(() => (store.disabled = !store.disabled))}>
        Store Disabled {store.disabled ? "true" : "false"}
      </button>
      <div class="text-red-600">parent: {JSON.stringify(state.value)}</div>
      <div>
        <strong>Accordion Controlled Value/useValueChange$</strong>
        <pre>2-way binding react style</pre>
        <AccordionRoot
          disabled={store.disabled}
          type="single"
          collapsible={true}
        >
          <AccordionItem value="1" class={{ variant: "success" }}>
            <AccordionTrigger>Trigger 1</AccordionTrigger>
            <AccordionContent>Content1</AccordionContent>
          </AccordionItem>
          <AccordionItem value="2" class={{ variant: "error" }}>
            <AccordionTrigger>Trigger 2</AccordionTrigger>
            <AccordionContent>Content2</AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="3"
            disabled={disabled.value}
            class={{ class: "bg-purple-50" }}
          >
            <AccordionTrigger>Trigger 3</AccordionTrigger>
            <AccordionContent>Content 3</AccordionContent>
          </AccordionItem>
        </AccordionRoot>
      </div>
    </div>
  );
});
