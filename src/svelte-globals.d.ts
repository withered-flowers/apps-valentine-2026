declare global {
  // Svelte 5 reactive helpers (minimal typing for TS)
  function $state<T>(initial: T): T;
  function $derived<T>(value: T | (() => T)): T;
  function $props(): any;
  function $effect(fn: () => void | (() => void)): void;
}

export {};
