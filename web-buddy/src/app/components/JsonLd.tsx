export interface JsonLdData {
  "@context": "https://schema.org";
  "@type": "WebSite" | "WebPage" | "SoftwareApplication" | "CollectionPage";
  name: string;
  description: string;
  url: string;
  author?: {
    "@type": "Person";
    name: string;
  };
  image?: string;
  mainEntity?: {
    "@type": "ItemList";
    itemListElement: {
      "@type": "ListItem";
      position: number;
      url: string;
      name: string;
    }[];
  };
}

interface JsonLdProps {
  id: string;
  data: JsonLdData;
}

export default function JsonLd({ id, data }: JsonLdProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
