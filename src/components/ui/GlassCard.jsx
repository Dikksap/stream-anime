export default function GlassCard({ children, className = "", ...props }) {
  return (
    <div
      className={`rounded-[12px] border border-border bg-surface/60 backdrop-blur-md ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
