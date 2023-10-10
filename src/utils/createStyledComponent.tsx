import { PropsOf } from "@/types/PropsOf";
import { Component, FunctionComponent, component$ } from "@builder.io/qwik";

type OmitUndefined<T> = T extends undefined ? never : T;

type PropsOfSxFn<T extends SxFn> = OmitUndefined<Parameters<T>[0]>;

type SxFn = (...args: any) => any;

type SxObj = Record<string, SxFn>;

type PropsOfSxObj<T extends SxObj> = {
  [P in keyof T as T[P] extends SxFn ? P : never]: PropsOfSxFn<T[P]>;
};

type SxOverride<
  ORIGINAL_PROPS extends FunctionComponent<any>,
  NEW_PROPS extends SxObj,
> = Component<
  Omit<PropsOf<ORIGINAL_PROPS>, keyof NEW_PROPS> &
    Partial<PropsOfSxObj<NEW_PROPS>>
>;

export const createStyledComponent = <
  TComponent extends FunctionComponent<any>,
  SXPROPS extends SxObj,
>(
  Component: TComponent,
  sxFunctionObj: SXPROPS
) => {
  return ((props: any) => (
    <Component {...props} sxObj={sxFunctionObj} />
  )) as SxOverride<TComponent, SXPROPS>;
};
