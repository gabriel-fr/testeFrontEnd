import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Chip, Paper } from '@mui/material';
import { products } from './products';
import { FilterMatchMode, FilterService } from 'primereact/api';

FilterService.register('custom_date', (value, params) => {
  const [from, to] = params.date ?? [null, null];
  if (from === null && to === null) return true;
  if (from !== null && to === null) return from <= value;
  if (from === null && to !== null) return value <= to;
  return from <= value && value <= to;
});

export default function ProductsTable({ params }) {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(4);
  const [filters, setFilters] = useState({
    id: { value: null, matchMode: FilterMatchMode.CONTAINS },
    produto: { value: null, matchMode: FilterMatchMode.CONTAINS },
    status: { value: null, matchMode: FilterMatchMode.CONTAINS },
    date: { value: [], matchMode: FilterMatchMode.CUSTOM },
  });
  const totalRecords = products?.length;
  const onPageChange = (e) => {
    setFirst(e.first);
    setRows(e.rows);
  };

  const paginatorTemplate = {
    layout: 'RowsPerPageDropdown CurrentPageReport PrevPageLink NextPageLink',
    CurrentPageReport: (options) => {
      const start = options.first;
      const end =
        Math.min(options.first + options.rows, options.totalRecords) - 1;
      return (
        <span style={{ color: 'gray' }}>
          {`${start} - ${end} de ${options.totalRecords}`}
        </span>
      );
    },
  };

  const statusBodyTemplate = (rowData) => {
    const isActive = rowData.status === 'Ativo';
    return (
      <Chip
        label={rowData.status}
        sx={{
          borderRadius: 1,
          backgroundColor: isActive && '#d8efed',
          color: isActive && '#1bc7bb',
        }}
        color="success"
        variant={isActive ? 'contained' : 'outlined'}
      />
    );
  };

  const dateBodyTemplate = (rowData) => {
    const colors = {
      active: { bg: '#d8efed', font: '#00847b' },
      inactive: { bg: '#f4dfe3', font: '#fb8297' },
      warning: { bg: '#fce5c1', font: '##cd9548' },
    };

    return (
      <Chip
        label={`De ${rowData.date[0]} a ${rowData.date[1]}`}
        sx={{
          borderRadius: 1,
          backgroundColor: colors[rowData.dateStatus].bg,
          color: colors[rowData.dateStatus].font,
        }}
      />
    );
  };

  useEffect(() => {
    if (params) {
      setFilters(params);
    }
  }, [params]);

  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        marginTop: 4,
        '.p-paginator': { justifyContent: 'flex-start !important', ml: 4 },
        'p-datatable-thead': { backgroundColor: '#fff !important' },
        '.p-column-title': { fontSize: 13, marginRight: 1 },
        '.p-datatable-thead > tr > th:first-of-type': { paddingLeft: 4 },
        '.p-datatable-tbody > tr > td:first-of-type': { paddingLeft: 4 },
      }}
    >
      <DataTable
        stripedRows
        value={products}
        paginator
        paginatorTemplate={paginatorTemplate}
        first={first}
        rows={rows}
        totalRecords={totalRecords}
        onPage={onPageChange}
        filters={filters}
      >
        <Column field="id" header="ID" style={{ width: '25%', height: 40 }} />
        <Column
          field="produto"
          header="PRODUTO"
          filterField="lastName"
          sortable
          style={{ width: '25%' }}
        />
        <Column
          field="status"
          header="STATUS"
          sortable
          body={statusBodyTemplate}
          style={{ width: '25%' }}
        />
        <Column
          field="date"
          header="DATA"
          sortable
          body={dateBodyTemplate}
          style={{ width: '25%' }}
        />
      </DataTable>
    </Paper>
  );
}
