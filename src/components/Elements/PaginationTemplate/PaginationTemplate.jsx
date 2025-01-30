import { classNames } from "primereact/utils";

export const paginatorTemplate = {
  layout: "PrevPageLink PageLinks NextPageLink",
  PrevPageLink: (options) => {
    return (
      <button
        type="button"
        className={classNames("p-2 hover:bg-gray-100 rounded-lg", {
          "opacity-50 cursor-not-allowed": options.disabled,
        })}
        onClick={options.onClick}
        disabled={options.disabled}
      >
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    );
  },
  NextPageLink: (options) => {
    return (
      <button
        type="button"
        className={classNames("p-2 hover:bg-gray-100 rounded-lg", {
          "opacity-50 cursor-not-allowed": options.disabled,
        })}
        onClick={options.onClick}
        disabled={options.disabled}
      >
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button>
    );
  },
  PageLinks: (options) => {
    if (!options.view || !options.totalPages) return null;

    const pages = [];
    for (let i = 0; i < options.totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={classNames(
            "mx-1 w-8 h-8 rounded-lg text-sm flex items-center justify-center transition-colors",
            {
              "bg-black text-white": i === options.page,
              "hover:bg-gray-100": i !== options.page,
            }
          )}
          onClick={() => options.onChange(i)}
        >
          {i + 1}
        </button>
      );
    }

    return (
      <div className="flex items-center">
        {pages}
        {options.totalPages > 5 && (
          <>
            <span className="mx-1">...</span>
          </>
        )}
      </div>
    );
  },
};
