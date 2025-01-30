import { ButtonsText, TextButton } from "@/components/Elements/Button/Button";
import React, { useState } from "react";
import TransactionsDetailsModal from "@/components/Transactions/TransactionsDetailsModal";
import FilterModal from "@/components/Elements/FilterModal/FilterModal";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import CheckBox from "@/components/Elements/Checkbox/CheckBox";
import Tag from "@/components/Elements/Tag/Tag";
import Action from "@/components/Elements/Action/Action";
import useIsMobile from "@/hooks/useIsMobile";
import AssetWalletTableComponent from "@/components/Elements/DataTable/Assets/wallets";
import TransactionHistoryTableComponent from "@/components/Elements/DataTable/Assets/transactionHistory";

const data = [
  {
    id: '302012',
    walletName: 'Wallet name',
    amount: '12',
    value: 'xx xxx xxxx',
    status: 'Inactive',
  },
  {
    id: '302012',
    walletName: 'Wallet name',
    amount: '12',
    value: 'xx xxx xxxx',
    status: 'Inactive',
  },
];

const transactionData = [
  {
    date: "Sep 23 -2023",
    amount: "10",
    value: "100",
    status: "Pending"
  },
  {
    date: "Sep 23 -2023",
    amount: "10",
    value: "100",
    status: "Rejected"
  }
]

const filterSample = [
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
];

const walletDetails = [
  { label: "Wallet Name", value: "12" },
  { label: "Public Address", value: "12" },
  { label: "Node Address", value: "xx xxx xxxx" },
  { label: "Balance", value: "xx xxx xxxx" },
  { label: "Last Transaction", value: "xx xxx xxxx" },
  { label: "Status", value: "xx xxx xxxx" }
];

export default function Wallets() {
  const isMobile = useIsMobile()

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const assetIdTemplate = (rowData) => {
    return (
      <div className="flex items-center gap-1 sm:pl-5">
        <CheckBox></CheckBox>
        <p className='line-clamp-1'>#{rowData?.id}</p>
      </div>
    );
  };

  const assetWalletNameTemplate = (rowData) => {
    return (
      <p className="cursor-pointer line-clamp-1">{rowData?.walletName}</p>
    );
  };

  const assetReferenceTemplate = (rowData) => {
    return (
      <p>{rowData?.reference}</p>
    );
  };

  const assetAmountTemplate = (rowData) => {
    return (
      <p>{rowData?.amount}</p>
    );
  };

  const assetValueTemplate = (rowData) => {
    return (
      <p>{rowData?.value}</p>
    );
  };

  const assetStatusTemplate = (rowData) => {
    // const status = rowData.status
    //   ? rowData.active
    //     ? "success"
    //     : "danger"
    //   : "warning";
    const status = rowData.status === 'Active' ? 'success' : rowData.status === 'Pending' ? 'warning' : 'danger'
    return (
      <Tag
        status={status}
        text={rowData.status}
        // text={
        //   status === "success"
        //     ? "Trading"
        //     : status === "danger"
        //       ? "Suspended"
        //       : "Inactive"
        // }
      />
    );
  };

  const assetActionTemplate = (rowData) => {
    const status = rowData.status
      ? rowData.active
        ? "success"
        : "danger"
      : "warning";
    return (
      <Action>
        {status === "warning" && (
          <li
            onClick={() => handleOption("Activate", rowData)}
            className="px-4 py-2 text-success cursor-pointer hover:bg-gray-50"
          >
            Activate
          </li>
        )}
        <li
          onClick={() => {
            push(`/dashboard/assets/detail/${rowData.asset_id}`)
            // handleOption("View Details")
          }}
          className="px-4 text-textBlack py-2 cursor-pointer hover:bg-gray-50"
        >
          View Details
        </li>
        <li
          onClick={() => {
            handleOption("Edit Details", rowData);
          }}
          className="px-4  text-textBlack py-2 cursor-pointer hover:bg-gray-50"
        >
          Edit Details
        </li>
        {status === "warning" && (
          <li
            onClick={() => handleOption("Reject", rowData)}
            className="px-4 py-2 text-red-600 cursor-pointer hover:bg-gray-50"
          >
            Deactivate
          </li>
        )}
        {status === "success" && (
          <li
            onClick={() => handleOption("Suspend", rowData)}
            className="px-4 py-2 text-red-600 cursor-pointer hover:bg-gray-50"
          >
            Stop Trading
          </li>
        )}
        {status === "danger" && (
          <li
            onClick={() => handleOption("Activate", rowData)}
            className="px-4 py-2 text-success cursor-pointer hover:bg-gray-50"
          >
            Activate
          </li>
        )}
      </Action>
    );
  };

  const assetDateTemplate = (rowData) => {
    return (
      <p className="cursor-pointer line-clamp-1">{rowData?.date}</p>
    );
  };

  const handleFilterChange = (filter) => {
    //Filter Logic
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        {/* Left Section */}
        <div className='col-span-2 xl:col-span-1'>
          <AssetWalletTableComponent
            data={data}
            title='Wallets'
            isAddBtnVisible={false}
            isStatementVisible={false}
            isFilterValueVisible={false}
          />
        </div>

        {/* Right Section */}
        <div className="col-span-2 xl:col-span-1">
          <div
            className="w-full h-full p-4 border border-primary50 bg-white rounded-2xl shadow-sm flex flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[14px] font-semibold leading-[20px] tracking-[-0.005em] text-textBlack ">Wallet Details</p>
              <ButtonsText
                title="Freeze Wallet"
                textColor='text-alert'
                backgroundColor='bg-white'
                borderColor='border-alert'
                className='border !w-[109px] !min-w-[109px] h-8  rounded-lg'
              />
            </div>
            <div className="flex flex-col items-start justify-center w-full gap-3">
              {walletDetails.map((item, index) => (
                <div key={index} className="flex flex-wrap gap-1 items-center justify-between w-full">
                  <p className="text-[12px] font-medium text-textSecondary leading-[16px] text-left mb-2">
                    {item.label}
                  </p>
                  <p className="text-xs font-semibold text-textBlack text-right mb-2">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <TransactionHistoryTableComponent
              isWallet
              data={data}
              isAddBtnVisible={false}
              isStatementVisible={false}
              title='Transaction History'
            />
          </div>
        </div>
      </div>
      <TransactionsDetailsModal isModalOpen={isModalOpen} closeModal={closeModal} />
    </>
  )
}
