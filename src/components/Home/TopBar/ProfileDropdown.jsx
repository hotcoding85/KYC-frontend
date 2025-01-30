import React from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";
import BeneficiariesIcon from "@/Icons/BeneficiariesIcon";
import useApi from "@/hooks/useApi";
import LogoutIcon from "@/Icons/LogoutIcon";
import Profile from "@/Icons/imageicon/Profile";

const menuItems = [
  {
    href: "/dashboard/accounts",
    title: "Manage account",
    icon: (
      <svg
        width={14}
        height={14}
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_59_10712)">
          <path
            d="M7 7C7.69223 7 8.36892 6.79473 8.9445 6.41015C9.52007 6.02556 9.96867 5.47894 10.2336 4.83939C10.4985 4.19985 10.5678 3.49612 10.4327 2.81719C10.2977 2.13825 9.96436 1.51461 9.47487 1.02513C8.98539 0.535644 8.36175 0.202301 7.68282 0.0672531C7.00388 -0.0677952 6.30015 0.0015165 5.66061 0.266423C5.02107 0.53133 4.47444 0.979934 4.08986 1.55551C3.70527 2.13108 3.5 2.80777 3.5 3.5C3.50093 4.42798 3.86997 5.31768 4.52615 5.97385C5.18233 6.63003 6.07203 6.99908 7 7ZM7 1.16667C7.46149 1.16667 7.91262 1.30352 8.29633 1.55991C8.68005 1.8163 8.97912 2.18071 9.15572 2.60707C9.33232 3.03343 9.37853 3.50259 9.2885 3.95521C9.19847 4.40784 8.97624 4.8236 8.64992 5.14992C8.32359 5.47624 7.90783 5.69847 7.45521 5.7885C7.00259 5.87853 6.53343 5.83233 6.10707 5.65572C5.68071 5.47912 5.31629 5.18005 5.0599 4.79633C4.80351 4.41262 4.66667 3.96149 4.66667 3.5C4.66667 2.88116 4.9125 2.28767 5.35008 1.85009C5.78767 1.4125 6.38116 1.16667 7 1.16667Z"
            fill="#14151A"
          />
          <path
            d="M7 8.16699C5.60809 8.16854 4.27363 8.72216 3.28939 9.70639C2.30516 10.6906 1.75154 12.0251 1.75 13.417C1.75 13.5717 1.81146 13.7201 1.92085 13.8295C2.03025 13.9389 2.17862 14.0003 2.33333 14.0003C2.48804 14.0003 2.63642 13.9389 2.74581 13.8295C2.85521 13.7201 2.91667 13.5717 2.91667 13.417C2.91667 12.334 3.34687 11.2954 4.11265 10.5296C4.87842 9.76387 5.91703 9.33366 7 9.33366C8.08297 9.33366 9.12158 9.76387 9.88735 10.5296C10.6531 11.2954 11.0833 12.334 11.0833 13.417C11.0833 13.5717 11.1448 13.7201 11.2542 13.8295C11.3636 13.9389 11.512 14.0003 11.6667 14.0003C11.8214 14.0003 11.9697 13.9389 12.0791 13.8295C12.1885 13.7201 12.25 13.5717 12.25 13.417C12.2485 12.0251 11.6948 10.6906 10.7106 9.70639C9.72637 8.72216 8.39191 8.16854 7 8.16699Z"
            fill="#14151A"
          />
        </g>
        <defs>
          <clipPath id="clip0_59_10712">
            <rect width={14} height={14} fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
  },
  {
    href: "/dashboard/notifications",
    title: "Notifications",
    icon: (
      <svg
        width={14}
        height={14}
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.01184 1.69727C5.08101 1.69727 3.51184 3.26643 3.51184 5.19727V6.8831C3.51184 7.23893 3.36017 7.78143 3.17934 8.08477L2.50851 9.19893C2.09434 9.88727 2.38017 10.6514 3.13851 10.9081C5.65267 11.7481 8.36517 11.7481 10.8793 10.9081C11.5852 10.6748 11.8943 9.8406 11.5093 9.19893L10.8385 8.08477C10.6635 7.78143 10.5118 7.23893 10.5118 6.8831V5.19727C10.5118 3.27227 8.93684 1.69727 7.01184 1.69727Z"
          stroke="#14151A"
          strokeWidth="1.05"
          strokeMiterlimit={10}
          strokeLinecap="round"
        />
        <path
          d="M8.09095 1.86684C7.38553 1.66593 6.63804 1.66593 5.93262 1.86684C6.10178 1.43517 6.52178 1.13184 7.01178 1.13184C7.50178 1.13184 7.92178 1.43517 8.09095 1.86684Z"
          stroke="#14151A"
          strokeWidth="1.05"
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.7627 11.1182C8.7627 12.0807 7.9752 12.8682 7.0127 12.8682C6.53436 12.8682 6.09103 12.6698 5.77603 12.3548C5.44829 12.0266 5.26374 11.582 5.2627 11.1182"
          stroke="#14151A"
          strokeWidth="1.05"
          strokeMiterlimit={10}
        />
      </svg>
    ),
  },
  {
    href: "/dashboard/support",
    title: "Messages",
    icon: (
      <svg
        width={12}
        height={13}
        viewBox="0 0 12 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.83366 0.75H7.16699C8.40467 0.75 9.59165 1.24167 10.4668 2.11684C11.342 2.992 11.8337 4.17899 11.8337 5.41667C11.8337 6.65434 11.342 7.84133 10.4668 8.7165C9.59165 9.59167 8.40467 10.0833 7.16699 10.0833V12.125C4.25033 10.9583 0.166992 9.20833 0.166992 5.41667C0.166992 4.17899 0.658658 2.992 1.53383 2.11684C2.409 1.24167 3.59598 0.75 4.83366 0.75V0.75ZM6.00033 8.91667H7.16699C7.62662 8.91667 8.08175 8.82614 8.50638 8.65025C8.93102 8.47435 9.31686 8.21655 9.64187 7.89154C9.96687 7.56654 10.2247 7.1807 10.4006 6.75606C10.5765 6.33142 10.667 5.87629 10.667 5.41667C10.667 4.95704 10.5765 4.50191 10.4006 4.07727C10.2247 3.65263 9.96687 3.2668 9.64187 2.94179C9.31686 2.61679 8.93102 2.35898 8.50638 2.18309C8.08175 2.0072 7.62662 1.91667 7.16699 1.91667H4.83366C3.9054 1.91667 3.01516 2.28542 2.35879 2.94179C1.70241 3.59817 1.33366 4.48841 1.33366 5.41667C1.33366 7.5225 2.76983 8.89683 6.00033 10.3633V8.91667Z"
          fill="#14151A"
        />
      </svg>
    ),
  },
  {
    href: "/dashboard/beneficiaries",
    title: "Beneficiaries",
    icon: <BeneficiariesIcon className="w-[14px] h-[14px]" />,
  },
  {
    href: "",
    title: "Register business account",
    icon: (
      <svg
        width={14}
        height={14}
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_59_10742)">
          <path
            d="M12.25 6.41667H9.33333C8.3685 6.41667 7.58333 7.20183 7.58333 8.16667V12.25C7.58333 13.2148 8.3685 14 9.33333 14H12.25C13.2148 14 14 13.2148 14 12.25V8.16667C14 7.20183 13.2148 6.41667 12.25 6.41667ZM12.8333 12.25C12.8333 12.5714 12.572 12.8333 12.25 12.8333H9.33333C9.01133 12.8333 8.75 12.5714 8.75 12.25V8.16667C8.75 7.84525 9.01133 7.58333 9.33333 7.58333H12.25C12.572 7.58333 12.8333 7.84525 12.8333 8.16667V12.25ZM12.25 9.33158C12.25 9.65358 11.9892 9.91492 11.6667 9.91492H9.91667C9.59408 9.91492 9.33333 9.65358 9.33333 9.33158C9.33333 9.00958 9.59408 8.74825 9.91667 8.74825H11.6667C11.9892 8.74825 12.25 9.00958 12.25 9.33158ZM12.25 11.0833C12.25 11.4053 11.9892 11.6667 11.6667 11.6667H9.91667C9.59408 11.6667 9.33333 11.4053 9.33333 11.0833C9.33333 10.7613 9.59408 10.5 9.91667 10.5H11.6667C11.9892 10.5 12.25 10.7613 12.25 11.0833ZM5.25 7C7.18025 7 8.75 5.43025 8.75 3.5C8.75 1.56975 7.18025 0 5.25 0C3.31975 0 1.75 1.56975 1.75 3.5C1.75 5.43025 3.31975 7 5.25 7ZM5.25 1.16667C6.53683 1.16667 7.58333 2.21317 7.58333 3.5C7.58333 4.78683 6.53683 5.83333 5.25 5.83333C3.96317 5.83333 2.91667 4.78683 2.91667 3.5C2.91667 2.21317 3.96317 1.16667 5.25 1.16667ZM6.41667 8.75C6.41667 9.072 6.15592 9.33333 5.83333 9.33333H5.25C2.99892 9.33333 1.16667 11.165 1.16667 13.4167C1.16667 13.7387 0.905917 14 0.583333 14C0.26075 14 0 13.7387 0 13.4167C0 10.5222 2.35492 8.16667 5.25 8.16667H5.83333C6.15592 8.16667 6.41667 8.428 6.41667 8.75Z"
            fill="#14151A"
          />
        </g>
        <defs>
          <clipPath id="clip0_59_10742">
            <rect width={14} height={14} fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
  },
];

const ProfileDropdown = ({ closeDropdown}) => {
  const { user } = useUser();
  const { fetchData, loading, error } = useApi();

  const handleLogout = async () => {
    const cookies = document.cookie
      .split("; ")
      .find((row) => row.startsWith("companyId="));
    const id = cookies ? cookies.split("=")[1] : "";
    const companyId = id;

    router.push(`/auth/login/${companyId}`);
    try {
      const { result, error } = await fetchData("/auth/logout", {
        method: "POST",
      });
      if (error) {
        console.error("Failed to log out:", error);
        return;
      }
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };
  const router = useRouter();
  return (
    <div className="absolute flex flex-col gap-3 px-3 py-2 bg-white border border-gray-300 shadow-lg right-2 rounded-xl top-14 w-52">
      <div className="flex items-center gap-1">
        <div
          className="flex items-center justify-center w-10 h-10 overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white  rounded-full cursor-pointer "
          onClick={() => toggleDropdown("profile")}
        >
          <span className="text-sm font-semibold">
            {`${user?.first_name?.[0] || ""}${
              user?.last_name?.[0] || ""
            }`.toUpperCase()}
          </span>
        </div>
        <div>
          <p className="text-sm font-semibold text-textBlack">
            {user?.first_name} {user?.last_name}
          </p>
          {/* <p className="text-textSecondary font-normal text-[11px]">
            {user?.email}
          </p> */}
          <p className="text-textSecondary font-normal text-[11px]">Personal</p>
        </div>
      </div>
      <hr />
      <div className="space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.title}
            onClick={() => {
              closeDropdown();
              if (item.href) {
                router.push(item.href);
              }
            }}
            className="flex w-full px-1 py-2 text-xs font-normal text-left text-textBlack hover:bg-gray-100"
          >
            <span>{item.icon}</span>
            <span className="ml-1">{item.title}</span>
          </button>
        ))}
        <hr />
        <button
          onClick={() => {
            closeDropdown();
            handleLogout();
          }}
          className="w-full px-1 py-2 text-xs font-normal text-left text-textBlack hover:bg-gray-100 flex flex-row items-center gap-1"
        >
          <LogoutIcon className="w-[14px] h-[14px]" />
          Log out
        </button>
      </div>
    </div>
  );
};

export default ProfileDropdown;
