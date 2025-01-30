import Logo from "@/Icons/Logo";
import Image from "next/image";
import S3Image from "../Elements/S3Image/S3Image";

const AuthHeader = ({ title, logo }) => {
  return (
    <div className="flex gap-3 ">
      {logo ? (
        <S3Image s3Url={logo} className="w-48 h-auto my-auto cursor-pointer" />
      ) : (
        <>
          <Logo className="w-5 h-5 my-auto cursor-pointer" />
          <h1 className="text-xl font-semibold text-textBlack">{title}</h1>
        </>
      )}
    </div>
  );
};

export default AuthHeader;
