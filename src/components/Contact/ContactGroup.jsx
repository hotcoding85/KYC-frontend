import React from "react";
import ContactItem from "./ContactItem";

const ContactGroup = ({ title, contacts, favIcon, onContactClick }) => {
  return (
    <div className="mb-4 bg-white border rounded-xl border-primary50">
      <h2 className="mb-2 p-4 w-full font-semibold text-[#5F5F6F] text-xs rounded-t-xl bg-[#f8f8f9]">
        {title}
      </h2>
      <div className="p-4">
        <div className="space-y-2">
          {contacts.map((contact, index) => (
            <ContactItem
              key={index}
              {...contact}
              onClick={() => onContactClick(contact)}
              isLast={contacts.length - 1 !== index}
              favIcon={favIcon}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactGroup;
