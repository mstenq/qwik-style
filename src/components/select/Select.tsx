import { Slot, component$, noSerialize, useSignal } from "@builder.io/qwik";
import { SelectProps } from "./Select.types";
import { Popover } from "../popover/Popover";
import { useFloatingUI, useOrCreateSignal } from "@/hooks";

export const Select = component$((props: SelectProps) => {
  const open = useOrCreateSignal(props.open, false);
  //   const triggerRef = useSignal<HTMLDivElement>();
  //   const dialogRef = useSignal<HTMLDivElement>();
  //   const position = useFloatingUI({
  //     ...props.floatingConfig,
  //     dialogRef,
  //     triggerRef,
  //     enabled: true,
  //   });
  return (
    <Popover
      componentName="SelectPopover"
      placement="bottom"
      arrowOptions={false}
      offSetOptions={0}
      class="bg-pink-100"
    >
      <button
        preventdefault:click
        class="shadow h-10 p-2 w-full"
        q:slot="trigger"
      >
        {props.placeholder}
      </button>
      <Slot />
    </Popover>
    // <div class="relative">
    //   <button
    //     onClick$={() => (open.value = !open.value)}
    //     class=" w-full h-10 rounded border shadow"
    //     ref={triggerRef}
    //   >
    //     {props?.placeholder}
    //   </button>
    //   <div
    //     ref={dialogRef}
    //     class="shadow p-2 w-full"
    //     style={{
    //       position: "absolute",
    //       display: open.value ? "block" : "none",
    //       left: `${position.value.x}px`,
    //       top: `${position.value.y}px`,
    //     }}
    //   >
    //     <Slot />
    //   </div>
    // </div>
  );
});
