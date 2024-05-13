// LICENSE is MIT
//
// Copyright (c) 2024
//   Kevin Besset <https://github.com/kevbesset>
type BEMBlock = string;
type BEMElement = string;
type BEMModifier =
  | string
  | BEMModifier[]
  | { [key: string]: unknown }
  | undefined;

type BEMResponse = {
  block: (modifiers?: BEMModifier) => string;
  b: (modifiers?: BEMModifier) => string;
  element: (element: BEMElement, modifiers?: BEMModifier) => string;
  e: (element: BEMElement, modifiers?: BEMModifier) => string;
};

export function useBem(forceBlock?: string): BEMResponse;
