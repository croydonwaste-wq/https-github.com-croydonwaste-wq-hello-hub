import { Helmet } from "react-helmet-async";
import { absoluteUrl, business } from "@/data/business";

type Props = {
  title: string;
  description: string;
  path: string;
  schema?: Record<string, unknown>[];
  noindex?: boolean;
  ogType?: "website" | "article";
};

export function Seo({ title, description, path, schema = [], noindex = false, ogType = "website" }: Props) {
  const url = absoluteUrl(path);
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex ? <meta name="robots" content="noindex, follow" /> : <link rel="canonical" href={url} />}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={business.name} />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={absoluteUrl("/og-image.png")} />
      <meta name="twitter:card" content="summary_large_image" />
      {schema.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
}
