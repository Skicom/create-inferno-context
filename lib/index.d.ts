import * as Inferno from 'inferno';

export default function createInfernoContext<T>(
  defaultValue: T,
  calculateChangedBits?: (prev: T, next: T) => number
): Context<T>;

type RenderFn<T> = (value: T) => Inferno.VNode;

export type Context<T> = {
  Provider: Inferno.ComponentClass<ProviderProps<T>>;
  Consumer: Inferno.ComponentClass<ConsumerProps<T>>;
};

export type ProviderProps<T> = {
  value: T;
  children: Inferno.VNode;
};

export type ConsumerProps<T> = {
  children: RenderFn<T> | [RenderFn<T>];
  observedBits?: number;
};
