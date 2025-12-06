import type { StoryNode, StoryChoice, PlayerState } from '../types';
import { mulberry32, randomInt } from '../utils/rng';

const asciiElder = `
       _____
     .-\"     \"-.
    /  .-.-. .- \\
   |  /  /  \\  \\ |
   |  \\  \\__/  / |
    \\  '----'  /
     '-.____.-'
`;

const cultistAscii = `
   .-.
  (o o)
   |=|
  __|__ 
 /  |  \\
|   |   |
'---'---'
`;

function id(prefix: string, n: number) {
  return `${prefix}-${n}`;
}

export function generateStory(seed: number, depth = 5, breadth = 2): { nodes: Record<string, StoryNode>, startId: string } {
  const rng = mulberry32(seed);
  let counter = 0;
  const nodes: Record<string, StoryNode> = {};

  function makeNode(kind: any, title: string, text: string, ascii?: string): StoryNode {
    const nid = id('n', ++counter);
    const choices: StoryChoice[] = [];
    nodes[nid] = { id: nid, kind, title, text, ascii, choices };
    return nodes[nid];
  }

  // starting scene
  const start = makeNode('scene', 'The Crossroads Inn', `You arrive at the Crossroads Inn. The inn is dim, and a stranger draws your eye. You smell damp paper and ink. Your mind hums.` + (rng() < 0.2 ? '\nA chill runs down your spine.' : ''), cultistAscii);

  // create a procedurally branching tree
  function expand(node: StoryNode, curDepth: number) {
    if (curDepth >= depth) {
      // produce an ending node
      const endings = [
        { t: 'Madness', txt: 'You scream until the walls shift into impossible geometry. You are no more.' },
        { t: 'Knowledge', txt: 'You gain forbidden knowledge. Your name becomes a whisper in the dark.' },
        { t: 'Escape', txt: 'You wake up on a road. Morning. Did it happen? Maybe.' }
      ];
      const e = endings[randomInt(rng, 0, endings.length - 1)];
      const end = makeNode('ending', e.t, e.txt, asciiElder);
      node.choices.push({ id: id('c', ++counter), text: 'Accept fate', next: end.id });
      return;
    }

    // generate 1..breadth choices with mix of encounters/npcs/scenes
    const nChoices = randomInt(rng, 1, breadth);
    for (let i = 0; i < nChoices; i++) {
      const roll = rng();
      if (roll < 0.35) {
        // encounter (cultist / horror)
        const encounter = makeNode('encounter', 'Ritual Chamber', `A chanting cultist blocks your path. The air tastes of salt and old thunder.`, cultistAscii);
        encounter.choices.push({ id: id('c', ++counter), text: 'Confront the cultist', effect: (s: PlayerState) => ({ ...s, sanity: Math.max(0, s.sanity - randomInt(rng, 5, 20)) }), next: null });
        encounter.choices.push({ id: id('c', ++counter), text: 'Avoid silently', effect: (s: PlayerState) => ({ ...s, sanity: s.sanity - randomInt(rng, 0, 5) }), next: null });
        node.choices.push({ id: id('c', ++counter), text: 'Investigate a chant', next: encounter.id });
        expand(encounter, curDepth + 1);
      } else if (roll < 0.65) {
        // npc
        const npc = makeNode('npc', 'The Scholar', `A gaunt scholar offers a tattered map. "Follow the glyphs," she whispers.`, undefined);
        npc.choices.push({ id: id('c', ++counter), text: 'Take the map', effect: (s: PlayerState) => ({ ...s, inventory: [...s.inventory, 'tattered map'] }), next: null });
        npc.choices.push({ id: id('c', ++counter), text: 'Refuse politely', effect: (s: PlayerState) => ({ ...s, sanity: s.sanity + randomInt(rng, 0, 3) }), next: null });
        node.choices.push({ id: id('c', ++counter), text: 'Talk to the scholar', next: npc.id });
        expand(npc, curDepth + 1);
      } else {
        // scene
        const scene = makeNode('scene', 'Foggy Alley', `The alley breathes. Papers swirl like minnows. You find a symbol carved into the stone.` + (rng() < 0.25 ? '\nSomething moves in the fog.' : ''));
        scene.choices.push({ id: id('c', ++counter), text: 'Scrutinize symbol', effect: (s: PlayerState) => ({ ...s, sanity: Math.max(0, s.sanity - randomInt(rng, 0, 8)) }), next: null });
        scene.choices.push({ id: id('c', ++counter), text: 'Step back', effect: (s: PlayerState) => ({ ...s, sanity: s.sanity + 1 }), next: null });
        node.choices.push({ id: id('c', ++counter), text: 'Walk into the fog', next: scene.id });
        expand(scene, curDepth + 1);
      }
    }
  }

  expand(start, 0);
  return { nodes, startId: start.id };
}

