import type { StoryNode, PlayerState } from '../types';

export function generateMoreauStory(locale = 'en') {
  // Lightweight translation table — add other locales by adding a new top-level key.
  const translations: Record<string, Record<string, string>> = {
    en: {
      // Titles & texts
      'm-1.title': 'The Masque at Moreau House',
      'm-1.text': `You arrive at Moreau House under a gray, cold sky. Evelyn Moreau greets you with a smile of pearls and teeth. She invites you to a weekend salon — a game of deduction. As the servants take your coat, the house itself seems to breathe.`,
      'm-1.ascii': `      .-"""-.
     /  .-.  \\
    |  /   \  |
    | |     | |
    | |     | |
    | |     | |
    |  \   /  |
     \  '"'  /
      '-._.-'` ,

      'm-2.title': 'Drawing Room',
      'm-2.text': `The guests joke and circle like moths. Evelyn offers you a crooked little grimoire and asks you to read a passage; the margin seems to crawl under your eyes.`,

      'm-3.title': 'Folded Scrap',
      'm-3.text': `Tucked into the binding is a scrap with names and the word "offering" stamped beside several entries. The letters tremble in your hand.`,

      'm-4.title': 'The Invitation List',
      'm-4.text': `The list is dizzy with names from lodges and societies. You spot a strange glyph repeated in the margins — the same you glimpsed in the grimoire.`,

      'm-5.title': 'A Dance & A Whisper',
      'm-5.text': `Evelyn draws you close and speaks of "the deep guest" and the need to keep the circle full. In the corner, Crane nurses a bandaged hand.`,
      'm-5.ascii': `   .-.
  (o o)
   |=|
  __|__
 /  |  \\
|   |   |
'---'---'`,

      'm-7.title': 'West Wing Search',
      'm-7.text': `Bellamy frowns and joins you; you approach a door marked "Servants — Keep Out". Something cold and damp breathes from within.`,

      'm-8.title': 'Conservatory',
      'm-8.text': `You follow Evelyn to the conservatory. A maritime idol, eyes like pitted coins, watches from a pedestal. Evelyn smiles and touches your brow.`,
      'm-8.ascii': `      _____
    .-"     "-.
   /  .-.-. .- \\
  |  /  /  \  \ |
  |  \  \__/  / |
   \  '----'  /
    '-.____.-'`,

      'm-13.title': 'The Cold Chamber',
      'm-13.text': `A small altar sits behind a stained curtain. A ledger lists names; the final line is tonight. A ritual knife glints.`,

      'm-18.title': 'Midnight Cellar',
      'm-18.text': `You and Marcel descend into a pool-lit chamber. Evelyn chants around a black-reflective basin.`,
      'm-18.ascii': `    ~~~~~~~~
   /  ~  ~  \\
  |  BLACK   |
  |  MIRROR  |
   \  ~  ~  /
    '~~~~~~'`,

      // Endings
      'm-14.title': 'Expose & Arrest',
      'm-14.text': `With Bellamy at your side, you throw the ledger and knife onto the table. Evelyn's mask slips; officers are called. The house convulses, then quiets — the most immediate threat ends. You keep your life and the knowledge.`,

      'm-16.title': 'Consumed',
      'm-16.text': `A sight opens like a mouth behind your eyes. The world tilts, geometry and ocean-folding thoughts pull you down. You live — but the world is forever different.`,

      'm-19.title': 'Destroy the Idol',
      'm-19.text': `You strike the idol and it shudders with a sound like a ship breaking. Water lashes and then recedes. Evelyn screams as something beneath the surface collapses.`,

      'm-15.title': 'Sacrificed',
      'm-15.text': `You rush alone into a room ringing with voices. Hands seize you; the idol drinks your light. The house goes on without you.`,

      'm-20.title': 'Escape',
      'm-20.text': `You take the evidence to the papers. Evelyn's salons splinter in scandal. The cult moves underground, but you live to feel the shadow on your shoulder.`,

      'm-21.title': 'Pyrrhic Victory',
      'm-21.text': `You blackmail Evelyn and watch her reputation bruise. She retaliates in secret. You live comfortably, but some nights you hear the ritual counting in your house.`,

      'm-22.title': 'Killed',
      'm-22.text': `The wound is sudden and total. You die in the margins of the house, another whispered anecdote at Evelyn's table.`
    }
  };

  function t(key: string) {
    return (translations[locale] && translations[locale][key]) || translations['en'][key] || '';
  }

  const nodes: Record<string, StoryNode> = {
    'm-1': {
      id: 'm-1',
      kind: 'scene',
      title: t('m-1.title'),
      text: t('m-1.text'),
      ascii: t('m-1.ascii') || undefined,
      choices: [
        { id: 'c-1', text: 'Accept the drawing-room game and mingle', next: 'm-2' },
        { id: 'c-2', text: "Ask to see Evelyn's private study", next: 'm-6' },
        { id: 'c-3', text: 'Slip to the staff corridor and speak with Marcel', next: 'm-10' }
      ]
    },

    'm-2': {
      id: 'm-2',
      kind: 'scene',
      title: t('m-2.title'),
      text: t('m-2.text'),
      choices: [
        { id: 'c-4', text: "Inspect the grimoire's margins closely", next: 'm-3', effect: (s: PlayerState) => ({ ...s, sanity: Math.max(0, s.sanity - 5) }) },
        { id: 'c-5', text: 'Ask Evelyn to show the invitation list', next: 'm-4' },
        { id: 'c-6', text: 'Accept a private dance with Evelyn', next: 'm-5' }
      ]
    },

    'm-3': {
      id: 'm-3',
      kind: 'encounter',
      title: t('m-3.title'),
      text: t('m-3.text'),
      choices: [
        { id: 'c-7', text: 'Share the scrap with Inspector Bellamy', next: 'm-7' },
        { id: 'c-8', text: 'Hide the scrap and follow Evelyn after the dance', next: 'm-8' }
      ]
    },

    'm-4': {
      id: 'm-4',
      kind: 'scene',
      title: t('m-4.title'),
      text: t('m-4.text'),
      choices: [
        { id: 'c-9', text: 'Confront Violet about theatrical trappings', next: 'm-9' },
        { id: 'c-10', text: 'Ask Evelyn what the symbol means', next: 'm-11' }
      ]
    },

    'm-5': {
      id: 'm-5',
      kind: 'npc',
      title: t('m-5.title'),
      text: t('m-5.text'),
      ascii: t('m-5.ascii') || undefined,
      choices: [
        { id: 'c-11', text: 'Watch Dr. Crane closely', next: 'm-12' },
        { id: 'c-12', text: 'Slip after Marcel into the service doors', next: 'm-10' }
      ]
    },

    'm-7': {
      id: 'm-7',
      kind: 'scene',
      title: t('m-7.title'),
      text: t('m-7.text'),
      choices: [
        { id: 'c-13', text: 'Force the door and enter', next: 'm-13' },
        { id: 'c-14', text: 'Coerce Marcel to show the way', next: 'm-10' }
      ]
    },

    'm-8': {
      id: 'm-8',
      kind: 'scene',
      title: t('m-8.title'),
      text: t('m-8.text'),
      ascii: t('m-8.ascii') || undefined,
      choices: [
        { id: 'c-15', text: 'Let her touch your brow', next: 'm-16', effect: (s: PlayerState) => ({ ...s, sanity: Math.max(0, s.sanity - 40) }) },
        { id: 'c-16', text: 'Back away and alert Bellamy', next: 'm-7' }
      ]
    },

    'm-13': {
      id: 'm-13',
      kind: 'encounter',
      title: t('m-13.title'),
      text: t('m-13.text'),
      choices: [
        { id: 'c-17', text: 'Confront Evelyn with Bellamy at your side', next: 'm-14' },
        { id: 'c-18', text: 'Seize the ledger and run', next: 'm-20', effect: (s: PlayerState) => ({ ...s, inventory: [...s.inventory, 'ledgers'] }) }
      ]
    },

    'm-14': {
      id: 'm-14',
      kind: 'ending',
      title: t('m-14.title'),
      text: t('m-14.text'),
      choices: []
    },

    'm-9': {
      id: 'm-9',
      kind: 'scene',
      title: 'The Closet of Costumes',
      text: `Violet directs you to a west gallery. Behind a mannequin a mask is salt-stiff; a letter from a mysterious "M" is hidden in the seam.`,
      choices: [
        { id: 'c-19', text: 'Take the letter to the press', next: 'm-20', effect: (s: PlayerState) => ({ ...s, inventory: [...s.inventory, 'letter-to-press'] }) },
        { id: 'c-20', text: 'Use it privately to blackmail Evelyn', next: 'm-21', effect: (s: PlayerState) => ({ ...s, flags: { ...s.flags, blackmailed: true } }) }
      ]
    },

    'm-11': {
      id: 'm-11',
      kind: 'scene',
      title: 'An Icy Smile',
      text: `Evelyn answers, calm as tide. "A symbol is not a crime," she says, and invites you to a midnight séance.`,
      choices: [
        { id: 'c-21', text: 'Attend the séance unprepared', next: 'm-16' },
        { id: 'c-22', text: 'Refuse and bring the invitation to Bellamy', next: 'm-7' }
      ]
    },

    'm-12': {
      id: 'm-12',
      kind: 'encounter',
      title: 'Dr. Crane',
      text: `Dr. Crane flees your stare; the bandage at his hand hides old ritual scarring. When cornered he lashes out.`,
      choices: [
        { id: 'c-23', text: 'Disarm and question him', next: 'm-7', effect: (s: PlayerState) => ({ ...s, flags: { ...s.flags, CraneConfessed: true } }) },
        { id: 'c-24', text: 'He stabs — struggle to survive', next: 'm-22', effect: (s: PlayerState) => ({ ...s, hp: Math.max(0, s.hp - 10) }) }
      ]
    },

    'm-10': {
      id: 'm-10',
      kind: 'scene',
      title: 'The Staff Corridor',
      text: `Marcel moves with a cautious loyalty. He hints at a ledger and a cellar beneath the east wing.`,
      choices: [
        { id: 'c-25', text: 'Search the east wing registry with Marcel', next: 'm-17' },
        { id: 'c-26', text: 'Blackmail Evelyn using servant knowledge', next: 'm-21' },
        { id: 'c-27', text: 'Follow Marcel to the cellar at midnight', next: 'm-18' }
      ]
    },

    'm-17': {
      id: 'm-17',
      kind: 'scene',
      title: t('m-17.title') || 'Registry & Charred Scrap',
      text: `The registry shows several marked "Closed" entries. A charred scrap reads "for the deep". You and Marcel set a trap for those Evelyn will call.`,
      choices: [
        { id: 'c-28', text: 'Set the trap and wait with the servants', next: 'm-14' },
        { id: 'c-29', text: 'Try to run the trap alone', next: 'm-15' }
      ]
    },

    'm-15': {
      id: 'm-15',
      kind: 'ending',
      title: t('m-15.title'),
      text: t('m-15.text'),
      choices: []
    },

    'm-16': {
      id: 'm-16',
      kind: 'ending',
      title: t('m-16.title'),
      text: t('m-16.text'),
      choices: []
    },

    'm-20': {
      id: 'm-20',
      kind: 'ending',
      title: t('m-20.title'),
      text: t('m-20.text'),
      choices: []
    },

    'm-21': {
      id: 'm-21',
      kind: 'ending',
      title: t('m-21.title'),
      text: t('m-21.text'),
      choices: []
    },

    'm-22': {
      id: 'm-22',
      kind: 'ending',
      title: t('m-22.title'),
      text: t('m-22.text'),
      choices: []
    },

    'm-18': {
      id: 'm-18',
      kind: 'scene',
      title: t('m-18.title'),
      text: t('m-18.text'),
      ascii: t('m-18.ascii') || undefined,
      choices: [
        { id: 'c-30', text: 'Rush the altar and smash the idol', next: 'm-19' },
        { id: 'c-31', text: 'Cut the cords and free the captives', next: 'm-16' },
        { id: 'c-32', text: 'Observe and flee with the map you found', next: 'm-20' }
      ]
    },

    'm-19': {
      id: 'm-19',
      kind: 'ending',
      title: t('m-19.title'),
      text: t('m-19.text'),
      choices: []
    }
  };

  return { nodes, startId: 'm-1' };
}
