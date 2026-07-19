import { HiChevronLeft, HiChevronRight } from "react-icons/hi2"

export default function Pagination({ page, totalPages, onPageChange }) {
  return (
    <div className="flex items-center justify-center gap-4">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="flex h-9 w-9 items-center justify-center rounded-[8px] border border-border bg-surface text-text-secondary transition-colors hover:bg-surface-high hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Halaman sebelumnya"
      >
        <HiChevronLeft className="h-4 w-4" />
      </button>

      <span className="text-sm font-medium text-text-secondary">
        {page}{totalPages ? ` / ${totalPages}` : ""}
      </span>

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={totalPages != null && page >= totalPages}
        className="flex h-9 w-9 items-center justify-center rounded-[8px] border border-border bg-surface text-text-secondary transition-colors hover:bg-surface-high hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Halaman selanjutnya"
      >
        <HiChevronRight className="h-4 w-4" />
      </button>
    </div>
  )
}
