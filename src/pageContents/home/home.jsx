'use client';
import { TopBar } from '@/components/topBar';
import { Box, Button } from '@mui/material';
import Image from 'next/image';
import SearchIcon from '@mui/icons-material/Search';
import { ArrowForward } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

export default function HomeContent() {
  const router = useRouter();

  return (
    <>
      <TopBar />
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: 'calc(100vh - 70px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: "url('/images/caminhoes.jpg')",
          backgroundSize: 'cover',
        }}
      >
        <Box>
          <Image
            width={500}
            height={150}
            src={'/images/delta_logo.png'}
            style={{ filter: 'contrast(0) brightness(2)' }}
          />
          <Box display="flex" gap={4} justifyContent="center" mt={4}>
            <Button
              variant="contained"
              endIcon={<SearchIcon />}
              onClick={() => router.push('/busca')}
              sx={{ fontSize: 12, padding: 1.5, width: 200 }}
            >
              Busca por produto
            </Button>
            <Button
              variant="contained"
              endIcon={<ArrowForward />}
              onClick={() => router.push('/contato')}
              sx={{ fontSize: 12, padding: 1.5, width: 200 }}
            >
              Fale com a gente
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
