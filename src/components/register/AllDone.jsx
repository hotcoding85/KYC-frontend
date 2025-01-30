import Image from "next/image";
import Button from "@/components/Elements/Button/Button";

export function AllDone() {
  return (
    <div className="flex flex-col justify-between h-full mx-auto gap-4 w-full md:w-[500px]">
      <div className="mb-4 md:mb-6">
        <h2 className="text-base font-semibold text-textBlack mb-2">
          You’re all set!
        </h2>
        <p className="font-normal text-xs text-textSecondary">
          Your walletname username enables seamless peer-to-peer payments.
        </p>
      </div>

      {/* Username Input */}
      <div className="mb-6 flex items-center justify-center">
        <Image
          alt="check"
          width={100}
          height={100}
          src="/assets/icons/check_black.svg"
        />
      </div>

      <Button
        title="Done"
        className="w-full bg-primary border-none rounded-2xl text-white"
      />
    </div>
  );
}
