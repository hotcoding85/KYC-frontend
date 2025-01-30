import AuthHeader from "./AuthHeader";
import { AuthButton } from "@/components/Elements/Button/Button";

export function InfoComponent({
  title,
  subtitle,
  placeholderText,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryAction,
  onSecondaryAction,
}) {
  return (
    <div className="flex flex-col justify-center w-full p-10 bg-white md:w-1/2">
      <div className="flex flex-col justify-between h-full mx-auto gap-4 w-full md:w-[500px]">
        <div>
          <AuthHeader title="WalletName" />

          <div className="mb-4 md:mb-10">
            <h2 className="text-2xl font-bold text-[#272727] mb-2">{title}</h2>
            <p className="text-base text-[#5F5F6F]">{subtitle}</p>
          </div>

          <div className="flex items-center justify-center  mx-auto w-[275px] h-48 mb-6 text-gray-400 bg-[#212121] rounded-lg">
            {placeholderText}
          </div>
        </div>

        <div className="mt-auto text-sm">
          <div className="flex flex-col gap-4">
            {primaryButtonText && (
              <AuthButton
                title={primaryButtonText}
                onClick={onPrimaryAction}
              />
            )}
            {secondaryButtonText && (
              <AuthButton
                textColor='text-textBlack'
                backgroundColor='bg-white'
                title={secondaryButtonText}
                onClick={onSecondaryAction}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
