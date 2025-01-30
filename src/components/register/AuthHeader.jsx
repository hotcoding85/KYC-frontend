import Image from "next/image";

const AuthHeader = ({ title }) => {
  return (
    <Image
      src={"/assets/icons/watwallet-logo.svg"}
      alt='Watwallet'
      width={250}
      height={150}
    />
  );
};

export default AuthHeader;
