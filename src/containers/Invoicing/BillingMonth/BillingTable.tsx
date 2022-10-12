/* eslint-disable react/jsx-indent */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { StyledTableWrap } from './Styled';

interface Data {
  transaction_date: string;
  day: string;
  month: string;
  year: number;
  start_date: string;
  end_date: string;
  advance_period_start_date: string;
  advance_period_end_date: string;
  month_end: string;
  advance_date: string;
  closing_date: string;
}

function createData(
  transaction_date: string,
  day: string,
  month: string,
  year: number,
  start_date: string,
  end_date: string,
  advance_period_start_date: string,
  advance_period_end_date: string,
  month_end: string,
  advance_date: string,
  closing_date: string
): Data {
  return {
    transaction_date,
    day,
    month,
    year,
    start_date,
    end_date,
    advance_period_start_date,
    advance_period_end_date,
    month_end,
    advance_date,
    closing_date
  };
}

type Order = 'asc' | 'desc';
interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  { id: 'transaction_date', numeric: false, disablePadding: false, label: 'TRANSACTION DATE' },
  { id: 'day', numeric: true, disablePadding: false, label: 'DAY' },
  { id: 'month', numeric: true, disablePadding: false, label: 'MONTH' },
  { id: 'month_end', numeric: true, disablePadding: false, label: 'MONTH END' },
  { id: 'year', numeric: true, disablePadding: false, label: 'YEAR' },
  { id: 'start_date', numeric: true, disablePadding: false, label: 'START DATE' },
  { id: 'end_date', numeric: true, disablePadding: false, label: 'END DATE' },
  {
    id: 'advance_period_start_date',
    numeric: true,
    disablePadding: false,
    label: 'ADVANCE START DATE'
  },
  {
    id: 'advance_period_end_date',
    numeric: true,
    disablePadding: false,
    label: 'ADVANCE END DATE'
  },
  { id: 'closing_date', numeric: true, disablePadding: false, label: 'CLOSING DATE' },
  { id: 'advance_date', numeric: true, disablePadding: false, label: 'ADVANCE DATE' }
];

interface EnhancedTableProps {
  order: Order;
  orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy } = props;
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'center' : 'center'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={() => {}}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// Props Interface
interface IProps {
  billingMonthList: {
    data: any;
    status: string;
  };
}

const BillingMonthTableSection: React.FC<IProps> = ({ billingMonthList }: IProps) => {
  const [rows, setRows] = React.useState<any[]>([]);

  // Populated Table data based on revenue source response
  useEffect(() => {
    let newArray: any = [];

    const generateTableData = (list: any) => {
      if (list.length) {
        list.map((data: Data) => {
          newArray = [
            ...newArray,
            createData(
              data.transaction_date,
              data.day,
              data.month,
              data.year,
              data.start_date,
              data.end_date,
              data.advance_period_start_date,
              data.advance_period_end_date,
              data.month_end,
              data.advance_date,
              data.closing_date
            )
          ];
          return '';
        });
      }
      setRows(newArray);
    };
    if (billingMonthList?.status === 'success') {
      generateTableData(billingMonthList.data);
    }
  }, [billingMonthList]);

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
            <EnhancedTableHead order='asc' orderBy='created_at' />
            <TableBody>
              {rows.length
                ? rows.map((row) => (
                    <TableRow hover tabIndex={-1} key={row.message_id}>
                      <TableCell
                        align='center'
                        component='th'
                        id='row-name'
                        scope='row'
                        padding='none'
                      >
                        {row.transaction_date}
                      </TableCell>
                      <TableCell align='center'>{row.day}</TableCell>
                      <TableCell align='center'>{row.month}</TableCell>
                      <TableCell align='center'>
                        {moment(row.month_end).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell align='center'>{row.year}</TableCell>
                      <TableCell align='center'>
                        {moment(row.start_date).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell align='center'>
                        {moment(row.end_date).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell align='center'>
                        {moment(row.advance_period_start_date).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell align='center'>
                        {moment(row.advance_period_end_date).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell align='center'>
                        {moment(row.closing_date).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell align='center'>
                        {moment(row.advance_date).format('DD/MM/YYYY')}
                      </TableCell>
                    </TableRow>
                  ))
                : ''}
            </TableBody>
          </Table>
        </TableContainer>
      </StyledTableWrap>
    </>
  );
};

const mapStateToProps = (state: any) => ({});

export default connect(mapStateToProps)(BillingMonthTableSection);
