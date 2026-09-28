# معماری و طراحی «کجا هست»

## فناوری

- Astro 5 (خروجی استاتیک، `trailingSlash: "always"`)
- Content Collections با `glob` loader و اعتبارسنجی zod
- astro-icon (مجموعه‌های `lucide` و `simple-icons`)
- CSS اختصاصی با توکن‌های طراحی (Tailwind فقط برای preflight)
- هاستینگ: Cloudflare Pages / Netlify (فایل‌های `_headers` و `_redirects`)

## ساختار فایل‌ها

```
src/
├── content.config.ts          اسکیمای مقالات (فیلدهای مراکز)
├── content/posts/*.md         ۱۸ مقاله
├── data/site.ts               تنظیمات مرکزی: نام، تلفن، دسته‌ها، منو، آیکون برندها
├── lib/
│   ├── utils.ts               تاریخ شمسی، ارقام فارسی، تلفن، مارک‌داون درون‌خطی
│   ├── posts.ts               دریافت مقالات، پیلار/کلاستر، مرتبط‌ها، شمارش کلمات
│   └── schema.ts              سازنده‌های JSON-LD
├── layouts/BaseLayout.astro
├── components/
│   ├── SEO.astro              متا، canonical، OG، Twitter، JSON-LD
│   ├── Header.astro / Footer.astro / Logo.astro
│   ├── SearchBox.astro        جستجوی زنده روی /search-index.json
│   ├── PostCard.astro / FaqList.astro / Breadcrumbs.astro
│   └── article/
│       ├── CentersTable.astro جدول مقایسه ابتدای مقاله (موبایل: کارت)
│       └── CenterCard.astro   کارت هر مرکز: توضیح، خدمات، قوت/ضعف، تماس، مسیریابی
└── pages/
    ├── index.astro            صفحه اصلی
    ├── blog/index.astro       همه راهنماها (+ فیلتر ?q=)
    ├── blog/[slug].astro      صفحه مقاله
    ├── blog/category/[category].astro
    ├── about.astro / contact.astro / 404.astro
    ├── feed.xml.ts            RSS
    └── search-index.json.ts   ایندکس جستجو (مقالات + تک‌تک مراکز)
scripts/check-post.mjs         اعتبارسنجی محتوا
```

## سیستم طراحی (الهام از قالب دایرکتوری مرجع)

| توکن | مقدار | کاربرد |
|---|---|---|
| `--brand` / `--brand-600` | `#3a9a2c` / `#2f8a24` | دکمه اصلی، خط زیر تیترها، پین کارت‌ها |
| `--accent` | `#f3b21b` | دکمه «ثبت کسب‌وکار»، فیلترها، دکمه جستجو |
| `--bg-soft` | `#f4f5f1` | پس‌زمینه بخش‌ها (با الگوی نقطه‌ای) |
| `--footer` | `#272b2f` | فوتر تیره |
| فونت | Vazirmatn (Medium / Black) | |

الگوهای برگرفته از طرح مرجع: هدر سفید با دکمه کهربایی، هیرو تصویری با جستجوی کپسولی و انتخاب شهر، کاشی‌های «محبوب‌ترین» با دایره رنگی و عدد، فیلترهای کپسولی + کارت با پین سبز، بنر CTA با خط کهربایی، بخش «چطور کار می‌کند» سه‌مرحله‌ای، فوتر چهارستونه تیره.

## صفحه اصلی

هیرو + جستجو → کاشی همه راهنماها → کارت‌ها با فیلتر (همه/موبایل/لپ‌تاپ/اپل) → بنر ثبت کسب‌وکار → سه مرحله + آمار واقعی → متن معرفی با لینک به پیلارها + FAQ

## صفحه مقاله

بردکرامب → H1 + lead + متادیتا (تاریخ شمسی، تعداد مراکز، زمان مطالعه) → **جدول مقایسه** → کارت مراکز → بدنه راهنما → (پیلار: گرید برندها) → روش تهیه لیست → FAQ → مرتبط‌ها. سایدبار چسبان: فهرست مطالب، لینک پیلار، تماس مشاوره.

## دستورات

```bash
npm run dev                                  # توسعه
npm run build                                # بیلد
node scripts/check-post.mjs src/content/posts/*.md   # اعتبارسنجی مقالات (+ کلاستر کلمات کلیدی و LSI)
node scripts/check-schema.mjs                        # اعتبارسنجی JSON-LD صفحات dist (بعد از build)
```

> نصب در محیط‌هایی که به میرور چینی دسترسی ندارند: `package-lock.json` آدرس پکیج‌ها را روی `registry.npmmirror.com` دارد. اگر `npm ci` گیر کرد یا خطای 403 داد:
> `npm ci --replace-registry-host=always --registry=https://registry.npmjs.org/`

## افزودن مقاله جدید

1. طبق [content-guidelines.md](content-guidelines.md) فایل `src/content/posts/<slug>.md` بسازید.
2. `node scripts/check-post.mjs src/content/posts/<slug>.md`
3. `npm run build` — اسکیما، جدول، سایت‌مپ، فید، جستجو و لینک‌های قالب خودکار بروز می‌شوند.
4. `node scripts/check-schema.mjs`
5. در پیلار مربوطه یک لینک متنی به مقاله جدید اضافه کنید.

قبل از مرحله ۱، بریف کلمات کلیدی مقاله را طبق [keyword-briefs.md](keyword-briefs.md) بنویسید و `keywords` و `lsi` را در frontmatter پر کنید.
