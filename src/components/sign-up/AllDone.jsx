import Image from "next/image";
import { AuthButton } from "@/components/Elements/Button/Button";

export function AllDone() {
  return (
    <div className="flex flex-col justify-between h-full mx-auto gap-4 w-full md:w-[500px]">
      <div className="mb-4 md:mb-6">
        <h2 className="text-base font-semibold text-textBlack mb-2">
          You’re all set!
        </h2>
        <p className="font-normal text-xs text-textSecondary">
          You can login and start exploring the platform.
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

      <AuthButton title="Done" className="rounded-lg bg-primary" />
    </div>
  );
}
