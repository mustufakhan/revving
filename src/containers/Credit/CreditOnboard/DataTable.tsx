/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-indent */
import React, { useState } from 'react';
// import moment from 'moment';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import TableBody from '@material-ui/core/TableBody';
import TableSortLabel from '@material-ui/core/TableSortLabel';
// import TablePagination from '@material-ui/core/TablePagination';
import { StyledTableWrap } from '../CreditHistory/Styled';

interface Data {
  connected_accounting_data: number | string;
  last_months: string | number;
  year_1: number;
  year_2: number;
  year_3: number;
}

type Order = 'asc' | 'desc';
interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  {
    id: 'connected_accounting_data',
    numeric: true,
    disablePadding: false,
    label: 'CONNECTED ACCOUNTING DATA'
  },
  { id: 'last_months', numeric: true, disablePadding: false, label: 'Last 12 MONTHS' },
  { id: 'year_1', numeric: true, disablePadding: false, label: 'Yr - 1' },
  {
    id: 'year_2',
    numeric: true,
    disablePadding: false,
    label: 'Yr - 2'
  },
  { id: 'year_3', numeric: true, disablePadding: false, label: 'Yr - 3' }
];

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  order: Order;
  orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <>
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'center' : 'center'}
              padding={headCell.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === headCell.id ? order : false}
              style={{
                backgroundColor: '#3f51b5',
                border: '1px solid rgba(224, 224, 224, 1)',
                color: 'white'
              }}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    </>
  );
}

// Props Interface
interface IProps {
  //   creditHistory: {
  //     data: any;
  //     status: string;
  //   };
  dispatch: Function;
}

const DataTableSection: React.FC<IProps> = ({
  dispatch
}: //   creditHistory
IProps) => {
  const [order, setOrder] = useState<any>('asc');
  const [orderBy, setOrderBy] = useState<any>('created_at');
  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // useEffect(() => {
  //   dispatch({
  //     type: 'CREDIT_HISTORY',
  //   });
  // }, [dispatch]);

  //   useEffect(() => {
  //     if (creditHistory?.status == 'success') {
  //       setResults(creditHistory?.data);
  //     }
  //   }, [creditHistory]);

  return (
    <>
      <StyledTableWrap>
        <TableContainer>
          <Table
            stickyHeader
            className='report_data_tbl'
            aria-labelledby='tableTitle'
            size='medium'
            aria-label='enhanced table'
          >
            <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
            <TableRow>
              <TableCell align='center'>Data</TableCell>
              <TableCell align='center'>Data</TableCell>
              <TableCell align='center'>Data</TableCell>
              <TableCell align='center'>Data</TableCell>
              <TableCell align='center'>Data</TableCell>
            </TableRow>
          </Table>
        </TableContainer>
      </StyledTableWrap>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  //   creditHistory: state.creditHistory.data
});

export default connect(mapStateToProps)(DataTableSection);
