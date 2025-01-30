import React, { useState, useRef, useEffect } from "react";
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";
import VerticalThreeDots from "@/Icons/VerticalThreeDots";

export default function Action({ children, isOpen, onClose }) {
  const [isModalOpen, setModalOpen] = useState(isOpen || false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const actionRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen !== undefined) {
      setModalOpen(isOpen);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isModalOpen && actionRef.current) {
      const rect = actionRef.current.getBoundingClientRect();
      setModalPosition({
        top: rect.bottom + window.scrollY,
        left: rect.right - 160,
      });
    }

    const handleOutsideClick = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        !actionRef.current.contains(event.target)
      ) {
        setModalOpen(false);
        if (onClose) {
          onClose();
        }
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isModalOpen, onClose]);

  const handleClick = (e) => {
    e.stopPropagation();
    setModalOpen(!isModalOpen);
    if (!isModalOpen && onClose) {
      onClose();
    }
  };

  return (
    <div className="relative" ref={actionRef}>
      <span
        className="cursor-pointer text-primary hover:text-gray-600 focus:outline-none"
        onClick={handleClick}
      >
        <VerticalThreeDots />
      </span>
      {isModalOpen && (
        <div
          ref={modalRef}
          style={{
            position: "fixed",
            top: `${modalPosition.top}px`,
            left: `${modalPosition.left}px`,
            zIndex: 9999,
          }}
          className="w-40 bg-white border border-gray-200 shadow-lg rounded-xl"
        >
          <ul className="text-sm">{children}</ul>
        </div>
      )}
    </div>
  );
}


export const LiquidityAction = ({ children }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const modalRef = useRef(null);

  const handleMouseEnter = () => {
    setModalOpen(true);
  };

  const handleMouseLeave = () => {
    setModalOpen(false);
  };

  return (
    <>
      <span onClick={handleMouseEnter}>
        <VerticalThreeDots />
      </span>
      {isModalOpen && (
        <div
          ref={modalRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="absolute bottom-0 z-50 w-40 overflow-hidden bg-white border border-gray-200 right-6 rounded-xl"
        >
          <ul className="text-sm">{children}</ul>
        </div>
      )}
    </>
  );
};

export const CustomMenuItem = ({ onEdit, onDelete }) => {
  const [visible, setVisible] = useState(false);

  const items = [
    {
      label: "Edit",
      command: () => {
        onEdit();
        setVisible(false);
      },
      className: "custom-menu-item",
    },
    {
      label: "Delete",
      command: () => {
        onDelete();
        setVisible(false);
      },
      className: "custom-menu-item text-alert",
    },
  ];

  return (
    <div className="relative">
      <Button
        icon="pi pi-ellipsis-v"
        className="p-button-text p-button-rounded"
        onClick={(e) => setVisible((prev) => !prev)}
      />
      <Menu
        model={items}
        popup
        visible={visible}
        onHide={() => setVisible(false)}
        className="overflow-hidden rounded-lg shadow-lg custom-menu"
      />
      <style jsx global>{`
        .custom-menu {
          background: white;
          border: none;
          padding: 0.5rem 0;
          min-width: 120px;
        }
        .custom-menu .p-menuitem {
          padding: 0;
        }
        .custom-menu .p-menuitem-link {
          padding: 0.5rem 1rem;
        }
        .custom-menu .custom-menu-item {
          font-size: 0.875rem;
        }
        .custom-menu .custom-menu-item:hover {
          background-color: #f3f4f6;
        }
      `}</style>
    </div>
  );
};
