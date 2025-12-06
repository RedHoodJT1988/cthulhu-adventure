import { useState } from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import GameEngine from './engine/GameEngine';

export default function App() {
  const [seed, setSeed] = useState<number>(() => Date.now() >>> 0);

  function newRun() {
    setSeed((Math.random() * 2 ** 32) >>> 0);
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box textAlign="center" mb={2}>
        <Typography variant="h4">Eldritch: A Cthulhu Text Adventure</Typography>
        <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>A procedurally branching, replayable text game — beware your sanity.</Typography>
      </Box>
      <Box mb={2} display="flex" justifyContent="flex-end" gap={1}>
        <Button variant="outlined" onClick={() => setSeed(seed)}>Resume Seed</Button>
        <Button variant="contained" onClick={() => newRun()}>New Run</Button>
      </Box>

      <GameEngine key={seed} seed={seed} />
    </Container>
  );
}

