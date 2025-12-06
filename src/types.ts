export type EntityId = string;

export interface PlayerState {
  hp: number;
  sanity: number; // 0..100 (0 = broken)
  inventory: string[];
  flags: Record<string, boolean | number | string>;
  seed: number; // for reproducibility
}

export type NodeKind = 'scene' | 'encounter' | 'npc' | 'ending';

export interface StoryChoice {
  id: string;
  text: string;
  // function which can modify player state or route to specific node id (string) or null to be generated
  effect?: (state: PlayerState) => PlayerState;
  next?: string | null; // if null then generator picks
  weight?: number; // used when picking random next
}

export interface StoryNode {
  id: string;
  kind: NodeKind;
  title?: string;
  text: string;
  ascii?: string;
  choices: StoryChoice[];
  mood?: string; // flavor (e.g., "tense", "weird")
}

