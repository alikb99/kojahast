import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * هر مقاله = یک فایل .md در src/content/posts
 * اطلاعات مراکز به صورت ساختاریافته در frontmatter نگهداری می شود تا
 * جدول معرفی، کارت مراکز، فهرست مطالب و اسکیمای LocalBusiness خودکار ساخته شوند.
 * راهنمای کامل: docs/content-guidelines.md
 */

const center = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/, "id فقط حروف کوچک انگلیسی، عدد و خط تیره"),
  name: z.string(),
  area: z.string().optional(), // محله یا منطقه (برای جدول و فیلتر)
  address: z.string(),
  phones: z.array(z.string()).default([]),
  hours: z.string().optional(),
  instagram: z.string().regex(/^[A-Za-z0-9._]{1,30}$/, "آیدی اینستاگرام فقط حروف انگلیسی، عدد، نقطه و _").optional(), // فقط آیدی بدون @
  telegram: z.string().optional(), // فقط آیدی بدون @
  whatsapp: z.string().optional(), // شماره
  website: z.string().url().optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
  bestFor: z.string().optional(), // مناسب برای ... (یک عبارت کوتاه)
  summary: z.array(z.string()).min(1), // پاراگراف های توضیح مرکز
  services: z.array(z.string()).default([]),
  pros: z.array(z.string()).min(1),
  cons: z.array(z.string()).min(1),
});

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(), // عنوان سئو (تگ title) — حداکثر حدود ۶۵ کاراکتر
    h1: z.string().optional(), // اگر نباشد همان title
    description: z.string(), // متا دیسکریپشن ۱۲۰ تا ۱۶۰ کاراکتر
    category: z.enum(["mobile-repairs", "laptop-and-computer-repair"]),
    pillar: z.boolean().default(false),
    brand: z.string().optional(),
    city: z.string().default("تهران"),
    keyword: z.string(), // کلمه کلیدی اصلی
    keywords: z.array(z.string()).default([]), // کلاستر کلمات کلیدی: کلمات فرعی و سؤال محور (docs/keyword-briefs.md)
    lsi: z.array(z.string()).default([]), // کلمات LSI که باید در متن بیایند
    image: z.string(),
    imageAlt: z.string(),
    publishedTime: z.string(),
    modifiedTime: z.string(),
    lead: z.string(), // مقدمه کوتاه بالای جدول (لینک مارک داون مجاز)
    centers: z.array(center).min(5).max(20),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    related: z.array(z.string()).default([]), // slug مقالات مرتبط
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
