import { Box, Button, Modal, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import moment from 'moment';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  padding: 16,
  borderRadius: 10,
  backgroundColor: '#fff',
};

export default function ModalConfirm({ isOpen, handleClose, contactData }) {
  const router = useRouter();

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box style={style}>
        <Box my={2} display="flex" justifyContent="center">
          <CheckCircleIcon sx={{ fontSize: 35, color: '#00c1b4' }} />
        </Box>
        <Typography
          textAlign="center"
          variant="h6"
          component="h2"
          fontWeight="bold"
          mb={2}
        >
          Por favor, revise seus dados antes de continuar:
        </Typography>
        <Box px={8} display="flex" flexDirection="column" gap={2}>
          <Box display="flex">
            <Box width="50%">
              <Typography>Nome</Typography>
              <Typography fontSize={14}>{contactData?.nome}</Typography>
            </Box>
            <Box width="50%">
              <Typography>Email</Typography>
              <Typography fontSize={14}>{contactData?.email}</Typography>
            </Box>
          </Box>
          <Box display="flex">
            <Box width="50%">
              <Typography>RG</Typography>
              <Typography fontSize={14}>
                {contactData?.rg || 'Não informado'}
              </Typography>
            </Box>
            <Box width="50%">
              <Typography>CPF</Typography>
              <Typography fontSize={14}>{contactData?.cpf}</Typography>
            </Box>
          </Box>
          <Box display="flex">
            <Box width="50%">
              <Typography>Telefone</Typography>
              <Typography fontSize={14}>
                {contactData?.telefone || 'Não informado'}
              </Typography>
            </Box>
            <Box width="50%">
              <Typography>Data de Nascimento</Typography>
              <Typography fontSize={14}>
                {moment(contactData?.nascimento).format('DD/MM/YYYY')}
              </Typography>
            </Box>
          </Box>
          <Box display="flex">
            <Box width="100%">
              <Typography>Endereço</Typography>
              <Typography fontSize={14}>
                {`${contactData?.endereco || ''}, ${
                  contactData?.numero || ''
                } ${contactData?.bairro || ''} ${contactData?.cidade || ''} ${
                  contactData?.cep || ''
                }`}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          my={4}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          gap={2}
          px={4}
        >
          <Button
            variant="contained"
            onClick={() => {
              toast.success('Cadastro enviado com sucesso.');
              setTimeout(() => {
                router.push('/');
              }, 1000);
            }}
          >
            Confirmar
          </Button>
          <Button onClick={handleClose} variant="outlined">
            Cancelar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
