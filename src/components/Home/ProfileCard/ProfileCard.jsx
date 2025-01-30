"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";
import Profile from "@/Icons/imageicon/Profile";

const ProfileCard = React.memo(({ isSidebarOpen }) => {

  const { user } = useUser();

  const router = useRouter();
  return (
    <div className="w-full">
      {/* Horizontal Divider */}
      <div className="px-4">
        <hr />
      </div>

      {/* Profile Card */}
      <div
        className={`items-center cursor-pointer ${
          !isSidebarOpen && "justify-center"
        } hidden p-4 bg-white rounded-lg sm:flex `}
        onClick={() => router.push('/dashboard/profile')}
      >
          <Profile className="w-8 h-8 rounded-full" />
        {isSidebarOpen && (
          <>
            <div className="flex-grow ml-2">
              <div className="text-xs font-normal text-gray-900">
                {user?.first_name} {user?.last_name}
              </div>
              <div className="text-xs text-gray-500">{user?.email}</div>
            </div>
            <button
              className="flex items-center justify-center ml-6 bg-white border border-gray-200 rounded-full w-7 h-7 hover:bg-gray-200"
              onClick={() => {
                router.push("/dashboard/profile");
              }}
            >
              <FontAwesomeIcon
                icon={faChevronRight}
                className="w-3 h-3 text-gray-600 "
              />
            </button>
          </>
        )}
      </div>
    </div>
  );
});

ProfileCard.displayName = "ProfileCard";
export default ProfileCard;
