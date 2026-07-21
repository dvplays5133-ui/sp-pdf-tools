type OrganizationSchemaProps = {
  name?: string;
  url?: string;
};

type SoftwareSchemaProps = {
  name: string;
  description: string;
  url: string;
};

type BreadcrumbItem = {
  name: string;
  item: string;
};

type FAQItem = {
  question: string;
  answer: string;
};

type JsonLdProps = {
  organization?: OrganizationSchemaProps;
  software?: SoftwareSchemaProps;
  breadcrumbs?: BreadcrumbItem[];
  faqs?: FAQItem[];
};

export default function JsonLd({
  organization,
  software,
  breadcrumbs,
  faqs,
}: JsonLdProps) {
  const schemas: object[] = [];

  if (organization) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: organization.name ?? "SP PDF Tools",
      url: organization.url ?? "https://sp-pdf-tools.vercel.app",
    });
  }

  if (software) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: software.name,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web",
      description: software.description,
      url: software.url,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      provider: {
        "@type": "Organization",
        name: "SP PDF Tools",
        url: "https://sp-pdf-tools.vercel.app",
      },
    });
  }

  if (breadcrumbs && breadcrumbs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.item,
      })),
    });
  }

  if (faqs && faqs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    });
  }

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
    </>
  );
}