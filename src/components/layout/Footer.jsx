import { Link } from "react-router-dom"

const footerLinks = [
  {
    title: "Company",
    items: [
      { label: "Tentang Kami", to: "#" },
      { label: "Blog", to: "#" },
      { label: "Karir", to: "#" },
    ],
  },
  {
    title: "Bantuan",
    items: [
      { label: "FAQ", to: "#" },
      { label: "Hubungi Kami", to: "#" },
      { label: "Panduan", to: "#" },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "Privasi", to: "#" },
      { label: "Syarat & Ketentuan", to: "#" },
      { label: "DMCA", to: "#" },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-surface">
      <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-8 lg:px-[60px]">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="text-2xl font-extrabold tracking-tight text-primary">
              AniStream
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              Platform streaming anime dengan koleksi lengkap dan update terbaru setiap minggunya.
            </p>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="mb-3 text-sm font-semibold text-text-primary">
                {group.title}
              </h4>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.to}
                      className="text-sm text-text-secondary transition-colors hover:text-primary"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-text-secondary">
          &copy; {new Date().getFullYear()} AniStream. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
