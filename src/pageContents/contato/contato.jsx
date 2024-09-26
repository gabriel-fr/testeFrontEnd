'use client';
import { TopBar } from '@/components/topBar';
import { formatCPF, formatPhone, validarCPF } from '@/utils/functions';
import { ArrowForward } from '@mui/icons-material';
import { Box, Button, Card, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import ModalConfirm from './modalConfirm';
import Joi from 'joi';
import { RequiredTag } from '@/components/requiredTag';
import { toast } from 'react-toastify';
import { fetchCepData } from '@/stores/cepData/cepData.store';

const schema = Joi.object({
  nome: Joi.string().required().label('Nome'),
  email: Joi.string().required().label('E-mail'),
  cpf: Joi.string()
    .max(14)
    .custom((value, helper) => {
      if (!validarCPF(value)) {
        toast.error('CPF inválido, digite um CPF válido');
        return helper.error('any.invalid', {
          message: 'CPF inválido.',
        });
      }
      return value;
    }, 'Validação de CPF')
    .required()
    .label('CPF'),
  nascimento: Joi.string().required().label('Data de nascimento'),
  rg: Joi.string().optional().label('RG'),
  telefone: Joi.string().optional().label('Telefone'),
  cep: Joi.string().max(8).optional().label('CEP'),
  endereco: Joi.string().optional().label('Endereço'),
  numero: Joi.string().optional().label('Número'),
  complemento: Joi.string().allow('').optional().label('Complemento'),
  bairro: Joi.string().optional().label('Bairro'),
  cidade: Joi.string().optional().label('Cidade'),
  estado: Joi.string().optional().label('Estado'),
});

export default function ContatoContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [params, setParams] = useState(null);
  const [errors, setErrors] = useState({});
  const [cepData, setCepData] = useState(null);

  const handleSubmit = async () => {
    if (!params) return toast.error('Os campos não podem estar em branco');

    const { error } = schema.validate(params, {
      abortEarly: false,
    });

    console.log(error);
    if (error) {
      const validationErrors = {};
      error.details.forEach((detail) => {
        validationErrors[detail.path[0]] = detail.message;
      });
      setErrors(validationErrors);
      console.log(validationErrors);
      return;
    }

    setErrors({});
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (cepData) {
      setParams({
        ...params,
        bairro: cepData?.bairro,
        complemento: cepData?.complemento,
        cidade: cepData?.localidade,
        endereco: cepData?.logradouro,
        estado: cepData?.uf,
      });
    }
  }, [cepData]);

  return (
    <Box>
      <TopBar />
      <Box p={4}>
        <Typography variant="h5" mb={1} fontWeight="bold">
          Formulário de Contato
        </Typography>
        <Box display="flex" gap={2} flexDirection="column">
          <Card
            sx={{
              backgroundColor: '#f9f9f9',
              border: '1px solid #e9e9e9',
              padding: 2,
            }}
            elevation={0}
          >
            <Box p={2}>
              <Typography variant="h6" fontWeight="bold">
                Dados do cliente
              </Typography>
              <Box display="flex" mt={2} gap={2} width="100%">
                <Box width="60%">
                  <Typography fontSize={15} fontWeight="bold">
                    Nome <RequiredTag />
                  </Typography>
                  <TextField
                    size="small"
                    value={params?.nome}
                    sx={{ width: '100%' }}
                    error={errors?.nome}
                    placeholder="Buscar cliente"
                    onChange={({ target }) =>
                      setParams({
                        ...params,
                        nome: target.value,
                      })
                    }
                  />
                </Box>
                <Box width="40%">
                  <Typography fontSize={15} fontWeight="bold">
                    E-mail <RequiredTag />
                  </Typography>
                  <TextField
                    type="email"
                    sx={{ width: '100%' }}
                    size="small"
                    value={params?.email}
                    error={errors?.email}
                    placeholder="exemplo@exemplo.com.br"
                    onChange={({ target }) =>
                      setParams({
                        ...params,
                        email: target.value,
                      })
                    }
                  />
                </Box>
              </Box>
              <Box display="flex" mt={2} gap={2} width="100%">
                <Box width="25%">
                  <Typography fontSize={15} fontWeight="bold">
                    CPF <RequiredTag />
                  </Typography>
                  <TextField
                    sx={{ width: '100%' }}
                    size="small"
                    error={errors?.cpf}
                    value={formatCPF(params?.cpf)}
                    placeholder="000.000.000-00"
                    onChange={({ target }) => {
                      if (target.value.length === 15) return;

                      setParams({
                        ...params,
                        cpf: target.value,
                      });
                    }}
                  />
                </Box>
                <Box width="25%">
                  <Typography fontSize={15} fontWeight="bold">
                    RG
                  </Typography>
                  <TextField
                    maxLength={11}
                    sx={{ width: '100%' }}
                    size="small"
                    placeholder="00000000000"
                    value={params?.rg}
                    onChange={({ target }) =>
                      setParams({
                        ...params,
                        rg: target.value,
                      })
                    }
                  />
                </Box>
                <Box width="25%">
                  <Typography fontSize={15} fontWeight="bold">
                    Telefone
                  </Typography>
                  <TextField
                    type="number"
                    sx={{ width: '100%', maxLength: 15 }}
                    size="small"
                    value={formatPhone(params?.telefone)}
                    placeholder="(00) 0000-00000"
                    onChange={({ target }) => {
                      if (target.value.length > 15) return;
                      setParams({
                        ...params,
                        telefone: target.value,
                      });
                    }}
                  />
                </Box>
                <Box width="25%">
                  <Typography fontSize={15} fontWeight="bold">
                    Data de nascimento <RequiredTag />
                  </Typography>
                  <TextField
                    type="date"
                    sx={{ width: '100%' }}
                    size="small"
                    placeholder="Buscar cliente"
                    value={params?.nascimento}
                    error={errors?.nascimento}
                    onChange={({ target }) =>
                      setParams({
                        ...params,
                        nascimento: target.value,
                      })
                    }
                  />
                </Box>
              </Box>
            </Box>
          </Card>
          <Card
            sx={{
              backgroundColor: '#f9f9f9',
              border: '1px solid #e9e9e9',
              padding: 2,
            }}
            elevation={0}
          >
            <Box p={2}>
              <Typography variant="h6" fontWeight="bold">
                Endereço
              </Typography>
              <Box display="flex" mt={2} gap={2} width="100%">
                <Box width="15%">
                  <Typography fontSize={15} fontWeight="bold">
                    CEP
                  </Typography>
                  <TextField
                    sx={{ width: '100%' }}
                    size="small"
                    error={errors?.cep}
                    placeholder="00000-000"
                    value={params?.cep}
                    onChange={async ({ target }) => {
                      const currentValue = target.value;

                      if (currentValue.length > 8) return;
                      if (currentValue.length === 8) {
                        const cepResult = await fetchCepData(currentValue);
                        setCepData(cepResult?.data);
                      }
                      setParams({
                        ...params,
                        cep: currentValue,
                      });
                    }}
                  />
                </Box>
                <Box width="45%">
                  <Typography fontSize={15} fontWeight="bold">
                    Endereço
                  </Typography>
                  <TextField
                    type="text"
                    sx={{ width: '100%' }}
                    size="small"
                    placeholder="Rua exemplo"
                    value={params?.endereco}
                    onChange={({ target }) =>
                      setParams({
                        ...params,
                        endereco: target.value,
                      })
                    }
                  />
                </Box>
                <Box width="15%">
                  <Typography fontSize={15} fontWeight="bold">
                    Número
                  </Typography>
                  <TextField
                    type="text"
                    sx={{ width: '100%' }}
                    size="small"
                    placeholder="123"
                    value={params?.numero}
                    onChange={({ target }) =>
                      setParams({
                        ...params,
                        numero: target.value,
                      })
                    }
                  />
                </Box>
                <Box width="25%">
                  <Typography fontSize={15} fontWeight="bold">
                    Complemento
                  </Typography>
                  <TextField
                    type="text"
                    sx={{ width: '100%' }}
                    size="small"
                    placeholder="5° andar"
                    value={params?.complemento}
                    onChange={({ target }) =>
                      setParams({
                        ...params,
                        complemento: target.value,
                      })
                    }
                  />
                </Box>
              </Box>
              <Box display="flex" mt={2} gap={2} width="100%">
                <Box width="33%">
                  <Typography fontSize={15} fontWeight="bold">
                    Bairro
                  </Typography>
                  <TextField
                    type="text"
                    sx={{ width: '100%' }}
                    size="small"
                    placeholder="Exemplo"
                    value={params?.bairro}
                    onChange={({ target }) =>
                      setParams({
                        ...params,
                        bairro: target.value,
                      })
                    }
                  />
                </Box>
                <Box width="33%">
                  <Typography fontSize={15} fontWeight="bold">
                    Cidade
                  </Typography>
                  <TextField
                    type="text"
                    sx={{ width: '100%' }}
                    size="small"
                    placeholder="Cidade"
                    value={params?.cidade}
                    onChange={({ target }) =>
                      setParams({
                        ...params,
                        cidade: target.value,
                      })
                    }
                  />
                </Box>
                <Box width="33%">
                  <Typography fontSize={15} fontWeight="bold">
                    Estado
                  </Typography>
                  <TextField
                    type="text"
                    sx={{ width: '100%' }}
                    size="small"
                    placeholder="Selecione"
                    value={params?.estado}
                    onChange={({ target }) =>
                      setParams({
                        ...params,
                        estado: target.value,
                      })
                    }
                  />
                </Box>
              </Box>
            </Box>
          </Card>
          <Box display="flex" justifyContent="center">
            <Button
              variant="contained"
              sx={{ width: 200 }}
              endIcon={<ArrowForward />}
              onClick={() => handleSubmit()}
            >
              Enviar
            </Button>
          </Box>
          <ModalConfirm
            isOpen={isModalOpen}
            contactData={params}
            handleClose={() => setIsModalOpen(false)}
          />
        </Box>
      </Box>
    </Box>
  );
}
