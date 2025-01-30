// shared/enums.js

// User Role
export const ROLE = {
  SUPER_ADMINISTRATOR: "SUPER_ADMINISTRATOR",
  SUPER_USER: "SUPER_USER",
  COMPANY_ADMINISTRATOR: "COMPANY_ADMINISTRATOR",
  COMPANY_USER: "COMPANY_USER",
  END_USER: "END_USER",
};

// Company Account Type
export const COMPANY_ACCOUNT_TYPE = {
  HOLDING: "HOLDING",
  WEB3: "WEB3",
  BANKING: "BANKING",
};


// Asset Type
export const ASSET_TYPE = {
  NFT: "NFT",
  TOKEN: "TOKEN",
  CRYPTOCURRENCY: "CRYPTOCURRENCY",
  FIAT: "FIAT",
};

// Node Network Type
export const NODE_NETWORK_TYPE = {
  MAIN_NET: "MAIN_NET",
  TEST_NET: "TEST_NET",
};

// Fee Scheme Activity
export const FEE_SCHEME_ACTIVITY = {
  SEND: "SEND",
  RECEIVE: "RECEIVE",
  BUY: "BUY",
  SELL: "SELL",
  EXCHANGE: "EXCHANGE",
};

// Fee Scheme Fee Type
export const FEE_SCHEME_FEE_TYPE = {
  PERCENT: "PERCENT",
  AMOUNT: "AMOUNT",
};

// Fee Scheme Gas Price Type
export const FEE_SCHEME_GAS_PRICE_TYPE = {
  PERCENT: "PERCENT",
  AMOUNT: "AMOUNT",
};

// Fee Scheme Criteria Type
export const FEE_SCHEME_CRITERIA_TYPE = {
  AMOUNT: "AMOUNT",
  DATE: "DATE",
  DAY: "DAY",
  COUNTRY: "COUNTRY",
};

// Fee Scheme Criteria Comparison
export const FEE_SCHEME_CRITERIA_COMPARISON = {
  LESS_THAN: "LESS_THAN",
  GREATER_THAN: "GREATER_THAN",
  EQUALS: "EQUALS",
};

// Vendor Type
export const VENDOR_TYPE = {
  LIQUIDITY: "LIQUIDITY",
  ACCOUNT: "ACCOUNT",
};

export const PROOF_OF_ADDRESS_DOCUMENT = {
  BANKSTATEMENT: "Bank Statement",
  COUNCILBILL: "Council Bill",
  CREDITCARDSTATEMENT: "Credit Card Statement",
  LEASEAGREEMENT: "Lease Agreement",
  LOANAPPLICATION: "Loan Application",
  MORTGAGEAPPLICATION: "Mortgage Application",
  PHONEBILL: "Phone Bill",
  TAXRETURN: "Tax Return",
  UTILITYBILL: "Utility Bill",
};


export const SOURCE_OF_FUNDS = {
  SALARY: "Salary",
  SAVINGS: "Savings",
  SELFEMPLOYED: "Self Employed",
  LOANS: "Loans",
}

export const PURPOSE_OF_ACCOUNT_OPENING = {
  DIGITALASSET: "Digital Asset OTC Desk",
  CRYPTOLOANS: "Crypto Loans",
  PEERTOPEER: "Peer to Peer Transfer",
  CREDITDEBIT: "Credit or Debit Services",
}
