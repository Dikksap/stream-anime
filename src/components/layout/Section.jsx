export default function Section({ title, subtitle, children, className = "" }) {
  return (
    <section className={`mb-12 ${className}`}>
      {title && (
        <div className="mb-6">
          <h2 className="text-title font-bold text-text-primary">{title}</h2>
          {subtitle && (
            <p className="mt-1 text-sm text-text-secondary">{subtitle}</p>
          )}
        </div>
      )}
      {children}
    </section>
  )
}
