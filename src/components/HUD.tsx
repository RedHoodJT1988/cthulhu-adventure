import { Paper, Box, Typography, LinearProgress } from '@mui/material';
import type { PlayerState } from '../types';

export default function HUD({ player, seed }: { player: PlayerState, seed: number }) {
  return (
    <Paper elevation={4} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1 }}>
      <Box>
        <Typography variant="subtitle2">HP: {player.hp}</Typography>
        <Typography variant="subtitle2">Sanity: {player.sanity}</Typography>
        <LinearProgress variant="determinate" value={player.sanity} sx={{ height: 8, borderRadius: 2, width: 140, my: 1 }} />
      </Box>
      <Box textAlign="right">
        <Typography variant="caption">Seed: {seed}</Typography>
        <Typography variant="caption" display="block">{player.inventory.join(', ') || 'Empty'}</Typography>
      </Box>
    </Paper>
  );
}

