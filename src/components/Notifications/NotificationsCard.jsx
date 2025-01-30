import { FaTrashAlt } from "react-icons/fa"; // Import the trash icon from react-icons

function NotificationsCard({ id, ImageUrl, title, subTitle, trailing, onRemove }) {
  return (
    <div className="flex items-center justify-between space-x-4">
      <div className="flex items-center">
        <div className="mr-4 shrink-0">
          {ImageUrl}
        </div>
        <div>
          <div className="text-sm font-medium text-textBlack">{title}</div>
          <p className="text-xs text-textLight">{subTitle}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <p className="text-xs text-textLight">{trailing}</p>
        {/* Remove Icon */}
        <button
          onClick={() => onRemove(id)}
          className="p-2 rounded-full hover:bg-gray-100 text-gray-500 focus:outline-none"
          aria-label="Remove notification"
        >
          <FaTrashAlt className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default NotificationsCard;
