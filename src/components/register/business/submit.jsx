import React from 'react'
import { CheckboxItems } from "@/components/register/business/create-business";

const VerificationSubmit = () => {
  return (
    <div className="flex justify-center max-h-[60vh] overflow-y-auto mt-4">
      <div className="flex flex-col items-start w-[500px] gap-4">
        <h2 className="font-semibold text-base text-textBlack">
          You have completed your entity verification
        </h2>

        <CheckboxItems>
          <p className="font-semibold text-xs text-textBlack ml-2">
            Lorem ipsum dolor sit amet consectetur. Pharetra dis consequat commodo est egestas nunc vitae urna purus.
            Purus ut tempus massa pellentesque non ac. Tellus cursus arcu viverra lectus. Nibh quam maecenas ut nec
            morbi consectetur turpis.
          </p>
        </CheckboxItems>

        <CheckboxItems>
          <p className="font-semibold text-xs text-textBlack ml-2">
            Lorem ipsum dolor sit amet consectetur. Pharetra dis consequat commodo est egestas nunc vitae urna purus.
            Purus ut tempus massa pellentesque non ac. Tellus cursus arcu viverra lectus. Nibh quam maecenas ut nec
            morbi consectetur turpis.
          </p>
        </CheckboxItems>
      </div>
    </div>
  );
};

export default VerificationSubmit
