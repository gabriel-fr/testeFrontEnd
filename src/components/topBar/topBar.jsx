import { Box } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function TopBar() {
  const router = useRouter();
  return (
    <Box
      sx={{
        position: 'sticky',
        width: '100%',
        height: 70,
        zIndex: 10,
        top: 0,
        backgroundColor: '#0170a5',
      }}
    >
      <Image
        width={150}
        height={50}
        alt="Logo Delta"
        src={'/images/delta_logo.png'}
        onClick={() => router.push('/')}
        style={{
          cursor: 'pointer',
          filter: 'contrast(0) brightness(2)',
          marginLeft: 25,
          marginTop: 7,
        }}
      />
    </Box>
  );
}
