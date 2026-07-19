export default function Container({ children, className = "" }) {
  return (
    <div className={`mx-auto w-full max-w-[1280px] px-4 sm:px-8 lg:px-[60px] ${className}`}>
      {children}
    </div>
  )
}
