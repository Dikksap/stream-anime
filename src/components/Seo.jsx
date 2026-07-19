import { Helmet } from "react-helmet-async"

const SITE_NAME = "AniStream"
const DEFAULT_DESCRIPTION = "Nonton streaming dan download anime subtitle Indonesia gratis. Anime ongoing, completed, dan terlengkap."
const SITE_URL = "https://www.dikksap.my.id"
const DEFAULT_IMAGE = "/og-image.png"

export default function Seo({ title, description, image, url, type = "website", jsonLd, paginationLinks }) {
  const pageTitle = title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} — Nonton Anime Subtitle Indonesia`
  const pageDesc = description || DEFAULT_DESCRIPTION
  const pageUrl = url ? `${SITE_URL}${url}` : SITE_URL
  const pageImage = image || DEFAULT_IMAGE

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDesc} />
      <link rel="canonical" href={pageUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDesc} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:type" content={type} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDesc} />
      <meta name="twitter:image" content={pageImage} />
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
      {paginationLinks?.map((link) => (
        <link key={link.rel} rel={link.rel} href={`${SITE_URL}${link.href}`} />
      ))}
    </Helmet>
  )
}