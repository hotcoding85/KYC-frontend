import Image from "next/image";
import Loading from "@/Icons/Loading";

const Button = ({
  title,
  onClick,
  className,
  icon,
  textClassName,
  isLoading = false,
  img,
  imgWidth = 20,
  imgHeight = 20,
  imgClassName = "",
}) => {
  return (
    <button
      disabled={isLoading}
      onClick={onClick}
      className={`px-1 py-1 w-[114px] h-[32px] rounded-[10px] space-x-1 text-[12px] flex flex-row items-center justify-center border    ${
        className
          ? className
          : "bg-primary dark:bg-white w-[114px] h-[32px] text-[12px] text-primary"
      } `}
    >
      {img && (
        <Image
          src={img}
          width={imgWidth}
          height={imgHeight}
          className={imgClassName}
        />
      )}
      {icon && <span className="text-xs">{icon}</span>}
      <p className=" text-[12px]">{title}</p>
    </button>
  );
};

export default Button;

export const TextButton = ({
  title,
  onClick,
  className,
  borderColor,
  backgroundColor,
  textColor,
  icon,
  isLoading = false,
  width,
  iconGap,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`flex items-center justify-center font-normal text-xs rounded-[10px] h-8 py-1.5 px-2.5 ${
      width || "min-w-[150px]"
      } leading-4 text-center ${isLoading && "brightness-50"} ${
        textColor || "text-white"
      } ${backgroundColor || "bg-primary"} ${
        borderColor && borderColor
      } ${className}`}
    >
      {icon && <span className={`${iconGap || "mr-1"}`}>{icon}</span>}
      {title}
    </button>
  );
};

// buttons use in setting

export const ButtonsText = ({
  title,
  onClick,
  className,
  borderColor,
  backgroundColor,
  textColor,
  icon,
  isLoading = false,
  width,
  iconGap,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`flex items-center justify-center font-normal text-[12px] rounded-[10px] h-[32px] py-1.5 px-2.5 ${width || 'min-w-[114px] w-[114px]'} leading-4 text-center ${
        isLoading && "brightness-50"
      } ${textColor || "text-white"} ${backgroundColor || "bg-primary"} ${
        borderColor && borderColor
      } ${className}`}
    >
      {icon && <span className={`${iconGap || "mr-1"}`}>{icon}</span>}
      {title}
    </button>
  );
};

export const AuthButton = ({
  title,
  border,
  height,
  onClick,
  fontSize,
  disabled,
  textColor,
  className,
  backgroundColor,
  isLoading = false,
}) => {
  return (
    <button
      disabled={disabled}
      className={`w-full py-1 px-4 rounded-2xl font-normal flex items-center justify-center ${className} ${
        height || "h-8"
      } ${fontSize || "text-[12px]"} ${textColor || "text-white"} ${
        disabled && "opacity-50 cursor-not-allowed"
      } ${backgroundColor || "bg-grey900"} ${
        border || "border border-grey900"
      }`}
      onClick={onClick}
    >
      {isLoading && (
        
          <Loading></Loading>
        
      )}
      {title}
    </button>
  );
};
