'use client';
import { TopBar } from '@/components/topBar';
import {
  Box,
  Button,
  Card,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { ProductsTable } from '@/components/productsTable';
import { useState } from 'react';
import { products } from '@/components/productsTable/products';
import moment from 'moment';

export default function BuscaContent() {
  const [handleParams, setHandleParams] = useState({});
  const [params, setParams] = useState({});
  const [dates, setDates] = useState({
    startDate: moment().format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
  });
  const statusOptions = [...new Set(products.map((product) => product.status))];

  const handleProductsFilter = () => {
    setParams({
      ...handleParams,
      date: [dates?.startDate, dates?.endDate],
    });
  };

  return (
    <Box>
      <TopBar />
      <Box p={4}>
        <Typography variant="h5" mb={1} fontWeight="bold">
          Busca
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
            <Box display="flex" mt={2} gap={2} width="100%" alignItems="end">
              <Box width="20%">
                <Typography fontSize={15}>Pesquise por ID</Typography>
                <TextField
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    },
                  }}
                  type="text"
                  sx={{ width: '100%' }}
                  size="small"
                  name="id"
                  placeholder="Pesquisar"
                  value={handleParams['id']?.value || ''}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setHandleParams({
                      ...handleParams,
                      [name]: { value, matchMode: 'contains' },
                    });
                  }}
                />
              </Box>
              <Box width="20%">
                <Typography fontSize={15}>Produto</Typography>
                <TextField
                  select
                  type="text"
                  sx={{ width: '100%' }}
                  size="small"
                  name="produto"
                  defaultValue="todos"
                  placeholder="Pesquisar"
                  value={handleParams['produto']?.value || 'todos'}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setHandleParams({
                      ...handleParams,
                      [name]: { value, matchMode: 'contains' },
                    });
                  }}
                >
                  <MenuItem value="todos">Todos</MenuItem>
                  {products?.map((product) => (
                    <MenuItem value={product.produto}>
                      {product.produto}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
              <Box width="16%">
                <Typography fontSize={15}>Status</Typography>
                <TextField
                  select
                  sx={{ width: '100%' }}
                  name="status"
                  size="small"
                  defaultValue="todos"
                  value={handleParams['status']?.value || 'todos'}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setHandleParams({
                      ...handleParams,
                      [name]: { value, matchMode: 'contains' },
                    });
                  }}
                >
                  <MenuItem value="todos">Todos</MenuItem>
                  {statusOptions?.map((status) => (
                    <MenuItem value={status}>{status}</MenuItem>
                  ))}
                </TextField>
              </Box>
              <Box width="16%">
                <Typography fontSize={15}>Vigência de</Typography>
                <TextField
                  type="date"
                  sx={{ width: '100%' }}
                  size="small"
                  defaultValue="todos"
                  name="date"
                  value={dates.startDate || moment().format('YYYY-MM-DD')}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setDates({
                      ...dates,
                      startDate: value,
                    });
                  }}
                />
              </Box>
              <Box width="16%">
                <Typography fontSize={15}>Até</Typography>
                <TextField
                  type="date"
                  sx={{ width: '100%' }}
                  size="small"
                  defaultValue="todos"
                  value={dates.endDate || moment().format('YYYY-MM-DD')}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setDates({
                      ...dates,
                      endDate: value,
                    });
                  }}
                />
              </Box>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleProductsFilter()}
                sx={{ height: 40, borderRadius: 10 }}
              >
                <ArrowForwardIcon />
              </Button>
            </Box>
          </Card>
          <ProductsTable params={params} />
        </Box>
      </Box>
    </Box>
  );
}
