import React from "react";
import Tag from "@/components/Elements/Tag/Tag";

const TeamStatusTemplate = ({ status }) => {
    let text;
    let statusColor;

    if (status) {
        text = 'Active';
        statusColor = 'success';
    }else {
        text = 'Suspend';
        statusColor = 'danger';
    }

    return (
        <Tag
            status={statusColor}
            text={text}
            width="w-[106px]"
            height="h-7"
        />
    );
};

export default TeamStatusTemplate