import { createContextId } from "@builder.io/qwik";
import { AccordionItemContext, AccordionRootContext } from "./Accordion.type";

export const accordionRootContextId =
  createContextId<AccordionRootContext>("accordion-root");

export const accordionItemContextId =
  createContextId<AccordionItemContext>("accordion-item");
