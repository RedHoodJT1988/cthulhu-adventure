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
      },

      'm-6': {
        id: 'm-6',
        kind: 'scene',
        title: 'Private Study',
        text: `Evelyn grants your request with an amused smile. Her study is lined with nautical charts and strange artifacts. A mahogany desk holds a correspondence box, leather-bound ledger, and a painting of a submerged city.`,
        choices: [
          { id: 'c-33', text: 'Search the correspondence box', next: 'm-23' },
          { id: 'c-34', text: 'Examine the painting more closely', next: 'm-24' },
          { id: 'c-35', text: 'Ask Evelyn direct questions about her interests', next: 'm-25' }
        ]
      },

      'm-23': {
        id: 'm-23',
        kind: 'scene',
        title: 'Correspondence',
        text: `Letters reveal a patron known only as "M" — an auctioneer of relics. Shipment dates and invoices hint at a network. You also find a train ticket to a coastal town and a petrified shell.`,
        choices: [
          { id: 'c-36', text: 'Pocket the train ticket and shell', next: 'm-26', effect: (s: PlayerState) => ({ ...s, inventory: [...s.inventory, 'train ticket', 'petrified shell'] }) },
          { id: 'c-37', text: 'Confront Evelyn with the letters', next: 'm-27' },
          { id: 'c-38', text: 'Copy the addresses and slip out', next: 'm-10' }
        ]
      },

      'm-24': {
        id: 'm-24',
        kind: 'scene',
        title: 'The Submerged City',
        text: `Behind the painting, you find a safe. Inside: a hand-drawn map of the mansion with the cellar circled in red, and a journal entry dated last week: "The next offering must be pure of mind. The Deep hungers."`,
        choices: [
          { id: 'c-39', text: 'Take the map and confront Evelyn', next: 'm-27' },
          { id: 'c-40', text: 'Take the map and alert Inspector Bellamy', next: 'm-7', effect: (s: PlayerState) => ({ ...s, inventory: [...s.inventory, 'mansion map'] }) },
          { id: 'c-41', text: 'Read more of the journal', next: 'm-28' }
        ]
      },

      'm-25': {
        id: 'm-25',
        kind: 'npc',
        title: 'Questions',
        text: `Evelyn's smile hardens slightly. "How curious," she says. "Most guests don't pry so openly. Tell me, do you believe in forces beyond the ordinary? In the need to... appease the old hungers?" Her hand drifts toward a bell pull.`,
        choices: [
          { id: 'c-42', text: 'Play along; agree with her', next: 'm-29' },
          { id: 'c-43', text: 'Deny it and demand explanations', next: 'm-27' },
          { id: 'c-44', text: 'Excuse yourself and leave the study', next: 'm-10' }
        ]
      },

      'm-26': {
        id: 'm-26',
        kind: 'scene',
        title: 'The Coastal Lead',
        text: `The train ticket leads to Innsmouth — a name that stirs a vague dread. The petrified shell has an unnatural geometry. You pocket them and return to the salon, your mind racing with connections.`,
        choices: [
          { id: 'c-45', text: 'Share the discovery with Bellamy', next: 'm-30' },
          { id: 'c-46', text: 'Keep the evidence and investigate alone', next: 'm-31' },
          { id: 'c-47', text: 'Return to the drawing room and mingle', next: 'm-2' }
        ]
      },

      'm-27': {
        id: 'm-27',
        kind: 'encounter',
        title: 'Confrontation',
        text: `Evelyn's eyes flash with something inhuman. "You've seen too much," she says coldly. The study door locks behind you with a soft click. Masked figures emerge from the shadows.`,
        choices: [
          { id: 'c-48', text: 'Fight and try to escape through the window', next: 'm-32' },
          { id: 'c-49', text: 'Surrender and play for time', next: 'm-18' },
          { id: 'c-50', text: 'Scream for help', next: 'm-33' }
        ]
      },

      'm-28': {
        id: 'm-28',
        kind: 'scene',
        title: 'Dark Pages',
        text: `The journal reveals ritual instructions, names of past victims, and a prophecy: "When the stars align next, the Deep shall rise. Our lady shall ascend." Tonight is marked with a star.`,
        choices: [
          { id: 'c-51', text: 'Rush to find Bellamy and show him', next: 'm-34' },
          { id: 'c-52', text: 'Search for a phone to call the police', next: 'm-35' },
          { id: 'c-53', text: 'Find the victims listed and verify', next: 'm-31' }
        ]
      },

      'm-29': {
        id: 'm-29',
        kind: 'npc',
        title: 'A Terrible Invitation',
        text: `Evelyn smiles, delighted. "How wonderful," she whispers. "You're not like the others. Perhaps you could join us. The rite begins at midnight in the cellar. Would you like to witness true power?"`,
        choices: [
          { id: 'c-54', text: 'Accept and go to the cellar', next: 'm-36' },
          { id: 'c-55', text: 'Feign acceptance, then betray her', next: 'm-18' },
          { id: 'c-56', text: 'Refuse and flee the house', next: 'm-37' }
        ]
      },

      'm-30': {
        id: 'm-30',
        kind: 'scene',
        title: 'Bellamy\'s Revelation',
        text: `Inspector Bellamy's face goes grave. "Innsmouth," he mutters. "I've heard whispers. Missing persons, strange cults. We need to act tonight before this reaches its crescendo. Will you help me search the cellar?"`,
        choices: [
          { id: 'c-57', text: 'Search the cellar with Bellamy immediately', next: 'm-18' },
          { id: 'c-58', text: 'Wait and gather more evidence first', next: 'm-31' }
        ]
      },

      'm-31': {
        id: 'm-31',
        kind: 'scene',
        title: 'Careful Investigation',
        text: `You move through the house, collecting clues. A guest list matches names in an old ledger under the floorboards. Another name — Dr. Crane — appears circled in red.`,
        choices: [
          { id: 'c-59', text: 'Confront Dr. Crane directly', next: 'm-12' },
          { id: 'c-60', text: 'Warn the other guests and evacuate', next: 'm-38' }
        ]
      },

      'm-32': {
        id: 'm-32',
        kind: 'scene',
        title: 'The Window',
        text: `You hurl a chair through the study window and scramble through, landing in the overgrown garden below. Shouts echo behind you. The front gate is locked, but the garden has a path to the woods.`,
        choices: [
          { id: 'c-61', text: 'Run for the woods', next: 'm-39' },
          { id: 'c-62', text: 'Hide in the garden and wait', next: 'm-40' }
        ]
      },

      'm-33': {
        id: 'm-33',
        kind: 'scene',
        title: 'The Servants Respond',
        text: `Your screams bring Marcel and other staff. They stare in confusion — Evelyn's smile falters for a moment. "A misunderstanding," she says smoothly to the servants. But you see the rage behind her eyes.`,
        choices: [
          { id: 'c-63', text: 'Demand to leave immediately', next: 'm-37' },
          { id: 'c-64', text: 'Ask the servants for help', next: 'm-41' }
        ]
      },

      'm-34': {
        id: 'm-34',
        kind: 'scene',
        title: 'Bellamy Acts',
        text: `Inspector Bellamy reads the journal in silence, his jaw tightening. "This is enough. We're stopping this tonight. We'll need to move carefully — some of the guests may be complicit. Stay close to me."`,
        choices: [
          { id: 'c-65', text: 'Agree and prepare for the ritual confrontation', next: 'm-18' },
          { id: 'c-66', text: 'Suggest calling for backup from outside', next: 'm-42' }
        ]
      },

      'm-35': {
        id: 'm-35',
        kind: 'scene',
        title: 'The Phone Call',
        text: `You find a telephone in the hallway and call the police. They promise to send officers within the hour. Now you must keep Evelyn occupied until they arrive without raising suspicion.`,
        choices: [
          { id: 'c-67', text: 'Return to the drawing room and act normally', next: 'm-43' },
          { id: 'c-68', text: 'Try to delay the midnight rite by any means', next: 'm-44' }
        ]
      },

      'm-36': {
        id: 'm-36',
        kind: 'scene',
        title: 'The Midnight Descent',
        text: `You descend with Evelyn and the acolytes into the cellar. The chanting grows louder. You see captives bound in a pattern beneath a starscape of carved glyphs. The idol looms, hungry and vast.`,
        choices: [
          { id: 'c-69', text: 'Pretend to participate, then attack the idol', next: 'm-19' },
          { id: 'c-70', text: 'Scream and attempt to free the captives', next: 'm-15' }
        ]
      },

      'm-37': {
        id: 'm-37',
        kind: 'scene',
        title: 'Flight from the House',
        text: `You grab your coat and head for the door. Evelyn's voice follows you, calm and terrible: "You won't escape what you've learned. The Deep sees all." You burst into the night.`,
        choices: [
          { id: 'c-71', text: 'Drive to the nearest police station', next: 'm-45' },
          { id: 'c-72', text: 'Run to find shelter and call for help', next: 'm-46' }
        ]
      },

      'm-38': {
        id: 'm-38',
        kind: 'scene',
        title: 'Evacuation',
        text: `You warn the other guests. Some laugh nervously; others go pale. Violet believes you immediately. A few guests begin packing to leave. Evelyn watches from the shadows, her expression unreadable.`,
        choices: [
          { id: 'c-73', text: 'Help evacuate the guests', next: 'm-47' },
          { id: 'c-74', text: 'Confront Evelyn directly before anyone leaves', next: 'm-27' }
        ]
      },

      'm-39': {
        id: 'm-39',
        kind: 'scene',
        title: 'Into the Woods',
        text: `The forest is dark and tangled. You run blindly until you reach a stream. In the distance, headlights cut through the trees — a car is searching for you.`,
        choices: [
          { id: 'c-75', text: 'Hide by the stream and wait for dawn', next: 'm-48' },
          { id: 'c-76', text: 'Follow the stream toward town', next: 'm-39a' }
        ]
      },

      'm-39a': {
        id: 'm-39a',
        kind: 'scene',
        title: 'The Stream Path',
        text: `After an hour of walking, you emerge at a small gas station on a rural highway. The attendant is kind and offers you a phone. The police are on their way.`,
        choices: [
          { id: 'c-77', text: 'Wait for the police', next: 'm-45' },
          { id: 'c-78', text: 'Ask the attendant about Moreau House', next: 'm-49' }
        ]
      },

      'm-40': {
        id: 'm-40',
        kind: 'scene',
        title: 'Garden Hiding',
        text: `You crouch behind an old stone wall, watching masked figures search the grounds. Hours pass. At dawn, you slip away toward the road, exhausted.`,
        choices: [
          { id: 'c-79', text: 'Hitch a ride away from the house', next: 'm-45' },
          { id: 'c-80', text: 'Return to confront Evelyn one more time', next: 'm-27' }
        ]
      },

      'm-41': {
        id: 'm-41',
        kind: 'npc',
        title: 'The Servants Know',
        text: `Marcel steps forward. "You speak the truth," he whispers. "She has taken many from this house. I am bound by a contract, but I will not stop you from leaving. Use the west exit — quickly."`,
        choices: [
          { id: 'c-81', text: 'Leave with Marcel\'s help', next: 'm-37' },
          { id: 'c-82', text: 'Ask Marcel to help you stop Evelyn instead', next: 'm-50' }
        ]
      },

      'm-42': {
        id: 'm-42',
        kind: 'scene',
        title: 'Backup Requested',
        text: `Bellamy nods and uses the house phone to request a tactical unit. "They'll be here in two hours. We need to keep this subtle. No alarms." You position yourselves near the cellar entrance to wait.`,
        choices: [
          { id: 'c-83', text: 'Wait for backup and execute the plan', next: 'm-18' }
        ]
      },

      'm-43': {
        id: 'm-43',
        kind: 'scene',
        title: 'The Long Wait',
        text: `You return to the drawing room and try to act naturally, though your heart pounds. Violet notices your tension. "Are you alright?" she asks quietly. The guests murmur. Evelyn watches you like a cat.`,
        choices: [
          { id: 'c-84', text: 'Confide in Violet', next: 'm-51' },
          { id: 'c-85', text: 'Excuse yourself and find a place to hide', next: 'm-52' }
        ]
      },

      'm-44': {
        id: 'm-44',
        kind: 'scene',
        title: 'Delaying the Rite',
        text: `You suggest a game of cards, a late dinner, storytelling — anything to delay. Evelyn indulges you, amused, but her patience wears thin. The clock approaches midnight.`,
        choices: [
          { id: 'c-86', text: 'Keep stalling until police arrive', next: 'm-53' }
        ]
      },

      'm-45': {
        id: 'm-45',
        kind: 'ending',
        title: 'Safe',
        text: `The police take your statement. An investigation begins into Moreau House. Evidence is secured; Evelyn and her inner circle are arrested. You survive, but you know the Deep has other servants elsewhere.`,
        choices: []
      },

      'm-46': {
        id: 'm-46',
        kind: 'ending',
        title: 'Haunted Escape',
        text: `You hide in a small town for a night, then contact police. They respond swiftly. Evelyn is arrested, but you feel her presence in your dreams — a shadow that never quite leaves.`,
        choices: []
      },

      'm-47': {
        id: 'm-47',
        kind: 'ending',
        title: 'Mass Evacuation',
        text: `Most guests flee Moreau House. The police are called by concerned family members. Evelyn has time to destroy evidence, but the disruption ends her immediate plans. You escape with your life and testimony.`,
        choices: []
      },

      'm-48': {
        id: 'm-48',
        kind: 'ending',
        title: 'Survival in Silence',
        text: `Dawn breaks. You emerge from the woods disheveled but alive. Police find you and take your account. The investigation that follows dismantles Evelyn's network.`,
        choices: []
      },

      'm-49': {
        id: 'm-49',
        kind: 'scene',
        title: 'A Terrible Truth',
        text: `The attendant goes pale. "Moreau House? Three people have gone missing in the past year after visiting there. Police suspect foul play but have no proof." You realize you were meant to be next.`,
        choices: [
          { id: 'c-87', text: 'Work with police to gather evidence', next: 'm-45' }
        ]
      },

      'm-50': {
        id: 'm-50',
        kind: 'scene',
        title: 'Marcel\'s Choice',
        text: `Marcel is conflicted, but hatred for Evelyn wins. "I will help," he says. "But we must be quick. The ritual begins at midnight." Together, you plan to sabotage the ceremony.`,
        choices: [
          { id: 'c-88', text: 'Move to destroy the idol before the ritual', next: 'm-19' }
        ]
      },

      'm-51': {
        id: 'm-51',
        kind: 'npc',
        title: 'Violet\'s Secret',
        text: `Violet pulls you aside. "I know what she is," she whispers. "I came here to gather evidence for a journalist. Will you help me?"`,
        choices: [
          { id: 'c-89', text: 'Join forces with Violet', next: 'm-54' }
        ]
      },

      'm-52': {
        id: 'm-52',
        kind: 'scene',
        title: 'A Quiet Corner',
        text: `You find refuge in the library. The police arrive sooner than expected — someone else also called. Sirens wail. Evelyn\'s mask fully slips as officers enter.`,
        choices: [
          { id: 'c-90', text: 'Surrender to police and explain', next: 'm-45' }
        ]
      },

      'm-53': {
        id: 'm-53',
        kind: 'ending',
        title: 'Perfect Timing',
        text: `Just as Evelyn rises to retire to the cellar, police arrive at the house. The timing breaks her spell. She and her acolytes are arrested. Justice is imperfect but swift.`,
        choices: []
      },

      'm-54': {
        id: 'm-54',
        kind: 'scene',
        title: 'Allied',
        text: `Violet and you work together, documenting evidence. The journalist she knows is contacted. Before Evelyn can stop you both, authorities move in.`,
        choices: [
          { id: 'c-91', text: 'Expose Evelyn to the world', next: 'm-45' }
        ]
      }
    };  return { nodes, startId: 'm-1' };
}
