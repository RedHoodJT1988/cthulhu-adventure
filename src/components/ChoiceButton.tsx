import { Button } from '@mui/material';

export default function ChoiceButton({ text, onClick }: { text: string, onClick(): void }) {
  return (
    <Button variant="contained" onClick={onClick} sx={{ justifyContent: 'flex-start', textTransform: 'none' }}>
      {text}
    </Button>
  );
}

