import { Signal } from "@builder.io/qwik";

export type MaybeSignal<T> = T | Signal<T>;
