export interface CustomerObj {
  cuid: string;
  name: string;
  company_number: string;
  country_code: string;
  vat_number: string;
  no_of_users: Number;
}

export type Order = 'asc' | 'desc';

export interface HeadCell {
  disablePadding: boolean;
  id: keyof CustomerObj;
  label: string;
  numeric: boolean;
}

export interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof CustomerObj) => void;
  order: Order;
  orderBy: string;
}

export interface IProps {
  customerList: {
    data: {
      count: number;
      results: {
        address_one: string;
        company_category: string;
        company_number: string;
        company_reference: string;
        country_code: string;
        cuid: string;
        cust_id: string;
        customer_icon: string;
        customer_risk_transfer: string;
        customer_website: string;
        default_currency: string;
        email: string;
        name: string;
        no_of_users: Number;
        phone_number: string;
        safe_number: string;
        status: string;
        vat_number: string;
      }[];
    };
    status: string;
  };
  dispatch: Function;
  updateList: Function;
  handleSortData: Function;
  handlePaginationAndUpdateList: Function;
  updateCustomer: {
    data: any;
    status: string;
    message: {
      data?: any;
    };
  };
  deleteCustomer: {
    message: {
      data?: string;
    };
    data: any;
    status: string;
  };
  answerOptionsReducer: {
    data: any;
    status: string;
    message: {
      data?: string;
    };
  };
  page: number;
  rowsPerPage: number;
}
export interface DataProps {
  dispatch: Function;
  customerList: {
    data: {
      count: number;
      results: {
        address_one: string;
        company_category: string;
        company_number: string;
        company_reference: string;
        country_code: string;
        cuid: string;
        cust_id: string;
        customer_icon: string;
        customer_risk_transfer: string;
        customer_website: string;
        default_currency: string;
        email: string;
        name: string;
        no_of_users: Number;
        phone_number: string;
        safe_number: string;
        status: string;
        vat_number: string;
      }[];
    };
    status: string;
  };
  addCustomer: {
    data: any;
    status: string;
    message: {
      data?: string;
    };
  };
  answerOptionsReducer: {
    data: any;
    status: string;
    message: {
      data?: string;
    };
  };
}
export interface IError {
  name?: string;
  revenueSource?: string;
  impressionValue?: number;
  companyNo?: string;
  vatNumber?: string;
}
