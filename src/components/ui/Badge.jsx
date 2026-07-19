const styles = {
  trending: "bg-primary/20 text-primary",
  new: "bg-green-500/20 text-green-400",
  exclusive: "bg-yellow-500/20 text-yellow-400",
  genre: "bg-surface-high text-text-secondary",
}

export default function Badge({ children, variant = "genre", className = "" }) {
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${styles[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
