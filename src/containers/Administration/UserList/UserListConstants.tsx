export interface IProps {
  dispatch: Function;
  handleSortData: Function;
  handlePaginationAndUpdateList: Function;
  page: number;
  rowsPerPage: number;
  customerData: {
    data: {
      count: number;
      results: {
        company_number: string;
        country_code: string;
        created_at: string;
        cuid: string;
        customer: number;
        customer_name: string;
        email: string;
        first_name: string;
        id: number;
        last_name: string;
        status: string;
        updated_at: string;
        user: number;
        vat_number: string;
      }[];
    };
    status: string;
  };
  userList: {
    data: {
      count: number;
      file_path: string;
      results: {
        approved: boolean;
        created_at: string;
        eligible: boolean;
        email: string;
        first_name: string;
        has_customer: boolean;
        is_owner: boolean;
        last_name: string;
        onboarded_at: string;
        phone: string;
        pk: number;
        status: string;
        terms: boolean;
        username: string;
      }[];
    };
    status: string;
    message: {
      data?: string;
    };
  };
}

export interface Data {
  phone: string;
  monthly_invoice: number;
  start_date: string;
  end_date: string;
  advance_date: string;
  onboarded_at: string | number;
  notional_invoice_value: string;
  haircut_percent: string;
  haircut_amount: string;
  advance_fee: string;
  daily_advance_fee: string;
  expected_repayment_date: string;
  gross_revenue: string;
  advance_duration: string;
  currency: string;
  fee_setting: string;
  advance_amount: string;
  fee_amount: string;
  InvoiceMonth_month: number;
  InvoiceMonth_year: number;
  InvoiceMonth_month_end: string;
  action: string;
  data_source: number;
  data_source_name: string;
  sent_to_aptic: boolean;
  first_name: string;
  last_name: string;
  username: string;
  fullname: string;
  email: string;
  cust_id: number;
  pk: string | number;
  customer: string;
  status: string;
  customer_name: string;
}
