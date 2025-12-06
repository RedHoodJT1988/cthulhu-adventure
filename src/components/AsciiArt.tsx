import React from 'react';
import { Box } from '@mui/material';

export default function AsciiArt({ art }: { art?: string }) {
  if (!art) return null;
  return (
    <Box component="pre" sx={{
      fontFamily: 'Fira Mono, monospace',
      whiteSpace: 'pre',
      mt: 1,
      opacity: 0.95,
      border: '1px dashed rgba(255,255,255,0.05)',
      p: 1,
      borderRadius: 1
    }}>
      {art}
    </Box>
  );
}

