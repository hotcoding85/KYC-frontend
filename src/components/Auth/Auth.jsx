"use client";

import React from "react";
import Image from "next/image";
import AuthHeader from "@/components/sign-up/AuthHeader";
import { Toast } from "primereact/toast";
import { COMPANY_ACCOUNT_TYPE } from "@/shared/enums";

export default function Auth({company, children}) {
  return (
    <>
      <div className="grid h-screen grid-cols-3">
        <div className="flex flex-col items-center w-full col-span-3 bg-white lg:col-span-2 px-2">
          <div className="flex flex-col pt-12">
            <div className="mb-20 lg:mb-32">
              <AuthHeader
                title={company?.name || "Thirteenx"}
                logo={company?.branding?.logo || ""}
              />
            </div>
            {children}
          </div>
        </div>
        <div className="relative hidden w-full lg:col-span-1 lg:block bg-lightGrey">
          {(company?.company_account_type == COMPANY_ACCOUNT_TYPE.BANKING ||
            company?.company_account_type == COMPANY_ACCOUNT_TYPE.HOLDING) && (
            <>
              <Image
                src="/assets/images/cityview.png"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                alt="Login Image"
              />
            </>
          )}
          {company?.company_account_type == COMPANY_ACCOUNT_TYPE.WEB3 && (
            <>
              <Image
                src="/assets/images/cityview-black.jpg"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                alt="Login Image"
              />
            </>
          )}
          {!company?.company_account_type  && (
            <>
              <Image
                src="/assets/images/cityview.png"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                alt="Login Image"
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}
