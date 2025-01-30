export const FEE_SCHEME_TYPE = {
  BTC: 'BTC',
  ETH: 'ETH',
  USD: 'USD',
};
export const FEE_SCHEME_ACTIVITY  = {
  SEND: 'SEND',
  RECEIVE: 'RECEIVE',
  BUY: 'BUY',
  SELL: 'SELL',
  EXCHANGE: 'EXCHANGE',
}

export const FEE_SCHEME_FEE_TYPE = {
  PERCENT: 'PERCENT',
  AMOUNT: 'AMOUNT',
}

export const FEE_SCHEME_GAS_PRICE_TYPE = {
  PERCENT: 'PERCENT',
  AMOUNT: 'AMOUNT',
}

export const FEE_SCHEME_CRITERIA_TYPE = {
  AMOUNT: 'AMOUNT',
  DATE: 'DATE',
  DAY: 'DAY',
  COUNTRY: 'COUNTRY',
}

export const FEE_SCHEME_CRITERIA_COMPARASION = {
  LESS_THAN: 'LESS_THAN',
  GREATER_THAN: 'GREATER_THAN',
  EQUALS: 'EQUALS',
  GREATER_THAN_EQUAL: 'GREATER_THAN_EQUAL',
  LESS_THAN_EUQAL: 'LESS_THAN_EUQAL',
}

export const SORT_BY_SAMPLE_DATA = [
  {
    label: "Created Data",
    value: "created_at",
    type: "date",
  },
  {
    label: "Name",
    value: "name",
    type: "text",
  },
  {
    label: "Amount",
    value: "usd_value",
    type: "value",
  },
]

export const FILTER_SAMPLE_DATA = [
  {
    label: "Amount",
    icon: "Icon",
    value: "amount",
    type: "string",
    options: [
      {
        label: "10 K",
        icon: "Icon",
        value: "10",
      },
    ],
  },
  {
    label: "Amount",
    icon: "Icon",
    value: "amountc",
    type: "string",
    options: [
      {
        label: "10 K",
        icon: "Icon",
        value: "10",
      },
    ],
  },
  {
    label: "Amount",
    icon: "Icon",
    value: "amountd",
    type: "date",
  },
  {
    label: "Amount",
    icon: "Icon",
    value: "amountr",
    type: "category",
    category: [
      {
        value: "Fiatd",
        label: "Fiat",
        options: [
          {
            label: "10 K",
            value: "10",
          },
        ],
      },
      {
        value: "Fiatre",
        label: "Fiat",
        icon: "Icon",
        options: [
          {
            label: "10 K",
            icon: "Icon",
            value: "10",
          },
        ],
      },
    ],
  },
]

export const PERMISSIONS = {
  accountManagement: {
    title: "Account Management",
    sections: [
      {
        title: "User Access",
        key: "userAccess",
        items: [
          { label: "View Users", key: "viewUsers" },
          { label: "Edit Users", key: "editUsers" },
          { label: "Delete Users", key: "deleteUsers" },
          { label: "Block Users", key: "blockUsers" },
        ],
      },
      {
        title: "Role Management",
        key: "roleManagement",
        items: [
          { label: "Create Roles", key: "createRoles" },
          { label: "Assign Roles", key: "assignRoles" },
          { label: "Edit Roles", key: "editRoles" },
        ],
      },
    ],
  },
  financialManagement: {
    title: "Financial Management",
    sections: [
      {
        title: "Transactions",
        key: "transactions",
        items: [
          { label: "View Transactions", key: "viewTransactions" },
          { label: "Approve Transactions", key: "approveTransactions" },
          { label: "Export Transactions", key: "exportTransactions" },
        ],
      },
      {
        title: "Reports",
        key: "reports",
        items: [
          { label: "View Reports", key: "viewReports" },
          { label: "Download Reports", key: "downloadReports" },
          { label: "Generate Reports", key: "generateReports" },
        ],
      },
    ],
  },
  settings: {
    title: "Settings",
    sections: [
      {
        title: "General Settings",
        key: "generalSettings",
        items: [
          { label: "Edit General Settings", key: "editGeneralSettings" },
          { label: "Change Platform Preferences", key: "changePlatformPreferences" },
        ],
      },
      {
        title: "Security",
        key: "security",
        items: [
          { label: "Manage Security Settings", key: "manageSecuritySettings" },
          { label: "View Security Logs", key: "viewSecurityLogs" },
        ],
      },
    ],
  },
};
