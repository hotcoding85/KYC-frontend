import React, { useState } from "react";
import { Checkbox } from "primereact/checkbox";
import Upload from "@/Icons/Upload";
import SubTabNavigation from "../Elements/TabNavigationBar/SubTabsNavigation";
import CryptoDropdown from "../Otc/CryptoDropDown";
import { useRouter } from "next/navigation";
import Placeholder from "@/Icons/imageicon/Placeholder";

const AfterPaymentSection = () => {
  const [formData, setFormData] = useState({
    type: "subscriptions",
    showConfirmation: "show",
    customMessage: false,
    createInvoice: false,
  });

  return (
    <div className="space-y-8">
      {/* Confirmation Page Section */}
      <div>
        <h3 className="mb-4 text-sm font-semibold text-gray-900">Confirmation page</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="show-confirmation"
              name="confirmation"
              value="show"
              checked={formData.showConfirmation === "show"}
              onChange={(e) => setFormData({ ...formData, showConfirmation: e.target.value })}
              className="mt-0.5 h-4 w-4 border-gray-300 text-textBlack accent-black"
            />
            <label htmlFor="show-confirmation" className="text-xs font-semibold text-gray-900">
              Show confirmation page
            </label>
          </div>

          {formData.showConfirmation === "show" && (
            <div className="ml-6">
              <div className="flex gap-2">
                <Checkbox
                  inputId="custom-message"
                  checked={formData.customMessage}
                  onChange={(e) => setFormData({ ...formData, customMessage: e.checked })}
                  className="custom-checkbox"
                />
                <label htmlFor="custom-message" className="text-xs font-semibold">
                  Replace default with custom message
                </label>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="dont-show-confirmation"
              name="confirmation"
              value="dont-show"
              checked={formData.showConfirmation === "dont-show"}
              onChange={(e) => setFormData({ ...formData, showConfirmation: e.target.value })}
              className="mt-0.5 h-4 w-4 border-gray-300 text-textBlack accent-black"
            />
            <div>
              <label htmlFor="dont-show-confirmation" className="block text-xs font-semibold text-gray-900">
                Don&apos;t show confirmation page
              </label>
              <span className="text-xs text-gray-500">Redirect customers to your website</span>
            </div>
          </div>
        </div>
      </div>

      {/* Post-payment Invoice Section */}
      <div>
        <h3 className="mb-4 text-sm font-semibold text-gray-900">Post-payment invoice</h3>
        <div className="flex items-start gap-2">
          <Checkbox
            inputId="create-invoice"
            checked={formData.createInvoice}
            onChange={(e) => setFormData({ ...formData, createInvoice: e.checked })}
            className="custom-checkbox"
          />
          <div>
            <label htmlFor="create-invoice" className="block text-xs font-semibold text-gray-900">
              Create an invoice PDF
            </label>
            <span className="text-xs text-gray-500">We charges 0.4% of the total, capped at $2.00 pe invoice.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const PaymentPageSection = () => {
  const [showAdditional, setShowAdditional] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    currency: "AED",
    presetAmount: "2.00",
    minAmount: "0.50",
    maxAmount: "1000.00",
    callToAction: "Pay",
    uploadedPhoto: null,
  });

  return (
    <>
      <div>
        <label className="block mb-2 text-xs font-normal">Title</label>
        <div className="flex flex-row items-center justify-between w-full h-8 border rounded-lg border-lightGrey">
          <input
            placeholder="Name of cause or service"
            className="w-[calc(100%-130px)] h-full text-xs m-2 placeholder:text-textSecondary text-textSecondary placeholder:text-xs font-normal focus-visible:outline-0"
          />
        </div>
      </div>

      {/* Photo Upload */}
      <div>
        <label className="block mb-2 text-xs">Photo (Optional)</label>
        <div className="p-8 border-2 border-gray-200 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
          <div className="flex flex-col items-center space-y-2">
            <Upload className="w-6 h-6 text-gray-400" />
            <span className="text-xs font-medium">Upload</span>
            <span className="text-[11px] text-gray-500">
              Click or drag to upload
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block mb-2 text-xs">Description</label>
        <textarea className="w-full p-2 border border-gray-300 rounded-2xl h-[103px]"></textarea>
      </div>

      {/* Currency */}
      <div>
        <label className="block mb-2 text-xs">Currency</label>
        <select className="w-full h-8 px-2 border rounded-[10px] text-xs focus:outline-none">
          <option>AED - United Arab Emirates Dirham</option>
        </select>
      </div>

      {/* Preset Amount */}
      <div>
        <div className="flex gap-2 mb-2">
          <Checkbox
            className="custom-checkbox"
            checked={formData.presetAmount !== ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                presetAmount: e.checked ? "2.00" : "",
              })
            }
            id="preset-amount"
          />
          <label htmlFor="preset-amount" className="text-xs font-semibold">
            Suggest a preset amount
          </label>
        </div>
        <div className="flex flex-row items-center justify-between w-48 h-8 ml-6 border rounded-lg border-lightGrey">
          <input className="h-full m-2 text-sm font-normal placeholder:text-textSecondary text-textSecondary placeholder:text-sm focus-visible:outline-0" />
        </div>
      </div>

      {/* Amount Limits */}
      <div>
        <div className="flex gap-2 mb-2">
          <Checkbox
            className="custom-checkbox"
            checked={formData.minAmount !== "" || formData.maxAmount !== ""}
            onChange={(e) => {
              if (!e.checked) {
                setFormData({ ...formData, minAmount: "", maxAmount: "" });
              } else {
                setFormData({
                  ...formData,
                  minAmount: "0.50",
                  maxAmount: "1000.00",
                });
              }
            }}
            id="set-limits"
          />
          <label htmlFor="set-limits" className="text-xs font-semibold">
            Set limits
          </label>
        </div>
        <div className="flex items-center gap-2 ml-6">
          <div>
            <label className="block mb-1 text-xs text-gray-500">
              Minimum amount
            </label>
            <div className="flex flex-row items-center justify-between w-48 h-8 border rounded-lg border-lightGrey">
              <input className="h-full m-2 text-sm font-normal placeholder:text-textSecondary text-textSecondary placeholder:text-sm focus-visible:outline-0" />
            </div>
          </div>
          <div>
            <label className="block mb-1 text-xs text-gray-500">
              Maximum amount
            </label>
            <div className="flex flex-row items-center justify-between w-48 h-8 border rounded-lg border-lightGrey">
              <input className="h-full m-2 text-sm font-normal placeholder:text-textSecondary text-textSecondary placeholder:text-sm focus-visible:outline-0" />
            </div>
          </div>
        </div>
      </div>

      {/* Additional Details */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs">Additional Details (optional)</h3>
          <button
            className="text-sm text-gray-500"
            onClick={() => setShowAdditional(!showAdditional)}
          >
            {showAdditional ? "-" : "+"}
          </button>
        </div>
        {showAdditional && (
          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-xs text-gray-500">
                Call to action
              </label>
              <select className="w-full h-8 px-2 border rounded-[10px] text-xs focus:outline-none">
                <option>Pay</option>
              </select>
            </div>
            <div className="space-y-3">
              <div className="flex gap-2">
                <Checkbox className="custom-checkbox" id="custom-fields" />
                <label
                  htmlFor="custom-fields"
                  className="text-xs font-semibold"
                >
                  Add custom fields
                </label>
              </div>
              <div className="flex gap-2">
                <Checkbox className="custom-checkbox" id="tax-ids" />
                <label htmlFor="tax-ids" className="text-xs font-semibold">
                  Allow business customers to provide tax IDs
                </label>
              </div>
              <div className="flex gap-2">
                <Checkbox className="custom-checkbox" id="collect-tax" />
                <label htmlFor="collect-tax" className="text-xs font-semibold">
                  Collect tax automatically
                </label>
              </div>
              <div className="flex gap-2">
                <Checkbox className="custom-checkbox" id="collect-address" />
                <label
                  htmlFor="collect-address"
                  className="text-xs font-semibold"
                >
                  Collect customers&apos; addresses
                </label>
              </div>
              <div className="flex gap-2">
                <Checkbox className="custom-checkbox" id="phone-number" />
                <label htmlFor="phone-number" className="text-xs font-semibold">
                  Require customers to provide a phone number
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const PaymentPageSubscriptions = () => {
  const [formData, setFormData] = useState({
    product: "",
    quantity: 1,
    adjustQuantity: false,
    collectTax: false,
    collectAddress: false,
    requirePhone: false,
    addCustomFields: false,
  });

  return (
    <>
      {/* Product Section */}
      <div>
        <label className="block mb-2 text-xs text-gray-700">Product</label>
        <div className="flex flex-row items-center justify-between w-full h-8 border rounded-lg border-lightGrey">
          <input
            placeholder="Find or add a test product"
            className="w-full h-full m-2 text-sm font-normal placeholder:text-textSecondary text-textSecondary placeholder:text-xs focus-visible:outline-0"
          />
        </div>
      </div>

      {/* Product Card */}
      <div className="p-4 bg-white border border-gray-200 rounded-2xl">
        <div className="flex items-center gap-4">
          {/* Product Image */}
          <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>

          {/* Product Details */}
          <div className="flex-grow">
            <h3 className="text-sm font-semibold">Add On</h3>
            <p className="text-sm text-gray-600">$6.99 SGD</p>
          </div>
        </div>

        {/* Quantity Section */}
        <div className="mt-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-gray-600">Quantity</span>
            <div className="w-20">
              <input
                type="number"
                value={formData.quantity}
                onValueChange={(e) =>
                  setFormData({ ...formData, quantity: e.value })
                }
                min={1}
                className="w-full text-xs"
                showButtons={false}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Checkbox
              className="custom-checkbox"
              checked={formData.adjustQuantity}
              onChange={(e) =>
                setFormData({ ...formData, adjustQuantity: e.checked })
              }
              id="adjust-quantity"
            />
            <label
              htmlFor="adjust-quantity"
              className="text-xs font-semibold text-gray-600"
            >
              Let customers adjust quantity
            </label>
          </div>
        </div>
      </div>

      {/* Collection Options */}
      <div className="space-y-3">
        <div className="flex gap-2">
          <Checkbox
            className="custom-checkbox"
            checked={formData.collectTax}
            onChange={(e) =>
              setFormData({ ...formData, collectTax: e.checked })
            }
            id="collect-tax"
          />
          <label
            htmlFor="collect-tax"
            className="text-xs font-semibold text-gray-600"
          >
            Collect tax automatically
          </label>
        </div>

        <div className="flex gap-2">
          <Checkbox
            className="custom-checkbox"
            checked={formData.collectAddress}
            onChange={(e) =>
              setFormData({ ...formData, collectAddress: e.target.checked })
            }
            id="collect-address"
          />
          <label
            htmlFor="collect-address"
            className="text-xs font-semibold text-gray-600"
          >
            Collect customers addresses
          </label>
        </div>

        <div className="flex gap-2">
          <Checkbox
            className="custom-checkbox"
            checked={formData.requirePhone}
            onChange={(e) =>
              setFormData({ ...formData, requirePhone: e.target.checked })
            }
            id="require-phone"
          />
          <label
            htmlFor="require-phone"
            className="text-xs font-semibold text-gray-600"
          >
            Require customers to provide a phone number
          </label>
        </div>

        <div className="flex gap-2">
          <Checkbox
            className="custom-checkbox"
            checked={formData.addCustomFields}
            onChange={(e) =>
              setFormData({ ...formData, addCustomFields: e.target.checked })
            }
            id="custom-fields"
          />
          <label
            htmlFor="custom-fields"
            className="text-xs font-semibold text-gray-600"
          >
            Add custom fields
          </label>
        </div>
      </div>

      {/* Advanced Options */}
      <button className="flex items-center justify-between w-full py-2 text-sm font-semibold text-gray-900">
        Advanced options
        <span className="text-xl">+</span>
      </button>
    </>
  );
};

const PaymentLinkGenerator = () => {
  const [activeTab, setActiveTab] = useState("Payment page");
  const subTabs = ["Payment page", "After payment"];
  const [selectedCurrency, setSelectedCurrency] = useState("BTC");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("customer");
  const router = useRouter();

  // Options for dropdowns
  const typeOptions = [
    { label: "Customers choose what to pay", value: "flexible" },
    { label: "Fixed amount", value: "fixed" },
  ];

  const currencyOptions = [
    { label: "AED - United Arab Emirates Dirham", value: "AED" },
    { label: "USD - United States Dollar", value: "USD" },
    { label: "EUR - Euro", value: "EUR" },
  ];

  const actionOptions = [
    { label: "Pay", value: "pay" },
    { label: "Donate", value: "donate" },
    { label: "Subscribe", value: "subscribe" },
  ];

  const currencies = [
    { name: "BTC", logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.png" },
    {
      name: "USD",
      logo: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
    },
  ];

  const handleCurrencySelect = (currency) => {
    setSelectedCurrency(currency);
    setIsOpen(false);
  };

  const type = {
    customer: <PaymentPageSection />,
    product: <PaymentPageSubscriptions />,
  };

  return (
    <div className="min-h-screen">
      <div className="">
        {/* Header */}
        <div className="flex items-center justify-between w-full h-auto p-4 mb-2 bg-white border rounded-2xl border-primary50">
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full hover:bg-gray-100" onClick={() => router.back()}>
              <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M11.3307 5L0.664063 5M0.664063 5L4.66406 9M0.664063 5L4.66406 1"
                  stroke="black"
                  stroke-width="0.75"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <h1 className="text-sm font-semibold">Generate payment link</h1>
          </div>
          <button className="px-4 h-8 text-white text-xs bg-black rounded-[10px] hover:bg-gray-800 whitespace-nowrap">Create Link</button>
        </div>

        <div className="grid h-auto grid-cols-1 gap-8 p-4 mb-2 bg-white border md:grid-cols-2 rounded-2xl border-primary50">
          {/* Form Section */}
          <div className="">
            <div className="space-y-4">
              {/* Select Type */}
              <div>
                <label className="block mb-2 text-xs font-normal">Select type</label>
                <select
                  className="w-full h-8 px-2 border rounded-[10px] text-xs focus:outline-none"
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="customer">Customers choose what to pay</option>
                  <option value="product">Products for subscriptions</option>
                </select>
              </div>

              {/* Tabs */}
              <SubTabNavigation tabs={subTabs} width="min-w-[80px]" activeTab={activeTab} setActiveTab={setActiveTab} />

              {activeTab === "Payment page" ? type[selectedType] : <AfterPaymentSection />}
            </div>
          </div>

          {/* Preview Section */}
          <div className="p-4 bg-white rounded-xl">
            <h2 className="mb-6 text-sm font-semibold">Preview</h2>
            <div className="p-6 bg-lightGrey rounded-xl">
              {/* Header */}
              <div className="flex items-center gap-2 mb-2">
                <div className="">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10.3397 0L17.1999 3.96077L4.07879 11.6177C3.4499 10.5288 3.82275 9.13633 4.91158 8.50743L12.7149 4.0003L10.3397 2.62894L2.27673 7.28407V15.2456L20.0419 4.98467L19.2568 3.78084H24L22.1027 8.14457L21.2872 6.89411L20.6793 7.24501V17.9088L10.3397 23.8784L3.31972 19.9077L5.62609 18.5384L5.63443 18.5432L8.97001 16.5771L16.7073 12.1081C17.3362 13.1969 16.9634 14.5894 15.8745 15.2183L7.88092 19.8353L10.3397 21.2495L18.4026 16.5943V8.5592L1.04299 18.5796L0 17.9088V5.9696L10.3397 0Z"
                      fill="#14151A"
                    />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold">Payment Dashboard</h3>
              </div>

              {/* Description */}
              <p className="mb-6 text-xs text-gray-600">
                Complete your payment securely with crypto or fiat. Select your preferred payment method below.
              </p>

              {/* Currency Selector */}
              <div className="mb-6">
                <label className="block mb-2 text-xs text-gray-700">Select Currency</label>
                <CryptoDropdown
                  width={"!w-full"}
                  className="flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 bg-white border flex-nowrap rounded-xl border-primary50 focus:outline-none "
                  currencies={currencies}
                  selectedCurrency={selectedCurrency}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  handleCurrencySelect={handleCurrencySelect}
                />
              </div>

              {/* Amount Details */}
              <div className="mb-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Amount to Send</span>
                  <span className="text-xs font-medium">0.018 BTC</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Gas Fee</span>
                  <span className="text-xs font-medium">0.000054 BTC</span>
                </div>
                <div className="flex justify-between pt-4 border-t">
                  <span className="text-sm font-semibold">Total Amount</span>
                  <div className="text-right">
                    <div className="text-sm font-semibold">0.018054 BTC</div>
                    <div className="text-sm font-semibold text-gray-500">≈ 501.50 USD</div>
                  </div>
                </div>
              </div>

              {/* QR Code Section */}
              <div className="space-y-4">
                <p className="text-xs">Scan to pay</p>
                <div className="p-6 bg-white rounded-lg">
                  <div className="flex justify-center mb-4">
                    <Placeholder className="w-[40px] h-[40px] aspect-square" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-semibold">Address</p>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] text-gray-600 truncate">
                        0x8aFb5cBfC6b3a9aD1Ff0eF7bCf3aBf3aBf3aBf3aBf
                      </span>
                      <button
                        onClick={() => handleCopy("0x8aFb5cBfC6b3a9aD1Ff0eF7bCf3aBf3aBf3aBf3aBf")}
                        className="px-4 py-1 text-sm bg-white border rounded-lg hover:bg-gray-50"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentLinkGenerator;
