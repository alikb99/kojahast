/**
 * سازنده‌های JSON-LD. همه صفحات یک @graph واحد دارند که با @id به هم وصل شده‌اند:
 * Organization ← WebSite ← WebPage ← (Article | CollectionPage) ← BreadcrumbList / ItemList / FAQPage
 */
import { SITE } from "../data/site";
import { abs, phoneIntl, plain, instagramUrl, telegramUrl } from "./utils";
import type { Post } from "./posts";

export const ORG_ID = `${SITE.url}/#organization`;
export const WEBSITE_ID = `${SITE.url}/#website`;

export function organization() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE.name,
    alternateName: SITE.alternateName,
    url: `${SITE.url}/`,
    logo: { "@type": "ImageObject", url: abs(SITE.logo), width: 512, height: 512 },
    email: SITE.email,
    telephone: phoneIntl(SITE.phone),
    address: { "@type": "PostalAddress", streetAddress: SITE.address, addressLocality: "تهران", addressCountry: "IR" },
    sameAs: Object.values(SITE.socials).filter(Boolean),
  };
}

export function website() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE.url}/`,
    name: SITE.name,
    alternateName: SITE.alternateName,
    description: SITE.description,
    inLanguage: SITE.lang,
    publisher: { "@id": ORG_ID },
  };
}

export type Crumb = { name: string; url: string };

export function breadcrumb(pageUrl: string, crumbs: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${abs(pageUrl)}#breadcrumb`,
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: abs(c.url),
    })),
  };
}

export function webPage(opts: {
  url: string;
  name: string;
  description: string;
  type?: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  hasBreadcrumb?: boolean;
}) {
  const url = abs(opts.url);
  return {
    "@type": opts.type ?? "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: opts.name,
    description: opts.description,
    inLanguage: SITE.lang,
    isPartOf: { "@id": WEBSITE_ID },
    ...(opts.image ? { primaryImageOfPage: { "@type": "ImageObject", url: abs(opts.image) } } : {}),
    ...(opts.datePublished ? { datePublished: opts.datePublished } : {}),
    ...(opts.dateModified ? { dateModified: opts.dateModified } : {}),
    ...(opts.hasBreadcrumb ? { breadcrumb: { "@id": `${url}#breadcrumb` } } : {}),
  };
}

export function faqPage(pageUrl: string, items: { q: string; a: string }[]) {
  if (!items.length) return null;
  return {
    "@type": "FAQPage",
    "@id": `${abs(pageUrl)}#faq`,
    mainEntity: items.map((x) => ({
      "@type": "Question",
      name: plain(x.q),
      acceptedAnswer: { "@type": "Answer", text: plain(x.a) },
    })),
  };
}

/** اسکیمای کامل صفحه مقاله */
export function articleGraph(post: Post, url: string, crumbs: Crumb[], wordCount: number) {
  const d = post.data;
  const pageUrl = abs(url);
  const image = abs(d.image);

  const itemList = {
    "@type": "ItemList",
    "@id": `${pageUrl}#centers`,
    name: d.h1 ?? d.title,
    numberOfItems: d.centers.length,
    itemListOrder: "https://schema.org/ItemListUnordered",
    itemListElement: d.centers.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "LocalBusiness",
        "@id": `${pageUrl}#${c.id}`,
        name: c.name,
        url: `${pageUrl}#${c.id}`,
        description: plain(c.summary[0]).slice(0, 300),
        image,
        address: {
          "@type": "PostalAddress",
          streetAddress: c.address,
          addressLocality: d.city,
          addressRegion: d.city,
          addressCountry: "IR",
        },
        ...(c.phones.length ? { telephone: phoneIntl(c.phones[0]) } : {}),
        ...(c.lat && c.lng ? { geo: { "@type": "GeoCoordinates", latitude: c.lat, longitude: c.lng } } : {}),
        ...(() => {
          const same = [
            SITE.showWebsites ? c.website : undefined,
            c.instagram ? instagramUrl(c.instagram) : undefined,
            c.telegram ? telegramUrl(c.telegram) : undefined,
          ].filter(Boolean);
          return same.length ? { sameAs: same } : {};
        })(),
      },
    })),
  };

  const graph: any[] = [
    organization(),
    website(),
    webPage({
      url,
      name: d.title,
      description: d.description,
      image: d.image,
      datePublished: d.publishedTime,
      dateModified: d.modifiedTime,
      hasBreadcrumb: true,
    }),
    {
      "@type": "Article",
      "@id": `${pageUrl}#article`,
      headline: d.h1 ?? d.title,
      description: d.description,
      image: { "@type": "ImageObject", url: image },
      datePublished: d.publishedTime,
      dateModified: d.modifiedTime,
      inLanguage: SITE.lang,
      wordCount,
      articleSection: crumbs[crumbs.length - 2]?.name,
      keywords: [d.keyword, d.brand].filter(Boolean).join("، "),
      author: { "@type": "Organization", name: `تیم تحریریه ${SITE.name}`, url: abs("/about/") },
      publisher: { "@id": ORG_ID },
      mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
      isPartOf: { "@id": `${pageUrl}#webpage` },
      about: { "@id": `${pageUrl}#centers` },
    },
    breadcrumb(url, crumbs),
    itemList,
  ];
  const faq = faqPage(url, d.faq);
  if (faq) graph.push(faq);
  return { "@context": "https://schema.org", "@graph": graph };
}

export function graph(...nodes: any[]) {
  return { "@context": "https://schema.org", "@graph": nodes.filter(Boolean) };
}
