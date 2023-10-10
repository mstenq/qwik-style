import { FunctionComponent, PublicProps } from "@builder.io/qwik";

export type PropsOf<COMP extends FunctionComponent<any>> =
  COMP extends FunctionComponent<PublicProps<infer PROPS>> ? PROPS : never;
