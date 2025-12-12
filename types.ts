export interface TerminalState {
  logs: string[];
  isLocked: boolean;
}

export interface QubitData {
  id: number;
  colorStart: string;
  colorEnd: string;
  spinSpeed: number;
  ascii: string;
}

export enum LibraryState {
  LOCKED = 'LOCKED',
  UNLOCKED = 'UNLOCKED',
}

export interface BookData {
  id: number;
  width: string;
  height: string;
  color: string;
  texture: string;
  ascii: string;
  title: string;
}