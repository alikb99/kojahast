# انتشار سایت (Cloudflare Pages)

سایت kojahast.com روی **Cloudflare Pages** میزبانی می شود و به مخزن گیت هاب `alikb99/kojahast` وصل است. هر پوش روی شاخه انتشار، سایت را خودکار بیلد و منتشر می کند.

## وضعیت فعلی

| مورد | مقدار |
|---|---|
| سرویس | Cloudflare Pages (پروژه `kojahast`) |
| شاخه انتشار (Production branch) | `claude/busy-planck-h75dxi` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| متغیر محیطی | `NODE_VERSION=22` |
| آدرس موقت | `https://kojahast-1y2.pages.dev` |
| دامنه اصلی | `kojahast.com` (+ `www.kojahast.com` که به دامنه اصلی ریدایرکت می شود) |
| ثبت دامنه | نت افراز (فقط نیم سرورها به کلودفلر سپرده شده اند) |
| DNS | کلودفلر (پلن Free) |

فایل های `public/_redirects` و `public/_headers` مخصوص کلودفلرند و بدون تغییر خوانده می شوند. به `.htaccess` نیازی نیست.

## کدام پوش سایت را به روز می کند؟

- **پوش روی شاخه انتشار:** سایت اصلی kojahast.com خودکار بیلد و به روز می شود (معمولاً یکی دو دقیقه).
- **پوش روی هر شاخه دیگر** (مثلاً `main` یا شاخه جلسه های جدید Claude Code): سایت اصلی تغییر نمی کند. کلودفلر فقط یک **پیش نمایش** با آدرس جدا روی `pages.dev` می سازد.

> تجربه واقعی: تغییرات یک جلسه Claude Code (نقشه گوگل مپ و اصلاح کارت مراکز) روی `main` پوش شده بود و روی سایت نیامد، چون شاخه انتشار چیز دیگری بود. بعداً در شاخه انتشار ادغام شد (کامیت `8e61b70`).

### نکته برای جلسه های Claude Code

هر جلسه جدید Claude Code معمولاً **شاخه جدید و جدای خودش** را می سازد. پس یکی از این دو کار را بکنید:

1. در ابتدای جلسه بگویید روی شاخه انتشار کار کند، یا
2. بعد از پایان کار، شاخه آن جلسه را در شاخه انتشار ادغام کنید.

### پیشنهاد: شاخه انتشار `main` شود

`main` شاخه پیش فرض گیت هاب است و بیشتر ابزارها و جلسه ها از آن شروع می کنند؛ احتمال گم شدن تغییرات خیلی کمتر می شود. مراحل:

1. شاخه `claude/busy-planck-h75dxi` در `main` ادغام شود.
2. کلودفلر ← Workers & Pages ← پروژه `kojahast` ← **Settings** ← **Builds** ← **Branch control** ← Production branch را `main` بگذارید.
3. همین جدول «وضعیت فعلی» را در این فایل به روز کنید.

## احتیاط

- اگر **بیلد خراب** شود، کلودفلر همان نسخه قبلی را روی سایت نگه می دارد و سایت خاموش نمی شود. خطا را در تب **Deployments** ← آخرین ردیف ← **Build log** ببینید.
- ولی اگر **محتوای اشتباه** (مثلاً شماره تلفن غلط) پوش شود، همان لحظه منتشر می شود. برای همین قبل از هر پوش:
  ```bash
  node scripts/check-post.mjs src/content/posts/*.md
  npm run build
  node scripts/check-schema.mjs
  ```
- قاعده پروژه: هیچ تغییری بدون تأیید مدیر سایت پوش نمی شود.

## برگرداندن نسخه قبلی (Rollback)

اگر نسخه ای مشکل داشت: پروژه `kojahast` ← **Deployments** ← روی یک انتشار سالم قبلی ← منوی سه نقطه ← **Rollback to this deployment**. سایت در چند ثانیه به آن نسخه برمی گردد. بعد مشکل را در کد درست کنید و دوباره پوش کنید.

## بررسی بعد از هر انتشار

1. تب **Deployments**: آخرین ردیف با کامیت جدید وضعیت **Success** داشته باشد.
2. `https://kojahast.com` و یک مقاله باز شوند (اگر نسخه قبلی دیده شد، Ctrl+F5).
3. `https://kojahast.com/feed/` به `/feed.xml` برود (ریدایرکت ها کار می کنند).
4. یک آدرس غلط، صفحه ۴۰۴ سایت را نشان دهد.

## راه اندازی اولیه (برای مرجع)

1. **پروژه Pages:** Workers & Pages ← Create application ← **Continue to Pages** (مسیر Pages؛ مسیر Workers به فایل `wrangler.jsonc` نیاز دارد) ← Import an existing Git repository ← `alikb99/kojahast` با تنظیمات جدول بالا.
2. **دامنه:** Domains ← Overview ← Onboard a domain ← `kojahast.com` ← پلن Free.
   - در بررسی رکوردهای DNS، رکوردهای A و AAAA قدیمی (آی پی های خود کلودفلر مثل `172.67.x.x` و `104.21.x.x`) حذف شدند. رکورد TXT با مقدار `google-site-verification` برای Search Console **نگه داشته شد**.
   - روی این دامنه ایمیل (رکورد MX) وجود نداشت.
3. **نیم سرورها:** در پنل نت افراز، نیم سرورهای دامنه با دو نیم سرور کلودفلر جایگزین شدند (DNSSEC خاموش).
4. **دامنه روی پروژه:** پروژه `kojahast` ← Custom domains ← `kojahast.com` و `www.kojahast.com`.
5. **www به دامنه اصلی:** Rules ← تمپلیت **Redirect from WWW to root** (همه canonicalها بدون www هستند).
6. **HTTPS:** SSL/TLS ← Edge Certificates ← **Always Use HTTPS** روشن.
7. **Search Console:** ثبت `https://kojahast.com/sitemap-index.xml` و Request indexing برای صفحه اصلی.

## اگر بیلد در مرحله نصب پکیج ها خطا داد

`package-lock.json` آدرس پکیج ها را روی میرور چینی `registry.npmmirror.com` دارد. سرورهای کلودفلر فعلاً به آن دسترسی دارند، ولی اگر روزی مرحله `npm clean-install` گیر کرد یا خطای 403 داد، آدرس های lockfile باید به `registry.npmjs.org` برگردانده شوند. برای نصب محلی در چنین محیطی:

```bash
npm ci --replace-registry-host=always --registry=https://registry.npmjs.org/
```
