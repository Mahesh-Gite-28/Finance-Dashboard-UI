import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { Button } from "../ui/Button";

const typeOptions = [
  { value: "all", label: "All Types" },
  { value: "income", label: "Income" },
  { value: "expense", label: "Expense" }
];

const sortByOptions = [
  { value: "date", label: "Sort by Date" },
  { value: "amount", label: "Sort by Amount" }
];

const sortOrderOptions = [
  { value: "desc", label: "Descending" },
  { value: "asc", label: "Ascending" }
];

export function TransactionsToolbar({ filters, onFilterChange, isAdmin, onAdd, onExport }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
        <Input
          label="Search"
          placeholder="Description or category"
          value={filters.search}
          onChange={(event) => onFilterChange("search", event.target.value)}
        />
        <Select
          label="Filter"
          options={typeOptions}
          value={filters.type}
          onChange={(event) => onFilterChange("type", event.target.value)}
        />
        <Select
          label="Sort Field"
          options={sortByOptions}
          value={filters.sortBy}
          onChange={(event) => onFilterChange("sortBy", event.target.value)}
        />
        <Select
          label="Sort Direction"
          options={sortOrderOptions}
          value={filters.sortOrder}
          onChange={(event) => onFilterChange("sortOrder", event.target.value)}
        />
        <div className="flex items-end gap-2">
          <Button variant="secondary" className="w-full" onClick={onExport}>
            Export CSV
          </Button>
          {isAdmin ? (
            <Button className="w-full" onClick={onAdd}>
              Add
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
