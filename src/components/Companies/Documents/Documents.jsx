"use client";

export default function DocumentCard() {
  const documents = [
    {
      id: 1,
      title: "Trade License",
      dateSubmitted: "12/06/2023",
      status: "Approved",
      statusColor: "bg-successLight text-success",
      companyName: "Watwallet LLC",
      licenseNumber: "022-1230035434",
      issuingAuthority: "Some Authority Name",
      validityDate: "20 - 08 - 2029",
      companyAddress: "Some Company Address",
      businessActivity: "Some Business Activity",
    },
    {
      id: 2,
      title: "Certificate of Incorporation",
      dateSubmitted: "12/06/2023",
      status: "Rejected",
      statusColor: "bg-alertLight text-red-600",
      companyName: "Watwallet LLC",
      incorporationDate: "20 - 08 - 2029",
      companyNumber: "01-222314",
      issuingAuthority: "Some Authority Name",
      legalStructure: "Limited Liability",
    },
    {
      id: 3,
      title: "Proof of Address",
      dateSubmitted: "12/06/2023",
      status: "Pending",
      statusColor: "bg-warningLight text-warning",
      documents: ["Bank Statement", "Utility Bill"],
    },
  ];

  return (
    <div className="space-y-2">
      {documents.map((doc) => (
        <div
          key={doc.id}
          className="p-4 bg-white border shadow-sm rounded-2xl border-primary50"
        >
          <div className="pb-2 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-left leading-5 tracking-tight">{doc.title}</h2>
              <button className="px-4 py-2 h-8 text-xs text-gray-600 border border-gray-300 rounded-[10px] whitespace-nowrap text-left leading-4">
                Download Document
              </button>
            </div>
            <div className="flex items-center sm:mt-0">
              <p className="text-xs font-medium text-gray-500 text-left leading-4">
                Submitted {doc.dateSubmitted}
              </p>
              <span
                className={`text-xs font-semibold text-left leading-4 px-4 py-2 rounded-full ${doc.statusColor} ml-2`}
              >
                {doc.status}
              </span>
            </div>
          </div>

          {/* Content for each type of document */}
          {doc.title === "Trade License" && (
            <div className="grid grid-cols-1 gap-4 mt-4 lg:grid-cols-3">
              <div>
                <p className="mb-2 text-xs font-medium text-gray-500 text-left leading-4">Company Name</p>
                <p className="text-xs font-semibold text-left leading-4">{doc.companyName}</p>
              </div>
              <div>
                <p className="mb-2 text-xs font-medium text-gray-500 text-left leading-4">License Number</p>
                <p className="text-xs font-semibold text-left leading-4">{doc.licenseNumber}</p>
              </div>
              <div>
                <p className="mb-2 text-xs font-medium text-gray-500 text-left leading-4">Issuing Authority</p>
                <p className="text-xs font-semibold text-left leading-4">{doc.issuingAuthority}</p>
              </div>
              <div>
                <p className="mb-2 text-xs font-medium text-gray-500 text-left leading-4">Business Activity</p>
                <p className="text-xs font-semibold text-left leading-4">{doc.businessActivity}</p>
              </div>
              <div>
                <p className="mb-2 text-xs font-medium text-gray-500 text-left leading-4">Validity Date</p>
                <p className="text-xs font-semibold text-left leading-4">{doc.validityDate}</p>
              </div>
              <div>
                <p className="mb-2 text-xs font-medium text-gray-500 text-left leading-4">Company Address</p>
                <p className="text-xs font-semibold text-left leading-4">{doc.companyAddress}</p>
              </div>
            </div>
          )}

          {doc.title === "Certificate of Incorporation" && (
            <div className="grid grid-cols-1 gap-4 mt-4 lg:grid-cols-3">
              <div>
                <p className="mb-2 text-xs font-medium text-gray-500 text-left leading-4">Company Name</p>
                <p className="text-xs font-semibold text-left leading-4">{doc.companyName}</p>
              </div>
              <div>
                <p className="mb-2 text-xs font-medium text-gray-500 text-left leading-4">Incorporation Date</p>
                <p className="text-xs font-semibold text-left leading-4">{doc.incorporationDate}</p>
              </div>
              <div>
                <p className="mb-2 text-xs font-medium text-gray-500 text-left leading-4">Company Number</p>
                <p className="text-xs font-semibold text-left leading-4">{doc.companyNumber}</p>
              </div>
              <div>
                <p className="mb-2 text-xs font-medium text-gray-500 text-left leading-4">Legal Structure</p>
                <p className="text-xs font-semibold text-left leading-4">{doc.legalStructure}</p>
              </div>
              <div>
                <p className="mb-2 text-xs font-medium text-gray-500 text-left leading-4">Issuing Authority</p>
                <p className="text-xs font-semibold text-left leading-4">{doc.issuingAuthority}</p>
              </div>
            </div>
          )}

          {doc.title === "Proof of Address" && (
            <div className="flex flex-col mt-4 space-y-2">
              <div className="flex flex-wrap space-x-0 space-y-4 md:space-x-4 md:space-y-0">
                {doc.documents.map((document) => (
                  <div
                    key={document}
                    className="flex items-center justify-between w-full px-4 py-2 text-xs text-gray-600 border border-gray-300 md:w-auto rounded-xl gap-x-2"
                  >
                    <p>{document}</p>
                    <button className="px-4 py-2 h-8 text-xs text-gray-600 border border-gray-300 rounded-[10px] whitespace-nowrap">
                      Download Document
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
