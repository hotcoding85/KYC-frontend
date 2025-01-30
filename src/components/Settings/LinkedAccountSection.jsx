import React, { useEffect, useRef, useState } from "react";
import Switch from "react-switch";
import Button from "../Elements/Button/Button";
import SessionItem from "./SessionItem";

export default function LinkedAccountSection() {
    const sessions = [
        {
            id: 1,
            deviceType: "Mac",
            deviceName: "1 session on Mac computer",
            location: "UAE",
            browser: "Google Chrome",
            isCurrentSession: true,
        },
        {
            id: 2,
            deviceType: "Phone",
            deviceName: "1 session on iPhone",
            location: "Iraq",
            browser: "iOS Account Manager, iOS",
            lastActive: "39 minutes",
            isCurrentSession: false,
        },
    ];

    // Example sign out handler
    const handleSignOut = (id) => {
        console.log(`Signing out session with id: ${id}`);
        // Add your sign-out logic here
    };

    return (
        <>
            <div>
                <p className="text-xl font-bold pt-4">Linked Accounts</p>
                <div className="bg-white p-6 rounded-2xl shadow-sm mt-2">
                    <div>
                        <h2 className="text-lg font-semibold mb-1">Manage linked accounts</h2>
                        <h2 className="mb-4 text-textSecondary">You’re signed in on these devices or have been in the last 28 days. There might be multiple activity sessions from the same device.</h2>
                    </div>
                    <div>
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
        </>
    )
}

