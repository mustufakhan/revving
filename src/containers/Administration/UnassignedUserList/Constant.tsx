export interface Data {
  onboarded_at: number;
  first_name: string;
  email: string;
  phone: number;
  company_name: string;
  country_code: number;
  website: string;
  sector: string;
  business_type: string | number;
  trading_duration: string;
  reg_number: string;
  employees: string | number;
  turnover: string | number;
  funding_needs: string | number;
  revenue_sources: string | number;
  action: any;
  user: any;
}

export interface IProps {
  dispatch: Function;
  userList: {
    data: {
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
      };
    }[];
    status: string;
  };
  checklist: {
    data: {
      results: {
        accounting: string;
        accounting_cr: string;
        accounting_cr_status: string;
        business_type: string;
        company_name: string;
        country_code: string;
        employees: string;
        funding_needs: number;
        pk: number;
        reg_number: string;
        registered_in: string;
        reporting_currency: string;
        revenue_sources: any;
        sector: string;
        trading_duration: string;
        turnover: string;
        user: any;
        uuid: string;
        website: string;
      };
    }[];
    status: string;
  };
}
