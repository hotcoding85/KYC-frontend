import React, {useState, useEffect, useCallback} from "react";
import Laptop from "@/Icons/imageicon/Laptop";
import Mobile from "@/Icons/imageicon/Mobile";
import useApi from "@/hooks/useApi";
import SessionItem from "@/components/Settings/SessionItem";
const PrivacyAndSecurity = ({userData}) => {
  const [sessions, setSessions] = useState([])
  const { fetchData, loading, error } = useApi();
  useEffect(() => {
    if (!userData || !userData.sessions) return
    const mappedSessions = userData.sessions.map((session, index, arr) => {
      const isCurrentSession = index === arr.length - 1; // Last created session
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
    });
    
    setSessions(mappedSessions)
  }, [userData])

  const handleSignOut = useCallback(async (id) => {
    // const { result, error } = await fetchData(`/auth/logoutSession`, {
    //   method: "POST",
    //   body: {
    //     id: id
    //   }
    // });
    // if (!error) {
    //   if (result.status === 'success') {
    //     // fetchUser()
    //   }
    // }
  }, []);
  return (
    <div className="container mx-auto space-y-8">
      {/* Privacy & Security Section */}
      <div>
        <h2 className="mb-4 text-sm font-semibold text-textBlack leading-[20px] tracking-[-0.005em] text-left">
          Privacy & Security
        </h2>
        <div className="space-y-4 text-sm">
          <div className="bg-white p-4 rounded-lg">
            <h3 className="mb-4 text-sm font-semibold text-textBlack leading-[20px] tracking-[-0.005em] text-left ">
              2FA Withdrawal
            </h3>
            <p className=" text-[12px] font-medium leading-[16px] text-left text-textSecondary">
              Enable biometric or passcode authentication when withdrawing from
              your watwallet.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h3 className="mb-4 text-sm font-semibold text-textBlack leading-[20px] tracking-[-0.005em] text-left">
              Change Passcode
            </h3>
            <p className=" text-[12px] font-medium leading-[16px] text-left text-textSecondary">
              Change the passcode used to log in to the app.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h3 className="mb-4 text-sm font-semibold text-textBlack leading-[20px] tracking-[-0.005em] text-left">
              Change Password
            </h3>
            <p className=" text-[12px] font-medium leading-[16px] text-left text-textSecondary  ">
              Change the password for your app account.
            </p>
          </div>
        </div>
      </div>

      {/* Manage Linked Accounts Section */}
      <div className="text-sm">
        <h2 className="text-sm font-bold text-textBlack mb-4">
          Manage linked accounts
        </h2>
        <p className=" text-[12px] font-medium leading-[16px] text-left text-textSecondary mb-4">
          {((userData?.first_name || 'John') + ' ' + (userData?.last_name || 'Doe') || 'John Doe')} signed in on these devices or has been in the last 28 days.
          There might be multiple activity sessions from the same device.
        </p>

        <div className="flex flex-col gap-2">
          {sessions.map((session) => (
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
      </div>
    </div>
  );
};

export default PrivacyAndSecurity;
