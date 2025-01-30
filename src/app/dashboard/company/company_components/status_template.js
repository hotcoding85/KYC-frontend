import React from "react";
import Tag from "@/components/Elements/Tag/Tag";

const CompanyStatusTemplate = ({ status, active }) => {
    let text;
    let statusColor;

    if (status && active) {
        text = 'Active';
        statusColor = 'success';
    } else if (status && !active) {
        text = 'Suspended';
        statusColor = 'danger';
    } else if (!active && !status) {
        text = 'Pending';
        statusColor = 'warning';
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

export default CompanyStatusTemplate