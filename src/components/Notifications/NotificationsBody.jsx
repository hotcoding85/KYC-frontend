import Image from "next/image";
import React, { useEffect, useState, useCallback } from "react";
import NotificationsCard from "./NotificationsCard";
import History from "@/Icons/History";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";
import useApi
 from "@/hooks/useApi";
export default function NotificationsBody() {
  const router = useRouter();
  const { notifications, user, getNotifications } = useUser();
  const [todayNotifications, setTodayNotifications] = useState([]);
  const [otherDaysNotifications, setOtherDaysNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 10; // Number of notifications per page
  const { fetchData } = useApi()

  useEffect(() => {
    if (!user) return;
    fetchNotifications(currentPage);
  }, [user]);

  const fetchNotifications = async (page) => {
    const response = await getNotifications(user.user_id, page, pageSize);
    if (response && response.length > 0) {
      splitNotifications(response);
      if (response.length < pageSize * page) {
        setHasMore(false);
      }
    } else {
      setHasMore(false);
    }
  };

  const splitNotifications = (newNotifications) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of the day

    const newTodayNotifications = newNotifications.filter((notification) => {
      const notificationDate = new Date(notification.timestamp);
      return notificationDate >= today;
    }).map((notification) => ({
      ...notification,
      trailing: calculateTrailing(notification.timestamp),
    }));

    const newOtherDaysNotifications = newNotifications.filter((notification) => {
      const notificationDate = new Date(notification.timestamp);
      return notificationDate < today;
    }).map((notification) => ({
      ...notification,
      trailing: calculateTrailing(notification.timestamp),
    }));

    setTodayNotifications(newTodayNotifications);
    setOtherDaysNotifications(newOtherDaysNotifications);
  };

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

  const loadMoreNotifications = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchNotifications(nextPage);
  };

  const onRemove = useCallback(async (id) => {
    if (user) {
      const { result, error } = await fetchData(`/users/removeNotification/${id}/${user.user_id}`, {
        method: "DELETE"
      });
      if (result.success) {
        fetchNotifications(1);
      } 
    }
  }, [user])

  return (
    <div className="px-2 sm:px-[34px] sm:py-4">
      <div className="flex items-center gap-2 mb-2">
        <Image
          width={14}
          height={14}
          alt="arrow back"
          className="cursor-pointer"
          onClick={() => router.back()}
          src="/assets/icons/backArrow.svg"
        />
        <p className="text-sm font-semibold cursor-pointer text-textBlack">
          Notifications
        </p>
      </div>
      <div className="w-full p-4 mb-2 bg-white rounded-2xl">
        <h2 className="mb-4 text-sm text-textLight">Today</h2>
        <div className="space-y-4">
          {todayNotifications.length > 0 ? (
            todayNotifications.map((notify) => (
              <NotificationsCard
                key={notify.id}
                id={notify.id}
                ImageUrl={<History className="w-8 h-8" />}
                title={notify.title}
                subTitle={notify.body}
                trailing={notify.trailing}
                onRemove={onRemove}
              />
            ))
          ) : (
            <h5 className="text-xs text-textBlack">There is no notification yet.</h5>
          )}
        </div>
      </div>

      <div className="w-full p-4 bg-white rounded-2xl">
        <h2 className="mb-4 text-sm text-textLight">Other Days</h2>
        <div className="space-y-4">
          {otherDaysNotifications.length > 0 ? (
            otherDaysNotifications.map((notify) => (
              <NotificationsCard
                key={notify.id}
                id={notify.id}
                ImageUrl={<History className="w-8 h-8" />}
                title={notify.title}
                subTitle={notify.body}
                trailing={notify.trailing}
                onRemove={onRemove}
              />
            ))
          ) : (
            <h5 className="text-xs text-textBlack">There is no notification yet.</h5>
          )}
        </div>
      </div>

      {hasMore && (
        <div className="flex justify-center mt-4">
          <button
            className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-md"
            onClick={loadMoreNotifications}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
