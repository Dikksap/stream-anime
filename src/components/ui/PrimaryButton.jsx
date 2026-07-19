import { motion } from "framer-motion"

const variants = {
  primary: "bg-primary text-white hover:bg-red-700",
  secondary: "bg-surface-high text-text-primary hover:bg-card",
  ghost: "bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface-high",
  outline: "border border-border bg-transparent text-text-primary hover:bg-surface-high",
}

export default function PrimaryButton({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-[8px] px-5 py-2.5 text-sm font-semibold transition-colors duration-200 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}
