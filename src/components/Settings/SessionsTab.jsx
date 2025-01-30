"use client";
import React, {useState, useEffect, useCallback, useMemo} from "react";
import SessionItem from "./SessionItem";
import { useUser} from "@/app/context/UserContext";
import useApi from "@/hooks/useApi";
export default function SessionsTab({user_id}) {
  // const sessions = [
  //   {
  //     id: 1,
  //     deviceType: "Mac",
  //     deviceName: "1 session on Mac computer",
  //     location: "UAE",
  //     browser: "Google Chrome",
  //     lastActive: "39 minutes",
  //     isCurrentSession: true,
  //   },
  //   {
  //     id: 2,
  //     deviceType: "Phone",
  //     deviceName: "1 session on iPhone",
  //     location: "Iraq",
  //     browser: "iOS Account Manager, iOS",
  //     lastActive: "39 minutes",
  //     isCurrentSession: false,
  //   },
  // ];

  const [sessions, setSessions] = useState([])
  const { user, fetchUser } = useUser();
  const { fetchData, loading, error } = useApi();

  const mappedSessions = (sortedSessions) => {
    return sortedSessions.map((session, index, arr) => {
      const isCurrentSession = index === 0; // Last created session
      // Calculate the time difference from now to session creation
      const createdDate = new Date(session.created);
      const now = new Date();
      const diffInMs = now.getTime() - createdDate.getTime();

      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      const diffInHours = Math.floor(diffInMinutes / 60);
      const diffInDays = Math.floor(diffInHours / 24);

      const remainingHours = diffInHours % 24;
      const remainingMinutes = diffInMinutes % 60;

      // Build the "time ago" string
      const timeAgoParts = [];
      if (diffInDays > 0) timeAgoParts.push(`${diffInDays} day${diffInDays > 1 ? 's' : ''}`);
      if (remainingHours > 0) timeAgoParts.push(`${remainingHours} hour${remainingHours > 1 ? 's' : ''}`);
      if (remainingMinutes > 0) timeAgoParts.push(`${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}`);
      const timeAgo = timeAgoParts.length > 0 ? timeAgoParts.join(', ') + '' : 'just now';

      return {
        id: session.id,
        deviceType: session.device_type || "Unknown Device",
        deviceName: `1 session on ${session.device_type || "Unknown"} device`,
        location: session.city !== "Unknown" && session.country !== "Unknown"
          ? `${session.city}, ${session.country}`
          : "Unknown",
        browser: session.browser || "Unknown Browser",
        lastActive: timeAgo,
        isCurrentSession,
      };
    })
  }

  useEffect(() => {
    if (!user_id) {
      if (!user) return
      // Sort sessions by created date in descending order
      const sortedSessions = user.sessions?.sort((a, b) => {
        const dateA = new Date(a.created).getTime();
        const dateB = new Date(b.created).getTime();
        return dateB - dateA; // Descending order
      });

      const _mappedSessions = mappedSessions(sortedSessions);
      setSessions(_mappedSessions)

    }
    else{
      async function fetchCustomerDetails() {
        const { result, error } = await fetchData(`/users/user/${user_id}`, {
          method: "GET",
        });
        if (error) {
        } else {
          // Sort sessions by created date in descending order
          const sortedSessions = result.sessions?.sort((a, b) => {
            const dateA = new Date(a.created).getTime();
            const dateB = new Date(b.created).getTime();
            return dateB - dateA; // Descending order
          });

          const _mappedSessions = mappedSessions(sortedSessions);
          setSessions(_mappedSessions)
        }
      }
      fetchCustomerDetails()
    } 
    
  }, [user, user_id])
  // Example sign out handler
  const handleSignOut = useCallback(async (id) => {
    const { result, error } = await fetchData(`/auth/logoutSession`, {
      method: "POST",
      body: {
        id: id
      }
    });
    if (!error) {
      if (result.status === 'success') {
        fetchUser()
      }
    }
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate total pages
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (sessions.length == 0) return
    setTotalPages(Math.ceil(sessions.length / itemsPerPage))
    setCurrentPage(1)
  }, [sessions])

  // Get the current page's items
  const currentItems = useMemo(() => {
    return sessions?.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [sessions, currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <div className="p-4 mt-3 bg-white border shadow-sm rounded-xl border-primary50">
        <h2 className="font-semibold text-sm leading-[20px] tracking[-0.005em] text-textBlack mb-2 text-left">
          Manage linked accounts
        </h2>
        <p className="mb-2 text-textSecondary text-xs">
          You’re signed in on these devices or have been in the last 28 days.
          There might be multiple activity sessions from the same device.
        </p>
        <div className="flex flex-col gap-2">
          {currentItems.map((session) => (
            <SessionItem
              key={session.id}
              deviceType={session.deviceType}
              deviceName={session.deviceName}
              location={session.location}
              browser={session.browser}
              isCurrentSession={session.isCurrentSession}
              lastActive={session.lastActive}
              signOutHandler={() => handleSignOut(session.id)}
            />
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 text-sm ${
              currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-primary hover:text-primary-dark'
            }`}
          >
            Previous
          </button>
          <span className="text-sm text-textSecondary">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 text-sm ${
              currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-primary hover:text-primary-dark'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
