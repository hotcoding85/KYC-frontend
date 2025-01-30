import Button, { TextButton } from "@/components/Elements/Button/Button";
import Modal from "@/components/Modal/Modal";
import { capitalizeFirstLetter } from "@/utils/helper";
import { SingleNetworkRow } from "@/components/Assets/Details/AssetsInfo/Nodes/NodesDetailsModal";

const NetworksDetailsModal = ({ isModalOpen, closeModal, selectedNetwork }) => {
  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Network details"
        customWidth="w-[500px]"
        contentClassName="p-0"
      >
        {/** Modal Body */}
        <div className="flex flex-col w-full gap-1 p-2 mx-auto space-y-1 p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs pb-1 font-semibold text-textBlack leading-4 tracking-[-0.01em] ">
              Network
            </p>
            <p className="text-xs font-semibold text-textBlack leading-4 tracking-[-0.01em]">
              {capitalizeFirstLetter(
                (selectedNetwork?.nodes?.length &&
                  selectedNetwork?.nodes[0]?.network &&
                  selectedNetwork?.nodes[0]?.network
                    .split("_")
                    .join("")
                    .toLowerCase()) ||
                  "mainnet"
              )}
            </p>
          </div>
          <div className="flex flex-col w-full gap-2">
            {/* <SingleNetworkRow Network="Name" Mainnet={selectedNetwork?.name} /> */}
            {/* <SingleNetworkRow
              Network="Node"
              Mainnet={
                selectedNetwork?.nodes?.length
                  ? selectedNetwork?.nodes[0]?.name
                  : ""
              }
            /> */}
            <SingleNetworkRow
              Network="IP Address"
              Mainnet={
                selectedNetwork?.nodes?.length
                  ? selectedNetwork?.nodes[0]?.ipAddress
                  : "12"
              }
            />
            <SingleNetworkRow
              Network="RPC Port"
              Mainnet={
                selectedNetwork?.nodes?.length
                  ? selectedNetwork?.nodes[0]?.rpcPort
                  : "12"
              }
            />
            <SingleNetworkRow
              Network="RPC User Name"
              Mainnet={
                selectedNetwork?.nodes?.length
                  ? selectedNetwork?.nodes[0]?.userName
                  : "xx xxx xxxx"
              }
            />
            <SingleNetworkRow Network="RPC Password" Mainnet={"xx xxx xxxx"} />
          </div>
          <div className="flex flex-col w-full gap-2">
            <SingleNetworkRow
              Network="WS Port"
              Mainnet={
                selectedNetwork?.nodes?.length
                  ? selectedNetwork?.nodes[0]?.webSocketPort
                  : "12"
              }
            />
            {/* <SingleNetworkRow
              Network="WS Address"
              Mainnet={
                selectedNetwork?.nodes?.length
                  ? selectedNetwork?.nodes[0]?.webSocketAddress
                  : ""
              }
            /> */}
            <SingleNetworkRow
              Network="Admin Panel Port"
              Mainnet={
                selectedNetwork?.nodes?.length
                  ? selectedNetwork?.nodes[0]?.adminPannelPort
                  : "12"
              }
            />
            <SingleNetworkRow
              Network="# of Wallet"
              Mainnet={
                selectedNetwork?.nodes?.length
                  ? selectedNetwork?.nodes[0]?.noOfWallet
                  : "xx xxx xxxx"
              }
            />
            <SingleNetworkRow
              Network="Wallet Balance"
              Mainnet={
                selectedNetwork?.nodes?.length
                  ? selectedNetwork?.nodes[0]?.noOfWallet
                  : ""
              }
            />
            <SingleNetworkRow
              Network="System Uptime"
              Mainnet={
                selectedNetwork?.nodes?.length
                  ? selectedNetwork?.nodes[0]?.noOfWallet
                  : "xx xxx xxxx"
              }
            />
          </div>
        </div>
        {/* Modal Footer */}
        <div className="flex justify-end p-4 space-x-4 border-t">
          <TextButton
            title="Recharge Port"
            backgroundColor="bg-white"
            textColor="text-textBlack"
            borderColor="border"
            className="!min-w-[114px]"
          />
          <TextButton
            title="Restart"
            backgroundColor="bg-white"
            textColor="text-textBlack"
            borderColor="border"
            className="!min-w-[114px]"
          />
          <TextButton
            title="Stop"
            backgroundColor="bg-white"
            textColor="text-textBlack"
            borderColor="border "
            className="!min-w-[114px]"
          />
        </div>
      </Modal>
    </>
  );
};
export default NetworksDetailsModal;
