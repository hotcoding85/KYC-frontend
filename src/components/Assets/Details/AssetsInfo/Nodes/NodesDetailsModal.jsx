import { TextButton } from "@/components/Elements/Button/Button";
import Modal from "@/components/Modal/Modal";
import { capitalizeFirstLetter } from "@/utils/helper";

const MockDataOne = [
  {
    Network: "IP Address",
    Mainnet: "12",
  },
  {
    Network: "PRC Port",
    Mainnet: "12",
  },
  {
    Network: "PRC User Name",
    Mainnet: "xx xxx xxxx",
  },
  {
    Network: "PRC Password",
    Mainnet: "xx xxx xxxx",
  },
];

const MockDataTwo = [
  {
    Network: "WS Port",
    Mainnet: "xx xxx xxxx",
  },
  {
    Network: "Admin Panel Port",
    Mainnet: "xx xxx xxxx",
  },
  {
    Network: "# of Wallet",
    Mainnet: "xx xxx xxxx",
  },
  {
    Network: "Wallet Balance",
    Mainnet: "xx xxx xxxx",
  },
  {
    Network: "System Uptime",
    Mainnet: "xx xxx xxxx",
  },
];
const NodesDetailsModal = ({
  isModalOpen,
  closeModal,
  data_one = MockDataOne,
  data_two = MockDataTwo,
  selectedNode,
}) => {
  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Node details"
        customWidth="w-[500px]"
        contentClassName="p-0"
      >
        {/** Modal Body */}
        <div className="flex flex-col w-full p-4 mx-auto gap-2">
          <div className="flex items-center justify-between">
            <p className="text-xs pb-1 font-semibold text-textBlack leading-4 tracking-[-0.01em] ">
              Network
            </p>
            <p className="text-xs font-semibold text-textBlack leading-4 tracking-[-0.01em]">
              {capitalizeFirstLetter("mainnet")}
            </p>
          </div>
          {/* <div className="flex items-center justify-between">
            <p className="text-base font-semibold text-textBlack tracking-[-0.01em]">
              Network Type
            </p>
            <p className="text-base font-semibold text-textBlack tracking-[-0.01em]">
              {capitalizeFirstLetter(
                (selectedNode &&
                  selectedNode.networkType &&
                  selectedNode?.networkType
                    .split("_")
                    .join("")
                    .toLowerCase()) ||
                  "mainnet"
              )}
            </p>
          </div> */}
          <div className="flex flex-col w-full gap-2">
            {/* <SingleNetworkRow
              Network="Network"
              Mainnet={selectedNode?.network?.name}
            /> */}
            <SingleNetworkRow
              Network="IP Address"
              Mainnet={selectedNode.ipAddress ?? "12"}
            />
            <SingleNetworkRow
              Network="RPC Port"
              Mainnet={selectedNode.rpcPort ?? "12"}
            />
            <SingleNetworkRow
              Network="RPC User Name"
              Mainnet={selectedNode.userName ?? "12"}
            />
            <SingleNetworkRow Network="RPC Password" Mainnet={"xx xxx xxxx"} />
          </div>
          <div className="flex flex-col w-full gap-2">
            <SingleNetworkRow
              Network="WS Port"
              Mainnet={selectedNode.webSocketPort ?? "12"}
            />
            <SingleNetworkRow
              Network="WS Address"
              Mainnet={selectedNode.webSocketAddress ?? "12"}
            />
            <SingleNetworkRow
              Network="Admin Panel Port"
              Mainnet={selectedNode.adminPannelPort ?? "12"}
            />
            <SingleNetworkRow
              Network="# of Wallet"
              Mainnet={selectedNode.noOfWallet ?? "12"}
            />
            <SingleNetworkRow
              Network="Wallet Balance"
              Mainnet={selectedNode.noOfWallet ?? "12"}
            />
            <SingleNetworkRow
              Network="System Uptime"
              Mainnet={selectedNode.noOfWallet ?? "12"}
            />
          </div>
        </div>
        {/* Modal Footer */}
        <div className="flex justify-end p-4 space-x-2 border-t">
          <TextButton
            title="Recharge Port"
            borderColor="border"
            textColor="text-textBlack"
            backgroundColor="bg-white"
            className="!min-w-[114px]"
          />
          <TextButton
            title="Restart"
            borderColor="border"
            textColor="text-textBlack"
            backgroundColor="bg-white"
            className="!min-w-[114px]"
          />
          <TextButton
            title="Stop"
            borderColor="border"
            textColor="text-textBlack"
            backgroundColor="bg-white"
            className="!min-w-[114px]"
          />
        </div>
      </Modal>
    </>
  );
};
export default NodesDetailsModal;

export const SingleNetworkRow = ({ Network, Mainnet }) => (
  <div className="flex items-center justify-between">
    <p className="text-xs font-medium text-textSecondary leading-4 tracking-[-0.005em] mb-2 ">
      {Network}
    </p>
    <p className="text-xs font-medium text-textBlack leading-4 text-right ">
      {Mainnet}
    </p>
  </div>
);
