// اعتبارسنجی JSON-LD صفحات بیلدشده: npm run build && node scripts/check-schema.mjs
// پارس JSON، فیلدهای الزامی هر نوع، ارجاع‌های @id، بردکرامب، FAQ، ItemList و LocalBusiness را بررسی می‌کند.
import fs from "node:fs";
import path from "node:path";

const files = [];
(function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (p.endsWith(".html")) files.push(p);
  }
})("dist");

const REQUIRED = {
  Article: ["headline", "image", "datePublished", "dateModified", "author", "publisher"],
  BreadcrumbList: ["itemListElement"],
  FAQPage: ["mainEntity"],
  ItemList: ["itemListElement"],
  Organization: ["name", "url", "logo"],
  WebSite: ["name", "url"],
};

let bad = 0;
let blocksCount = 0;
const types = {};

for (const f of files) {
  const html = fs.readFileSync(f, "utf8");
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  const errs = [];
  if (!blocks.length && !f.includes("404")) errs.push("no JSON-LD");

  for (const b of blocks) {
    let j;
    try {
      j = JSON.parse(b);
    } catch (e) {
      errs.push("JSON parse: " + e.message);
      continue;
    }
    blocksCount++;
    if (j["@context"] !== "https://schema.org") errs.push("bad @context");
    const g = j["@graph"] || [j];
    const ids = new Set(g.map((x) => x["@id"]).filter(Boolean));

    for (const x of g) {
      const t = x["@type"];
      types[t] = (types[t] || 0) + 1;
      if (!t) errs.push("node without @type");
      (REQUIRED[t] || []).forEach((k) => x[k] == null && errs.push(`${t} missing ${k}`));

      if (t === "Article") {
        if (x.headline.length > 110) errs.push("headline > 110 chars");
        if (isNaN(Date.parse(x.datePublished)) || isNaN(Date.parse(x.dateModified))) errs.push("bad date");
      }
      if (t === "BreadcrumbList")
        x.itemListElement.forEach((li, i) => {
          if (li.position !== i + 1 || !/^https:\/\//.test(li.item)) errs.push(`breadcrumb item ${i}`);
        });
      if (t === "FAQPage")
        x.mainEntity.forEach((q) => (!q.name || !q.acceptedAnswer?.text) && errs.push("faq item incomplete"));
      if (t === "ItemList") {
        if (x.numberOfItems !== x.itemListElement.length) errs.push("numberOfItems mismatch");
        x.itemListElement.forEach(({ item: lb }) => {
          if (!lb || lb["@type"] !== "LocalBusiness") return;
          if (!lb.name || !lb.address?.streetAddress) errs.push(`LocalBusiness incomplete: ${lb.name}`);
          if (lb.telephone && !/^\+98\d{5,11}$/.test(lb.telephone)) errs.push(`phone ${lb.name}: ${lb.telephone}`);
          (lb.sameAs || []).forEach((u) => !/^https:\/\//.test(u) && errs.push(`sameAs ${u}`));
        });
      }
      if (Array.isArray(x.sameAs) && !x.sameAs.length) errs.push("empty sameAs");
      ["mainEntityOfPage", "isPartOf", "publisher", "breadcrumb", "about"].forEach((k) => {
        const id = x[k]?.["@id"];
        if (id && !ids.has(id)) errs.push(`${t}.${k} → unresolved ${id}`);
      });
    }
  }
  if (errs.length) {
    bad++;
    console.log("✗", f, [...new Set(errs)].join(" | "));
  }
}

console.log(`${files.length} pages, ${blocksCount} JSON-LD blocks, ${bad} with problems`);
console.log(types);
process.exit(bad ? 1 : 0);
