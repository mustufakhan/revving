/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-indent */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { StyledTableWrap } from './Styled';

interface Data {
  credit_check_date: number;
  company_name: string;
  credit_type: string;
  status: number;
  company_number: string;
  country: number;
  currency: string;
  category: string;
  risk_transfer_entity: string | number;
  credit_safe_credit_limit: string;
  credit_safe_score: string;
  calculated_credit_limit: string | number;
  revenue_credit_limit: string | number;
  cashflow_credit_limit: string | number;
  recovery_credit_limit: string | number;
  incorporation_date: any;
  direct_CCJ_count: any;
  accounting_period: any;
  filling_date: any;
  revenue: any;
  operating_profit: any;
  net_income: any;
  operating_margin: any;
  working_capital: any;
  total_assets: any;
  total_liabilities: any;
  quick_ratio: any;
  fx_rate: any;
  // gbp_fx_rate: any;
}

type Order = 'asc' | 'desc';
interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  { id: 'credit_check_date', numeric: true, disablePadding: false, label: 'CREDIT CHECK DATE' },
  { id: 'company_name', numeric: true, disablePadding: false, label: 'COMPANY NAME' },
  { id: 'credit_type', numeric: true, disablePadding: false, label: 'CREDIT TYPE' },
  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'STATUS'
  },
  { id: 'company_number', numeric: true, disablePadding: false, label: 'COMPANY NUMBER' },
  { id: 'country', numeric: true, disablePadding: false, label: 'COUNTRY' },
  { id: 'category', numeric: false, disablePadding: false, label: 'CATEGORY' },
  {
    id: 'risk_transfer_entity',
    numeric: true,
    disablePadding: false,
    label: 'RISK TRANSFER ENTITY'
  },
  { id: 'credit_safe_score', numeric: true, disablePadding: false, label: 'CREDIT SAFE SCORE' },
  {
    id: 'credit_safe_credit_limit',
    numeric: false,
    disablePadding: false,
    label: 'CREDIT SAFE CREDIT LIMIT'
  },
  {
    id: 'calculated_credit_limit',
    numeric: false,
    disablePadding: false,
    label: 'CALCULATED CREDIT LIMIT'
  },
  {
    id: 'revenue_credit_limit',
    numeric: false,
    disablePadding: false,
    label: 'REVENUE CREDIT LIMIT'
  },
  {
    id: 'cashflow_credit_limit',
    numeric: false,
    disablePadding: false,
    label: 'CASHFLOW CREDIT LIMIT'
  },
  {
    id: 'recovery_credit_limit',
    numeric: false,
    disablePadding: false,
    label: 'RECOVERY CREDIT LIMIT'
  },
  { id: 'incorporation_date', numeric: false, disablePadding: false, label: 'INCORPORATION DATE' },
  { id: 'direct_CCJ_count', numeric: false, disablePadding: false, label: 'DIRECT CCJ COUNT' },
  { id: 'accounting_period', numeric: false, disablePadding: false, label: 'ACCOUNTING PERIOD' },
  { id: 'filling_date', numeric: false, disablePadding: false, label: 'FILLING DATE ' },
  { id: 'revenue', numeric: false, disablePadding: false, label: 'REVENUE' },
  { id: 'operating_profit', numeric: false, disablePadding: false, label: 'OPERATING PROFIT' },
  { id: 'net_income', numeric: false, disablePadding: false, label: 'NET INCOME' },
  { id: 'operating_margin', numeric: false, disablePadding: false, label: 'OPERATING MARGIN' },
  { id: 'working_capital', numeric: false, disablePadding: false, label: 'WORKING CAPITAL' },
  { id: 'total_assets', numeric: false, disablePadding: false, label: 'TOTAL ASSESTS' },
  { id: 'total_liabilities', numeric: false, disablePadding: false, label: 'TOTAL LIABILITIES' },
  { id: 'quick_ratio', numeric: false, disablePadding: false, label: 'QUICK RATIO' }
  // { id: 'gbp_fx_rate', numeric: false, disablePadding: false, label: 'GBP FX RATE' }
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
  creditHistory: {
    data: any;
    status: string;
  };
  dispatch: Function;
  cusCurrency: string;
  creditType: string;
}

const DataTableSection: React.FC<IProps> = ({
  dispatch,
  creditHistory,
  cusCurrency,
  creditType
}: IProps) => {
  const [order, setOrder] = useState<any>('asc');
  const [orderBy, setOrderBy] = useState<any>('created_at');
  const [results, setResults] = useState<any[]>([]);
  console.log('cusCurrencyProps', cusCurrency);
  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc';
    // handleSortData(property, isAsc);
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  useEffect(() => {
    dispatch({
      type: 'CREDIT_HISTORY',
      payload: {
        search: ''
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (creditType) {
      dispatch({
        type: 'CREDIT_HISTORY',
        payload: {
          search: creditType
        }
      });
    }
  }, [creditType, dispatch]);

  useEffect(() => {
    if (creditHistory?.status == 'success') {
      setResults(creditHistory?.data);
    }
  }, [creditHistory]);

  const mapData = creditHistory?.data?.map((item: any) => {
    item?.pre_assessment_json_report;
    console.log('mapdata###', item);
  });
  console.log('mapdata', mapData);

  function numberWithCommas(x: any) {
    console.log('x', x);
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

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
            <TableBody>
              {results?.length && cusCurrency == 'home_currency'
                ? results.map((row) => (
                    <TableRow hover tabIndex={-1} key={row?.id}>
                      <TableCell
                        align='center'
                        component='th'
                        id='row-name'
                        scope='row'
                        padding='none'
                      >
                        {row?.date_run ? row?.date_run.slice(0, 10) : '-'}
                      </TableCell>

                      <TableCell align='center'>{row?.obligor_name || '-'}</TableCell>

                      <TableCell align='center'>{row?.credit_type || '-'}</TableCell>

                      <TableCell align='center'>{row?.credit_assessment_type || '-'}</TableCell>

                      <TableCell align='center'>{row?.entity_safe_number || '-'}</TableCell>

                      <TableCell align='center'>{row?.country || '-'}</TableCell>

                      <TableCell align='center'>{row?.category || '-'}</TableCell>

                      <TableCell align='center'>{row?.risk_transfer_entity || '-'}</TableCell>

                      <TableCell
                        align='center'
                        style={
                          row?.pre_assessment_json_report?.home_currency?.entity
                            ?.cs_status_analysis_flags?.credit_safe_score?.color
                            ? {
                              background:
                                  row?.pre_assessment_json_report?.home_currency?.entity
                                    ?.cs_status_analysis_flags?.credit_safe_score?.color
                            }
                            : { background: 'none' }
                        }
                      >
                        {row?.pre_assessment_json_report?.home_currency?.entity
                          ?.cs_status_analysis_flags?.credit_safe_score?.credit_safe_score || '-'}
                      </TableCell>

                      <TableCell align='center'>{row?.creditLimit || '-'}</TableCell>

                      <TableCell align='center'>
                        {row?.pre_assessment_json_report?.home_currency?.entity
                          ?.analysis_data_output?.implied_limit || '-'}
                      </TableCell>

                      <TableCell align='center'>
                        {row?.pre_assessment_json_report?.home_currency?.entity
                          ?.analysis_data_output?.revenue_limit || '-'}
                      </TableCell>

                      <TableCell align='center'>
                        {row?.pre_assessment_json_report?.home_currency?.entity
                          ?.analysis_data_output?.free_cash_flow_limit || '-'}
                      </TableCell>

                      <TableCell align='center'>
                        {row?.pre_assessment_json_report?.home_currency?.entity
                          ?.analysis_data_output?.recovery_limit || '-'}
                      </TableCell>

                      <TableCell align='center'>
                        {row?.pre_assessment_json_report?.home_currency?.entity
                          ?.accounting_data_output?.incorporation_date || '-'}
                      </TableCell>

                      <TableCell
                        align='center'
                        style={
                          row?.pre_assessment_json_report?.home_currency?.entity
                            ?.cs_status_analysis_flags?.directors_ccj_flag?.color
                            ? {
                              background:
                                  row?.pre_assessment_json_report?.home_currency?.entity
                                    ?.cs_status_analysis_flags?.directors_ccj_flag?.color
                            }
                            : { background: 'none' }
                        }
                      >
                        {row?.row?.pre_assessment_json_report?.home_currency?.entity
                          ?.cs_status_analysis_flags?.directors_ccj_flag?.directors_ccj_flag ||
                          'Not Applicable'}
                      </TableCell>

                      <TableCell align='center'>
                        {row?.pre_assessment_json_report?.home_currency?.entity
                          ?.accounting_data_output?.accounting_period || '-'}
                      </TableCell>

                      <TableCell align='center'>
                        {row?.pre_assessment_json_report?.GBP?.entity?.accounting_data_output
                          ?.filing_date || '-'}
                      </TableCell>

                      <TableCell align='center'>
                        {row?.pre_assessment_json_report?.home_currency?.entity
                          ?.analysis_data_output?.revenue || '-'}
                      </TableCell>

                      <TableCell align='center'>
                        {row?.pre_assessment_json_report?.home_currency?.entity?.accounting_data_output?.operating_profit.replace(
                          /\B(?=(\d{3})+(?!\d))/g,
                          ','
                        ) || '-'}
                      </TableCell>

                      <TableCell
                        align='center'
                        style={
                          row?.pre_assessment_json_report?.home_currency?.entity?.accounting_flags
                            ?.net_income?.color
                            ? {
                              background:
                                  row?.pre_assessment_json_report?.home_currency?.entity
                                    ?.accounting_flags?.net_income?.color
                            }
                            : { background: 'none' }
                        }
                      >
                        {row?.pre_assessment_json_report?.home_currency?.entity?.accounting_data_output?.net_income.replace(
                          /\B(?=(\d{3})+(?!\d))/g,
                          ','
                        ) || '-'}
                      </TableCell>

                      <TableCell
                        align='center'
                        style={
                          row?.pre_assessment_json_report?.home_currency?.entity?.accounting_flags
                            ?.operating_margin?.color
                            ? {
                              background:
                                  row?.pre_assessment_json_report?.home_currency?.entity
                                    ?.accounting_flags?.operating_margin?.color
                            }
                            : { background: 'none' }
                        }
                      >
                        {row?.pre_assessment_json_report?.home_currency?.entity?.accounting_flags
                          ?.operating_margin?.operating_margin || '-'}
                      </TableCell>

                      <TableCell align='center'>
                        {row?.pre_assessment_json_report?.home_currency?.entity
                          ?.analysis_data_output?.free_cash_flow || '-'}
                      </TableCell>

                      <TableCell align='center'>
                        {row?.pre_assessment_json_report?.home_currency?.entity?.accounting_data_output?.total_assets.replace(
                          /\B(?=(\d{3})+(?!\d))/g,
                          ','
                        ) || '-'}
                      </TableCell>

                      <TableCell align='center'>
                        {row?.pre_assessment_json_report?.home_currency?.entity?.accounting_data_output?.total_liabilities.replace(
                          /\B(?=(\d{3})+(?!\d))/g,
                          ','
                        ) || '-'}
                      </TableCell>

                      <TableCell
                        align='center'
                        style={
                          row?.pre_assessment_json_report?.home_currency?.entity?.accounting_flags
                            ?.quick_ratio?.color
                            ? {
                              background:
                                  row?.pre_assessment_json_report?.home_currency?.entity
                                    ?.accounting_flags?.quick_ratio?.color
                            }
                            : { background: 'none' }
                        }
                      >
                        {row?.pre_assessment_json_report?.home_currency?.entity?.accounting_flags
                          ?.quick_ratio?.quick_ratio || '-'}
                      </TableCell>
                    </TableRow>
                ))
                : results?.map((row) => (
                    <TableRow hover tabIndex={-1} key={row?.id}>
                      <TableCell
                        align='center'
                        component='th'
                        id='row-name'
                        scope='row'
                        padding='none'
                      >
                        {row?.date_run ? row?.date_run.slice(0, 10) : '-'}
                      </TableCell>

                      <TableCell align='center'>{row?.obligor_name || '-'}</TableCell>

                      <TableCell align='center'>{row?.credit_type || '-'}</TableCell>

                      <TableCell align='center'>{row?.credit_assessment_type || '-'}</TableCell>

                      <TableCell align='center'>{row?.entity_safe_number || '-'}</TableCell>

                      <TableCell align='center'>{row?.country || '-'}</TableCell>

                      <TableCell align='center'>{row?.category || '-'}</TableCell>

                      <TableCell align='center'>{row?.risk_transfer_entity || '-'}</TableCell>

                      <TableCell
                        align='center'
                        style={
                          row?.pre_assessment_json_report?.GBP?.entity?.cs_status_analysis_flags
                            ?.credit_safe_score?.color
                            ? {
                              background:
                                  row?.pre_assessment_json_report?.home_currency?.entity
                                    ?.cs_status_analysis_flags?.credit_safe_score?.color
                            }
                            : { background: 'none' }
                        }
                      >
                        {row?.pre_assessment_json_report?.home_currency?.entity
                          ?.cs_status_analysis_flags?.credit_safe_score?.credit_safe_score || '-'}
                      </TableCell>

                      <TableCell align='center'>
                        {numberWithCommas(row?.creditLimit) || '-'}
                      </TableCell>

                      <TableCell align='center'>
                        {numberWithCommas(
                          row?.pre_assessment_json_report?.GBP?.entity?.analysis_data_output
                            ?.implied_limit
                        ) || '-'}
                      </TableCell>

                      <TableCell align='center'>
                        {numberWithCommas(
                          row?.pre_assessment_json_report?.GBP?.entity?.analysis_data_output
                            ?.revenue_limit
                        ) || '-'}
                      </TableCell>

                      <TableCell align='center'>
                        {numberWithCommas(
                          row?.pre_assessment_json_report?.GBP?.entity?.analysis_data_output
                            ?.free_cash_flow_limit
                        ) || '-'}
                      </TableCell>

                      <TableCell align='center'>
                        {numberWithCommas(
                          row?.pre_assessment_json_report?.GBP?.entity?.analysis_data_output
                            ?.recovery_limit
                        ) || '-'}
                      </TableCell>

                      <TableCell align='center'>
                        {numberWithCommas(
                          row?.pre_assessment_json_report?.GBP?.entity?.accounting_data_output
                            ?.incorporation_date
                        ) || '-'}
                      </TableCell>

                      <TableCell
                        align='center'
                        style={
                          row?.pre_assessment_json_report?.GBP?.entity?.cs_status_analysis_flags
                            ?.directors_ccj_flag?.color
                            ? {
                              background:
                                  row?.pre_assessment_json_report?.home_currency?.entity
                                    ?.cs_status_analysis_flags?.directors_ccj_flag?.color
                            }
                            : { background: 'none' }
                        }
                      >
                        {row?.row?.pre_assessment_json_report?.home_currency?.entity
                          ?.cs_status_analysis_flags?.directors_ccj_flag?.directors_ccj_flag ||
                          'Not Applicable'}
                      </TableCell>

                      <TableCell align='center'>
                        {numberWithCommas(
                          row?.pre_assessment_json_report?.GBP?.entity?.accounting_data_output
                            ?.accounting_period
                        ) || '-'}
                      </TableCell>

                      <TableCell align='center'>
                        {numberWithCommas(
                          row?.pre_assessment_json_report?.GBP?.entity?.accounting_data_output
                            ?.filing_date
                        ) || '-'}
                      </TableCell>

                      <TableCell align='center'>
                        {numberWithCommas(
                          row?.pre_assessment_json_report?.GBP?.entity?.analysis_data_output
                            ?.revenue
                        ) || '-'}
                      </TableCell>

                      <TableCell align='center'>
                        {numberWithCommas(
                          row?.pre_assessment_json_report?.GBP?.entity?.accounting_data_output
                            ?.operating_profit
                        ) || '-'}
                      </TableCell>

                      <TableCell
                        align='center'
                        style={
                          row?.pre_assessment_json_report?.GBP?.entity?.accounting_flags?.net_income
                            ?.color
                            ? {
                              background:
                                  row?.pre_assessment_json_report?.home_currency?.entity
                                    ?.accounting_flags?.net_income?.color
                            }
                            : { background: 'none' }
                        }
                      >
                        {row?.pre_assessment_json_report?.home_currency?.entity?.accounting_data_output?.net_income.replace(
                          /\B(?=(\d{3})+(?!\d))/g,
                          ','
                        ) || '-'}
                      </TableCell>

                      <TableCell
                        align='center'
                        style={
                          row?.pre_assessment_json_report?.GBP?.entity?.accounting_flags
                            ?.operating_margin?.color
                            ? {
                              background:
                                  row?.pre_assessment_json_report?.home_currency?.entity
                                    ?.accounting_flags?.operating_margin?.color
                            }
                            : { background: 'none' }
                        }
                      >
                        {row?.pre_assessment_json_report?.home_currency?.entity?.accounting_flags
                          ?.operating_margin?.operating_margin || '-'}
                      </TableCell>

                      <TableCell align='center'>
                        {numberWithCommas(
                          row?.pre_assessment_json_report?.GBP?.entity?.analysis_data_output
                            ?.free_cash_flow
                        ) || '-'}
                      </TableCell>

                      <TableCell align='center'>
                        {numberWithCommas(
                          row?.pre_assessment_json_report?.GBP?.entity?.accounting_data_output
                            ?.total_assets
                        ) || '-'}
                      </TableCell>

                      <TableCell align='center'>
                        {numberWithCommas(
                          row?.pre_assessment_json_report?.GBP?.entity?.accounting_data_output
                            ?.total_liabilities
                        ) || '-'}
                      </TableCell>

                      <TableCell
                        align='center'
                        style={
                          row?.pre_assessment_json_report?.GBP?.entity?.accounting_flags
                            ?.quick_ratio?.color
                            ? {
                              background:
                                  row?.pre_assessment_json_report?.home_currency?.entity
                                    ?.accounting_flags?.quick_ratio?.color
                            }
                            : { background: 'none' }
                        }
                      >
                        {row?.pre_assessment_json_report?.home_currency?.entity?.accounting_flags
                          ?.quick_ratio?.quick_ratio || '-'}
                      </TableCell>
                    </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </StyledTableWrap>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  creditHistory: state.creditHistory.data
});

export default connect(mapStateToProps)(DataTableSection);
