export function SidebarNav({ currentPage, onChangePage }) {
  const tabs = ["dashboard", "transactions", "insights"];

  return (
    <nav className="flex flex-row gap-2 overflow-x-auto border-b border-slate-200 bg-white p-3 md:flex-col md:border-b-0 md:border-r md:p-4 dark:border-slate-800 dark:bg-slate-900">
      {tabs.map((tab) => {
        const isActive = currentPage === tab;
        return (
          <button
            key={tab}
            onClick={() => onChangePage(tab)}
            className={`rounded-lg px-4 py-2 text-left text-sm font-medium capitalize transition-all duration-200 ${
              isActive
                ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            }`}
          >
            {tab}
          </button>
        );
      })}
    </nav>
  );
}
