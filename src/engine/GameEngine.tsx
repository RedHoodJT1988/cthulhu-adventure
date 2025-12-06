// src/engine/GameEngine.tsx
import React, { useMemo, useState } from 'react';
import type { StoryNode, PlayerState } from '../types';
import { generateStory } from './storyGenerator';
import { generateMoreauStory } from './moreauStory';
import { mulberry32, randomInt } from '../utils/rng';
import { Box, Paper, Typography, Divider } from '@mui/material';
import ChoiceButton from '../components/ChoiceButton';
import HUD from '../components/HUD';
import AsciiArt from '../components/AsciiArt';

interface Props { seed?: number; story?: 'generated' | 'moreau'; locale?: string }

export default function GameEngine({ seed = Date.now(), story = 'moreau', locale = 'en' }: Props) {
  const [runSeed] = useState(() => seed >>> 0);
  const { nodes, startId } = useMemo(() => {
    if (story === 'moreau') return generateMoreauStory(locale);
    return generateStory(runSeed, 5, 2);
  }, [runSeed, story, locale]);
  const [currentId, setCurrentId] = useState<string>(startId);
  const [player, setPlayer] = useState<PlayerState>({
    hp: 10,
    sanity: 80,
    inventory: [],
    flags: {},
    seed: runSeed
  });

  const node = nodes[currentId];

  function applyEffect(effect?: (s: PlayerState) => PlayerState) {
    if (!effect) return;
    setPlayer(prev => effect(prev));
  }

  function choose(choiceIdx: number) {
    const choice = node.choices[choiceIdx];
    applyEffect(choice.effect);

    // pick next
    if (choice.next) {
      setCurrentId(choice.next);
      return;
    }

    // pick a next by trying to pick a sibling node (if next is null), otherwise pick a random node from nodes
    const rng = mulberry32(player.seed + (Math.floor(Math.random() * 1000)));
    const keys = Object.keys(nodes);
    const next = keys[randomInt(rng, 0, keys.length - 1)];
    setCurrentId(next);
  }

  // small auto-effect: if sanity is zero, move to a madness ending
  if (player.sanity <= 0 && node.kind !== 'ending') {
    // find any ending node
    const ending = Object.values(nodes).find(n => n.kind === 'ending');
    if (ending) {
      setCurrentId(ending.id);
    }
  }

  return (
    <Box display="flex" gap={2} flexDirection="column" alignItems="stretch">
      <HUD player={player} seed={runSeed} />
      <Paper elevation={6}>
        <Typography variant="h5">{node.title ?? 'A Strange Place'}</Typography>
        <Divider sx={{ my: 1 }} />
        <Box display="flex" gap={2}>
          <Box flex={1}>
            <Typography component="pre" sx={{ whiteSpace: 'pre-wrap', fontFamily: 'Fira Mono, monospace' }}>
              {node.text}
            </Typography>
            {node.ascii && <AsciiArt art={node.ascii} />}
          </Box>
        </Box>
        <Box mt={2} display="flex" flexDirection="column" gap={1}>
          {node.choices.map((c, i) => (
            <ChoiceButton key={c.id} onClick={() => choose(i)} text={c.text} />
          ))}
        </Box>
      </Paper>
    </Box>
  );
}

