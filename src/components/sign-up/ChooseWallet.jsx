import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "@/components/Elements/Button/Button";

export function ChooseWallet({ onNext }) {
  const router = useRouter();
  return (
    <div className="flex flex-col justify-between h-full mx-auto gap-4 md:w-[500px]">
      <div className="mb-4 md:mb-6">
        <h2 className="text-base font-semibold text-textBlack mb-2">
          Choose Service
        </h2>
        <p className="text-xs font-normal text-textSecondary">
          {`Select the type of wallet you'd like to create.`}
        </p>
      </div>

      {/* Centralized Wallet */}
      <WalletCard
        title="Centralized"
        icon="/assets/icons/user-border.svg"
        subTitle="Buy, sell, and exchange over 50 coins and tokens with low fees and high security. Access latest market data and trends on your dashboard."
        isSelected
      />

      {/* Decentralized Wallet */}
      <WalletCard
        title="Decentralized"
        icon="/assets/icons/wallet-border.svg"
        subTitle="Create a new wallet or import an existing one. Remember, your private key and recovery phrase are confidential and provide full access to your wallet."
      />

      <div className="flex flex-col gap-10 mt-6">
        <Button
          title="Confirm"
          onClick={onNext}
          className="w-full bg-primary border-none rounded-2xl text-white"
        />
      </div>
    </div>
  );
}

const WalletCard = ({ title, subTitle, icon, isSelected }) => {
  return (
    <div
      className={`p-4 border ${
        isSelected ? "border-textBlack" : "border-grey300"
      } cursor-pointer rounded-2xl`}
    >
      <h3 className="mb-2 flex items-center gap-2">
        <Image src={icon} alt="icon" width={24} height={24} />
        <span className="text-sm font-semibold text-textBlack">{title}</span>
      </h3>
      <p className="font-normal text-xs text-textSecondary">{subTitle}</p>
    </div>
  );
};
