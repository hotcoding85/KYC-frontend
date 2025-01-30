import AuthHeader from "./AuthHeader";
import { AuthButton } from "@/components/Elements/Button/Button";

export function KYC({
  verification
}) {
  return (
    <div className="flex flex-col justify-between h-full mx-auto gap-4 w-full md:w-[500px]">
        <div className="mb-4 md:mb-6">
            <h2 className="mb-2 text-base font-semibold text-textBlack">
            {`Compliance Verification`}
            </h2>
            <p className="mb-2 text-xs font-normal text-textSecondary">
            {`You're almost there! Just follow the steps to complete your verification`}
            </p>
        </div>
        <a className="w-full py-1 px-4 text-center font-normal rounded-lg bg-primary h-8 text-[12px] text-white undefined bg-grey900 border border-grey900" href={verification} target="_blank">Start Verification</a>
    </div>
  );
}
