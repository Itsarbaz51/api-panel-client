import SearchField from "@/components/ui/SearchField";
import FilterDropdown from "@/components/ui/Filter";
import Button from "@/components/ui/Button";

export default function TableHeader({
  title,
  subtitle,
  search,
  setSearch,
  searchPlaceholder = "Search...",
  filters = [], // Array of filter configurations
  onAdd,
  onExport,
  onRefresh,
  refreshIcon,
  refreshLabel = "Refresh",
  addLabel = "Add",
  exportLabel = "Export",
  addIcon,
  exportIcon,
  isLoading,
}) {
  return (
    <div className="p-6 border-b border-border ">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>

        <div className="flex flex-row items-center gap-3">
          <SearchField
            value={search}
            onChange={setSearch}
            placeholder={searchPlaceholder}
          />

          {/* Render all filters dynamically */}
          {filters.map((filter, index) => (
            <FilterDropdown
              key={index}
              value={filter.value}
              onChange={filter.onChange}
              placeholder={filter.placeholder}
              options={filter.options}
            />
          ))}

          {onAdd && (
            <Button variant="default" icon={addIcon} onClick={onAdd}>
              {addLabel}
            </Button>
          )}

          {onRefresh && (
            <Button variant="primary" icon={refreshIcon} onClick={onRefresh}>
              {isLoading ? "Refresh..." : refreshLabel}
            </Button>
          )}
          {onExport && (
            <Button variant="outline" icon={exportIcon} onClick={onExport}>
              {exportLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
