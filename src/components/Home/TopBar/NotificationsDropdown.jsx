import React, { useState, useEffect } from "react";
import TabWithCount from "./TabWithCount";
import { useRouter, useParams } from "next/navigation";
import { useUser } from "@/app/context/UserContext";
import useApi from "@/hooks/useApi";

const NotificationsDropdown = ({ closeDropdown, notificationsData }) => {
  const [filterNotifications, setFilteredNotification] = useState([])
  const [activeTab, setActiveTab] = useState("All");
  const router = useRouter();
  const { notifications, user, getNotifications } = useUser();
  const { fetchData, loading, error } = useApi();

  useEffect(() => {
    if (!notifications) return

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of the day

    const _notifications = notifications
    .map((notification) => ({
      ...notification,
      trailing: calculateTrailing(notification.timestamp),
    }));

    if (activeTab === 'All') {
      setFilteredNotification(_notifications)
    }
    else if (activeTab === 'Unread') {
      setFilteredNotification(_notifications.filter(notify => notify.isUnread))

      async function markNotificationsAsRead() {
     
        const { result, error } = await fetchData(`/users/markNotificationsAsRead/${user.user_id}`, {
          method: "PATCH",
          body: {
            ids: _notifications
              .filter((notify, index) => notify.isUnread)
              .filter((notify, index) => index < 3)
              .map((notify) => notify.id), // Extract only the IDs
          }}
        );
      }

      markNotificationsAsRead()
    }
    else{
      setFilteredNotification(_notifications)
    }
  }, [activeTab, notifications])

  const calculateTrailing = (timestamp) => {
    const now = Date.now();
    const diffInSeconds = Math.floor((now - timestamp) / 1000);
  
    if (diffInSeconds < 60) {
      return `${diffInSeconds}s`; // Seconds
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes}m`; // Minutes
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours}h`; // Hours
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days}d`; // Days
    }
  };

  useEffect(() => {
    getNotifications()
  }, [])

  return (
    <div className="absolute bg-white border border-gray-300 shadow-lg w-60 md:w-96 right-20 md:right-24 rounded-xl top-14">
      <div className="p-4 space-y-4">
        <div className="text-sm font-semibold  text-textBlack">Notifications</div>

        {/* Tabs */}
        <div className="relative flex pb-2 space-x-4 text-xs border-b border-gray-300">
          <button
            className={`relative pb-2 ${activeTab === "All" ? "font-semibold text-textBlack" : "text-gray-500"}`}
            onClick={() => setActiveTab("All")}
          >
            <TabWithCount label="All" count={notifications && notifications.length} />
            {activeTab === "All" && <span className="absolute left-0 bottom-[-10px] w-full h-[3px] bg-black"></span>}
          </button>

          <button
            className={`relative pb-2 ${activeTab === "Unread" ? "font-semibold text-textBlack" : "text-gray-500"}`}
            onClick={() => setActiveTab("Unread")}
          >
            <TabWithCount label="Unread" count={filterNotifications && filterNotifications.filter(notify => notify.isUnread).length} />
            {activeTab === "Unread" && <span className="absolute left-0 bottom-[-10px] w-full h-[3px] bg-black"></span>}
          </button>
        </div>

        {/* Notifications List */}
        <div className="divide-y">
          {filterNotifications && filterNotifications.length === 0 && 
          <span className="text-xs text-textBlack">You have no {activeTab === "Unread" ? 'unread' : ''} notification.</span>}
          {filterNotifications && filterNotifications.filter((notify, index) => index < 3).map((notification) => (
            <div key={notification.id} className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-2">
                {/* Notification Icon */}
                <div className="flex items-center justify-center w-8 h-8 text-gray-700 bg-gray-200 rounded-full">
                  {notification.icon}
                </div>
                {/* Notification Text */}
                <div>
                  <p className="text-xs font-semibold text-textBlack">{notification.title}</p>
                  <p className="text-[11px] text-gray-500">{notification.body}</p>
                </div>
              </div>
              {/* Notification Time */}
              <div className="text-[11px] text-gray-500">{notification.trailing}</div>
            </div>
          ))}
        </div>
      </div>

      {/* View All Button */}
      <div className="py-3 bg-gray-50">
        <button
          className="w-full py-2 text-xs font-semibold text-center rounded-lg text-primary"
          onClick={() => {closeDropdown(); router.push('/dashboard/notifications')}}
        >
          View all
        </button>
      </div>
    </div>
  );
};

export default NotificationsDropdown;
